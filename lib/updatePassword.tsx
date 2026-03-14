export async function updatePassword({
	newPassword,
    currentPassword,
}: {
	newPassword: string;
    currentPassword: string;
}) {
	try {
		const res = await fetch("/api/passwordupd", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify({				
				newPassword: newPassword,
                currentPassword: currentPassword,
			}),
		});

		const data = await res.json();

		if (!res.ok) {
			return data || "Error al actualizar la contraseña";
		}

		// Si login es exitoso
		return data;
	} catch (err) {
		return (
			JSON.stringify({
				error: String(err),
			}) || "Error al actualizar la contraseña"
		);
	}
}
