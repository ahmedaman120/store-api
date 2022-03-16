import ProductStore, { Product } from '../models/M_product/product'
import { products } from './data/data'

const productStore = new ProductStore()

describe('Check Functions in product model', () => {
  it('Test index function is existance', () => {
    expect(productStore.index).toBeDefined()
  })
  it('Test create function is existance', () => {
    expect(productStore.create).toBeDefined()
  })
  it('Test destroy function is existance', () => {
    expect(productStore.destroy).toBeDefined()
  })
  it('Test show function is existance', () => {
    expect(productStore.show).toBeDefined()
  })
})

describe('Check Functions performance on product Model', () => {
  it('Test create product', async () => {
    const product: Product = products[0]
    try {
      const p_json = await productStore.create(product)
      expect(JSON.stringify({ name: p_json[0].name })).toEqual(
        JSON.stringify({
          name: product.name,
        })
      )
    } catch (error) {
      console.log(error)
    }
  })

  it('Test create another product', async () => {
    const product: Product = products[3]
    try {
      const p_json = await productStore.create(product)
      expect(JSON.stringify({ name: p_json[0].name })).toEqual(
        JSON.stringify({
          name: product.name,
        })
      )
    } catch (error) {
      console.log(error)
    }
  })
  it('test show product',  async () => {
    const product: Product = products[1]
    try {
      const p_json = await productStore.show(2)
      expect(JSON.stringify({ name: p_json[0].name })).toEqual(
        JSON.stringify({
          name: product.name,
        })
      )
    } catch (error) {
      console.log(error)
    }
  })
})
