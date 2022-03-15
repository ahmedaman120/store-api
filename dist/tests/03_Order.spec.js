"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = __importDefault(require("../models/M_orders/order"));
const orderStore = new order_1.default();
describe('Check Functions in product model', () => {
    it('Test index function is existance', () => {
        expect(orderStore.create).toBeDefined();
    });
    it('Test get current order function is existance', () => {
        expect(orderStore.getCurrentOrder).toBeDefined();
    });
});
