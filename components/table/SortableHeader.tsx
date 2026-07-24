import TableSortLabel from "@mui/material/TableSortLabel";
import type { HeaderContext } from "@tanstack/react-table";
import type { Employee } from "../../types/employee";

interface SortableHeaderProps {
    title: string;
    column: HeaderContext<Employee, unknown>["column"];
}

function SortableHeader({
    title,
    column,
}: SortableHeaderProps) {
    const isSorted = column.getIsSorted();

    return (
        <TableSortLabel
            active={!!isSorted}
            direction={isSorted === "desc" ? "desc" : "asc"}
            onClick={() => column.toggleSorting()}
        >
            {title}
        </TableSortLabel>
    );
}

export default SortableHeader;