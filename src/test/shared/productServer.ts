import {rest} from "msw";
import {setupServer} from "msw/node"

import testData from "../../utilities/testData";
import { IProduct, IUpdateProduct } from "../../type/Product";

const handler = [
    rest.get("https://api.escuelajs.co/api/v1/products", (req, res, ctx) => {
        return res(
            ctx.json(
                testData.allProducts
            )
        )
    }),
    rest.post("https://api.escuelajs.co/api/v1/products", async (req, res, ctx) => {
        const product: IProduct = await req.json()
        return res(
            ctx.json(product)
        )
    }),
    rest.put("https://api.escuelajs.co/api/v1/products/:id", async(req, res, ctx) => {
        const updateProduct: IUpdateProduct = await req.json()
        const {id} = req.params
        const foundProduct = testData.allProducts.find(product => product.id === Number(id))
        if(foundProduct) {
            return res(
                ctx.json({
                    ...foundProduct,
                    ...updateProduct
                })
            )
        }
        return res(
            ctx.status(404, 'Product is not found')
        )
    }),
    rest.delete("https://api.escuelajs.co/api/v1/products/:id", async(req, res, ctx) => {
        const {id} = req.params
        const foundProduct = testData.allProducts.find(product => product.id === Number(id))
        if(foundProduct) {
            return res(
                ctx.json(true)
            )
        }
        return res(
            ctx.status(404, 'Product is not found')
        )
    }),

]

const productServer =  setupServer(...handler)
export default productServer