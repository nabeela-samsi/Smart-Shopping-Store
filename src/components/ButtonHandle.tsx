import { Button } from "@mui/material";
import { IButton } from "../type/Form";

const ButtonHandle = (props: IButton) => {
    return (
        <Button
            variant="contained"
            onClick={props.handleToggle}
            color={props.color}>
            {props.buttonLabel}
        </Button>
    );
};

export default ButtonHandle;
