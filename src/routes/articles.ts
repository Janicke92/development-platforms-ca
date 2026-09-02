import { Router } from "express";
import { pool } from "../database";
import type { Article } from "../interfaces";

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

export default router;
