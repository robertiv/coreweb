export const AUTH_STATE_CHANGED_EVENT = "auth-state-changed";

export function notifyAuthStateChanged(authenticated: boolean) {
	if (typeof window === "undefined") {
		return;
	}

	window.dispatchEvent(
		new CustomEvent(AUTH_STATE_CHANGED_EVENT, {
			detail: { authenticated },
		}),
	);
}