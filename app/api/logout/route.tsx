import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookieStore = await cookies();

  cookieStore.delete("token");

  return NextResponse.json(
    { success: true, message: "Sesión cerrada correctamente" },
    { status: 200 }
  );
}
