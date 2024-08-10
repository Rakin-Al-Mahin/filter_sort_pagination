"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// Dashboard route (protected)
router.get("/", (req, res) => {
    const user = req.user; // Adjust type according to your user object
    res.send(`Welcome to the dashboard, ${user.name}!`);
});
exports.default = router;
