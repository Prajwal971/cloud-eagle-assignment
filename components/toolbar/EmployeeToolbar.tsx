import {
    Box,
    Button,
    TextField,
} from "@mui/material";

import {
    cancelChanges,
    saveChanges,
} from "../../store/employee/employeeSlice";

import {
    useAppDispatch,
    useAppSelector,
} from "../../store/hooks";

interface EmployeeToolbarProps {
    globalFilter: string;
    onGlobalFilterChange: (value: string) => void;
}

const EmployeeToolbar = ({
    globalFilter,
    onGlobalFilterChange,
}: EmployeeToolbarProps) => {
    const dispatch = useAppDispatch();

    const hasUnsavedChanges = useAppSelector(
        (state) => state.employee.hasUnsavedChanges
    );

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
            }}
        >
            <TextField
                label="Search"
                size="small"
                value={globalFilter}
                onChange={(e) =>
                    onGlobalFilterChange(e.target.value)
                }
            />

            <Box sx={{ display: "flex", gap: 2 }}>
                <Button
                    variant="contained"
                    disabled={!hasUnsavedChanges}
                    onClick={() =>
                        dispatch(saveChanges())
                    }
                >
                    Save
                </Button>

                <Button
                    variant="outlined"
                    disabled={!hasUnsavedChanges}
                    onClick={() =>
                        dispatch(cancelChanges())
                    }
                >
                    Cancel
                </Button>
            </Box>
        </Box>
    );
};

export default EmployeeToolbar;
