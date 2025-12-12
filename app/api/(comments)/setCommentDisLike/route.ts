import { Request } from "express";
import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/lib/dbConnect";

export async function POST(request: NextRequest) {
  await dbConnect();
  return NextResponse.json({
    success: true,
  });
}
