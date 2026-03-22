"use server";

import { getPool } from "@/lib/db";
import { PUBLIC_CONFIG } from "@/lib/public-config";

export type FortressWarData = {
	id: number;
	name: string;
	guildOwner: string;
};

export type FortressWarSchedule = {
	dayOfWeek: number;
	startHour: number;
	startMinute: number;
} | null;

export type FortressWarPayload = {
	fortresses: FortressWarData[];
	schedule: FortressWarSchedule;
};

const SUPPORTED_FORTRESS_IDS = new Set([1, 3, 6]);

export async function getFortressWarDataAction(): Promise<FortressWarPayload> {
	const enabledFortresses = PUBLIC_CONFIG.fortressWar.filter(
		(fortress) => fortress.enabled && SUPPORTED_FORTRESS_IDS.has(fortress.id),
	);

	if (enabledFortresses.length === 0) {
		return {
			fortresses: [],
			schedule: null,
		};
	}

	try {
		const pool = await getPool();
		const fortressResult = await pool.request().query(`
			SELECT
				sf.FortressID,
				CASE
					WHEN sf.GuildID = 0 OR g.Name IS NULL OR g.Name = 'dummy' THEN '<none>'
					ELSE g.Name
				END AS GuildName
			FROM SRO_VT_SHARD.dbo._SiegeFortress sf
			LEFT JOIN SRO_VT_SHARD.dbo._Guild g ON g.ID = sf.GuildID
			WHERE sf.FortressID IN (1, 3, 6)
		`);

		const scheduleResult = await pool.request().query(`
			SELECT TOP 1
				SubInterval_DayOfWeek,
				SubInterval_StartTimeHour,
				SubInterval_StartTimeMinute
			FROM SRO_VT_SHARD.dbo._Schedule
			WHERE ScheduleDefineIdx = 6
		`);

		const guildByFortressId = new Map<number, string>();
		for (const row of fortressResult.recordset ?? []) {
			guildByFortressId.set(
				Number(row.FortressID),
				String(row.GuildName ?? "<none>"),
			);
		}

		const scheduleRow = scheduleResult.recordset?.[0];
		const schedule: FortressWarSchedule = scheduleRow
			? {
					dayOfWeek: Number(scheduleRow.SubInterval_DayOfWeek),
					startHour: Number(scheduleRow.SubInterval_StartTimeHour),
					startMinute: Number(scheduleRow.SubInterval_StartTimeMinute),
				}
			: null;

		return {
			fortresses: enabledFortresses.map((fortress) => ({
				id: fortress.id,
				name: fortress.name,
				guildOwner: guildByFortressId.get(fortress.id) ?? "<none>",
			})),
			schedule,
		};
	} catch {
		return {
			fortresses: enabledFortresses.map((fortress) => ({
				id: fortress.id,
				name: fortress.name,
				guildOwner: "<none>",
			})),
			schedule: null,
		};
	}
}
