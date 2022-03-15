import client from '../../connector'
export type Order = {
  product_id: number
  status: string
  quantity: number
}

export type OrderReq = {
  user_id: number
  items: Order[]
}
class OrderStore {
  async getCurrentOrder(userId: number): Promise<any> {
    try {
      const db = client.connect()
      const sql = 'select * from users where id=$1'
      const res = (await db).query(sql, [userId])
      const user = (await res).rows[0]
      console.log(user)
      if (user.id) {
        const sqlOrder =
          "select * from orders_products where user_id=$1 and status='active'"
        const customerActiveOrder = (await db).query(sqlOrder, [user.id])
        const customerOrder = (await customerActiveOrder).rows
        ;(await db).release()
        const userOrder = { userInfo: user.id, order: customerOrder }
        console.log(userOrder)
        return userOrder
      }
    } catch (err) {
      throw new Error(`Cannot get order item by useID ${userId}`)
    }
  }

  async create(cart: OrderReq): Promise<Order[] | undefined> {
    try {
      const db = client.connect()
      const user_id = cart.user_id
      const sql =
        'INSERT INTO orders_products(user_id,product_id,quantity,status) VALUES($1,$2,$3,$4)  RETURNING *'
      const allOrder = []
      for (const item of cart.items) {
        const product_id: number = item.product_id
        const quantity: number = item.quantity
        const status: string = item.status
        const res = (await db).query(sql, [
          user_id,
          product_id,
          quantity,
          status,
        ])
        allOrder.push((await res).rows[0])
      }
      return allOrder
    } catch (err) {
      throw new Error(`Cannot add this order`)
    }
  }
}

export default OrderStore
