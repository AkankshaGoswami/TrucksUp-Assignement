import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { username, password } = body;

  if (username === "admin" && password === "1234") {
    const response = NextResponse.json({
      success: true,
      token: "dummy-token",
    });

    // ✅ COOKIE SET (IMPORTANT)
    response.cookies.set("token", "dummy-token", {
      path: "/",              
      maxAge: 60 * 60 * 24,  
      httpOnly: false,        
      sameSite: "lax",
    });

    return response;
  } else {
    return NextResponse.json(
      {
        success: false,
        message: "Invalid username or password",
      },
      { status: 401 }
    );
  }
}