import { NextResponse } from "next/server";
import { getProducts } from "@/lib/queries/products";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.trim();

  if (!query) {
    return NextResponse.json({ products: [] });
  }

  const products = await getProducts({ query });
  return NextResponse.json({ products });
}
