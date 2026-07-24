import { createColumnHelper } from "@tanstack/react-table";
import { Button } from "@mui/material";

import type { Employee } from "../../types/employee";

const columnHelper = createColumnHelper<Employee>();

export const columns = [
    columnHelper.accessor("employeeId", {
        header: ({ column }) => {
            const sortDirection = column.getIsSorted();
            const arrow =
                sortDirection === "asc"
                    ? "↑"
                    : sortDirection === "desc"
                        ? "↓"
                        : "↕";
            return (
                <Button
                    variant="text"
                    onClick={() => column.toggleSorting()}
                >
                    Employee ID {arrow}
                </Button>
            )
        },
    }),

    columnHelper.accessor("firstName", {
        header: "First Name",
    }),

    columnHelper.accessor("department", {
        header: "Department",
    }),
];