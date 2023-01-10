import { useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"

import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"

import ButtonHandle from "../components/ButtonHandle"
import { deleteProduct } from "../redux/methods/productMethods"
import { deletecategory } from "../redux/methods/categoryMethods"
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook"
import ErrorMessage from "../components/ErrorMessage"

const DeleteAction = () => {
    const dispatch = useAppDispatch()
    const {id} = useParams()
    const navigate = useNavigate()
    const {pathname, state} = useLocation()
    const [errorMessage, setFormError] = useState('')
    const [openDialog, setOpenDialog] = useState(true)
    const {loggedIn, userInfo} = useAppSelector((state) => state.auth)
    const categories = useAppSelector((state) => state.categories)
    const products = useAppSelector((state) => state.products)
    const [idValid, setIdValid] = useState(false)
    const isNotAdmin = userInfo?.role.toLowerCase() !== 'admin'

    useEffect(() => {
        if(Number(id) > 0 && pathname.includes("product")) {
            const checkProductId = products.some(product => product.id === Number(id))
            setIdValid(checkProductId)
        } else if(Number(id) > 0 && pathname.includes("category")) {
            const checkCategoryId = categories.some(category => category.id === Number(id))
            setIdValid(checkCategoryId)
        }
    },[])

    const handleOpenAction = () => {
        setOpenDialog(!openDialog)
        navigate(-1)
    }

    const handleDeleteAction = async() => {
        try{
            if(loggedIn && !isNotAdmin) {
                if(Number(id) > 0 && pathname.includes("product")) {
                    await dispatch(deleteProduct(Number(id)))
                    navigate(-1)
                } else if(Number(id) > 0 && pathname.includes("category")) {
                    await dispatch(deletecategory(Number(id)))
                    navigate(-1)
                }
            }
        } catch(e) {
            setFormError("Something went wrong please try again later")
        }
    }

    return(
        <Dialog open={openDialog} onClose={handleOpenAction}>
            {isNotAdmin ?
                (
                    <ErrorMessage
                        title={"403 Forbidden"}
                        message={"Only Admins can access the page, you dont have any rights to use it"}
                    />
                )
                :
                (
                    idValid ?
                    (
                        <>
                            {(errorMessage.trim().length) &&
                                <ErrorMessage
                                    title={"400 Bad Request"}
                                    message={errorMessage}
                                />
                            }
                            <DialogTitle >
                                Confirm delete
                            </DialogTitle>
                            <DialogContent>
                                {`Are you sure you want to delete ${state.title}?`}
                            </DialogContent>
                            <DialogActions>
                                <ButtonHandle
                                    color="inherit"
                                    buttonLabel="Cancel"
                                    handleToggle={handleOpenAction}
                                />
                                <ButtonHandle
                                    color="error"
                                    buttonLabel="Delete"
                                    handleToggle={handleDeleteAction}
                                />
                            </DialogActions>
                        </>
                    )
                    :
                    (
                        <ErrorMessage
                            title={"404 Not Found"}
                            message={`The provided ${pathname.includes("product") ? "ProductID" : "CategoryID"} is not found in our database.`}
                        />
                    )
                )
            }
        </Dialog>
    )
}

export default DeleteAction