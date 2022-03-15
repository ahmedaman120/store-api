import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import cors from 'cors'
import product_handler from './handlers/products'
import user_handler from './handlers/users'
import order_handler from './handlers/orders'

dotenv.config()

const app: express.Application = express()
const address = '0.0.0.0:3000'
const jsonParser = bodyParser.json()
app.use(jsonParser)
app.use(cors())

app.get('/', function (req: Request, res: Response) {
  res.send('Hello World!')
})
product_handler(app)
user_handler(app)
order_handler(app)
app.listen(3000, function () {
  console.log(`starting app on: ${address}`)
})

export default app
