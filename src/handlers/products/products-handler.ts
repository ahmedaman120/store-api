import express, { Request, Response } from 'express'

const index = async (_req: Request, res: Response) => {
  const products = []
  res.json(products)
}
const show = async (_req: Request, res: Response) => {
  const products = []
  res.json(products)
}
const create = async (req: Request, res: Response) => {
  try {
    const product = {
      // - id
      // - id of each product in the order
      // - quantity of each product in the order
      // - product_id
      // - status of order (active or complete)
    }
    const newproduct = {} //async call to model
    res.json({})
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const destroy = async (req: Request, res: Response) => {
  const deleted = {} //await store.delete(req.body.id)
  res.json(deleted)
}
const product_handler = (app: express.Application) => {
  app.get('/products', index)
  app.get('/products/:id', show)
  app.post('/products', create)
  app.delete('/products', destroy)
}

export default product_handler
