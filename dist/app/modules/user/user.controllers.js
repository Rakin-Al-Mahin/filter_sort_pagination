"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserRole = void 0;
const user_service_js_1 = require("./user.service.js");
// Update user role
const updateUserRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { role } = req.body;
        // Ensure role is of type "user" or "admin"
        if (role !== "user" && role !== "admin") {
            res.status(400).json({ message: "Invalid role" });
            return;
        }
        const result = yield (0, user_service_js_1.updateUserRoleService)(id, role);
        res.status(200).json(result);
    }
    catch (error) {
        // Use 'any' type for error to handle cases where the error type is unknown
        if (error.message === "User not found") {
            res.status(404).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: error.message });
        }
    }
});
exports.updateUserRole = updateUserRole;
