"use server";

import { getPool } from "@/lib/db";

export type ServerStatusData = {
	playersOnline: number;
	isOnline: boolean;
};

export async function getServerStatusAction(): Promise<ServerStatusData> {
	try {
		const pool = await getPool();
		const result = await pool.request().query(`
			SELECT COUNT(*) AS onlineCount
			FROM SRO_VT_COREWEB.dbo._onlineOffline
		`);

		const playersOnline = Number(result.recordset?.[0]?.onlineCount ?? 0);

		return {
			playersOnline,
			isOnline: playersOnline > 0,
		};
	} catch {
		return {
			playersOnline: 0,
			isOnline: false,
		};
	}
}