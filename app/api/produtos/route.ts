import { NextRequest, NextResponse } from "next/server";
import { produtos } from "@/lib/db";

// Retorna os produtos
export async function GET() {
  try {
    return new NextResponse(JSON.stringify(produtos), { status: 200 });
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(
  body: NextRequest
) {
  try {

    const produto = await body.json();

    produtos.push(produto)

    return new NextResponse(JSON.stringify(produto), { status: 200 });


  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }

}

