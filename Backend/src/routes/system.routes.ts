import { Router } from "express";

const router = Router();

router.get("/health", (req, res) => {
    res.status(200).json({ message: "OK" });
});

router.get("/dashboard", (req, res) => {
    res.status(200).json({ message: "Dashboard" });
});

export default router;