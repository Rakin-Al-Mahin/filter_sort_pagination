"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_js_1 = __importDefault(require("../modules/auth/auth.route.js"));
const user_route_js_1 = __importDefault(require("../modules/user/user.route.js"));
const services_route_js_1 = __importDefault(require("../modules/services/services.route.js"));
const dashboard_route_js_1 = __importDefault(require("../modules/dashboard/dashboard.route.js"));
const auth_middleware_js_1 = require("../middlewares/auth.middleware.js");
const router = express_1.default.Router();
// Define routes
router.use("/auth", auth_route_js_1.default);
router.use("/users", user_route_js_1.default);
router.use("/products", services_route_js_1.default);
router.use("/dashboard", auth_middleware_js_1.socialAuthenticated, dashboard_route_js_1.default);
router.get("/login", (req, res) => {
    res.send("Social login failed!!");
});
exports.default = router;
