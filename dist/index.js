"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_session_1 = __importDefault(require("express-session"));
const routes_index_js_1 = __importDefault(require("./app/routes/routes.index.js"));
const auth_service_js_1 = require("./app/modules/auth/auth.service.js");
dotenv_1.default.config();
const app = (0, express_1.default)();
// middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// Initialize strategies
(0, auth_service_js_1.googleStrategy)();
(0, auth_service_js_1.facebookStrategy)();
// Express session
app.use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}));
// Passport middleware
app.use(auth_service_js_1.passport.initialize());
app.use(auth_service_js_1.passport.session());
app.get("/", (req, res) => {
    res.send("Hello from CRUD API Server!!");
});
// main route
app.use("/api", routes_index_js_1.default);
// 404 Error Handler
app.use((req, res) => {
    res.status(404).json({ message: "Page not found" });
});
// database connection
mongoose_1.default
    .connect("mongodb+srv://rakin992raj:Xgm5spmXDp6k8TwH@backenddb.t5nuxlz.mongodb.net/CRUD-API?retryWrites=true&w=majority&appName=BackendDB")
    .then(() => {
    console.log("Connected to database!");
    app.listen(3000, () => {
        console.log("Server is running on port 3000");
    });
})
    .catch(() => {
    console.log("Connection failed!");
});
