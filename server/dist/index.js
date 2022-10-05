"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const router_1 = require("./router/router");
dotenv_1.default.config({
    path: '.env'
});
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3030;
app.use(router_1.router);
app.listen(PORT, () => {
    return console.log(`[server]: Server is running on ${PORT}`);
});
