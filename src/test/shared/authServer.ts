import {rest} from "msw";
import {setupServer} from "msw/node"

import testData from "../../utilities/testData";
import jwt from "jsonwebtoken"
import { IUser } from "../../type/User";

const handler = [
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
    })
]

const authServer =  setupServer(...handler)
export default authServer