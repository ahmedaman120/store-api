import express, { Request, Response } from 'express'
import UserStore, { User } from '../../models/M_users/user'
import dotenv from 'dotenv'

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
dotenv.config()
const index = async (_req: Request, res: Response) => {
  const users: User[] = [
    {
      first_name: 'ahmed',
      last_name: 'ayman',
      password: 'sakdnlsd',
    },
  ]
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
    console.log(req.body)
    const userStore = new UserStore()
    const user: User = {
      first_name: req.body.fname,
      last_name: req.body.lname,
      password: req.body.password as unknown as string,
    }
    const newUser = await userStore.create(user) //await call to model
    const tocken = jwt.sign(newUser[0], process.env.JWT_TOKEN as string)
    res.json({ j: tocken })
  } catch (err) {
    res.status(500).json(err)
  }
}

const destroy = async (req: Request, res: Response) => {
  const deleted = {} //await store.delete(req.body.id)
  res.json(deleted)
}

const login = async (req: Request, res: Response) => {
  try {
    const userStore = new UserStore()
    const { fname, lname, password } = req.body
    const authedUser: User = await userStore.authenticate(fname, lname)
    console.log(authedUser)
    if (authedUser) {
      const result = bcrypt.compareSync(
        password + process.env.BCRYPT_PASSWORD,
        authedUser.password
      )

      if (result) {
        authedUser.password = ''
        const tocken = jwt.sign(
          { fnam: authedUser.first_name, lname: authedUser.last_name },
          process.env.JWT_TOKEN as string
        )
        res.status(200).send(tocken)
      } else {
        res.status(200).send('the coordinates are wrong')
      }
    } else {
      res.status(200).send('the coordinates are wrong')
    }
  } catch (err) {
    res.status(500).json(err)
  }
}
const user_handler = (app: express.Application) => {
  app.get('/users', index)
  app.get('/users/:id', show)
  app.post('/users', create)
  app.post('/users/login', login)
  app.delete('/users', destroy)
}

export default user_handler
