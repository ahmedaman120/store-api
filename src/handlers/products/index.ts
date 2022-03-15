import express, { Request, Response } from 'express'
import ProductStore, { Product } from '../../models/M_product/product'
import { checkTocken } from '../../middlewares/auth_middleware'

const index = async (_req: Request, res: Response) => {
  const p = new ProductStore()
  const products: Product[] = await p.index()
  res.json(products)
}
const show = async (_req: Request, res: Response) => {
  console.log(_req.params)
  const id: number = _req.params.id as unknown as number
  const p = new ProductStore()
  try {
    const product: Product[] = await p.show(id)
    console.log('test', product)
    res.json(product)
  } catch (err) {
    console.log(err)
  }
}
const create = async (req: Request, res: Response) => {
  try {
    console.log(req.body)
    const product: Product = {
      name: req.body.name as string,
      price: req.body.price as unknown as number,
    }
    const p = new ProductStore()
    const ret: Product[] = await p.create(product)
    res.json(ret[0])
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const destroy = async (req: Request, res: Response) => {
  try {
    const p = new ProductStore()
    const id: number = req.params.id as unknown as number
    const deleted = await p.destroy(id) //await store.delete(req.body.id)
    res.json({ 'deleted-Row': deleted, msg: 'delete success' })
  } catch (err) {
    res.json({ error: 'bad request check your arguments' }).status(400)
  }
}
const product_handler = (app: express.Application) => {
  app.get('/products', index)
  app.get('/products/:id', [checkTocken], show)
  app.post('/products', checkTocken, create)
  app.delete('/products/:id', checkTocken, destroy)
}

export default product_handler
