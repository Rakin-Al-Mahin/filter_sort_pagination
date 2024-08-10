import express, { Request, Response } from "express";
const router = express.Router();

// Dashboard route (protected)
router.get("/", (req: Request, res: Response) => {
  const user = req.user as { name: string }; // Adjust type according to your user object
  res.send(`Welcome to the dashboard, ${user.name}!`);
});

export default router;
