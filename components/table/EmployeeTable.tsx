import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import {
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    useReactTable,
    type SortingState,
} from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";


import type { Employee } from "../../types/employee";
import { columns } from "./columns";
import { useState } from "react";

interface EmployeeTableProps {
    data: Employee[];
    globalFilter: string;
    onGlobalFilterChange: (value: string) => void;
}

const EmployeeTable = ({
    data,
    globalFilter,
    onGlobalFilterChange,
}: EmployeeTableProps) => {
    const [sorting, setSorting] = useState<SortingState>([]);

    const table = useReactTable({
        data,
        columns,

        state: {
            sorting,
            globalFilter,
        },
        onGlobalFilterChange,

        onSortingChange: setSorting,

        getSortedRowModel: getSortedRowModel(),

        getCoreRowModel: getCoreRowModel(),

        getFilteredRowModel: getFilteredRowModel(),
    });

    console.log(table);

    return (
        <Paper elevation={2}>

            <TableContainer>
                <Table>

                    <TableHead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableCell key={header.id}>
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableHead>

                    <TableBody>
                        {
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        }
                    </TableBody>

                </Table>

            </TableContainer>

        </Paper>
    );
};

export default EmployeeTable;