import { Router } from "express";
import { pool } from "../database.js";
import type { Article } from "../interfaces.js";
import { authenticateToken } from "../middleware/auth-validation.js";
import { validateArticle } from "../middleware/article-validation.js";

const router = Router();

router.get("/", async (req, res) => {
    try {
        const [rows] = await pool.execute("SELECT * FROM articles");

        const articles = rows as Article[];

        res.json(articles);
    } catch (error) {
        console.error("Database query error:", error);

        res.status(500).json({
            error: "Failed to fetch articles",
        });
    }
});

router.post("/", authenticateToken, validateArticle, async (req, res) => {
    try {
        const { title, body, category } = req.body;
        const submittedBy = req.user!.id;

        await pool.execute(
            `INSERT INTO articles (title, body, category, submitted_by)
            VALUES (?, ?, ?, ?)`,
            [title, body, category, submittedBy],
        );

        res.status(201).json({
            message: "Article created successfully",
        });
    } catch (error) {
        console.error("Error creating article:", error);

        res.status(500).json({
            error: "Failed to create article",
        });
    }
});

export default router;
