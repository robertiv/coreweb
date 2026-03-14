import React from "react";

export default async function checkSession() {
	try {
		const response = await fetch("/api/session", {
			method: "GET",
			credentials: "include",
			cache: "no-store",
		});
		const data = await response.json();
		return Boolean(data?.authenticated);
	} catch {
		return false;
	}
}
