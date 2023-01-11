import { SelectChangeEvent } from "@mui/material"

export interface ISortDropDown {
    sortValue: string
    handleSortingAction: (e: SelectChangeEvent) => void
}