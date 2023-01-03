import { Dialog, DialogTitle } from "@mui/material"
import LogInForm from "./LoginForm"
import { ModalType } from "../type/Form"

const Modal = ({modalIsOpen, toggle, formType}: ModalType) => {
    return (
        <>
            <Dialog
                open={modalIsOpen}
                onClose={toggle}

            >
                <DialogTitle>
                    {formType}
                </DialogTitle>
                <LogInForm />
            </Dialog>
        </>
    )
}

export default Modal