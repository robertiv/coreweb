export default async function loginUser({
	userId,
	password,
}: {
	userId: string;
	password: string;
}) {
	try {
		const res = await fetch("/api/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include", // 🔥 importante para cookies
			body: JSON.stringify({
				userId: userId,
				password: password,
			}),
		});

		const data = await res.json();

		if (!res.ok) {
			return data || "Error al iniciar sesión";
		}

		// Si login es exitoso
		return data;
	} catch (err) {
		return (
			JSON.stringify({
				error: String(err),
			}) || "Error al iniciar sesión"
		);
	}
}
