"use client";
import * as React from "react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { TextField, Stack, FormHelperText } from "@mui/material";
import { FormData, FormDataFieldStatus } from "@/app/_providers/ModalFormProvider";
import { FieldSetterProps } from "./Form";
import { useI18n } from "@/app/_providers/I18nProvider";

export function Name({ formData, setFormData, checkForm }: FieldSetterProps) {
    const maxLength = 50;
    const [inputValue, setInputValue] = useState(formData.name);
    const debounceTimer = useRef<NodeJS.Timeout | null>(null);

    const validateName = (name: string) => {
        if (name.length === 0) {
            return FormDataFieldStatus.Empty;
        }
        if (name.length > maxLength) {
            return FormDataFieldStatus.Invalid;
        }
        return FormDataFieldStatus.Valid;
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        const newStatus = validateName(newValue);

        setInputValue(prev => ({
            ...prev,
            value: newValue,
            status: newStatus
        }));

        if (debounceTimer.current) {
            clearTimeout(debounceTimer.current);
        }

        debounceTimer.current = setTimeout(() => {
            setFormData((prev: FormData) => ({
                ...prev,
                name: {
                    value: newValue,
                    status: newStatus
                }
            }));
            checkForm(formData);
        }, 300);
    };

    useEffect(() => {
        setInputValue(formData.name);
    }, [formData.name]);

    useEffect(() => {
        return () => {
            if (debounceTimer.current) {
                clearTimeout(debounceTimer.current);
            }
        };
    }, []);
    const getHelperText = () => {
        if (inputValue.status === FormDataFieldStatus.Invalid) {
            return `${FeedbackForm.Name.helperTextB} ${maxLength} ${FeedbackForm.Name.helperTextB}`;
        }
        if (inputValue.status === FormDataFieldStatus.Valid) {
            return `${inputValue.value.length}/${maxLength} ${FeedbackForm.Name.helperTextC}`;
        }
        return "";
    };
    const { dict } = useI18n();
    if (!dict || !dict.FeedbackForm) return null;
    const { FeedbackForm } = dict;
    return (
        <Stack direction={"row"} alignItems={"baseline"} m={1}>
            <TextField
                required={true}
                value={inputValue.value}
                fullWidth={true}
                size="small"
                type="text"
                label={FeedbackForm.Name.label}
                color="primary"
                variant="standard"
                onChange={handleInputChange}
                error={inputValue.status === FormDataFieldStatus.Invalid}
                inputProps={{
                    maxLength: maxLength
                }}

            />
            {inputValue.value.length > 0 && (
                <FormHelperText sx={{ ml: 1, userSelect: `none` }}>
                    {getHelperText()}
                </FormHelperText>
            )}
        </Stack>
    );
}