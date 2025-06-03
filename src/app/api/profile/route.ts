import { Connect } from "@/database/dbConfige";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/lib/getDataFromToken";

export async function POST(request: NextRequest) {
  try {
    await Connect();

    // Extract user ID from token
    const userId = await getDataFromToken(request);

    const user = await User.findOne({ _id: userId }).select("-password");

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "User found",
      data: user
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}