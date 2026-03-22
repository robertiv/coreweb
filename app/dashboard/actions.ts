"use server";

import crypto from "crypto";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import Mailgun from "mailgun.js";
import { getPool } from "@/lib/db";

const JWT_SECRET = process.env.JWT_SECRET!;

type ActionState = {
	error: string;
	success: string;
	updatedEmail?: string;
};

function getField(formData: FormData, key: string): string {
	const value = formData.get(key);
	return typeof value === "string" ? value.trim() : "";
}

async function getUserIdFromToken(): Promise<number | null> {
	const cookieStore = await cookies();
	const token = cookieStore.get("token")?.value;

	if (!token) {
		return null;
	}

	try {
		const decoded = jwt.verify(token, JWT_SECRET) as { id: number };
		return decoded.id;
	} catch {
		return null;
	}
}

export async function updateEmailAction(
	_prevState: ActionState,
	formData: FormData,
): Promise<ActionState> {
	try {
		const newEmail = getField(formData, "newEmail");
		const userId = await getUserIdFromToken();

		if (!userId || !newEmail) {
			return {
				error: "Unauthorized or missing new email.",
				success: "",
			};
		}

		const pool = await getPool();
		const result = await pool.request().input("userid", userId).query(`
			SELECT Email
			FROM SRO_VT_ACCOUNT.dbo.TB_User
			WHERE JID = @userid
		`);

		const user = result.recordset[0];
		if (user && user.Email === newEmail) {
			return {
				error: "You can't update to the same email. Please choose another one.",
				success: "",
			};
		}

		await pool
			.request()
			.input("userjid", userId)
			.input("newEmail", newEmail).query(`
				EXEC SRO_VT_COREWEB.dbo._UpdateEmail
				@JID = @userjid,
				@NewEmail = @newEmail
			`);

		return {
			error: "",
			success: "Your email has been updated successfully!",
			updatedEmail: newEmail,
		};
	} catch (error) {
		return {
			error: "An error occurred while updating your email.",
			success: "",
		};
	}
}

export async function updatePasswordAction(
	_prevState: ActionState,
	formData: FormData,
): Promise<ActionState> {
	try {
		const currentPassword = getField(formData, "currentPassword");
		const newPassword = getField(formData, "newPassword");
		const confirmNewPassword = getField(formData, "confirmNewPassword");
		const userId = await getUserIdFromToken();

		if (!userId || !currentPassword || !newPassword || !confirmNewPassword) {
			return {
				error: "Please fill in all password fields.",
				success: "",
			};
		}

		if (newPassword !== confirmNewPassword) {
			return {
				error: "New password and confirmation do not match.",
				success: "",
			};
		}

		const pool = await getPool();
		const result = await pool.request().input("userid", userId).query(`
			SELECT password
			FROM SRO_VT_ACCOUNT.dbo.TB_User
			WHERE JID = @userid
		`);

		const user = result.recordset[0];
		if (!user) {
			return {
				error: "Invalid user or password.",
				success: "",
			};
		}

		const md5CurrentPassword = crypto
			.createHash("md5")
			.update(currentPassword)
			.digest("hex");

		if (md5CurrentPassword !== user.password) {
			return {
				error: "Invalid current password.",
				success: "",
			};
		}

		const md5NewPassword = crypto
			.createHash("md5")
			.update(newPassword)
			.digest("hex");

		await pool
			.request()
			.input("userjid", userId)
			.input("newPassword", md5NewPassword).query(`
				EXEC SRO_VT_COREWEB.dbo._UpdatePassword
				@JID = @userjid,
				@NewPassword = @newPassword
			`);

		return {
			error: "",
			success: "Your password has been updated successfully!",
		};
	} catch {
		return {
			error: "An error occurred while updating your password.",
			success: "",
		};
	}
}

export async function sendVerificationEmailAction(
	_prevState: ActionState,
	formData: FormData,
): Promise<ActionState> {
	try {
		const email = getField(formData, "email");
		const username = getField(formData, "username");

		if (!email) {
			return {
				error: "You need a valid email before sending verification.",
				success: "",
			};
		}

		const mailgun = new Mailgun(FormData);
		const mg = mailgun.client({
			username: "api",
			key: process.env.MAILGUN_API_KEY || "",
		});

		await mg.messages.create(process.env.MAILGUN_DOMAIN || "", {
			from: "Lycan Online <noreply@lycansro.com>",
			to: [email],
			subject: "Verify your email - Lycan Online",
			text: `Hello ${username || "player"}, please verify your email for your Lycan Online account.`,
		});

		return {
			error: "",
			success: "Verification email sent successfully.",
		};
	} catch {
		return {
			error: "Unable to send verification email right now.",
			success: "",
		};
	}
}