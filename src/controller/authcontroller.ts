import User from "../model/AuthUser";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";

//Register User
export const signup = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    if(!username || !email || !password){
        return res.status(400).json({ message: "All fields are required" })
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User created successfully ✅" });
  } catch (err) {
    console.error('Signup error:', err);
    const errorMessage = err instanceof Error ? err.message : 'Internal Server Error' // checks is err is actually an instance of build-in JS Error class.
    res.status(500).json({ message: errorMessage});
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if(!email || !password){
        return res.status(400).json({ message: "All fields are required" })
    }

    //Admin Login
    if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
        const adminId = process.env.ADMIN_ID || "c6c8f30e71eafbbae520155b"
        const token = jwt.sign(
            {id: adminId, email: email, role: "admin" },
            process.env.JWT_SECRET || "mysecret",
            { expiresIn: "1h" }
        )

        return res.status(200).json({
            message: "Login successful (Hardcoded Admin)",
            token,
            user: {
            id: adminId,
            role: "admin",
            },
        });        
    }


    //User Login
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials ❌" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials ❌" });

    const token = jwt.sign(
      { id: user._id, email: user.email, role: "user" },
      process.env.JWT_SECRET || "mysecret",
      { expiresIn: "1h" }
    );

    return res.json({ message: "Login successful ✅",
            token,
            user: {
            id: user._id,
            role: "user",
            },
    });
    }
    catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Internal Server Error'
        res.status(500).json({ message: "Server error", error: errorMessage });
    }  
};
