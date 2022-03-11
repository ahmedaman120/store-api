import client from '../../connector'
import bcrypt from 'bcrypt'

export type User = {
  first_name: string
  last_name: string
  password: string
}

class ProductStore {
  async index(): Promise<User[]> {
    try {
      const conn = client.connect()
      const sql = 'select * from users'
      const result = await (await conn).query(sql)
      ;(await conn).release()
      return result.rows
    } catch (err) {
      throw new Error(`Cannot get products ${err}`)
    }
  }

  //get specific id
  async show(id: number): Promise<User[]> {
    try {
      const conn = client.connect()
      const sql = 'select * from users where id = $1'
      const result = await (await conn).query(sql, [id])
      ;(await conn).release()
      return result.rows
    } catch (err) {
      throw new Error(`Cannot get this ${id} book  ${err}`)
    }
  }

  async create(u: User): Promise<boolean> {
    const conn = client.connect()
    const sql =
      'insert into products(first_name,last_name,password) values ($1,$2,$3)  RETURNING *'
    const result = await (
      await conn
    ).query(sql, [u.first_name, u.last_name, u.password])
    const user: number = result.rowCount
    ;(await conn).release()
    // eslint-disable-next-line no-constant-condition
    return true ? user == 1 : false
  }

  async destroy(id: number): Promise<boolean> {
    try {
      const conn = client.connect()
      const sql = 'DELETE FROM user WHERE id= $1 RETURNING *'
      const result = await (await conn).query(sql, [id])
      const user: number = result.rowCount
      ;(await conn).release()
      // eslint-disable-next-line no-constant-condition
      return true ? user == 1 : false
    } catch (err) {
      throw new Error(`Cannot get this ${id} user  ${err}`)
    }
  }
}

export default ProductStore
