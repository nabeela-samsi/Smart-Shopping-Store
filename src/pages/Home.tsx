import { Link } from "react-router-dom"

import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Grid,
    IconButton,
    Typography
} from "@mui/material"

import { useAppSelector } from "../hooks/reduxHook"
import getIcons from "../utilities/getIcon"

const Home = () => {
    const categories = useAppSelector(state => state.categories)
    const {userInfo} = useAppSelector(state => state.auth)
    const isAdmin = userInfo?.role.toLowerCase() === 'admin'

    return (
        <div className="home">
            <Grid
                container
                justifyContent={"center"}
                alignItems={"center"}
                spacing={0}
            >
                <img
                    alt="The offer"
                    src="https://www.coredna.com/files/images/blogs/71/961/ecommerce-discount-coupon-strategies-anniversary.png?w=831&h=346"
                />
            </Grid>
            <Grid
                container
                spacing={4}
                direction="row"
                sx={{p:10}}
            >
                {categories.map((data) => (
                    <Grid
                        item
                        xs={3}
                        key={data.id}
                    >
                        <Link
                            to={`/products/searchByCategory?id=${data.id}`}
                            style={{textDecoration: 'none'}}
                            color="black"
                        >
                            <Card variant="elevation" >
                                <CardActionArea>
                                        <CardContent>
                                            <Typography fontWeight={"bold"} >
                                                {data.name}
                                            </Typography>
                                        </CardContent>
                                        <CardMedia
                                            component={"img"}
                                            image={data.image}
                                            alt={data.name}
                                            height="300"
                                            style={{objectFit:"scale-down"}}
                                        />
                                </CardActionArea>
                            </Card>
                        </Link>
                        {isAdmin && (
                            <>
                                <IconButton>
                                    {getIcons.edit}
                                </IconButton>
                                <IconButton>
                                    {getIcons.trash}
                                </IconButton>
                            </>
                        )}
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}

export default Home