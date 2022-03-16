import { User } from '../../models/M_users/user'
import { Product } from '../../models/M_product/product'
import { Order, OrderReq } from '../../models/M_orders/order'

export const users: User[] = [
  {
    first_name: 'ahmed',
    last_name: 'mohamed',
    password: '123456',
  },
  {
    first_name: 'jack',
    last_name: 'dany',
    password: 'asd123',
  },
  {
    first_name: 'anna',
    last_name: 'barker',
    password: 'asd159',
  },
  {
    first_name: 'ahmed',
    last_name: 'mohamed',
    password: 'asd369',
  },
]

export const products: Product[] = [
  {
    name: 'shirt',
    price: 20,
  },
  {
    name: 'jacket',
    price: 200,
  },
  {
    name: 'hoody',
    price: 100,
  },
  {
    name: 'bag',
    price: 30,
  },
]

export const order: OrderReq[] = [
  {
    user_id: 1,
    status: 'active',
    items: [
      {
        product_id: 2,
        quantity: 3,
      },
      {
        product_id: 1,
        quantity: 3,
      },
    ],
  },
  {
    user_id: 5,
    status: 'active',
    items: [
      {
        product_id: 100,
        quantity: 3,
      },
      {
        product_id: 15,
        quantity: 3,
      },
    ],
  },
]
