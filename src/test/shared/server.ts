import {rest} from "msw";
import {setupServer} from "msw/node"

import testData from "../../utilities/testData";

const handler = [
    rest.get("https://api.escuelajs.co/api/v1/products", (req, res, ctx) => {
        return res(
            ctx.json(
                testData.allProducts
            )
        )
    }),
    rest.post("https://api.escuelajs.co/api/v1/products", async (req, res, ctx) => {
        const product = await req.json()
        if(product.price < 0) {
            return res(
                ctx.status(400, "invalid data")
            )
        }
        return res(
            ctx.json(product)
        )
    }),
    rest.get("https://api.escuelajs.co/api/v1/categories", (req, res, ctx) => {
        return res(
            ctx.json(
                testData.allCategories
            )
        )
    }),
    rest.get("https://api.escuelajs.co/api/v1/users", (req, res, ctx) => {
        return res(
            ctx.json(
                testData.allUsers
            )
        )
    })
]

const server =  setupServer(...handler)
export default server