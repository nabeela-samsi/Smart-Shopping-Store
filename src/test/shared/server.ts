import {rest} from "msw";
import {setupServer} from "msw/node"

import testData from "../../utilities/testData";
import jwt from "jsonwebtoken"

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
    }),
    rest.post("https://api.escuelajs.co/api/v1/auth/login", async (req, res, ctx) => {
        const {email, password} = await req.json()
        const foundUser = testData.allUsers.find(user => user.email === email && user.password === password)
        if(foundUser) {
            const access_token = jwt.sign(foundUser, "userLoginAuthKey")
            return res(
                ctx.json({
                    access_token
                })
            )
        } else {
            return res(ctx.status(401, "unauthorized"))
        }
    }),
    rest.get("https://api.escuelajs.co/api/v1/auth/profile", (req, res, ctx) => {
        const access_tokenArr = req.headers.get("Authorization")?.split(" ")
        if(access_tokenArr) {
            const access_token = access_tokenArr[1]
            const foundUser = jwt.verify(access_token,"userLoginAuthKey")
            return res(
                ctx.json(foundUser)
            )
        } else {
            return res(ctx.status(401, "unauthorized"))
        }
    })
]

const server =  setupServer(...handler)
export default server