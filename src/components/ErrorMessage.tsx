import { Alert, AlertTitle } from "@mui/material"
import { IError } from "../type/Error"

const ErrorMessage = (props: IError) => {
    return (
        <Alert severity="error" variant="outlined">
            <AlertTitle>
                Error: {props.title}
            </AlertTitle>
            {props.message}
        </Alert>
    )
}

export default ErrorMessage