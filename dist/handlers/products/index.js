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
const product_1 = __importDefault(require("../../models/M_product/product"));
const auth_middleware_1 = require("../../middlewares/auth_middleware");
const index = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const p = new product_1.default();
        const products = yield p.index();
        res.json(products);
    }
    catch (err) {
        res.status(400);
        res.json(`bad request`);
    }
});
const show = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(_req.params);
    const id = _req.params.id;
    const p = new product_1.default();
    try {
        const product = yield p.show(id);
        console.log('test', product);
        res.json(product);
    }
    catch (err) {
        console.log(err);
    }
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        const product = {
            name: req.body.name,
            price: req.body.price,
        };
        const p = new product_1.default();
        const ret = yield p.create(product);
        res.json(ret[0]);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
const destroy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const p = new product_1.default();
        const id = req.params.id;
        const deleted = yield p.destroy(id); //await store.delete(req.body.id)
        res.json({ 'deleted-Row': deleted, msg: 'delete success' });
    }
    catch (err) {
        res.json({ error: 'bad request check your arguments' }).status(400);
    }
});
const product_handler = (app) => {
    app.get('/products', index);
    app.get('/products/:id', [auth_middleware_1.checkTocken], show);
    app.post('/products', auth_middleware_1.checkTocken, create);
    app.delete('/products/:id', auth_middleware_1.checkTocken, destroy);
};
exports.default = product_handler;
