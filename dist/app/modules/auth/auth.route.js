"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controllers_js_1 = require("./auth.controllers.js");
const passport_1 = __importDefault(require("passport"));
const router = express_1.default.Router();
// const { authenticate } = require("../../middlewares/auth.middleware");
router.post("/signup", auth_controllers_js_1.signup);
router.post("/login", auth_controllers_js_1.login);
// Google OAuth routes
router.get("/google", passport_1.default.authenticate("google", { scope: ["profile", "email"] }));
router.get("/google/callback", auth_controllers_js_1.googleCallback);
// Facebook OAuth routes
router.get("/facebook", passport_1.default.authenticate("facebook", { scope: ["email"] }));
router.get("/facebook/callback", auth_controllers_js_1.facebookCallback);
exports.default = router;
