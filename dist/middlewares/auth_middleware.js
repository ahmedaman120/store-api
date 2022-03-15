"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkTocken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const checkTocken = (req, res, next) => {
    try {
        const header = req.headers.authorization;
        const token = header ? header.split(' ')[1] : '';
        const userData = jsonwebtoken_1.default.verify(token, process.env.JWT_TOKEN);
        if (userData) {
            next();
        }
        else {
            res.status(401).json({
                error: 'please complete your information',
            });
        }
    }
    catch (err) {
        res.status(401).json({
            error: 'please complete your information',
        });
    }
};
exports.checkTocken = checkTocken;
