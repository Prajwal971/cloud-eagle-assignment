import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { Employee } from "../../types/employee";

interface EmployeeState {
    employees: Employee[];
    originalEmployees: Employee[];
}

const initialState: EmployeeState = {
    employees: [],
    originalEmployees: [],
};

const employeeSlice = createSlice({
    name: "employee",

    initialState,

    reducers: {
        setEmployees: (state, action: PayloadAction<Employee[]>) => {
            state.employees = action.payload;
            state.originalEmployees = action.payload;
        },
    },
});

export const { setEmployees } = employeeSlice.actions;

export default employeeSlice.reducer;