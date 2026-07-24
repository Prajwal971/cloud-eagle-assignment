import { memo, useCallback } from "react";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import UndoIcon from "@mui/icons-material/Undo";
import {
    IconButton,
    Stack,
    Tooltip,
} from "@mui/material";

import {
    cancelEmployee,
    saveEmployee,
    undoEmployee,
} from "../../store/employee/employeeSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import type { Employee } from "../../types/employee";

interface RowActionsProps {
    employeeId: Employee["id"];
}

const RowActions = ({ employeeId }: RowActionsProps) => {
    const dispatch = useAppDispatch();

    const isEdited = useAppSelector(
        (state) => Boolean(state.employee.editedRows[employeeId])
    );

    const handleSave = useCallback(() => {
        dispatch(saveEmployee(employeeId));
    }, [dispatch, employeeId]);

    const handleCancel = useCallback(() => {
        dispatch(cancelEmployee(employeeId));
    }, [dispatch, employeeId]);

    const handleUndo = useCallback(() => {
        dispatch(undoEmployee(employeeId));
    }, [dispatch, employeeId]);

    return (
        <Stack
            direction="row"
            spacing={0.5}
            sx={{ minWidth: 112 }}
        >
            <Tooltip title="Save row">
                <span>
                    <IconButton
                        aria-label="Save row"
                        color="primary"
                        disabled={!isEdited}
                        onClick={handleSave}
                        size="small"
                    >
                        <SaveIcon fontSize="small" />
                    </IconButton>
                </span>
            </Tooltip>

            <Tooltip title="Cancel row changes">
                <span>
                    <IconButton
                        aria-label="Cancel row changes"
                        color="error"
                        disabled={!isEdited}
                        onClick={handleCancel}
                        size="small"
                    >
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </span>
            </Tooltip>

            <Tooltip title="Undo row changes">
                <span>
                    <IconButton
                        aria-label="Undo row changes"
                        disabled={!isEdited}
                        onClick={handleUndo}
                        size="small"
                    >
                        <UndoIcon fontSize="small" />
                    </IconButton>
                </span>
            </Tooltip>
        </Stack>
    );
};

export default memo(RowActions);
