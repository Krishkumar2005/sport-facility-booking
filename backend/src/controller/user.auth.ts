import { prisma } from "../lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";


export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role = 'user' } = req.body;
    if (email === process.env.ADMIN_EMAIL) {
    return res.status(400).json({ error: "Admin cannot be registered" });
  }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: "user already exist" })
    }

    const hashed = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({ data: { name, email, password: hashed, role } });
    return res.json({ email: user.email, role: user.role });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// export const login = async (req: Request, res: Response) => {
//   const { email, password } = req.body;
//   const user = await prisma.user.findUnique({ where: { email } });
//   if (!user) return res.status(400).json({ error: "Invalid credentials" });

//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

//   const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: "7d" });

//   // Set HttpOnly cookie
//   res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production" });
//   res.json({ message: "Logged in", user: { id: user.id, email: user.email, role: user.role } });
// };

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
  
    // --- ADMIN LOGIN ---
    if (email === process.env.ADMIN_EMAIL) {
      console.log(email, process.env.ADMIN_EMAIL);
      if (password !== process.env.ADMIN_PASSWORD) {
        console.log(password, process.env.ADMIN_PASSWORD);
        return res.status(400).json({ error: "Invalid credentials" });
      }
  
      // Create admin token
      const token = jwt.sign(
        { id: 0, role: "admin" }, // admin doesn't need DB ID
        process.env.JWT_SECRET!,
        { expiresIn: "7d" }
      );
  
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      });
  
      return res.json({
        message: "Admin logged in",
        user: { email, role: "admin" }
      });
    }
  
    // --- NORMAL USER LOGIN ---
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });
  
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });
  
    const token = jwt.sign(
      { id: user.id, role: "user" },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );
  
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
  
    res.json({
      message: "User logged in",
      user: { id: user.id, email: user.email, role: "user" }
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};


export const logout = (req: Request, res: Response) => {
  try {
    res.clearCookie("token");
    res.json({ message: "Logged out" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
