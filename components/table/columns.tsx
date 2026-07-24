import { createColumnHelper } from "@tanstack/react-table";
import SortableHeader from "./SortableHeader"

import type { Employee } from "../../types/employee";

const columnHelper = createColumnHelper<Employee>();

export const columns = [
    columnHelper.accessor("employeeId", {
        header: ({ column }) => (
            <SortableHeader
                title="Employee ID"
                column={column}
            />
        ),
    }),

    columnHelper.accessor("firstName", {
        header: ({ column }) => (
            <SortableHeader
                title="First Name"
                column={column}
            />
        ),
    }),

    columnHelper.accessor("department", {
        header: ({ column }) => (
            <SortableHeader
                title="Department"
                column={column}
            />
        ),
    }),
];