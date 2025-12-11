"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.register = void 0;
const prisma_1 = require("../lib/prisma");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, role = 'user' } = req.body;
        if (email === process.env.ADMIN_EMAIL) {
            return res.status(400).json({ error: "Admin cannot be registered" });
        }
        const existingUser = yield prisma_1.prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ message: "user already exist" });
        }
        const hashed = yield bcrypt_1.default.hash(password, 12);
        const user = yield prisma_1.prisma.user.create({ data: { name, email, password: hashed, role } });
        return res.json({ email: user.email, role: user.role });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.register = register;
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
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
            const token = jsonwebtoken_1.default.sign({ id: 0, role: "admin" }, // admin doesn't need DB ID
            process.env.JWT_SECRET, { expiresIn: "7d" });
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
        const user = yield prisma_1.prisma.user.findUnique({ where: { email } });
        if (!user)
            return res.status(400).json({ error: "Invalid credentials" });
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({ error: "Invalid credentials" });
        const token = jsonwebtoken_1.default.sign({ id: user.id, role: "user" }, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
        });
        res.json({
            message: "User logged in",
            user: { id: user.id, email: user.email, role: "user" }
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.login = login;
const logout = (req, res) => {
    try {
        res.clearCookie("token");
        res.json({ message: "Logged out" });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.logout = logout;
