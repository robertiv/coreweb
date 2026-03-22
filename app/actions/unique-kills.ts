"use server";

import { getPool } from "@/lib/db";

export type UniqueKillData = {
	player: string;
	monster: string;
	time: string;
};

export async function getUniqueKillsAction(): Promise<UniqueKillData[]> {
	try {
		const pool = await getPool();
		const result = await pool.request().query(`
			SELECT TOP 5
				c.CharName16,
				m.mobName AS UniqueName,
				CASE
					WHEN t.MinutesAgo < 60 THEN CAST(t.MinutesAgo AS VARCHAR) + 'm ago'
					ELSE CAST(t.HoursAgo AS VARCHAR) + 'h ago'
				END AS TimeAgo
			FROM SRO_VT_COREWEB.dbo._UniquesLog u WITH(NOLOCK)
			INNER JOIN SRO_VT_SHARD.dbo._Char c WITH(NOLOCK)
				ON c.CharID = u.CharID
			INNER JOIN SRO_VT_COREWEB.dbo._uniquesName m WITH(NOLOCK)
				ON m.mobCode = u.UniqueCode
			CROSS APPLY (
				SELECT
					DATEDIFF(MINUTE, u.killDate, GETDATE()) AS MinutesAgo,
					DATEDIFF(HOUR, u.killDate, GETDATE()) AS HoursAgo
			) t
			ORDER BY u.ID DESC
		`);

		return result.recordset.map((row) => ({
			player: String(row.CharName16 ?? ""),
			monster: String(row.UniqueName ?? ""),
			time: String(row.TimeAgo ?? ""),
		}));
	} catch {
		return [];
	}
}
