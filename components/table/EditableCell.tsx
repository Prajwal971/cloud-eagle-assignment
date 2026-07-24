import {
    memo,
    useCallback,
    useState,
    type ChangeEvent,
    type KeyboardEvent,
} from "react";
import { MenuItem, TextField, Typography } from "@mui/material";

import type { Employee } from "../../types/employee";
import { useAppDispatch } from "../../store/hooks";
import { updateEmployee } from "../../store/employee/employeeSlice";
import { STATUSES } from "../../constants";

interface EditableCellProps {
    employee: Employee;
    field: keyof Employee;
}

const EditableCell = ({
    employee,
    field,
}: EditableCellProps) => {
    const dispatch = useAppDispatch();
    const displayValue = String(employee[field]);
    const [isEditing, setIsEditing] = useState(false);
    const [localValue, setLocalValue] = useState(displayValue);
    const isNumberField =
        field === "salary" || field === "quantity";

    const startEditing = useCallback(() => {
        setLocalValue(displayValue);
        setIsEditing(true);
    }, [displayValue]);

    const cancelEditing = useCallback(() => {
        setLocalValue(displayValue);
        setIsEditing(false);
    }, [displayValue]);

    const handleChange = useCallback((
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setLocalValue(event.target.value);
    }, []);

    const save = useCallback(() => {
        if (localValue === displayValue) {
            setIsEditing(false);
            return;
        }

        let value: Employee[keyof Employee];

        if (field === "salary" || field === "quantity") {
            value = Number(localValue);
        } else {
            value = localValue as Employee[keyof Employee];
        }

        dispatch(
            updateEmployee({
                id: employee.id,
                field,
                value,
            })
        );

        setIsEditing(false);
    }, [
        dispatch,
        displayValue,
        employee.id,
        field,
        localValue,
    ]);

    const handleKeyDown = useCallback((
        event: KeyboardEvent<HTMLDivElement>
    ) => {
        if (event.key === "Enter") {
            event.preventDefault();
            save();
        }

        if (event.key === "Escape") {
            event.preventDefault();
            cancelEditing();
        }
    }, [cancelEditing, save]);

    if (!isEditing) {
        return (
            <Typography
                onClick={startEditing}
                sx={{
                    cursor: "pointer",
                    minHeight: 40,
                    display: "flex",
                    alignItems: "center",
                }}
            >
                {displayValue}
            </Typography>
        );
    }

    if (field === "status") {
        return (
            <TextField
                autoFocus
                select
                variant="standard"
                fullWidth
                value={localValue}
                onChange={handleChange}
                onBlur={save}
                onKeyDown={handleKeyDown}
            >
                {STATUSES.map((status) => (
                    <MenuItem
                        key={status}
                        value={status}
                    >
                        {status}
                    </MenuItem>
                ))}
            </TextField>
        );
    }

    return (
        <TextField
            autoFocus
            type={
                isNumberField
                    ? "number"
                    : "text"
            }
            variant="standard"
            fullWidth
            value={localValue}
            onChange={handleChange}
            onBlur={save}
            onKeyDown={handleKeyDown}
        />
    );
};

export default memo(
    EditableCell,
    (previousProps, nextProps) => (
        previousProps.field === nextProps.field &&
        previousProps.employee.id === nextProps.employee.id &&
        previousProps.employee[previousProps.field] ===
        nextProps.employee[nextProps.field]
    )
);
