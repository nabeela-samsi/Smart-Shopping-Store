import { InputLabel, MenuItem, OutlinedInput, Select } from "@mui/material"
import { Stack } from "@mui/system"

import { ISortDropDown } from "../type/SortDropDown"

const SortDropDown = (props:ISortDropDown) => {
    return (
       <Stack
            alignItems={"flex-start"}
            paddingLeft={10}
            paddingTop={5}
        >
            <InputLabel id="sort-by">Sort By</InputLabel>
            <Select
                labelId={"sort-by"}
                value={props.sortValue}
                onChange={props.handleSortingAction}
                sx={{width:"20vw"}}
            >
                <MenuItem value={"LOW_TO_HIGH_PRICE"}>
                    price low to high
                </MenuItem>
                <MenuItem value={"HIGH_TO_LOW_PRICE"}>
                    price high to low
                </MenuItem>
                <MenuItem value={"A-Z"}>
                    name A-Z
                </MenuItem>
                <MenuItem value={"Z-A"}>
                    name Z-A
                </MenuItem>
            </Select>
       </Stack>
    )
}

export default SortDropDown