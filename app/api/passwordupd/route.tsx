import { NextRequest, NextResponse } from "next/server";
import { getPool } from "@/lib/db";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(req: NextRequest) {
	try {
		const { newPassword, currentPassword } = await req.json();
		const token = req.cookies.get("token")?.value;

		if (!token || !newPassword || !currentPassword) {
			return NextResponse.json(
				{ error: "Unauthorized or missing fields." },
				{ status: 400 },
			);
		}

		const decoded = jwt.verify(token, JWT_SECRET) as { id: number };

		const pool = await getPool();

		const result = await pool.request().input("userid", decoded.id).query(`
        SELECT password
        FROM SRO_VT_ACCOUNT.dbo.TB_User
        WHERE JID = @userid
      `);

		const user = result.recordset[0];

		if (!user) {
			return NextResponse.json(
				{ error: "Invalid user or password." },
				{ status: 401 },
			);
		}

		//  Convertir password ingresado a MD5
		const md5Password = crypto
			.createHash("md5")
			.update(currentPassword)
			.digest("hex");

		// Comparar hashes
		if (md5Password !== user.password) {
			return NextResponse.json(
				{ error: "Invalid current password." },
				{ status: 401 },
			);
		}

		const md5NewPassword = crypto
			.createHash("md5")
			.update(newPassword)
			.digest("hex");

		await pool
			.request()
			.input("userjid", decoded.id)
			.input("newPassword", md5NewPassword).query(`
                EXEC SRO_VT_COREWEB.dbo._UpdatePassword
                @JID = @userjid,
                @NewPassword = @newPassword
            `);

		return NextResponse.json(
			{
				success: true,
				message: "Your password has been updated successfully!",
			},
			{ status: 201 },
		);
	} catch (error) {
		return NextResponse.json({ error: String(error) }, { status: 500 });
	}
}
