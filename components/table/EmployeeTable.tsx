import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
    Paper,
    type SelectChangeEvent,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
} from "@mui/material";
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    type Row,
    useReactTable,
    type SortingState,
    getPaginationRowModel,
    type PaginationState,
} from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";

import type { Employee } from "../../types/employee";
import { getColumns } from "./columns";

const ROW_HEIGHT = 60;
const OVERSCAN_ROWS = 8;

interface EmployeeTableProps {
    data: Employee[];
    globalFilter: string;
    onGlobalFilterChange: (value: string) => void;
}

interface EmployeeDataRowProps {
    measureElement: (element: HTMLTableRowElement | null) => void;
    row: Row<Employee>;
    virtualIndex: number;
}

const EmployeeDataRow = memo(({
    measureElement,
    row,
    virtualIndex,
}: EmployeeDataRowProps) => (
    <TableRow
        hover
        data-index={virtualIndex}
        ref={measureElement}
    >
        {row.getVisibleCells().map((cell) => (
            <TableCell key={cell.id}>
                {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                )}
            </TableCell>
        ))}
    </TableRow>
));

EmployeeDataRow.displayName = "EmployeeDataRow";

const EmployeeTable = ({
    data,
    globalFilter,
    onGlobalFilterChange,
}: EmployeeTableProps) => {
    const [sorting, setSorting] = useState<SortingState>([]);
    const columns = useMemo(() => getColumns(), []);
    const tableContainerRef = useRef<HTMLDivElement>(null);
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 25,
    });

    const table = useReactTable({
        data,
        columns,

        state: {
            sorting,
            globalFilter,
            pagination,
        },
        onGlobalFilterChange,
        onSortingChange: setSorting,
        onPaginationChange: setPagination,

        getSortedRowModel: getSortedRowModel(),
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    const { rows } = table.getRowModel();
    const visibleColumnCount = table.getVisibleLeafColumns().length;

    const rowVirtualizer = useVirtualizer({
        count: rows.length,
        getScrollElement: () => tableContainerRef.current,
        estimateSize: () => ROW_HEIGHT,
        getItemKey: (index) => rows[index]?.id ?? index,
        overscan: OVERSCAN_ROWS,
    });

    const measureElement = useCallback(
        (element: HTMLTableRowElement | null) => {
            if (element) {
                rowVirtualizer.measureElement(element);
            }
        },
        [rowVirtualizer]
    );

    const virtualRows = rowVirtualizer.getVirtualItems();
    const paddingTop = virtualRows[0]?.start ?? 0;
    const paddingBottom =
        virtualRows.length > 0
            ? rowVirtualizer.getTotalSize() -
            virtualRows[virtualRows.length - 1].end
            : 0;

    const handlePageSizeChange = (
        event: SelectChangeEvent<number>
    ) => {
        table.setPageSize(Number(event.target.value));
    };

    useEffect(() => {
        table.setPageIndex(0);
    }, [globalFilter]);

    return (
        <Paper elevation={2}>
            <TableContainer
                ref={tableContainerRef}
                sx={{
                    maxHeight: 600,
                    overflow: "auto",
                }}
            >
                <Table stickyHeader>
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
                        {paddingTop > 0 && (
                            <TableRow aria-hidden="true">
                                <TableCell
                                    colSpan={visibleColumnCount}
                                    sx={{
                                        border: 0,
                                        height: paddingTop,
                                        p: 0,
                                    }}
                                />
                            </TableRow>
                        )}

                        {virtualRows.map((virtualRow) => {
                            const row = rows[virtualRow.index];

                            return (
                                <EmployeeDataRow
                                    key={row.id}
                                    measureElement={measureElement}
                                    row={row}
                                    virtualIndex={virtualRow.index}
                                />
                            );
                        })}

                        {paddingBottom > 0 && (
                            <TableRow aria-hidden="true">
                                <TableCell
                                    colSpan={visibleColumnCount}
                                    sx={{
                                        border: 0,
                                        height: paddingBottom,
                                        p: 0,
                                    }}
                                />
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>


            <TablePagination
                component="div"
                count={table.getFilteredRowModel().rows.length}
                page={table.getState().pagination.pageIndex}
                rowsPerPage={table.getState().pagination.pageSize}
                onPageChange={(_, newPage) => {
                    table.setPageIndex(newPage);
                }}
                onRowsPerPageChange={(event) => {
                    table.setPageSize(Number(event.target.value));
                    table.setPageIndex(0);
                }}
                rowsPerPageOptions={[10, 25, 50, 100]}
            />
        </Paper >
    );
};

export default EmployeeTable;
