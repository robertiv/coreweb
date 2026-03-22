"use server";

import { getPool } from "@/lib/db";

export type TopGuildData = {
	rank: number;
	guildName: string;
	fortressWins: number;
	itemPoints: string;
	memberCount: number;
};

export async function getTopGuildsAction(): Promise<TopGuildData[]> {
	try {
		const pool = await getPool();
		const result = await pool.request().query(`
			SELECT TOP 5
				ISNULL(g.[Name], '') AS Guild_Name,
				ISNULL(w.winCount, 0) AS Fortress_Wins,
				ISNULL(SUM(a.ItemPoints), 0) AS Item_Points,
				ISNULL(mc.MemberCount, 0) AS Member_Count
			FROM [SRO_VT_SHARD].[dbo].[_Guild] g WITH(NOLOCK)
			JOIN [SRO_VT_SHARD].[dbo].[_Char] a WITH(NOLOCK)
				ON a.GuildID = g.ID
			LEFT JOIN [SRO_VT_SYSTEMS].[dbo].[_SiegeWinner] w
				ON w.GuildID = g.ID
			LEFT JOIN (
				SELECT GuildID, COUNT(*) AS MemberCount
				FROM [SRO_VT_SHARD].[dbo].[_GuildMember] WITH(NOLOCK)
				GROUP BY GuildID
			) mc
				ON mc.GuildID = g.ID
			WHERE a.GuildID > 0
			GROUP BY g.[Name], g.ID, w.winCount, mc.MemberCount
			ORDER BY w.winCount DESC, Item_Points DESC
		`);

		return result.recordset.map((row, index) => ({
			rank: index + 1,
			guildName: String(row.Guild_Name ?? ""),
			fortressWins: Number(row.Fortress_Wins ?? 0),
			itemPoints: String(row.Item_Points ?? "0"),
			memberCount: Number(row.Member_Count ?? 0),
		}));
	} catch {
		return [];
	}
}