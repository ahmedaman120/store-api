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
  it('test show product with id 2',  async () => {
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

  it('test to list products', async () => {
    try {
      const products = await productStore.index()
      expect(products instanceof Array && products.length > 0).toBeTruthy()
    } catch (err) {
      console.error(err)
    }
  })

  it('test destroy product with id 4',  async () => {
    try {
      const test_data = products[3]
      const res = await productStore.destroy(4)
      expect(JSON.stringify(res[0].name)).toEqual(
        JSON.stringify(test_data.name)
      )
    } catch (error) {
      console.log(error)
    }
  })
})
