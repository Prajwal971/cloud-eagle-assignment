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
    editedRows: Record<number, true>;
}

const initialState: EmployeeState = {
    employees: [],
    originalEmployees: [],
    hasUnsavedChanges: false,
    editedRows: {},
};

const areEmployeesEqual = (
    employee: Employee,
    originalEmployee: Employee
) => (
    employee.id === originalEmployee.id &&
    employee.employeeId === originalEmployee.employeeId &&
    employee.firstName === originalEmployee.firstName &&
    employee.lastName === originalEmployee.lastName &&
    employee.email === originalEmployee.email &&
    employee.department === originalEmployee.department &&
    employee.designation === originalEmployee.designation &&
    employee.salary === originalEmployee.salary &&
    employee.quantity === originalEmployee.quantity &&
    employee.joiningDate === originalEmployee.joiningDate &&
    employee.status === originalEmployee.status
);

const updateUnsavedChanges = (state: EmployeeState) => {
    state.hasUnsavedChanges = Object.keys(state.editedRows).length > 0;
};

const updateEditedRowState = (
    state: EmployeeState,
    id: Employee["id"]
) => {
    const employee = state.employees.find(
        (employee) => employee.id === id
    );

    const originalEmployee = state.originalEmployees.find(
        (employee) => employee.id === id
    );

    if (!employee || !originalEmployee) {
        return;
    }

    if (areEmployeesEqual(employee, originalEmployee)) {
        delete state.editedRows[id];
    } else {
        state.editedRows[id] = true;
    }

    updateUnsavedChanges(state);
};

const saveEmployeeById = (
    state: EmployeeState,
    id: Employee["id"]
) => {
    const employee = state.employees.find(
        (employee) => employee.id === id
    );

    const originalEmployeeIndex = state.originalEmployees.findIndex(
        (employee) => employee.id === id
    );

    if (!employee || originalEmployeeIndex === -1) {
        return;
    }

    state.originalEmployees[originalEmployeeIndex] = {
        ...employee,
    };

    delete state.editedRows[id];
    updateUnsavedChanges(state);
};

const restoreEmployeeById = (
    state: EmployeeState,
    id: Employee["id"]
) => {
    const originalEmployee = state.originalEmployees.find(
        (employee) => employee.id === id
    );

    const employeeIndex = state.employees.findIndex(
        (employee) => employee.id === id
    );

    if (!originalEmployee || employeeIndex === -1) {
        return;
    }

    state.employees[employeeIndex] = {
        ...originalEmployee,
    };

    delete state.editedRows[id];
    updateUnsavedChanges(state);
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
            state.editedRows = {};
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
                updateEditedRowState(state, id);
            }
        },

        saveChanges: (state) => {
            state.originalEmployees = state.employees.map((employee) => ({
                ...employee,
            }));

            state.hasUnsavedChanges = false;
            state.editedRows = {};
        },

        cancelChanges: (state) => {
            state.employees = state.originalEmployees.map((employee) => ({
                ...employee,
            }));

            state.hasUnsavedChanges = false;
            state.editedRows = {};
        },

        saveEmployee: (
            state,
            action: PayloadAction<Employee["id"]>
        ) => {
            saveEmployeeById(state, action.payload);
        },

        cancelEmployee: (
            state,
            action: PayloadAction<Employee["id"]>
        ) => {
            restoreEmployeeById(state, action.payload);
        },

        undoEmployee: (
            state,
            action: PayloadAction<Employee["id"]>
        ) => {
            restoreEmployeeById(state, action.payload);
        },
    },
});

export const {
    setEmployees,
    updateEmployee,
    saveChanges,
    cancelChanges,
    saveEmployee,
    cancelEmployee,
    undoEmployee,
} = employeeSlice.actions;

export default employeeSlice.reducer;
