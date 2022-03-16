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
class OrderStore {
    getCurrentOrder(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const db = connector_1.default.connect();
                const sql = 'select * from users where id=$1';
                const res = (yield db).query(sql, [userId]);
                const user = (yield res).rows[0];
                console.log(user);
                if (user.id) {
                    const sqlOrder = "SELECT order_id , product_id, p.name, quantity  FROM orders as o \
          JOIN products_orders as po ON ord_id=order_id JOIN products \
          as p on p.id=po.product_id   WHERE status='active' and o.user_id= $1;";
                    const customerActiveOrder = (yield db).query(sqlOrder, [user.id]);
                    const customerOrder = (yield customerActiveOrder).rows;
                    (yield db).release();
                    const userOrder = { userInfo: user.id, order: customerOrder };
                    console.log(userOrder);
                    return userOrder;
                }
            }
            catch (err) {
                throw new Error(`Cannot get order item by useID ${userId}`);
            }
        });
    }
    create(cart) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const db = connector_1.default.connect();
                const user_id = cart.user_id;
                const status = cart.status;
                const sqlInsertOrder = 'INSERT INTO orders(user_id,status) VALUES($1,$2)  RETURNING ord_id';
                const sqlInsertOrderProducts = 'INSERT INTO products_orders(order_id,product_id,quantity) VALUES($1,$2,$3) RETURNING *';
                const ord_id = (yield (yield db).query(sqlInsertOrder, [user_id, status]))
                    .rows[0]['ord_id'];
                const allOrder = [];
                for (const item of cart.items) {
                    const product_id = item.product_id;
                    const quantity = item.quantity;
                    const res = (yield db).query(sqlInsertOrderProducts, [
                        ord_id,
                        product_id,
                        quantity,
                    ]);
                    allOrder.push((yield res).rows[0]);
                }
                return allOrder;
            }
            catch (err) {
                throw new Error(`Cannot add this order`);
            }
        });
    }
}
exports.default = OrderStore;
