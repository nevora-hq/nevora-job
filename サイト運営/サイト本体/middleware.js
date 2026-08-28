import { NextResponse } from "next/server";

export function middleware(request) {
  const basicAuth = request.headers.get("authorization");
  const user = process.env.ADMIN_BASIC_AUTH_USER;
  const pass = process.env.ADMIN_BASIC_AUTH_PASSWORD;

  // 認証情報が未設定でも500(サーバーエラー)は返さない。クロールされた際に
  // 「エラーのあるサイト」と評価されるのを避けるため、通常の未認証と同じ401にする。
  if (!user || !pass) {
    return new NextResponse("認証が必要です。", {
      status: 401,
      headers: { "WWW-Authenticate": 'Basic realm="Admin Area"' },
    });
  }

  if (basicAuth) {
    const encoded = basicAuth.split(" ")[1] || "";
    const [inputUser, inputPass] = Buffer.from(encoded, "base64")
      .toString()
      .split(":");

    if (inputUser === user && inputPass === pass) {
      return NextResponse.next();
    }
  }

  return new NextResponse("認証が必要です。", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Admin Area"' },
  });
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
