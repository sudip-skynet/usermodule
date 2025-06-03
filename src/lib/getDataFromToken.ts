import { NextRequest } from "next/server";
import Jwt from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest) => {
    try {
        const token = request.cookies.get("token")?.value;
        
        // Handle missing token
        if (!token) {
            throw new Error("Token not found");
        }

        // Verify and decode the token
        const decodedToken: any = Jwt.verify(token, process.env.TOKEN_SECRET!);

        // Return the user ID from the decoded token
        return decodedToken.id;
    } catch (error: any) {
        if (error.name === 'JsonWebTokenError') {
            throw new Error("Invalid token");
        } else if (error.name === 'TokenExpiredError') {
            throw new Error("Token expired");
        } else {
            throw new Error("Token verification failed: " + error.message);
        }
    }
}
