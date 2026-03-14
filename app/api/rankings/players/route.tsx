// app/api/stats/route.ts
import { getPool } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const pool = await getPool();
        const result = await pool.request().query("SELECT ROW_NUMBER() OVER (ORDER BY c.ItemPoints DESC) AS RankNo, CharName16, case when g.[Name] = 'dummy' then '<none>' else g.[Name] end as guildname, CASE WHEN RefObjID < 5000 THEN 'chinese' ELSE 'european' END + ' ' + CASE WHEN Strength > Intellect THEN 'str' else 'int' end as class, t.jobType as jobType, c.ItemPoints, LastLogout FROM _Char c LEFT JOIN SRO_VT_SHARD.dbo._CharTrijob t on T.CharID = c.CharID JOIN SHARD_test.dbo._Guild g ON c.GuildID = g.ID ORDER BY c.ItemPoints DESC");

        return NextResponse.json(result.recordset, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Error calling database for players ranking: " + error }, { status: 500 });
    }
}
