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
const connector_1 = __importDefault(require("../../connector"));
class ProductStore {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = connector_1.default.connect();
                const sql = 'select * from products';
                const result = yield (yield conn).query(sql);
                (yield conn).release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`Cannot get products ${err}`);
            }
        });
    }
    //get specific id
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = connector_1.default.connect();
                const sql = 'select * from products where id = $1';
                const result = yield (yield conn).query(sql, [id]);
                (yield conn).release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`Cannot get this ${id} book  ${err}`);
            }
        });
    }
    create(p) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = connector_1.default.connect();
            const sql = 'insert into products(name,price) values ($1,$2)  RETURNING *';
            const result = yield (yield conn).query(sql, [p.name, p.price]);
            const product = result.rows;
            (yield conn).release();
            // eslint-disable-next-line no-constant-condition
            return product;
        });
    }
    destroy(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = connector_1.default.connect();
                const sql = 'DELETE FROM products WHERE id= $1 RETURNING *';
                const result = yield (yield conn).query(sql, [id]);
                const product = result.rows;
                (yield conn).release();
                // eslint-disable-next-line no-constant-condition
                return product;
            }
            catch (err) {
                throw new Error(`Cannot get this ${id} product  ${err}`);
            }
        });
    }
}
exports.default = ProductStore;
