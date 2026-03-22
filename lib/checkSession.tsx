export type ClientSession = {
	authenticated: boolean;
	userId: string;
};

function readCookie(name: string): string | null {
	if (typeof document === "undefined") {
		return null;
	}

	const cookies = document.cookie.split("; ");
	const entry = cookies.find((item) => item.startsWith(`${name}=`));

	if (!entry) {
		return null;
	}

	return decodeURIComponent(entry.slice(name.length + 1));
}

export function getClientSession(): ClientSession {
	const userId = readCookie("session_user") ?? "";

	return {
		authenticated: Boolean(userId),
		userId,
	};
}

export default function checkSession() {
	return getClientSession().authenticated;
}
