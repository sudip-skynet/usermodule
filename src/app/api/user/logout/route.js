import { NextResponse } from "next/server";

export const GET = async (req) => {
    try {
        const response = NextResponse.json({message:'Logout successfully'});

        response.cookies.set('token', '', {httpOnly:true, expires: new Date(0)});
        return response;
    } catch (error) {
        console.error("Error in user registration:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}