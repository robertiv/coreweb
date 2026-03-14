// app/api/stats/route.ts
import { getPool } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const pool = await getPool();
        const result = await pool.request().query("SELECT c.CharName16 as charname, CASE WHEN RefObjID < 5000 THEN 'chinese' ELSE 'european' END + ' ' + CASE WHEN Strength > Intellect THEN 'str' else 'int' end as class, t.jobType as jobType, r.Points as uniquepoints, case when g.[Name] = 'dummy' then '<none>' else g.[Name] end as guildname FROM SRO_VT_SYSTEMS.dbo._UniquesRank r JOIN SRO_VT_SHARD.dbo._Char c ON c.CharID = r.CharID JOIN SRO_VT_SHARD.dbo._Guild g ON c.GuildID = g.ID JOIN SRO_VT_SHARD.dbo._CharTrijob t ON t.CharID = c.CharID ORDER BY Points DESC");

        return NextResponse.json(result.recordset, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Error calling database for uniques ranking." }, { status: 500 });
    }
}
