"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index = async (_req, res) => {
    const orders = {};
    res.json(orders);
};
const show = async (_req, res) => {
    const orders = {};
    res.json(orders);
};
const create = async (req, res) => {
    try {
        const order = {
        // - id
        // - id of each product in the order
        // - quantity of each product in the order
        // - user_id
        // - status of order (active or complete)
        };
        const newArticle = {};
        res.json({});
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const destroy = async (req, res) => {
    const deleted = {}; //await store.delete(req.body.id)
    res.json(deleted);
};
const order_handler = (app) => {
    app.get('/orders', index);
    app.get('/orders/:id', show);
    app.post('/orders', create);
    app.delete('/orders', destroy);
};
