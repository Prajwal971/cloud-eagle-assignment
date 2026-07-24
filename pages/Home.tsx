import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";


import { useAppDispatch, useAppSelector } from "../store/hooks";
import { generateEmployees } from "../utils/generateEmployees";
import EmployeeToolbar from "../components/toolbar/EmployeeToolbar";
import EmployeeTable from "../components/table/EmployeeTable";
import { setEmployees } from "../store/employee/employeeSlice";

const Home = () => {
    const dispatch = useAppDispatch();
    const employees = useAppSelector(
        (state) => state.employee.employees
    );
    const [globalFilter, setGlobalFilter] = useState("");


    useEffect(() => {
        dispatch(
            setEmployees(
                generateEmployees(10000)
            )
        );
    }, [dispatch]);

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