import client from '../../connector'
import bcrypt from 'bcrypt'

export type User = {
  first_name: string
  last_name: string
  password: string
}

class UserStore {
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
  async authenticate(firstname: string, lastname: string): Promise<User> {
    const conn = await client.connect()
    const sql = 'select * from users where first_name=($1) and last_name=($2)'

    const user = await conn.query(sql, [firstname, lastname])

    return user.rows.length > 0 ? user.rows[0] : undefined
  }

  async create(u: User): Promise<User[]> {
    const salt = process.env.SALT_ROUNDS
    const pass1 = process.env.BCRYPT_PASSWORD as unknown as string
    const hash = bcrypt.hashSync(u.password + pass1, parseInt(salt as string))
    const conn = client.connect()
    const sql =
      'insert into users(first_name,last_name,password) values ($1,$2,$3)  RETURNING first_name,last_name'
    const result = await (
      await conn
    ).query(sql, [u.first_name, u.last_name, hash])
    const user: User[] = result.rows
    ;(await conn).release()
    // eslint-disable-next-line no-constant-condition
    return user
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

export default UserStore
