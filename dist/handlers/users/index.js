"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../../models/M_users/user"));
const dotenv_1 = __importDefault(require("dotenv"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const index = async (_req, res) => {
    const userStore = new user_1.default();
    const users = userStore.index();
    res.json(users);
};
const show = async (_req, res) => {
    const user = new user_1.default().show(_req.params.id);
    res.json(user);
};
const create = async (req, res) => {
    try {
        console.log(req.body);
        const userStore = new user_1.default();
        const user = {
            first_name: req.body.fname,
            last_name: req.body.lname,
            password: req.body.password,
        };
        const newUser = await userStore.create(user); //await call to model
        const tocken = jsonwebtoken_1.default.sign(newUser[0], process.env.JWT_TOKEN);
        res.json({ j: tocken });
    }
    catch (err) {
        res.status(500).json(err);
    }
};
const destroy = async (req, res) => {
    const deleted = new user_1.default().destroy(req.body.id); //await store.delete(req.body.id)
    res.json({ deleted: deleted, flag: 'delete' });
};
const login = async (req, res) => {
    try {
        const userStore = new user_1.default();
        const { fname, lname, password } = req.body;
        const authedUser = await userStore.authenticate(fname, lname);
        console.log(authedUser);
        if (authedUser) {
            const result = bcrypt_1.default.compareSync(password + process.env.BCRYPT_PASSWORD, authedUser.password);
            if (result) {
                authedUser.password = '';
                const tocken = jsonwebtoken_1.default.sign({ fnam: authedUser.first_name, lname: authedUser.last_name }, process.env.JWT_TOKEN);
                res.status(200).send(tocken);
            }
            else {
                res.status(200).send('the coordinates are wrong');
            }
        }
        else {
            res.status(200).send('the coordinates are wrong');
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
};
const user_handler = (app) => {
    app.get('/users', index);
    app.get('/users/:id', show);
    app.post('/users', create);
    app.post('/users/login', login);
    app.delete('/users', destroy);
};
exports.default = user_handler;
