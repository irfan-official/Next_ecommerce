import { Request } from "express";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";

export async function POST(request: Request) {
  await dbConnect();
}
