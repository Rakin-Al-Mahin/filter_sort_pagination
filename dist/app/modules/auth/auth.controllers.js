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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.facebookCallback = exports.googleCallback = exports.login = exports.signup = void 0;
const auth_service_js_1 = require("./auth.service.js");
const passport_1 = __importDefault(require("passport"));
// Sign up a user
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, role } = req.body;
        const result = yield (0, auth_service_js_1.signupService)(name, email, password, role);
        res.status(201).json(result);
    }
    catch (error) {
        if (error instanceof Error && error.message === "Email already in use") {
            res.status(400).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: "An unexpected error occurred." });
        }
    }
});
exports.signup = signup;
// Login a user
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const result = yield (0, auth_service_js_1.loginService)(email, password);
        res.status(200).json(result);
    }
    catch (error) {
        if (error instanceof Error &&
            error.message === "Invalid email or password") {
            res.status(400).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: "An unexpected error occurred." });
        }
    }
});
exports.login = login;
// Google login callback
const googleCallback = passport_1.default.authenticate("google", {
    failureRedirect: "/api/login",
    successRedirect: "/api/dashboard",
});
exports.googleCallback = googleCallback;
// Facebook login callback
const facebookCallback = passport_1.default.authenticate("facebook", {
    failureRedirect: "/api/login",
    successRedirect: "/api/dashboard",
});
exports.facebookCallback = facebookCallback;
