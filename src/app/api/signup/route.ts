import React from "react";
import { Connect } from "@/database/dbConfige";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';
import {sendEmail} from "@/lib/mailer";

export async function POST(request: NextRequest) {

    await Connect();

    try {
        const reqBody = await request.json();
        const {name, email, phone, password} = reqBody;
        
        // Basic validation (optional improvement)
        if (!name || !email || !phone || !password) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
            e.preventDefault();

        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
        return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        // Hash the password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // Create new user
        const newUser = new User ({
            name,
            email,
            phone,
            password: hashedPassword
        })
        const savedUser = await newUser.save();
        //console.log(savedUser)

        // Send verification email
        await sendEmail({email, emailType: 'VERIFY', userId: savedUser._id})

        return NextResponse.json({
            message: 'User register successfully',
            success:true,
            savedUser
        });
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status:500})
    }
}