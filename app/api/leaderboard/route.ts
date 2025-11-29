import { NextResponse } from "next/server";
import data from "@/src/mocks/leaderboard.json"

export async function GET() {
    return NextResponse.json(data);
}