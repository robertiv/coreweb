"use server";

import { cookies } from "next/headers";

export default async function deleteSession() {
	try {
		const cookieStore = await cookies();
		cookieStore.delete("token");
		cookieStore.delete("session_user");

		return {
			success: true,
			message: "Session closed successfully",
		};
	} catch {
		return {
			success: false,
			message: "Unable to logout right now. Please try again.",
		};
	}
}
