import React from "react";

export default async function deleteSession() {
	try {
      
      const response = await fetch("/api/logout", {
        method: "POST",
        credentials: "include", // MUY IMPORTANTE
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return data.message || "Error al cerrar sesión";
      }

      return data || "Sesión cerrada correctamente";
      // Redirigir después del logout
      //router.push("/login");
      //router.refresh(); // opcional pero recomendado
    } catch (error) {
      return error || "Error al cerrar sesión";
    }
}
