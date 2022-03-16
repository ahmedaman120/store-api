import request from 'supertest'
import app from '../server'
import UserStore, { User } from '../models/M_users/user'
import { users, products } from './data/data'
import ProductStore from '../models/M_product/product'
import OrderStore from '../models/M_orders/order'

let accessToken: string

const userModel = new UserStore()
const productModel = new ProductStore()
const orderModel = new OrderStore()

beforeAll(async () => {
  const req = request(app)
  const res = await req.post('/users/login').send({
    fname: 'test1',
    lname: 'test',
    password: 'test',
  })

  // user = res.body.user
  accessToken = res.text
  // console.log(accessToken)
})

describe('Test User authentication and verification', () => {
  it('test sign up user by use /users with post request', async () => {
    const req = request(app)
    const res = await req.post('/users').send({
      fname: users[2].first_name,
      lname: users[2].last_name,
      password: users[2].password,
    })
    expect(res.statusCode).toBe(200)
  })

  it('test login user by use /users/login with post request', async () => {
    const req = request(app)
    const res = await req.post('/users/login').send({
      fname: users[2].first_name,
      lname: users[2].last_name,
      password: users[2].password,
    })
    expect(res.statusCode).toBe(200)
  })

  it('test login user by use /users/login with post request but user not exists', async () => {
    const req = request(app)
    const response = await req.post('/users/login').send({
      fname: users[3].first_name,
      lname: users[3].last_name,
      password: users[3].password,
    })
    expect(response.statusCode).toBe(400)
  })

  it('test login user by use /users/login with post request but user wrong password', async () => {
    const req = request(app)
    const response = await req.post('/users/login').send({
      fname: users[0].first_name,
      lname: users[0].last_name,
      password: '4489494',
    })
    expect(response.statusCode).toBe(400)
  })
  it('test login user by use /users/login with post request and responsed by jwt token', async () => {
    const req = request(app)
    const res = await req.post('/users/login').send({
      fname: users[2].first_name,
      lname: users[2].last_name,
      password: users[2].password,
    })
    expect(
      (res.text as string).match(
        /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/
      )
    ).toBeTruthy()
  })

  it('test show user by use /users/:id with get request to check jwt check', async () => {
    const req = request(app)
    const response = await req
      .get('/users/1')
      .set('Authorization', 'Bearer ' + accessToken)
    expect(response.status == 200).toBeTruthy()
  })
  it('test show user by use /users/:id with get request to check jwt wrong check', async () => {
    const req = request(app)
    const response = await req
      .get('/users/1')
      .set('Authorization', 'Bearer ' + accessToken + 'as')
    expect(response.status == 401).toBeTruthy()
  })
})