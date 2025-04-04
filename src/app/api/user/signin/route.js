import User from "@/lib/model/user";
import Connection from "@/lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export const POST = async (req) => {
    try {
        await Connection();

        const body = await req.json();
        const {email, password} = body;

        if(!email || !password) {
            return new Response("email and password are requierd", {status:401});
        }

        const user = await User.findOne({email})
        if(!user){
            return new Response("email does not exist", {status:400})
        }

        const validePass = await bcrypt.compare(password, user.password)
        if(!validePass) {
            return new Response('password not match', {status:400})
        }

        const tokenData = {
            username: user.email,
            id: user._id
        } 

        const token = jwt.sign(tokenData, process.env.JWT_SECRETKEY, {expiresIn:'1d'});
        const response = NextResponse.json({message:'login successfully'});

        response.cookies.set('token', token, {httpOnly:true});
        return response;

    } catch (error) {
        console.error("Error in user registration:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}