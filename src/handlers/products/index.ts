import express, { Request, Response } from 'express'
import ProductStore, { Product } from '../../models/M_product/product'


const index = async (_req: Request, res: Response) => {
  const p = new ProductStore()
  const products: Product[] = await p.index()
  res.json(products)
}
const show = async (_req: Request, res: Response) => {
  const id: number = _req.params.id as unknown as number
  const p = new ProductStore()
  const product: Product[] = await p.show(id)
  res.json(product)
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
  app.get('/products/:id', show)
  app.post('/products', create)
  app.delete('/products/:id', destroy)
}

export default product_handler
