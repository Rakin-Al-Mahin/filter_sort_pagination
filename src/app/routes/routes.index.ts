import express, { Request, Response } from "express";
import authRoute from "../modules/auth/auth.route.js";
import userRoute from "../modules/user/user.route.js";
import servicesRoute from "../modules/services/services.route.js";
import dashboardRoute from "../modules/dashboard/dashboard.route.js";
import { socialAuthenticated } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Define routes
router.use("/auth", authRoute);
router.use("/users", userRoute);
router.use("/products", servicesRoute);
router.use("/dashboard", socialAuthenticated, dashboardRoute);

router.get("/login", (req: Request, res: Response) => {
  res.send("Social login failed!!");
});

export default router;
