import { Router } from "express";
import bcrypt from "bcrypt";
import type { ResultSetHeader } from "mysql2";

import { pool } from "../database.js";
import {
    validateRegistration,
    validateLogin,
} from "../middleware/auth-validation.js";
import { generateToken } from "../utils/jwt.js";
import type { User } from "../interfaces.js";

const router = Router();

router.post("/register", validateRegistration, async (req, res) => {
    try {
        const { email, password } = req.body;

        const [rows] = await pool.execute(
            "SELECT id FROM users WHERE email = ?",
            [email],
        );

        const existingUsers = rows as User[];

        if (existingUsers.length > 0) {
            return res.status(409).json({
                error: "User with this email already exists",
            });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const [result] = await pool.execute<ResultSetHeader>(
            "INSERT INTO users (email, password_hash) VALUES (?, ?)",
            [email, hashedPassword],
        );

        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: result.insertId,
                email,
            },
        });
    } catch (error) {
        console.error("Registration error:", error);

        res.status(500).json({
            error: "Failed to register user",
        });
    }
});

router.post("/login", validateLogin, async (req, res) => {
    try {
        const { email, password } = req.body;

        const [rows] = await pool.execute(
            "SELECT id, email, password_hash FROM users WHERE email = ?",
            [email],
        );

        const users = rows as User[];
        const user = users[0];

        if (!user) {
            return res.status(401).json({
                error: "Invalid email or password",
            });
        }

        const validPassword = await bcrypt.compare(
            password,
            user.password_hash,
        );

        if (!validPassword) {
            return res.status(401).json({
                error: "Invalid email or password",
            });
        }

        const token = generateToken(user.id);

        res.json({
            message: "Login successful",
            user: {
                id: user.id,
                email: user.email,
            },
            token,
        });
    } catch (error) {
        console.error("Login error:", error);

        res.status(500).json({
            error: "Failed to log in",
        });
    }
});

export default router;
