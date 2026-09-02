import { z } from "zod";
import type { Request, Response, NextFunction } from "express";

export const registerSchema = z.object({
    email: z.email("Email must be a valid email"),
    password: z
        .string()
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
            "Password must be at least 8 characters long and include uppercase, lowercase, number, and a special character",
        ),
});

export const loginSchema = z.object({
    email: z.email("Email must be a valid email"),
    password: z.string(),
});

export const validateRegistration = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const result = registerSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            error: "Validation failed",
            details: result.error.issues.map((issue) => issue.message),
        });
    }

    next();
};

export const validateLogin = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const result = loginSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            error: "Validation failed",
            details: result.error.issues.map((issue) => issue.message),
        });
    }

    next();
};
