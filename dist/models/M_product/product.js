"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connector_1 = __importDefault(require("../../connector"));
class ProductStore {
    async index() {
        try {
            const conn = connector_1.default.connect();
            const sql = 'select * from products';
            const result = await (await conn).query(sql);
            (await conn).release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Cannot get products ${err}`);
        }
    }
    //get specific id
    async show(id) {
        try {
            const conn = connector_1.default.connect();
            const sql = 'select * from products where id = $1';
            const result = await (await conn).query(sql, [id]);
            (await conn).release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Cannot get this ${id} book  ${err}`);
        }
    }
    async create(p) {
        const conn = connector_1.default.connect();
        const sql = 'insert into products(name,price) values ($1,$2)  RETURNING *';
        const result = await (await conn).query(sql, [p.name, p.price]);
        const product = result.rows;
        (await conn).release();
        // eslint-disable-next-line no-constant-condition
        return product;
    }
    async destroy(id) {
        try {
            const conn = connector_1.default.connect();
            const sql = 'DELETE FROM products WHERE id= $1 RETURNING *';
            const result = await (await conn).query(sql, [id]);
            const product = result.rows;
            (await conn).release();
            // eslint-disable-next-line no-constant-condition
            return product;
        }
        catch (err) {
            throw new Error(`Cannot get this ${id} product  ${err}`);
        }
    }
}
exports.default = ProductStore;
