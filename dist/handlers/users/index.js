"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index = async (_req, res) => {
    const users = [{
            first_name: 'ahmed',
            last_name: 'ayman',
            password: 'sakdnlsd',
        }];
    res.json(users);
};
const show = async (_req, res) => {
    const user = {
        first_name: 'ahmed',
        last_name: 'ayman',
        password: 'sakdnlsd',
    };
    res.json(user);
};
const create = async (req, res) => {
    try {
        const user = {
        // - id
        // - id of each product in the order
        // - quantity of each product in the order
        // - user_id
        // - status of order (active or complete)
        };
        const newUser = {}; //async call to model
        res.json(newUser);
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
const user_handler = (app) => {
    app.get('/users', index);
    app.get('/users/:id', show);
    app.post('/users', create);
    app.delete('/users', destroy);
};
exports.default = user_handler;
