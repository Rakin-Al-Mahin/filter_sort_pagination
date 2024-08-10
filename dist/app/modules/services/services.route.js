"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const services_controllers_js_1 = require("./services.controllers.js");
const auth_middleware_js_1 = require("../../middlewares/auth.middleware.js");
const router = express_1.default.Router();
// Create a product (admin only)
router.post("/", auth_middleware_js_1.authenticate, auth_middleware_js_1.authorizeAdmin, services_controllers_js_1.createProduct);
// Get all products
router.get("/", services_controllers_js_1.getProducts);
// Get a product by ID
router.get("/:id", services_controllers_js_1.getProduct);
// Update a product (admin only)
router.put("/:id", auth_middleware_js_1.authenticate, auth_middleware_js_1.authorizeAdmin, services_controllers_js_1.updateProduct);
// Delete a product (admin only)
router.delete("/:id", auth_middleware_js_1.authenticate, auth_middleware_js_1.authorizeAdmin, services_controllers_js_1.deleteProduct);
exports.default = router;
