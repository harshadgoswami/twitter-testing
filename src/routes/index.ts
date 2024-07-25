import { Router, Request, Response } from "express";

const router = Router();

// Example route
router.get("/", (req: Request, res: Response) => {
    res.send("Hello, world!");
});

router.get("/data", (req: Request, res: Response) => {
    res.json({ message: "Hello, from the data endpoint!" });
});

export default router;