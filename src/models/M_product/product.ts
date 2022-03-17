import client from '../../connector'

export type Product = {
  name: string
  price: number
}

class ProductStore {
  async index(): Promise<Product[]> {
    try {
      const conn = client.connect()
      const sql = 'select * from products'
      const result = await (await conn).query(sql)
      // console.log(result.rows)
      ;(await conn).release()
      return result.rows
    } catch (err) {
      throw new Error(`Cannot get products ${err}`)
    }
  }

  //get specific id
  async show(id: number): Promise<Product[]> {
    try {
      const conn = client.connect()
      const sql = 'select * from products where id = $1'
      const result = await (await conn).query(sql, [id])
      ;(await conn).release()
      return result.rows
    } catch (err) {
      throw new Error(`Cannot get this ${id} book  ${err}`)
    }
  }

  async create(p: Product): Promise<Product[]> {
    const conn = client.connect()
    const sql = 'insert into products(name,price) values ($1,$2)  RETURNING *'
    const result = await (await conn).query(sql, [p.name, p.price])
    const product = result.rows
    ;(await conn).release()
    // eslint-disable-next-line no-constant-condition
    return product
  }

  async destroy(id: number): Promise<Product[]> {
    try {
      const conn = client.connect()
      const sql = 'DELETE FROM products WHERE id= $1 RETURNING name,price'
      const result = await (await conn).query(sql, [id])
      const product = result.rows
      ;(await conn).release()
      // eslint-disable-next-line no-constant-condition
      return product
    } catch (err) {
      throw new Error(`Cannot get this ${id} product  ${err}`)
    }
  }
}

export default ProductStore
