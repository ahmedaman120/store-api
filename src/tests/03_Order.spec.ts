import OrderStore, { Order, OrderReq } from '../models/M_orders/order'
import ProductStore, { Product } from '../models/M_product/product'
import UserStore, { User } from '../models/M_users/user'

import { order, products } from './data/data'

const orderStore = new OrderStore()
const productStore = new ProductStore()
const userStore = new UserStore()

let created_ord: Order[] | undefined
beforeAll(async () => {
  const product1: Product = products[0]
  const product2: Product = products[1]

  try {
    await productStore.create(product1)
    await productStore.create(product2)

    //add user test
    const user = await userStore.create({
      first_name: 'test1',
      last_name: 'test',
      password: 'test',
    })
    const product: Product = products[0]

    const ord: OrderReq = order[0]
    const orderStore = new OrderStore()
    created_ord = await orderStore.create(ord)
  } catch (error) {
    console.log(error)
  }
})
describe('Check Functions in order model', () => {
  it('Test index function is existance', () => {
    expect(orderStore.create).toBeDefined()
  })
  it('Test get current order function is existance', () => {
    expect(orderStore.getCurrentOrder).toBeDefined()
  })
})

describe('Check performance of functions', () => {
  it('check getting order for user with id 1', async () => {
    const orders = await orderStore.getCurrentOrder(order[0].user_id)
    expect(orders.userInfo == 1).toBeTruthy()
  })
  it('check create order with product not in our list', async () => {
    try {
      const orders = await orderStore.create(order[1])
    } catch (err) {
      // console.log(err.message)
      expect((err as unknown as Error).message as unknown as string).toEqual(
        'Cannot add this order'
      )
    }
  })
})
