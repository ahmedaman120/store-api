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
const auth_middleware_1 = require("../../middlewares/auth_middleware");
const order_1 = __importDefault(require("../../models/M_orders/order"));
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = req.body;
        const orderStore = new order_1.default();
        const retOrder = yield orderStore.create(order);
        res.json(retOrder);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
// const destroy = async (req: Request, res: Response) => {
//   const deleted = {} //await store.delete(req.body.id)
//   res.json(deleted)
// }
const getUserOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderStore = new order_1.default();
        res.json({
            response: yield orderStore.getCurrentOrder(req.params.id),
        });
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
});
const order_handler = (app) => {
    app.post('/orders', auth_middleware_1.checkTocken, create);
    // app.delete('/orders', checkTocken, destroy)
    app.get('/orders/user/:id', auth_middleware_1.checkTocken, getUserOrder);
};
exports.default = order_handler;
