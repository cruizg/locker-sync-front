import { NextResponse } from "next/server";
import { auth } from "@/auth.config";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {

  const { id } = await params;

  const session = await auth();

  if (!session?.user?.token) {
    return NextResponse.json(
      { ok: false, msg: "Unauthorized" },
      { status: 401 }
    );
  }

  const backendUrl = `${process.env.URL_BACKEND}/api/items/${id}/preview`;

  const backendRes = await fetch(backendUrl, {
    headers: {
      "x-token": session.user.token, // 🔥 HEADER EXACTO
    },
  });

  if (!backendRes.ok) {
    return NextResponse.json(
      { ok: false, msg: "Error previewing file" },
      { status: backendRes.status }
    );
  }

  return new NextResponse(backendRes.body, {
    status: backendRes.status,
    headers: {
      "Content-Type":
        backendRes.headers.get("Content-Type") ??
        "application/octet-stream",
      "Content-Disposition": "inline",
    },
  });
}