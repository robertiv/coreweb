// app/api/stats/route.ts
import { getPool } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const pool = await getPool();
		const result = await pool.request().query("SELECT * FROM _Char");

		return NextResponse.json(result.recordset);
	} catch (err) {
		return NextResponse.json({ error: "Error en BD: " + err }, { status: 500 });
	}
}
