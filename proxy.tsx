import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/dashboard", "/logout"];
const guestOnlyRoutes = ["/account"];

// This function can be marked `async` if using `await` inside
export function proxy(request: NextRequest) {
	const pathname = request.nextUrl.pathname;
	const token = request.cookies.get("token")?.value;
	const isProtectedRoute = protectedRoutes.some((route) =>
		pathname.startsWith(route),
	);
	const isGuestOnlyRoute = guestOnlyRoutes.some((route) =>
		pathname.startsWith(route),
	);

	if (!isProtectedRoute && !isGuestOnlyRoute) {
		return NextResponse.next();
	}

	if (isGuestOnlyRoute) {
		if (!token) {
			return NextResponse.next();
		}

		try {
			jwt.verify(token, JWT_SECRET);
			return NextResponse.redirect(new URL("/dashboard", request.url));
		} catch (err) {
			return NextResponse.next();
		}
	}

	// Si no hay token → redirigir a login
	if (!token) {
		const loginUrl = new URL("/account", request.url);
		loginUrl.searchParams.set("from", request.nextUrl.pathname);
		loginUrl.searchParams.set("error", "not_authorized");
		return NextResponse.redirect(loginUrl);
		//return NextResponse.redirect(new URL("/login", request.url));
	}

	try {
		jwt.verify(token, JWT_SECRET);
		return NextResponse.next();
	} catch (err) {
		const loginUrl = new URL("/account", request.url);
		loginUrl.searchParams.set("from", request.nextUrl.pathname);
		loginUrl.searchParams.set("error", "session_expired");
		return NextResponse.redirect(loginUrl);
	}
}

// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }

// rutas en las que se ejecuta el middleware
export const config = {
	matcher: ["/dashboard/:path*", "/account", "/logout"],
};
