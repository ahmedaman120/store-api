"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = __importDefault(require("../../models/M_product/product"));
const index = async (_req, res) => {
    const p = new product_1.default();
    const products = await p.index();
    res.json(products);
};
const show = async (_req, res) => {
    const id = _req.params.id;
    const p = new product_1.default();
    const product = await p.show(id);
    res.json(product);
};
const create = async (req, res) => {
    try {
        console.log(req.body);
        const product = {
            name: req.body.name,
            price: req.body.price,
        };
        const p = new product_1.default();
        const ret = await p.create(product);
        res.json(ret[0]);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const destroy = async (req, res) => {
    try {
        const p = new product_1.default();
        const id = req.params.id;
        const deleted = await p.destroy(id); //await store.delete(req.body.id)
        res.json({ 'deleted-Row': deleted, msg: 'delete success' });
    }
    catch (err) {
        res.json({ error: 'bad request check your arguments' }).status(400);
    }
};
const product_handler = (app) => {
    app.get('/products', index);
    app.get('/products/:id', show);
    app.post('/products', create);
    app.delete('/products/:id', destroy);
};
exports.default = product_handler;
