import {rest} from "msw";
import {setupServer} from "msw/node"

import testData from "../../utilities/testData";
import { ICategory } from "../../type/Category";

const handler = [
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

const categoryServer =  setupServer(...handler)
export default categoryServer