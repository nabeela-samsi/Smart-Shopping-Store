import {rest} from "msw";
import {setupServer} from "msw/node"

import testData from "../../utilities/testData";
import jwt from "jsonwebtoken"
import { IProduct, IUpdateProduct } from "../../type/Product";
import { ICategory } from "../../type/Category";
import { INewUser, IUpdateUser, IUser } from "../../type/User";

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
        if(product.price < 0) {
            return res(
                ctx.status(400, "invalid data")
            )
        }
        return res(
            ctx.json(product)
        )
    }),
    rest.post("https://api.escuelajs.co/api/v1/categories", async (req, res, ctx) => {
        const category: ICategory = await req.json()
        return res(
            ctx.json(category)
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
        const foundUser: IUser | undefined = testData.allUsers.find(user => user.email === email && user.password === password)
        if(foundUser) {
            const access_token: string = jwt.sign(foundUser, "userLoginAuthKey")
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
        const access_tokenArr: string[] | undefined = req.headers.get("Authorization")?.split(" ")
        if(access_tokenArr) {
            const access_token = access_tokenArr[1]
            const foundUser = jwt.verify(access_token,"userLoginAuthKey")
            return res(
                ctx.json(foundUser)
            )
        } else {
            return res(ctx.status(401, "unauthorized"))
        }
    }),
    rest.post("https://api.escuelajs.co/api/v1/users/", async(req, res, ctx) => {
        const user: INewUser = await req.json()
        return res(
            ctx.json({
                ...user,
                role: "customer",
                id:1
            })
        )
    }),
    rest.put("https://api.escuelajs.co/api/v1/users/:id", async(req, res, ctx) => {
        const updateUser: IUpdateUser = await req.json()
        const {id} = req.params
        const foundUser = testData.allUsers.find(user => user.id === Number(id))
        if(foundUser) {
            return res(
                ctx.json({
                    ...foundUser,
                    ...updateUser.updateInfo
                })
            )
        }
        return res(
            ctx.status(404, 'User is not found')
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
    rest.put("https://api.escuelajs.co/api/v1/categories/:id", async(req, res, ctx) => {
        const updateCategory: ICategory = await req.json()
        const {id} = req.params
        const foundCategory = testData.allCategories.find(category => category.id === Number(id))
        if(foundCategory) {
            return res(
                ctx.json({
                    ...foundCategory,
                    ...updateCategory
                })
            )
        }
        return res(
            ctx.status(404, 'Category is not found')
        )
    }),
    rest.delete("https://api.escuelajs.co/api/v1/categories/:id", async(req, res, ctx) => {
        const {id} = req.params
        const foundCategory = testData.allCategories.find(category => category.id === Number(id))
        if(foundCategory) {
            return res(
                ctx.json(true)
            )
        }
        return res(
            ctx.status(404, 'Category is not found')
        )
    })
]

const server =  setupServer(...handler)
export default server