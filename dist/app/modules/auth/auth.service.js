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
exports.passport = exports.facebookStrategy = exports.googleStrategy = exports.loginService = exports.signupService = void 0;
const user_model_js_1 = __importDefault(require("../user/user.model.js"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const passport_1 = __importDefault(require("passport"));
exports.passport = passport_1.default;
const passport_google_oauth20_1 = require("passport-google-oauth20");
const passport_facebook_1 = require("passport-facebook");
dotenv_1.default.config();
const JWT_TOKEN = process.env.JWT_SECRET;
// Generate a token
const generateToken = (user) => {
    return jsonwebtoken_1.default.sign({
        id: user._id,
        role: user.role,
    }, JWT_TOKEN, { expiresIn: "1h" });
};
// Service to handle user signup
const signupService = (name_1, email_1, password_1, role_1, ...args_1) => __awaiter(void 0, [name_1, email_1, password_1, role_1, ...args_1], void 0, function* (name, email, password, role, googleId = null, facebookId = null) {
    const existingUser = yield user_model_js_1.default.findOne({ email });
    if (existingUser) {
        throw new Error("Email already in use");
    }
    let hashedPassword = null;
    if (password) {
        hashedPassword = yield bcrypt_1.default.hash(password, 10);
    }
    const user = new user_model_js_1.default({
        name,
        email,
        password: hashedPassword,
        role,
        googleId,
        facebookId,
    });
    yield user.save();
    return { message: "User created successfully" };
});
exports.signupService = signupService;
// Service to handle user login
const loginService = (email_1, ...args_1) => __awaiter(void 0, [email_1, ...args_1], void 0, function* (email, password = null) {
    const user = yield user_model_js_1.default.findOne({ email });
    if (!user) {
        throw new Error("Invalid email or password");
    }
    if (password) {
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            throw new Error("Invalid email or password");
        }
    }
    const token = generateToken(user);
    return { token, message: `Login successful! Welcome ${user.name}` };
});
exports.loginService = loginService;
// Google signup/signin
const googleStrategy = () => {
    passport_1.default.use(new passport_google_oauth20_1.Strategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "https://filter-sort-pagination.vercel.app/api/auth/google/callback",
        // callbackURL: "http://localhost:3000/api/auth/google/callback",
    }, (accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c, _d;
        try {
            let user = yield user_model_js_1.default.findOne({ email: (_a = profile.emails) === null || _a === void 0 ? void 0 : _a[0].value });
            if (!user) {
                yield signupService(profile.displayName, (_b = profile.emails) === null || _b === void 0 ? void 0 : _b[0].value, null, "user", profile.id, null);
                user = yield user_model_js_1.default.findOne({ email: (_c = profile.emails) === null || _c === void 0 ? void 0 : _c[0].value });
            }
            const { token, message } = yield loginService((_d = profile.emails) === null || _d === void 0 ? void 0 : _d[0].value, null);
            done(null, { user, token, message });
        }
        catch (err) {
            done(err, false, err.message);
        }
    })));
};
exports.googleStrategy = googleStrategy;
// Facebook signup/signin
const facebookStrategy = () => {
    passport_1.default.use(new passport_facebook_1.Strategy({
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: "https://filter-sort-pagination.vercel.app/api/auth/facebook/callback",
        // callbackURL: "http://localhost:3000/api/auth/facebook/callback",
        profileFields: ["id", "emails", "name"],
    }, (accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e, _f;
        try {
            let user = yield user_model_js_1.default.findOne({ email: (_a = profile.emails) === null || _a === void 0 ? void 0 : _a[0].value });
            if (!user) {
                yield signupService(`${(_b = profile.name) === null || _b === void 0 ? void 0 : _b.givenName} ${(_c = profile.name) === null || _c === void 0 ? void 0 : _c.familyName}`, (_d = profile.emails) === null || _d === void 0 ? void 0 : _d[0].value, null, "user", null, profile.id);
                user = yield user_model_js_1.default.findOne({ email: (_e = profile.emails) === null || _e === void 0 ? void 0 : _e[0].value });
            }
            const { token, message } = yield loginService((_f = profile.emails) === null || _f === void 0 ? void 0 : _f[0].value, null);
            done(null, { user, token, message });
        }
        catch (err) {
            done(err, false, err.message);
        }
    })));
};
exports.facebookStrategy = facebookStrategy;
// Serialize user
passport_1.default.serializeUser((userObj, done) => {
    if (userObj && userObj.user) {
        done(null, userObj.user._id);
    }
    else if (userObj && userObj._id) {
        done(null, userObj._id);
    }
    else {
        done(new Error("No user object or ID found"), null);
    }
});
// Deserialize user
passport_1.default.deserializeUser((id, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_js_1.default.findById(id);
        done(null, user);
    }
    catch (error) {
        done(error, null);
    }
}));
