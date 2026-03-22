"use server";

import crypto from "crypto";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getPool } from "@/lib/db";

const JWT_SECRET = process.env.JWT_SECRET!;

export type AccountActionState = {
	error: string;
	success: string;
};

const initialState: AccountActionState = {
	error: "",
	success: "",
};

function getField(formData: FormData, key: string): string {
	const value = formData.get(key);
	return typeof value === "string" ? value.trim() : "";
}

export async function loginAction(
	_prevState: AccountActionState,
	formData: FormData,
): Promise<AccountActionState> {
	const userId = getField(formData, "username");
	const password = getField(formData, "password");
	const from = getField(formData, "from");

	if (!userId || !password) {
		return {
			...initialState,
			error: "UserID and password are required",
		};
	}

	try {
		const pool = await getPool();
		const result = await pool.request().input("userid", userId).query(`
			SELECT JID, password
			FROM SRO_VT_ACCOUNT.dbo.TB_User
			WHERE StrUserID = @userid
		`);

		const user = result.recordset[0];
		if (!user) {
			return {
				...initialState,
				error: "Invalid user or password.",
			};
		}

		const md5Password = crypto
			.createHash("md5")
			.update(password)
			.digest("hex");

		if (md5Password !== user.password) {
			return {
				...initialState,
				error: "Invalid user or password.",
			};
		}

		const token = jwt.sign({ id: user.JID }, JWT_SECRET, {
			expiresIn: "1h",
		});

		const cookieStore = await cookies();
		cookieStore.set("token", token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			path: "/",
			maxAge: 60 * 60,
		});
		cookieStore.set("session_user", userId, {
			secure: process.env.NODE_ENV === "production",
			path: "/",
			maxAge: 60 * 60,
		});
	} catch (error) {
		return {
			...initialState,
			error:
				"An error ocurred when logging in. Please try again in a few moments.",
		};
	}

	redirect(from || "/dashboard");
}

export async function registerAction(
	_prevState: AccountActionState,
	formData: FormData,
): Promise<AccountActionState> {
	try {
		const userId = getField(formData, "username");
		const email = getField(formData, "email");
		const password = getField(formData, "password");
		const confirmPassword = getField(formData, "confirmPassword");

		if (!userId || !password || !email || !confirmPassword) {
			return {
				...initialState,
				error: "All fields are required. Please fill the full form to register.",
			};
		}

		if (password !== confirmPassword) {
			return {
				...initialState,
				error: "Both passwords needs to match. Verify and try again.",
			};
		}

		const pool = await getPool();
		const result = await pool.request().input("userid", userId).query(`
			SELECT StrUserID
			FROM SRO_VT_ACCOUNT.dbo.TB_User
			WHERE StrUserID = @userid
		`);

		const user = result.recordset[0];
		if (user) {
			return {
				...initialState,
				error: "This UserID already exists. Please choose another one.",
			};
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

		return {
			...initialState,
			success:
				"Your account has been created succesfully! You can login now in your dashboard and ingame.",
		};
	} catch (error) {
		return {
			...initialState,
			error:
				"An error ocurred when creating your account. Please try again and if the error continues, please report to admin.",
		};
	}
}