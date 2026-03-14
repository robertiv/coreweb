import { NextRequest, NextResponse } from "next/server";
import { getPool } from "@/lib/db";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(req: NextRequest) {
	try {
		const { newEmail } = await req.json();
		const token = req.cookies.get("token")?.value;

		if (!token || !newEmail) {
			return NextResponse.json(
				{ error: "Unauthorized or missing new email." },
				{ status: 400 },
			);
		}

		const decoded = jwt.verify(token, JWT_SECRET) as { id: number };

		const pool = await getPool();

		const result = await pool.request().input("userid", decoded.id).query(`
        	SELECT Email
        	FROM SRO_VT_ACCOUNT.dbo.TB_User
        	WHERE JID = @userid
      	`);

		const user = result.recordset[0];

		if (user && user.Email === newEmail) {
			return NextResponse.json(
				{
					error: "You can't update to the same email. Please choose another one.",
				},
				{ status: 400 },
			);
		}

		await pool
			.request()
			.input("userjid", decoded.id)
			.input("newEmail", newEmail).query(`
				EXEC SRO_VT_COREWEB.dbo._UpdateEmail
		 		@JID = @userjid,
		 		@NewEmail = @newEmail
      		`);

		return NextResponse.json(
			{
				success: true,
				message:
					"Your email has been updated successfully!",
			},
			{ status: 201 },
		);
	} catch (error) {
		return NextResponse.json({ error: String(error) }, { status: 500 });
	}
}
