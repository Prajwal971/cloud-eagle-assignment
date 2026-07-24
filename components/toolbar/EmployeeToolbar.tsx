import { Box, TextField } from "@mui/material";

interface EmployeeToolbarProps {
    globalFilter: string;
    onGlobalFilterChange: (value: string) => void;
}


const EmployeeToolbar = ({
    globalFilter,
    onGlobalFilterChange,
}: EmployeeToolbarProps) => {
    return (
        <TextField
            label="Search"
            size="small"
            value={globalFilter}
            onChange={(e) => onGlobalFilterChange(e.target.value)}
        />
    );
};

export default EmployeeToolbar;