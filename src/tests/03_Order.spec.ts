import OrderStore from '../models/M_orders/order'

const orderStore = new OrderStore()

describe('Check Functions in product model', () => {
  it('Test index function is existance', () => {
    expect(orderStore.create).toBeDefined()
  })
  it('Test get current order function is existance', () => {
    expect(orderStore.getCurrentOrder).toBeDefined()
  })
})
