// app/api/stats/route.ts
import { getPool } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const pool = await getPool();
        const result = await pool.request().query("SELECT ROW_NUMBER() OVER (ORDER BY h.Points ASC) AS RankNo, CharName16 as charname, CASE WHEN RefObjID < 5000 THEN 'chinese' ELSE 'european' END as class, t.jobType as jobType, h.Points as honorpoints, LastLogout FROM SRO_VT_SYSTEMS.dbo._HonorRank h LEFT JOIN SRO_VT_SHARD.dbo._CharTrijob t on h.CharID = t.CharID LEFT JOIN _Char c ON h.CharID = c.CharID ORDER BY h.Points DESC");

        return NextResponse.json(result.recordset, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Error calling database for players ranking." }, { status: 500 });
    }
}
