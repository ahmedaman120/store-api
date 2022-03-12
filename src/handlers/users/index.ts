import express, { Request, Response } from 'express'
import { User } from '../../models/M_users/user'

const index = async (_req: Request, res: Response) => {
  const users: User[] =[ {
      first_name: 'ahmed',
      last_name: 'ayman',
      password: 'sakdnlsd',
  }]
  res.json(users)
}
const show = async (_req: Request, res: Response) => {
  const user: User = {
    first_name: 'ahmed',
    last_name: 'ayman',
    password: 'sakdnlsd',
  }
  res.json(user)
}
const create = async (req: Request, res: Response) => {
  try {
    const user = {
      // - id
      // - id of each product in the order
      // - quantity of each product in the order
      // - user_id
      // - status of order (active or complete)
    }
    const newUser = {} //async call to model
    res.json(newUser)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const destroy = async (req: Request, res: Response) => {
  const deleted = {} //await store.delete(req.body.id)
  res.json(deleted)
}
const user_handler = (app: express.Application) => {
  app.get('/users', index)
  app.get('/users/:id', show)
  app.post('/users', create)
  app.delete('/users', destroy)
}

export default user_handler
