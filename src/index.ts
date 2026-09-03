import express from "express";
import type { Request, Response, NextFunction } from "express";
import authRouter from "./routes/auth.js";
import dotenv from "dotenv";
import articlesRouter from "./routes/articles.js";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());

app.use(express.json());

app.use("/auth", authRouter);

app.use("/articles", articlesRouter);

app.use((req, res) => {
    res.status(404).json({
        error: "Route not found",
        message: `Cannot ${req.method} ${req.originalUrl}`,
    });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error("Error occurred:", err.message);

    res.status(500).json({
        error: "Internal server error",
        message:
            process.env.NODE_ENV === "development"
                ? err.message
                : "Something went wrong",
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
