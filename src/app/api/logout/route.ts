import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        // Create the response with the success message
        const response = NextResponse.json({
            message: "Logout Successfully",
            success: true
        });

        // Clear the 'token' cookie by setting it to an empty value and expiry date in the past
        response.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0) // Set expiration date to the past to invalidate the cookie
        });

        // Return the response with the cleared cookie
        return response;
    } catch (error: any) {
        // Handle any errors and send a 500 status with the error message
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
