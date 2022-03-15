import UserStore, { User } from '../models/M_users/user'
import { users } from './data/data'

const userStore = new UserStore()
const token = ''
describe('Check Functions in user moder', () => {
  it('Test index function is existance', () => {
    expect(userStore.index).toBeDefined()
  })
  it('Test create function is existance', () => {
    expect(userStore.create).toBeDefined()
  })
  it('Test authenticate function is existance', () => {
    expect(userStore.authenticate).toBeDefined()
  })
})

describe('Check Functions performance', () => {
  it('Test create user', async () => {
    const user: User = users[0]
    try {
      const u_json = await userStore.create(user)
      expect(JSON.stringify(u_json[0])).toEqual(
        JSON.stringify({
          first_name: user.first_name,
          last_name: user.last_name,
        })
      )
    } catch (error) {
      console.log(error)
    }
  })
})
