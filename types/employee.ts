export interface Employee {
    id: number;
    name: string;
    email: string;
    department: string;
    designation: string;
    salary: number;
    quantity: number;
    joiningDate: string;
    status: "Active" | "Inactive";
}