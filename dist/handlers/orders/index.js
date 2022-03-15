"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = __importDefault(require("../../models/M_orders/order"));
const create = async (req, res) => {
    try {
        const order = req.body;
        const orderStore = new order_1.default();
        const retOrder = await orderStore.create(order);
        res.json(retOrder);
    }
    catch (err) {
        res.status(400);
        console.log(err);
        res.json(err);
    }
};
const destroy = async (req, res) => {
    const deleted = {}; //await store.delete(req.body.id)
    res.json(deleted);
};
const getUserOrder = async (req, res) => {
    const orderStore = new order_1.default();
    console.log(req.params);
    res.json({
        response: await orderStore.getCurrentOrder(req.params.id),
    });
};
const order_handler = (app) => {
    app.post('/orders', create);
    app.delete('/orders', destroy);
    app.get('/orders/user/:id', getUserOrder);
};
exports.default = order_handler;
