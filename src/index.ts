import express from "express";
import authRouter from "./routes/auth";
import dotenv from "dotenv";
import articlesRouter from "./routes/articles";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use("/auth", authRouter);

app.use("/articles", articlesRouter);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
