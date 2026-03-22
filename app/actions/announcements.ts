"use server";

import { getPool } from "@/lib/db";

export type AnnouncementData = {
	id: number;
	author: string;
	content: string;
	pinned: boolean;
	time: string;
};

export async function getAnnouncementsAction(): Promise<AnnouncementData[]> {
	try {
		const pool = await getPool();
		const result = await pool.request().query(`
			SELECT TOP 10
				a.ID,
				a.Author,
				a.descr,
				a.Pinned,
				CASE
					WHEN t.MinutesAgo < 60 THEN CAST(t.MinutesAgo AS VARCHAR) + 'm ago'
					WHEN t.HoursAgo < 24 THEN CAST(t.HoursAgo AS VARCHAR) + 'h ago'
					ELSE CAST(t.DaysAgo AS VARCHAR) + 'd ago'
				END AS TimeAgo
			FROM SRO_VT_COREWEB.dbo._Announcements a WITH(NOLOCK)
			CROSS APPLY (
				SELECT
					DATEDIFF(MINUTE, a.postDate, GETDATE()) AS MinutesAgo,
					DATEDIFF(HOUR, a.postDate, GETDATE()) AS HoursAgo,
					DATEDIFF(DAY, a.postDate, GETDATE()) AS DaysAgo
			) t
			ORDER BY a.Pinned DESC, a.ID DESC
		`);

		return result.recordset.map((row) => ({
			id: Number(row.ID),
			author: String(row.Author ?? ""),
			content: String(row.descr ?? ""),
			pinned: Number(row.Pinned) === 1,
			time: String(row.TimeAgo ?? ""),
		}));
	} catch {
		return [];
	}
}
