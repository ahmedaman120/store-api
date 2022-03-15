import express, { Request, Response } from 'express'
import UserStore, { User } from '../../models/M_users/user'
import dotenv from 'dotenv'

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { checkTocken } from '../../middlewares/auth_middleware'

dotenv.config()
const index = async (_req: Request, res: Response) => {
  const userStore = new UserStore()
  const users = userStore.index()
  res.json(users)
}
const show = async (_req: Request, res: Response) => {
  const user = new UserStore().show(_req.params.id as unknown as number)
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
  const deleted = new UserStore().destroy(req.body.id) //await store.delete(req.body.id)
  res.json({ deleted: deleted, flag: 'delete' })
}

const login = async (req: Request, res: Response) => {
  try {
    const userStore = new UserStore()
    const { fname, lname, password } = req.body
    const authedUser: User = await userStore.authenticate(fname, lname)
    // console.log(authedUser)
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
  app.get('/users', checkTocken, index)
  app.get('/users/:id', checkTocken, show)
  app.post('/users', create)
  app.post('/users/login', login)
  app.delete('/users', checkTocken, destroy)
}

export default user_handler
