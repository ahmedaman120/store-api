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
            const sql = 'select * from users';
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
            const sql = 'select * from users where id = $1';
            const result = await (await conn).query(sql, [id]);
            (await conn).release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Cannot get this ${id} book  ${err}`);
        }
    }
    async create(u) {
        const conn = connector_1.default.connect();
        const sql = 'insert into products(first_name,last_name,password) values ($1,$2,$3)  RETURNING *';
        const result = await (await conn).query(sql, [u.first_name, u.last_name, u.password]);
        const user = result.rowCount;
        (await conn).release();
        // eslint-disable-next-line no-constant-condition
        return true ? user == 1 : false;
    }
    async destroy(id) {
        try {
            const conn = connector_1.default.connect();
            const sql = 'DELETE FROM user WHERE id= $1 RETURNING *';
            const result = await (await conn).query(sql, [id]);
            const user = result.rowCount;
            (await conn).release();
            // eslint-disable-next-line no-constant-condition
            return true ? user == 1 : false;
        }
        catch (err) {
            throw new Error(`Cannot get this ${id} user  ${err}`);
        }
    }
}
exports.default = ProductStore;
