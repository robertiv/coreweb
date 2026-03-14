// app/api/stats/route.ts
import { getPool } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const pool = await getPool();
        const result = await pool.request().query("WITH GuildStats AS (SELECT g.ID AS GuildID, g.Name as name, COUNT(p.GuildID) AS members, ISNULL(f.WinCount, 0) AS fortress, ISNULL(SUM(p.ItemPoints), 0) AS itempoints FROM SRO_VT_SHARD.dbo._Guild g LEFT JOIN SRO_VT_SHARD.dbo._Char p ON p.GuildID = g.ID LEFT JOIN [SRO_VT_SYSTEMS].[dbo].[_SiegeWinner] f ON f.GuildID = g.ID GROUP BY g.ID, g.Name, f.WinCount) SELECT ROW_NUMBER() OVER (ORDER BY fortress DESC, itempoints DESC) AS rank, name, CONVERT(varchar(15), members) + ' / 20' as members, fortress, itempoints FROM GuildStats ORDER BY fortress DESC, itempoints DESC");

        return NextResponse.json(result.recordset, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Error calling database for players ranking." }, { status: 500 });
    }
}
