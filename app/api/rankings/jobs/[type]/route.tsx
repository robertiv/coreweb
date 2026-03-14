// app/api/stats/route.ts
import { getPool } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
	request: Request,
	{ params }: { params: Promise<{ type: string }> },
) {
	try {
		const { type } = await params;
		const jobType = Number(type);

		if (!Number.isInteger(jobType) || ![1, 2, 3].includes(jobType)) {
			return NextResponse.json(
				{ error: "Invalid type parameter " + type },
				{ status: 400 },
			);
		}

		const pool = await getPool();
		const result = await pool.request().query(
					`WITH jobStats AS (
			SELECT c.CharName16 as name,
				CASE WHEN c.RefObjID > 3000 THEN 'european' ELSE 'chinese' END + ' / ' + CASE WHEN c.Intellect > c.Strength THEN 'INT' ELSE 'STR' END as class,
				case when g.[Name] = 'dummy' then '<none>' else g.[Name] end as guild,
				SUM(Quantity) as points
				FROM SRO_VT_SYSTEMS.dbo._CharTriJob_GoodsLog l
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
			ORDER BY points DESC`
		);

		return NextResponse.json(result.recordset, { status: 200 });
	} catch (err) {
		return NextResponse.json(
			{ error: "Error calling database for job ranking" },
			{ status: 500 },
		);
	}
}
