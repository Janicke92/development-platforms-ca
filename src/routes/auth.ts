import { Router } from "express";
import { validateRegistration } from "../middleware/auth-validation.js";

const router = Router();

router.post("/register", validateRegistration, async (req, res) => {
    try {
        const { email, password } = req.body;

        res.json({
            email,
            password,
        });
    } catch (error) {
        console.error("Error:", error);

        res.status(500).json({
            error: "Failed to register user",
        });
    }
});

export default router;
