"use server";

import { getPool } from "@/lib/db";

export type TopPlayerData = {
	rank: number;
	name: string;
	guild: string;
	points: number;
	refCharId: number;
};

export async function getTopPlayersAction(): Promise<TopPlayerData[]> {
	try {
		const pool = await getPool();
		const result = await pool.request().query(`
			SELECT TOP 5
				c.CharName16,
				c.RefObjID,
				c.ItemPoints,
				CASE
					WHEN g.Name IS NULL OR UPPER(g.Name) = 'DUMMY' THEN 'No Guild'
					ELSE g.Name
				END AS GuildName
			FROM SRO_VT_SHARD.dbo._Char AS c
			LEFT JOIN SRO_VT_SHARD.dbo._Guild AS g
				ON g.ID = c.GuildID
			WHERE UPPER(c.CharName16) NOT LIKE '%GM%'
				AND UPPER(c.CharName16) NOT LIKE '%ADMIN%'
				AND UPPER(c.CharName16) <> 'DUMMY'
			ORDER BY c.ItemPoints DESC
		`);

		return result.recordset.map((row, index) => ({
			rank: index + 1,
			name: String(row.CharName16 ?? "Unknown"),
			guild: String(row.GuildName ?? "No Guild"),
			points: Number(row.ItemPoints ?? 0),
			refCharId: Number(row.RefObjID ?? 0),
		}));
	} catch {
		return [];
	}
}