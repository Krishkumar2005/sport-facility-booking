"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_js_1 = __importDefault(require("./routes/user.js"));
const pricing_js_1 = __importDefault(require("./routes/pricing.js"));
const bookings_js_1 = __importDefault(require("./routes/bookings.js"));
const admin_js_1 = __importDefault(require("./routes/admin.js"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
dotenv_1.default.config({ path: '../.env' });
app.use((0, cors_1.default)({
    origin: "*", // direct frontend ka url bhi de skte h like "http://localhost:5173"
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));
const port = process.env.PORT;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({
    extended: true
}));
app.use((0, cookie_parser_1.default)());
app.use('/api', user_js_1.default);
app.use('/api', admin_js_1.default);
app.use('/api', bookings_js_1.default);
app.use('/api', pricing_js_1.default);
app.listen(port, () => {
    console.log(`App is listening at ${port}`);
});
