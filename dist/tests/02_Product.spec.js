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
const product_1 = __importDefault(require("../models/M_product/product"));
const data_1 = require("./data/data");
const productStore = new product_1.default();
describe('Check Functions in product model', () => {
    it('Test index function is existance', () => {
        expect(productStore.index).toBeDefined();
    });
    it('Test create function is existance', () => {
        expect(productStore.create).toBeDefined();
    });
    it('Test destroy function is existance', () => {
        expect(productStore.destroy).toBeDefined();
    });
    it('Test show function is existance', () => {
        expect(productStore.show).toBeDefined();
    });
});
describe('Check Functions performance on product Model', () => {
    it('Test create product', () => __awaiter(void 0, void 0, void 0, function* () {
        const product = data_1.products[0];
        try {
            const p_json = yield productStore.create(product);
            expect(JSON.stringify({ name: p_json[0].name })).toEqual(JSON.stringify({
                name: product.name,
            }));
        }
        catch (error) {
            console.log(error);
        }
    }));
    it('Test create another product', () => __awaiter(void 0, void 0, void 0, function* () {
        const product = data_1.products[3];
        try {
            const p_json = yield productStore.create(product);
            expect(JSON.stringify({ name: p_json[0].name })).toEqual(JSON.stringify({
                name: product.name,
            }));
        }
        catch (error) {
            console.log(error);
        }
    }));
    it('test show product', () => __awaiter(void 0, void 0, void 0, function* () {
        const product = data_1.products[1];
        try {
            const p_json = yield productStore.show(2);
            expect(JSON.stringify({ name: p_json[0].name })).toEqual(JSON.stringify({
                name: product.name,
            }));
        }
        catch (error) {
            console.log(error);
        }
    }));
});
