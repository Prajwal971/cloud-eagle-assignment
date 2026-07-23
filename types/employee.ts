export type EmployeeStatus = "Active" | "Inactive";

export interface Employee {
    id: number;
    employeeId: string;

    firstName: string;
    lastName: string;

    email: string;

    department: string;
    designation: string;

    salary: number;
    quantity: number;

    joiningDate: String;

    status: EmployeeStatus;
}