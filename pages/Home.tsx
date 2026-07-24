import { Box, Typography } from "@mui/material";
import { generateEmployees } from "../utils/generateEmployees";
import EmployeeToolbar from "../components/toolbar/EmployeeToolbar";
import EmployeeTable from "../components/table/EmployeeTable";
import { useMemo, useState } from "react";

const Home = () => {
    const employees = useMemo(() => generateEmployees(10000), []);
    const [globalFilter, setGlobalFilter] = useState("");

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
                Employee Management
            </Typography>

            <Typography
                variant="body1"
                color="text.secondary"
                sx={{ mt: 1, mb: 4 }}
            >
                Manage employee information and perform inline editing.
            </Typography>

            <EmployeeToolbar
                globalFilter={globalFilter}
                onGlobalFilterChange={setGlobalFilter}
            />

            <EmployeeTable
                data={employees}
                globalFilter={globalFilter}
                onGlobalFilterChange={setGlobalFilter}
            />
        </Box>
    );
};

export default Home;