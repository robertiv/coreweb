export async function updateEmail({
	newEmail,
}: {
	newEmail: string;
}) {
	try {
		const res = await fetch("/api/emailupd", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify({				
				newEmail: newEmail,
			}),
		});

		const data = await res.json();

		if (!res.ok) {
			return data || "Error al actualizar el correo electrónico";
		}

		// Si login es exitoso
		return data;
	} catch (err) {
		return (
			JSON.stringify({
				error: String(err),
			}) || "Error al actualizar el correo electrónico"
		);
	}
}
