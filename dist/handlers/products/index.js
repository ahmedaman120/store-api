"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = __importDefault(require("../../models/M_product/product"));
const auth_middleware_1 = require("../../middlewares/auth_middleware");
const index = async (_req, res) => {
    const p = new product_1.default();
    const products = await p.index();
    res.json(products);
};
const show = async (_req, res) => {
    console.log(_req.params);
    const id = _req.params.id;
    const p = new product_1.default();
    try {
        const product = await p.show(id);
        console.log('test', product);
        res.json(product);
    }
    catch (err) {
        console.log(err);
    }
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
    app.get('/products/:id', [auth_middleware_1.checkTocken], show);
    app.post('/products', auth_middleware_1.checkTocken, create);
    app.delete('/products/:id', auth_middleware_1.checkTocken, destroy);
};
exports.default = product_handler;
