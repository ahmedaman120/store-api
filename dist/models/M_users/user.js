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
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserStore {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = connector_1.default.connect();
                const sql = 'select * from users';
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
                const sql = 'select * from users where id = $1';
                const result = yield (yield conn).query(sql, [id]);
                (yield conn).release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`Cannot get this ${id} book  ${err}`);
            }
        });
    }
    authenticate(firstname, lastname) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield connector_1.default.connect();
            const sql = 'select * from users where first_name=($1) and last_name=($2)';
            const user = yield conn.query(sql, [firstname, lastname]);
            return user.rows.length > 0 ? user.rows[0] : undefined;
        });
    }
    create(u) {
        return __awaiter(this, void 0, void 0, function* () {
            const salt = process.env.SALT_ROUNDS;
            const pass1 = process.env.BCRYPT_PASSWORD;
            const hash = bcrypt_1.default.hashSync(u.password + pass1, parseInt(salt));
            const conn = connector_1.default.connect();
            const sql = 'insert into users(first_name,last_name,password) values ($1,$2,$3)  RETURNING first_name,last_name';
            const result = yield (yield conn).query(sql, [u.first_name, u.last_name, hash]);
            const user = result.rows;
            (yield conn).release();
            // eslint-disable-next-line no-constant-condition
            return user;
        });
    }
    destroy(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = connector_1.default.connect();
                const sql = 'DELETE FROM users WHERE id= $1 RETURNING *';
                const result = yield (yield conn).query(sql, [id]);
                const user = result.rowCount;
                (yield conn).release();
                // eslint-disable-next-line no-constant-condition
                return true ? user == 1 : false;
            }
            catch (err) {
                throw new Error(`Cannot get this ${id} user  ${err}`);
            }
        });
    }
}
exports.default = UserStore;
