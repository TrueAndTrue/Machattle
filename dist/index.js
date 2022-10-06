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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const router_1 = require("./router/router");
const index_1 = require("./models/index");
dotenv_1.default.config({
    path: 'my.env'
});
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3030;
const NODE_ENV = process.env.NODE_ENV || 'development';
console.log(process.env.PORT);
app.use(express_1.default.static(path_1.default.join(__dirname, 'build')));
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, 'build', 'index.html'));
});
if (NODE_ENV == 'development')
    app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(router_1.router);
(function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        yield index_1.sequelize.sync();
        app.listen(PORT, () => {
            console.log(`App is listening on port ${PORT}`);
        });
    });
})();
