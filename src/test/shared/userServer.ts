import {rest} from "msw";
import {setupServer} from "msw/node"

import testData from "../../utilities/testData";
import { INewUser, IUpdateUser } from "../../type/User";

const handler = [
    rest.get("https://api.escuelajs.co/api/v1/users", (req, res, ctx) => {
        return res(
            ctx.json(
                testData.allUsers
            )
        )
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
                    ...updateUser
                })
            )
        }
        return res(
            ctx.status(404, 'User is not found')
        )
    })
]

const userServer =  setupServer(...handler)
export default userServer