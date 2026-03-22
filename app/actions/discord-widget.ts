"use server";

import { getPool } from "@/lib/db";

export type DiscordWidgetData = {
	members: number;
	online: number;
};

export async function getDiscordWidgetDataAction(): Promise<DiscordWidgetData> {
	try {
		const pool = await getPool();
		const result = await pool.request().query(`
			SELECT TOP 1 Members, [Online]
			FROM SRO_VT_COREWEB.dbo._DiscordWidget
			ORDER BY ID DESC
		`);

		const row = result.recordset?.[0];

		return {
			members: Number(row?.Members ?? 0),
			online: Number(row?.Online ?? 0),
		};
	} catch {
		return {
			members: 0,
			online: 0,
		};
	}
}
