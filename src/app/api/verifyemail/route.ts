import { Connect } from "@/database/dbConfige";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  await Connect();

  try {
    const reqBody = await request.json();
    const { token } = reqBody;

    console.log('Received token:', token);

    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() }
    });
    

    if (!user) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
    }

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;

    await user.save();

    return NextResponse.json({ message: "Email verified successfully", success: true }, { status: 200 });
  } catch (error: any) {
    console.error('Email verification error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
