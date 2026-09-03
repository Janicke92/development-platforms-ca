import { z } from "zod";
import type { Request, Response, NextFunction } from "express";

export const articleSchema = z.object({
    title: z.string().min(1, "Title is required"),
    body: z.string().min(1, "Body is required"),
    category: z.string().min(1, "Category is required"),
});

export const validateArticle = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const result = articleSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            error: "Validation failed",
            details: result.error.issues.map((issue) => issue.message),
        });
    }

    next();
};
