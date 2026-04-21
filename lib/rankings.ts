import { unstable_cache } from "next/cache";
import { getPool } from "@/lib/db";
import { PUBLIC_CONFIG } from "@/lib/public-config";

export const RANKING_CACHE_SECONDS = (() => {
	const value = Number(PUBLIC_CONFIG.rankingCacheSeconds ?? 300);
	if (!Number.isFinite(value) || value <= 0) {
		return 300;
	}
	return Math.floor(value);
})();

export const rankingTabs = [
	"players",
	"guilds",
	"traders",
	"hunters",
	"thieves",
	"honor",
	"uniques",
	"pvp-match",
] as const;

export type RankingTab = (typeof rankingTabs)[number];

async function queryPlayersRanking() {
	const pool = await getPool();
	const result = await pool.request().query(
		"SELECT ROW_NUMBER() OVER (ORDER BY c.ItemPoints DESC) AS RankNo, c.CharName16, CASE WHEN g.[Name] IS NULL OR g.[Name] = 'dummy' THEN '<none>' ELSE g.[Name] END AS guildname, CASE WHEN c.RefObjID < 2000 THEN 'chinese' ELSE 'european' END + ' ' + CASE WHEN c.Strength > c.Intellect THEN 'str' ELSE 'int' END AS class, t.jobType AS jobType, c.ItemPoints, c.LastLogout FROM SRO_VT_SHARD.dbo._Char c LEFT JOIN SRO_VT_SHARD.dbo._CharTrijob t ON t.CharID = c.CharID LEFT JOIN SRO_VT_SHARD.dbo._Guild g ON c.GuildID = g.ID ORDER BY c.ItemPoints DESC",
	);

	return result.recordset ?? [];
}

async function queryGuildsRanking() {
	const pool = await getPool();
	const result = await pool.request().query(
		"WITH GuildStats AS (SELECT g.ID AS GuildID, g.Name as name, COUNT(p.GuildID) AS members, ISNULL(f.WinCount, 0) AS fortress, ISNULL(SUM(p.ItemPoints), 0) AS itempoints FROM SRO_VT_SHARD.dbo._Guild g LEFT JOIN SRO_VT_SHARD.dbo._Char p ON p.GuildID = g.ID LEFT JOIN [SRO_VT_COREWEB].[dbo].[_SiegeWinner] f ON f.GuildID = g.ID GROUP BY g.ID, g.Name, f.WinCount) SELECT ROW_NUMBER() OVER (ORDER BY fortress DESC, itempoints DESC) AS rank, name, CONVERT(varchar(15), members) + ' / 20' as members, fortress, itempoints FROM GuildStats ORDER BY fortress DESC, itempoints DESC",
	);

	return result.recordset ?? [];
}

async function queryHonorRanking() {
	const pool = await getPool();
	const result = await pool.request().query(
		"SELECT ROW_NUMBER() OVER (ORDER BY h.Points DESC) AS RankNo, CharName16 as charname, CASE WHEN RefObjID < 5000 THEN 'chinese' ELSE 'european' END as class, t.jobType as jobType, h.Points as honorpoints, LastLogout FROM SRO_VT_COREWEB.dbo._HonorRank h LEFT JOIN SRO_VT_SHARD.dbo._CharTrijob t on h.CharID = t.CharID LEFT JOIN _Char c ON h.CharID = c.CharID ORDER BY h.Points DESC",
	);

	return result.recordset ?? [];
}

async function queryUniquesRanking() {
	const pool = await getPool();
	const result = await pool.request().query(
		"SELECT ROW_NUMBER() OVER (ORDER BY r.Points DESC) AS RankNo, c.CharName16 as charname, CASE WHEN RefObjID < 5000 THEN 'chinese' ELSE 'european' END + ' ' + CASE WHEN Strength > Intellect THEN 'str' else 'int' end as class, t.jobType as jobType, r.Points as uniquepoints, case when g.[Name] = 'dummy' then '<none>' else g.[Name] end as guildname, c.LastLogout FROM SRO_VT_COREWEB.dbo._UniquesRank r JOIN SRO_VT_SHARD.dbo._Char c ON c.CharID = r.CharID JOIN SRO_VT_SHARD.dbo._Guild g ON c.GuildID = g.ID JOIN SRO_VT_SHARD.dbo._CharTrijob t ON t.CharID = c.CharID ORDER BY r.Points DESC",
	);

	return result.recordset ?? [];
}

async function queryJobRanking(jobType: 1 | 2 | 3) {
	const pool = await getPool();
	const result = await pool.request().query(`WITH jobStats AS (
		SELECT c.CharName16 as name,
			CASE WHEN c.RefObjID > 3000 THEN 'european' ELSE 'chinese' END + ' / ' + CASE WHEN c.Intellect > c.Strength THEN 'INT' ELSE 'STR' END as class,
			case when g.[Name] = 'dummy' then '<none>' else g.[Name] end as guild,
			SUM(Quantity) as points
			FROM SRO_VT_COREWEB.dbo._CharTriJob_GoodsLog l
			JOIN SRO_VT_SHARD.dbo._Char c ON l.CharID = c.CharID
			JOIN SRO_VT_SHARD.dbo._Guild g ON c.GuildID = g.ID
		WHERE l.JobType = ${jobType}
		GROUP BY c.CharName16, c.Strength, c.Intellect, g.[Name], c.RefObjID
	)
	SELECT ROW_NUMBER() OVER (
		ORDER BY points DESC
	) AS rank,
		name,
		class,
		guild,
		points
		FROM jobStats
		ORDER BY points DESC`);

	return result.recordset ?? [];
}

const getPlayersRankingCached = unstable_cache(queryPlayersRanking, ["ranking", "players"], {
	revalidate: RANKING_CACHE_SECONDS,
});

const getGuildsRankingCached = unstable_cache(queryGuildsRanking, ["ranking", "guilds"], {
	revalidate: RANKING_CACHE_SECONDS,
});

const getHonorRankingCached = unstable_cache(queryHonorRanking, ["ranking", "honor"], {
	revalidate: RANKING_CACHE_SECONDS,
});

const getUniquesRankingCached = unstable_cache(queryUniquesRanking, ["ranking", "uniques"], {
	revalidate: RANKING_CACHE_SECONDS,
});

const getTradersRankingCached = unstable_cache(
	() => queryJobRanking(1),
	["ranking", "jobs", "1"],
	{ revalidate: RANKING_CACHE_SECONDS },
);

const getThievesRankingCached = unstable_cache(
	() => queryJobRanking(2),
	["ranking", "jobs", "2"],
	{ revalidate: RANKING_CACHE_SECONDS },
);

const getHuntersRankingCached = unstable_cache(
	() => queryJobRanking(3),
	["ranking", "jobs", "3"],
	{ revalidate: RANKING_CACHE_SECONDS },
);

export async function getRankingByTab(tab: RankingTab) {
	switch (tab) {
		case "players":
			return getPlayersRankingCached();
		case "guilds":
			return getGuildsRankingCached();
		case "traders":
			return getTradersRankingCached();
		case "hunters":
			return getHuntersRankingCached();
		case "thieves":
			return getThievesRankingCached();
		case "honor":
			return getHonorRankingCached();
		case "uniques":
			return getUniquesRankingCached();
		case "pvp-match":
			return [];
		default:
			return [];
	}
}
