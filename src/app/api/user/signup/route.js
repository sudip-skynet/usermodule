import User from "@/lib/model/user";
import Connection from "@/lib/db";
import bcrypt from "bcryptjs";

export const POST = async (req) => {
    try {
        await Connection();

        const body = await req.json();
        const {name, email, phone, password} = body;

        if(!name || !email || !phone || !password) {
            return new Response("name. email, phone and password are requierd", {status:401});
        }

        const user = await User.findOne({email})
        if(user){
            return new Response("email already exist", {status:400})
        }

        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            phone,
            password:hashedPassword
        })

        await newUser.save();
        return new Response('new user added', {status:200});

    } catch (error) {
        console.error("Error in user registration:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}