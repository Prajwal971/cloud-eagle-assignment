import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { Employee } from "../../types/employee";

interface UpdateEmployeePayload {
    id: number;
    field: keyof Employee;
    value: Employee[keyof Employee];
}

interface EmployeeState {
    employees: Employee[];
    originalEmployees: Employee[];
    hasUnsavedChanges: boolean;
}

const initialState: EmployeeState = {
    employees: [],
    originalEmployees: [],
    hasUnsavedChanges: false,
};

const employeeSlice = createSlice({
    name: "employee",

    initialState,

    reducers: {
        setEmployees: (state, action: PayloadAction<Employee[]>) => {
            state.employees = action.payload.map((employee) => ({
                ...employee,
            }));

            state.originalEmployees = action.payload.map((employee) => ({
                ...employee,
            }));

            state.hasUnsavedChanges = false;
        },

        updateEmployee: (
            state,
            action: PayloadAction<UpdateEmployeePayload>
        ) => {
            const { id, field, value } = action.payload;

            const employee = state.employees.find(
                (employee) => employee.id === id
            );

            if (employee) {
                Object.assign(employee, { [field]: value });
                state.hasUnsavedChanges = true;
            }
        },

        saveChanges: (state) => {
            state.originalEmployees = state.employees.map((employee) => ({
                ...employee,
            }));

            state.hasUnsavedChanges = false;
        },

        cancelChanges: (state) => {
            state.employees = state.originalEmployees.map((employee) => ({
                ...employee,
            }));

            state.hasUnsavedChanges = false;
        },
    },
});

export const {
    setEmployees,
    updateEmployee,
    saveChanges,
    cancelChanges,
} = employeeSlice.actions;

export default employeeSlice.reducer;
