import express, { Request, Response } from 'express'
import OrderStore, { OrderReq } from '../../models/M_orders/order'

const create = async (req: Request, res: Response) => {
  try {
    const order: OrderReq = req.body
    const orderStore = new OrderStore()
    const retOrder = await orderStore.create(order)
    res.json(retOrder)
  } catch (err) {
    res.status(400)
    console.log(err)
    res.json(err)
  }
}

const destroy = async (req: Request, res: Response) => {
  const deleted = {} //await store.delete(req.body.id)
  res.json(deleted)
}
const getUserOrder = async (req: Request, res: Response) => {
  const orderStore = new OrderStore()
  console.log(req.params)
  res.json({
    response: await orderStore.getCurrentOrder(
      req.params.id as unknown as number
    ),
  })
}
const order_handler = (app: express.Application) => {
  app.post('/orders', create)
  app.delete('/orders', destroy)
  app.get('/orders/user/:id', getUserOrder)
}

export default order_handler