import { createColumnHelper } from "@tanstack/react-table";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import UndoIcon from "@mui/icons-material/Undo";
import { IconButton, Stack } from "@mui/material";

import SortableHeader from "./SortableHeader"
import type { Employee } from "../../types/employee";
import EditableCell from "./EditableCell"

const columnHelper = createColumnHelper<Employee>();

export const getColumns = () => [
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
        cell: ({ row }) => (
            <EditableCell
                employee={row.original}
                field="firstName"
            />
        ),
    }),

    columnHelper.accessor("lastName", {
        header: ({ column }) => (
            <SortableHeader
                title="Last Name"
                column={column}
            />
        ),
        cell: ({ row }) => (
            <EditableCell
                employee={row.original}
                field="lastName"
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
        cell: ({ row }) => (
            <EditableCell
                employee={row.original}
                field="department"
            />
        ),
    }),


    columnHelper.accessor("designation", {
        header: ({ column }) => (
            <SortableHeader
                title="Designation"
                column={column}
            />
        ),
        cell: ({ row }) => (
            <EditableCell
                employee={row.original}
                field="designation"
            />
        ),
    }),

    columnHelper.accessor("salary", {
        header: ({ column }) => (
            <SortableHeader
                title="Salary"
                column={column}
            />
        ),
        cell: ({ row }) => (
            <EditableCell
                employee={row.original}
                field="salary"
            />
        ),
    }),

    columnHelper.accessor("quantity", {
        header: ({ column }) => (
            <SortableHeader
                title="Quantity"
                column={column}
            />
        ),
        cell: ({ row }) => (
            <EditableCell
                employee={row.original}
                field="quantity"
            />
        ),
    }),

    columnHelper.accessor("status", {
        header: ({ column }) => (
            <SortableHeader
                title="Status"
                column={column}
            />
        ),
        cell: ({ row }) => (
            <EditableCell
                employee={row.original}
                field="status"
            />
        ),
    }),

    columnHelper.accessor("joiningDate", {
        header: ({ column }) => (
            <SortableHeader
                title="Joining Date"
                column={column}
            />
        ),
    }),

    columnHelper.display({
        id: "actions",
        header: "Actions",
        enableSorting: false,
        cell: () => (
            <Stack direction="row" spacing={1}>
                <IconButton size="small">
                    <EditIcon fontSize="small" />
                </IconButton>

                <IconButton size="small">
                    <SaveIcon fontSize="small" />
                </IconButton>

                <IconButton size="small">
                    <CloseIcon fontSize="small" />
                </IconButton>

                <IconButton size="small">
                    <UndoIcon fontSize="small" />
                </IconButton>
            </Stack>
        ),
    }),

];