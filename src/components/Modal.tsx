import { Dialog, DialogTitle } from "@mui/material"
import LogInForm from "./LoginForm"

const Modal = ({modalIsOpen,toggle,formType}:{modalIsOpen:boolean, toggle: () => void,formType: string}) => {
    return (
        <>
            <Dialog
                open={modalIsOpen}
                onClose={toggle}
                style={{backgroundColor: 'transparent'}}

            >
                <DialogTitle>{formType}</DialogTitle>
                <LogInForm />
            </Dialog>
        </>
    )
}

export default Modal