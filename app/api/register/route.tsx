import { NextRequest, NextResponse } from "next/server";
import { getPool } from "@/lib/db";
import crypto from "crypto";

export async function POST(req: NextRequest) {
	try {
		const { userId, password, email, confirmPassword } = await req.json();

		if (!userId || !password || !email || !confirmPassword) {
			console.log("Missing fields:", {
				userId,
				password,
				email,
				confirmPassword,
			});
			return NextResponse.json(
				{
					error: "All fields are required. Please fill the full form to register. ",
				},
				{ status: 400 },
			);
		}

		if (password !== confirmPassword) {
			return NextResponse.json(
				{
					error: "Both passwords needs to match. Verify and try again.",
				},
				{ status: 400 },
			);
		}

		const pool = await getPool();

		const result = await pool.request().input("userid", userId).query(`
        	SELECT StrUserID
        	FROM SRO_VT_ACCOUNT.dbo.TB_User
        	WHERE StrUserID = @userid
      	`);

		const user = result.recordset[0];

		if (user) {
			return NextResponse.json(
				{
					error: "This UserID already exists. Please choose another one.",
				},
				{ status: 400 },
			);
		}

		const md5Password = crypto
			.createHash("md5")
			.update(password)
			.digest("hex");

		await pool
			.request()
			.input("userid", userId)
			.input("email", email)
			.input("password", md5Password).query(`
				EXEC SRO_VT_COREWEB.dbo._CreateAccount
		 		@StrUserID = @userid,
		 		@Email = @email,
		 		@Password = @password
      		`);

		return NextResponse.json(
			{
				success: true,
				message:
					"Your account has been created successfully! You can now log in.",
			},
			{ status: 201 },
		);
	} catch (error) {
		return NextResponse.json({ error: String(error) }, { status: 500 });
	}
}
