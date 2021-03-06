"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const products_1 = __importDefault(require("./handlers/products"));
const users_1 = __importDefault(require("./handlers/users"));
const orders_1 = __importDefault(require("./handlers/orders"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const address = '0.0.0.0:3000';
const jsonParser = body_parser_1.default.json();
app.use(jsonParser);
app.use((0, cors_1.default)());
app.get('/', function (req, res) {
    res.send('Hello World!');
});
(0, products_1.default)(app);
(0, users_1.default)(app);
(0, orders_1.default)(app);
app.listen(3000, function () {
    console.log(`starting app on: ${address}`);
});
exports.default = app;
