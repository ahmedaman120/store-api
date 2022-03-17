import client from '../../connector'
export type Order = {
  product_id: number
  quantity: number
}

export type OrderReq = {
  user_id: number
  status: string
  items: Order[]
}
class OrderStore {
  async getCurrentOrder(userId: number): Promise<any> {
    const db = client.connect()
    try {
      const sql = 'select * from users where id=$1'
      const res = (await db).query(sql, [userId])
      const user = (await res).rows[0]
      // console.log(user)
      if (user.id) {
        const sqlOrder =
          "SELECT order_id , product_id, p.name, quantity  FROM orders as o \
          JOIN products_orders as po ON ord_id=order_id JOIN products \
          as p on p.id=po.product_id   WHERE status='active' and o.user_id= $1;"
        const customerActiveOrder = (await db).query(sqlOrder, [user.id])
        const customerOrder = (await customerActiveOrder).rows
        // console.log(customerOrder)
        const userOrder = { userInfo: user.id, order: customerOrder }
        // console.log(userOrder)
        return userOrder
      }
    } catch (err) {
      // console.log(err)
      throw new Error(`Cannot get order item by useID ${userId}`)
    } finally {
      ;(await db).release()
    }

  }

  async create(cart: OrderReq): Promise<Order[] | undefined> {
    try {
      const db = client.connect()
      const user_id = cart.user_id
      const status: string = cart.status
      const sqlInsertOrder =
        'INSERT INTO orders(user_id,status) VALUES($1,$2)  RETURNING ord_id'
      const sqlInsertOrderProducts =
        'INSERT INTO products_orders(order_id,product_id,quantity) VALUES($1,$2,$3) RETURNING *'
      const ord_id = (await (await db).query(sqlInsertOrder, [user_id, status]))
        .rows[0]['ord_id']
      const allOrder = []
      for (const item of cart.items) {
        const product_id: number = item.product_id
        const quantity: number = item.quantity
        const res = (await db).query(sqlInsertOrderProducts, [
          ord_id,
          product_id,
          quantity,
        ])
        allOrder.push((await res).rows[0])
      }
      return allOrder
    } catch (err) {
      // console.log(err)
      throw new Error(`Cannot add this order`)
    }
  }
}

export default OrderStore
