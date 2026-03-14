import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { getPool } from "@/lib/db";

export async function getUserFromToken() {
	const cookieStore = await cookies();
	const token = cookieStore.get("token")?.value;
	const pool = await getPool();

	if (!token) return null;

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
			id: number;
		};

		const user = await pool
			.request()
			.input("jid", decoded.id) // Parámetro seguro (evita SQL injection)
			.query(
				"SELECT u.StrUserID, u.Email, ISNULL(CAST(e.Verified AS INT), 0) AS CertificateNum, FORMAT(u.regtime, 'MMMM, dd, yyyy', 'en-US') AS RegDate, u.sec_primary AS Role, s.silk_own AS Silk, s.silk_gift AS SilkGift, s.silk_point AS JobPoints, CASE WHEN e.lastLogin IS NULL THEN 'Never' ELSE CAST(DATEDIFF(DAY, e.lastLogin, GETDATE()) AS VARCHAR(10)) + ' days, ' + CAST(DATEDIFF(HOUR, DATEADD(DAY, DATEDIFF(DAY, e.lastLogin, GETDATE()), e.lastLogin), GETDATE()) AS VARCHAR(10)) + ' hours ago' END AS LastLogin FROM SRO_VT_ACCOUNT.dbo.TB_User u JOIN SRO_VT_ACCOUNT.dbo.SK_Silk s ON s.JID = u.JID LEFT JOIN SRO_VT_COREWEB.dbo._Emails e ON e.Email COLLATE SQL_Latin1_General_CP1_CI_AS = u.Email COLLATE SQL_Latin1_General_CP1_CI_AS WHERE u.JID = @jid",
			);

		if (!user.recordset || user.recordset.length === 0) {
			console.error("Database query failed:", user);
			return null;
		}
		//console.log("Database query result:", user.recordset, "for JID:", decoded.id);
		const userInfo = user.recordset[0];

		if(userInfo.Email) {
			await pool
			.request()			
			.input("email", userInfo.Email).query(`
				UPDATE SRO_VT_COREWEB.dbo._Emails
				SET lastLogin = GETDATE()
				WHERE Email = @email
      		`);
		}
		console.log("User info email retrieved:", userInfo.Email);
		return userInfo;
	} catch (error) {
		console.error("Error decoding token or fetching user:", error);
		return null;
	}
}
