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
const order_1 = __importDefault(require("../models/M_orders/order"));
const product_1 = __importDefault(require("../models/M_product/product"));
const data_1 = require("./data/data");
const orderStore = new order_1.default();
const productStore = new product_1.default();
let created_ord;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    const product = data_1.products[1];
    try {
        const p_json = yield productStore.create(product);
        const ord = data_1.order[0];
        const orderStore = new order_1.default();
        created_ord = yield orderStore.create(ord);
    }
    catch (error) {
        console.log(error);
    }
}));
describe('Check Functions in order model', () => {
    it('Test index function is existance', () => {
        expect(orderStore.create).toBeDefined();
    });
    it('Test get current order function is existance', () => {
        expect(orderStore.getCurrentOrder).toBeDefined();
    });
});
describe('Check performance of functions', () => {
    it('check getting order for user with id 1', () => __awaiter(void 0, void 0, void 0, function* () {
        const orders = yield orderStore.getCurrentOrder(data_1.order[0].user_id);
        expect(orders.userInfo == 1).toBeTruthy();
    }));
    it('check create order with product not in our list', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const orders = yield orderStore.create(data_1.order[1]);
        }
        catch (err) {
            // console.log(err.message)
            expect(err.message).toEqual('Cannot add this order');
        }
    }));
});
