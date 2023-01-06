import { UseFormRegister } from "react-hook-form"
import { IInputTextField } from "../type/Form"
import { TextField } from "@material-ui/core"

const InutTextField = (props:IInputTextField) => {
    return (
        <TextField
            {...props.data}
        />
    )
}

export default InutTextField