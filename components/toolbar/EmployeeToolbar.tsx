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

import { exportToCSV } from "../../utils/exportToCSV";

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

    const employees = useAppSelector(
        (state) => state.employee.employees
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

            <Button
                variant="outlined"
                onClick={() => exportToCSV(employees)}
            >
                Export CSV
            </Button>

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
