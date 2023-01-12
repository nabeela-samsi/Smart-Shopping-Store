import { AnyAction, EmptyObject } from "@reduxjs/toolkit";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import { IProduct } from "./Product";
import { ICategory } from "./Category";
import { IAuth } from "./Auth";
import { ICartWishlist } from "./CartWishList";
import { IUser } from "./User";
import { ISwitchTheme } from "./Theme";
import { PersistPartial } from "redux-persist/lib/persistReducer";


export type TStore = (
    ToolkitStore<EmptyObject & {
        products: IProduct[];
        categories: ICategory[];
        auth: IAuth;
        cart: ICartWishlist;
        wishList: ICartWishlist;
        users: IUser[];
        theme: ISwitchTheme;
    } & PersistPartial, AnyAction>
)