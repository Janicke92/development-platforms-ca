import { Router } from "express";

const router = Router();

router.post("/register", (req, res) => {
    const { email, password } = req.body;

    res.json(req.body);
});

export default router;
