"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controllers_js_1 = require("../user/user.controllers.js");
const auth_middleware_js_1 = require("../../middlewares/auth.middleware.js");
const router = express_1.default.Router();
// Update user role (admin only)
router.put("/:id/role", auth_middleware_js_1.authenticate, auth_middleware_js_1.authorizeAdmin, user_controllers_js_1.updateUserRole);
exports.default = router;
