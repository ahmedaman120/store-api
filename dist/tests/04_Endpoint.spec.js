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
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
const user_1 = __importDefault(require("../models/M_users/user"));
const data_1 = require("./data/data");
const product_1 = __importDefault(require("../models/M_product/product"));
const order_1 = __importDefault(require("../models/M_orders/order"));
let user;
let accessToken;
const userModel = new user_1.default();
const productModel = new product_1.default();
const orderModel = new order_1.default();
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    const req = (0, supertest_1.default)(server_1.default);
    const res = yield req.post('/users').send({
        fname: 'test1',
        lname: 'test',
        password: 'test',
    });
    user = res.body.user;
    accessToken = res.body.j;
    console.log(accessToken);
}));
describe('Test User authentication and verification', () => {
    it('test sign up user by use /users with post request', () => __awaiter(void 0, void 0, void 0, function* () {
        const req = (0, supertest_1.default)(server_1.default);
        const res = yield req.post('/users').send({
            fname: data_1.users[2].first_name,
            lname: data_1.users[2].last_name,
            password: data_1.users[2].password,
        });
        expect(res.statusCode).toBe(200);
    }));
    it('test login user by use /users/login with post request', () => __awaiter(void 0, void 0, void 0, function* () {
        const req = (0, supertest_1.default)(server_1.default);
        const res = yield req.post('/users/login').send({
            fname: data_1.users[2].first_name,
            lname: data_1.users[2].last_name,
            password: data_1.users[2].password,
        });
        expect(res.statusCode).toBe(200);
    }));
    it('test login user by use /users/login with post request but user not exists', () => __awaiter(void 0, void 0, void 0, function* () {
        const req = (0, supertest_1.default)(server_1.default);
        const response = yield req.post('/users/login').send({
            fname: data_1.users[3].first_name,
            lname: data_1.users[3].last_name,
            password: data_1.users[3].password,
        });
        expect(response.statusCode).toBe(400);
    }));
    it('test login user by use /users/login with post request but user wrong password', () => __awaiter(void 0, void 0, void 0, function* () {
        const req = (0, supertest_1.default)(server_1.default);
        const response = yield req.post('/users/login').send({
            fname: data_1.users[0].first_name,
            lname: data_1.users[0].last_name,
            password: '4489494',
        });
        expect(response.statusCode).toBe(400);
    }));
    it('test login user by use /users/login with post request and responsed by jwt token', () => __awaiter(void 0, void 0, void 0, function* () {
        const req = (0, supertest_1.default)(server_1.default);
        const res = yield req.post('/users/login').send({
            fname: data_1.users[2].first_name,
            lname: data_1.users[2].last_name,
            password: data_1.users[2].password,
        });
        expect(res.text.match(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/)).toBeTruthy();
    }));
    it('test show user by use /users/:id with get request to check jwt check', () => __awaiter(void 0, void 0, void 0, function* () {
        const req = (0, supertest_1.default)(server_1.default);
        const response = yield req
            .get('/users/1')
            .set('Authorization', 'Bearer ' + accessToken);
        expect(response.status == 200).toBeTruthy();
    }));
    it('test show user by use /users/:id with get request to check jwt wrong check', () => __awaiter(void 0, void 0, void 0, function* () {
        const req = (0, supertest_1.default)(server_1.default);
        const response = yield req
            .get('/users/1')
            .set('Authorization', 'Bearer ' + accessToken + 'as');
        expect(response.status == 401).toBeTruthy();
    }));
});
