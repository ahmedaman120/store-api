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
const user_1 = __importDefault(require("../../models/M_users/user"));
const dotenv_1 = __importDefault(require("dotenv"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_middleware_1 = require("../../middlewares/auth_middleware");
dotenv_1.default.config();
const index = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userStore = new user_1.default();
    const users = yield userStore.index();
    res.json(users);
});
const show = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new user_1.default();
    const result = yield user.show(_req.params.id);
    res.json(result);
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userStore = new user_1.default();
        const user = {
            first_name: req.body.fname,
            last_name: req.body.lname,
            password: req.body.password,
        };
        const newUser = yield userStore.create(user); //await call to model
        const tocken = jsonwebtoken_1.default.sign(newUser[0], process.env.JWT_TOKEN);
        res.json({ j: tocken });
    }
    catch (err) {
        res.status(500).json(err);
    }
});
const destroy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deleted = new user_1.default().destroy(req.body.id); //await store.delete(req.body.id)
    res.json({ deleted: deleted, flag: 'delete' });
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userStore = new user_1.default();
        const { fname, lname, password } = req.body;
        const authedUser = yield userStore.authenticate(fname, lname);
        // console.log(authedUser)
        if (authedUser.password) {
            const result = bcrypt_1.default.compareSync(password + process.env.BCRYPT_PASSWORD, authedUser.password);
            if (result) {
                authedUser.password = '';
                const tocken = jsonwebtoken_1.default.sign({ fnam: authedUser.first_name, lname: authedUser.last_name }, process.env.JWT_TOKEN);
                res.status(200).send(tocken);
            }
            else {
                res.status(400).send('the coordinates are wrong');
            }
        }
        else {
            res.status(500).send('the coordinates are wrong');
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
});
const user_handler = (app) => {
    app.get('/users', auth_middleware_1.checkTocken, index);
    app.get('/users/:id', auth_middleware_1.checkTocken, show);
    app.post('/users', create);
    app.post('/users/login', login);
    app.delete('/users', auth_middleware_1.checkTocken, destroy);
};
exports.default = user_handler;
