import type { Employee } from "../types/employee";

export const exportToCSV = (
    employees: Employee[],
    filename = "employees.csv"
) => {
    if (!employees.length) return;

    const headers = Object.keys(employees[0]);

    const csvRows = [
        headers.join(","),
        ...employees.map((employee) =>
            headers
                .map((header) => {
                    const value =
                        employee[header as keyof Employee];

                    return `"${String(value).replace(/"/g, '""')}"`;
                })
                .join(",")
        ),
    ];

    const blob = new Blob(
        [csvRows.join("\n")],
        {
            type: "text/csv;charset=utf-8;",
        }
    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = filename;

    link.click();

    URL.revokeObjectURL(url);
};