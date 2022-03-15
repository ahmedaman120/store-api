import UserStore, { User } from '../models/M_users/user'
import { users } from './data/data'

const userStore = new UserStore()
const token = ''
describe('Check Functions in user model', () => {
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

describe('Check Functions performance on user Model', () => {
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

  it('Test authenticate the users', async () => {
    const user: User = users[0]
    try {
      const u_json = await userStore.authenticate(
        user.first_name,
        user.last_name
      )
      expect(
        JSON.stringify({
          first_name: u_json.first_name,
          last_name: u_json.last_name,
        })
      ).toEqual(
        JSON.stringify({
          first_name: user.first_name,
          last_name: user.last_name,
        })
      )
    } catch (error) {
      console.log(error)
    }
  })

  it('Test authenticate the user but user not registerd', async () => {
    const user: User = users[1]
    try {
      const u_json = await userStore.authenticate(
        user.first_name,
        user.last_name
      )
      expect(u_json).toBeUndefined()
    } catch (error) {
      console.log(error)
    }
  })
})
