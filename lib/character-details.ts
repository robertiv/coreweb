import { getPool } from "@/lib/db";
import {
	isValidCharacterName,
	sanitizeCharacterName,
} from "@/lib/character-name";

export interface CharacterDetailsResponse {
	character: any;
	inventory: any[];
	uniques: any[];
	killHistory: {
		pvp: any[];
		job: any[];
		unique: any[];
		global: any[];
	};
}

export async function getCharacterDetailsByName(
	name: string,
): Promise<CharacterDetailsResponse | null> {
	const sanitizedName = sanitizeCharacterName(name);

	if (!isValidCharacterName(sanitizedName)) {
		throw new Error("INVALID_CHARACTER_NAME");
	}

	const pool = await getPool();
	const charResult = await pool
		.request()
		.input("id", sanitizedName)
		.query(
			"SELECT c.CharID, c.Strength, c.Intellect,c.CharName16,c.CurLevel,c.MaxLevel,c.RefObjID,c.ItemPoints,g.Name AS GuildName,c.GuildID,j.JobType,ISNULL(pvp.CntPvP, 0)AS PvPCount, ISNULL(job.CntJobKills, 0) AS JobKillsCount, ISNULL(uniques.CntUniqueKills, 0) AS UniqueKillsCount, CASE WHEN EXISTS (SELECT 1 FROM [MaxiGuard_User].[dbo].[hwidlist] oo WHERE oo.charname COLLATE Latin1_General_CI_AS = c.CharName16 COLLATE Latin1_General_CI_AS ) THEN 1 ELSE 0 END AS IsOnline FROM _Char c JOIN _Guild g ON c.GuildID = g.ID JOIN _CharTrijob j ON j.CharID = c.CharID LEFT JOIN (SELECT WinnerID, COUNT(*) AS CntPvP FROM SRO_VT_COREWEB.dbo._PvPRankLogs GROUP BY WinnerID) pvp ON pvp.WinnerID = c.CharID LEFT JOIN (SELECT KillerID, COUNT(*) AS CntJobKills FROM SRO_VT_COREWEB.dbo._JobKillsLog GROUP BY KillerID) job ON job.KillerID = c.CharID LEFT JOIN ( SELECT CharID, COUNT(*) AS CntUniqueKills FROM [MaxiGuard_User].[dbo].[_UniqueKillLog] GROUP BY CharID ) uniques ON uniques.CharID = c.CharID WHERE c.CharName16 = @id",
		);

	if (charResult.recordset.length === 0) {
		return null;
	}

	const [character] = charResult.recordset;

	const inventoryResult = await pool
		.request()
		.input("Charname", sanitizedName)
		.execute("SRO_VT_COREWEB.dbo._GetCharInventoryData");

	const uniquesResult = await pool
		.request()
		.input("id", sanitizedName)
		.query(
			"SELECT ul.CharID, ul.UniqueCode, COALESCE(m.mobName, ul.UniqueCode) AS MonsterName, COUNT(*) AS KillCount FROM SRO_VT_COREWEB.dbo._UniquesLog ul JOIN SRO_VT_COREWEB.dbo._UniquesPoints up ON up.RefUniqueCode = ul.UniqueCode JOIN SRO_VT_SHARD.dbo._Char c ON c.CharID = ul.CharID LEFT JOIN SRO_VT_COREWEB.dbo._uniquesName m ON m.mobCode = ul.UniqueCode WHERE c.CharName16 = @id GROUP BY ul.CharID, ul.UniqueCode, m.mobName",
		);

	const pvpHistoryResult = await pool
		.request()
		.input("id", sanitizedName)
		.query(
			"SELECT TOP 5 c.CharName16 AS KillerName, v.CharName16 AS KilledName, CASE WHEN t.MinutesAgo < 60 THEN CAST(t.MinutesAgo AS VARCHAR) + ' minutes ago' WHEN t.HoursAgo < 24 THEN CAST(t.HoursAgo AS VARCHAR) + ' hours ' + CAST(t.MinutesAgo % 60 AS VARCHAR) + ' minutes ago' ELSE CAST(t.DaysAgo AS VARCHAR) + ' days ' + CAST(t.HoursAgo % 24 AS VARCHAR) + ' hours ' + CAST(t.MinutesAgo % 60 AS VARCHAR) + ' minutes ago' END AS TimeAgo FROM SRO_VT_COREWEB.dbo._PvPRankLogs p INNER JOIN SRO_VT_SHARD.dbo._Char c ON c.CharID = p.WinnerID INNER JOIN SRO_VT_SHARD.dbo._Char v ON v.CharID = p.LoserID CROSS APPLY (SELECT DATEDIFF(MINUTE, p.PvpDate, GETDATE()) AS MinutesAgo, DATEDIFF(HOUR, p.PvpDate, GETDATE()) AS HoursAgo, DATEDIFF(DAY, p.PvpDate, GETDATE()) AS DaysAgo) t WHERE c.CharName16 = @id ORDER BY p.PvpDate DESC",
		);

	const jobHistoryResult = await pool
		.request()
		.input("id", sanitizedName)
		.query(
			"SELECT TOP 5 k.CharName16 AS KillerName, j.KillerJob, d.CharName16 AS DeadName, j.DeadJob, CASE WHEN t.MinutesAgo < 60 THEN CAST(t.MinutesAgo AS VARCHAR) + ' minutes ago' WHEN t.HoursAgo < 24 THEN CAST(t.HoursAgo AS VARCHAR) + ' hours ' + CAST(t.MinutesAgo % 60 AS VARCHAR) + ' minutes ago' ELSE CAST(t.DaysAgo AS VARCHAR) + ' days ' + CAST(t.HoursAgo % 24 AS VARCHAR) + ' hours ' + CAST(t.MinutesAgo % 60 AS VARCHAR) + ' minutes ago' END AS TimeAgo FROM SRO_VT_COREWEB.dbo._JobKillsLog j INNER JOIN _Char k ON k.CharID = j.KillerID INNER JOIN _Char d ON d.CharID = j.DeadID CROSS APPLY (SELECT DATEDIFF(MINUTE, j.KillTime, GETDATE()) AS MinutesAgo, DATEDIFF(HOUR, j.KillTime, GETDATE()) AS HoursAgo, DATEDIFF(DAY, j.KillTime, GETDATE()) AS DaysAgo) t WHERE k.CharName16 = @id ORDER BY j.KillTime DESC",
		);

	const uniqueHistoryResult = await pool
		.request()
		.input("id", sanitizedName)
		.query(
			"SELECT TOP 5 c.CharName16, m.mobName AS UniqueName, CASE WHEN t.MinutesAgo < 60 THEN CAST(t.MinutesAgo AS VARCHAR) + ' minutes ago' WHEN t.HoursAgo < 24 THEN CAST(t.HoursAgo AS VARCHAR) + ' hours ' + CAST(t.MinutesAgo % 60 AS VARCHAR) + ' minutes ago' ELSE CAST(t.DaysAgo AS VARCHAR) + ' days ' + CAST(t.HoursAgo % 24 AS VARCHAR) + ' hours ' + CAST(t.MinutesAgo % 60 AS VARCHAR) + ' minutes ago' END AS TimeAgo FROM SRO_VT_COREWEB.dbo._UniquesLog u INNER JOIN _Char c ON c.CharID = u.CharID INNER JOIN SRO_VT_COREWEB.dbo._uniquesName m ON m.mobCode = u.UniqueCode CROSS APPLY (SELECT DATEDIFF(MINUTE, u.killDate, GETDATE()) AS MinutesAgo, DATEDIFF(HOUR, u.killDate, GETDATE()) AS HoursAgo, DATEDIFF(DAY, u.killDate, GETDATE()) AS DaysAgo) t WHERE c.CharName16 = @id ORDER BY u.ID DESC",
		);

	const globalResult = await pool
		.request()
		.input("id", sanitizedName)
		.query(
			"SELECT TOP 5 g.CharName16, g.Message, CASE WHEN t.MinutesAgo < 60 THEN CAST(t.MinutesAgo AS VARCHAR) + ' minutes ago' WHEN t.HoursAgo < 24 THEN CAST(t.HoursAgo AS VARCHAR) + ' hours ' + CAST(t.MinutesAgo % 60 AS VARCHAR) + ' minutes ago' ELSE CAST(t.DaysAgo AS VARCHAR) + ' days ' + CAST(t.HoursAgo % 24 AS VARCHAR) + ' hours ' + CAST(t.MinutesAgo % 60 AS VARCHAR) + ' minutes ago' END AS TimeAgo FROM SRO_VT_COREWEB.dbo._GlobalLog g CROSS APPLY (SELECT DATEDIFF(MINUTE, g.[Date], GETDATE()) AS MinutesAgo, DATEDIFF(HOUR, g.[Date], GETDATE()) AS HoursAgo, DATEDIFF(DAY, g.[Date], GETDATE()) AS DaysAgo) t WHERE g.CharName16 = @id ORDER BY g.[Date] DESC",
		);

	return {
		character,
		inventory: inventoryResult.recordset,
		uniques: uniquesResult.recordset,
		killHistory: {
			pvp: pvpHistoryResult.recordset,
			job: jobHistoryResult.recordset,
			unique: uniqueHistoryResult.recordset,
			global: globalResult.recordset,
		},
	};
}