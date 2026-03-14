import { NextRequest, NextResponse } from "next/server";
import { getPool } from "@/lib/db";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(req: NextRequest) {
  try {
    const { userId, password } = await req.json();

    if (!userId || !password) {
      return NextResponse.json(
        { error: "UserID and password are required" },
        { status: 400 }
      );
    }

    const pool = await getPool();

    const result = await pool
      .request()
      .input("userid", userId)
      .query(`
        SELECT JID, password, StrUserID, sec_primary
        FROM SRO_VT_ACCOUNT.dbo.TB_User
        WHERE StrUserID = @userid
      `);

    const user = result.recordset[0];

    if (!user) {
      return NextResponse.json(
        { error: "Invalid user or password." },
        { status: 401 }
      );
    }

    //  Convertir password ingresado a MD5
    const md5Password = crypto
      .createHash("md5")
      .update(password)
      .digest("hex");

    // Comparar hashes
    if (md5Password !== user.password) {
      return NextResponse.json(
        { error: "Invalid user or password." },
        { status: 401 }
      );
    }

    // Crear JWT
    const token = jwt.sign(
      {
        id: user.JID
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    const response = NextResponse.json({
      success: true
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60,
    });

    return response;

  } catch (error) {
    
    return NextResponse.json(
      { error: String(error) },
      { status: 500 }
    );
  }
}
