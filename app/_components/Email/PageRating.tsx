"use client";
import * as React from "react";
import { Rating, Typography, Stack, FormHelperText } from "@mui/material";
import OfflineBoltOutlinedIcon from '@mui/icons-material/OfflineBoltOutlined';
import OfflineBoltIcon from '@mui/icons-material/OfflineBolt';
import { FormData, FormDataFieldStatus } from "@/app/_providers/ModalFormProvider";
import { FieldSetterProps } from "./Form";
import { useI18n } from "@/app/_providers/I18nProvider";

export function PageRating({ formData, setFormData, checkForm }: FieldSetterProps) {
    const { dict } = useI18n();
    if (!dict || !dict.FeedbackForm) return null;
    const { FeedbackForm } = dict;

    const validateRating = (value: number) => {
        if (value < 0) return FormDataFieldStatus.Invalid;
        if (value > 5) return FormDataFieldStatus.Invalid;
        return FormDataFieldStatus.Valid;
    };

    const handleRatingChange = (event: React.SyntheticEvent, value: number | null) => {
        const newValue = `${value ?? 0}`;
        const newStatus = validateRating(value ?? 0);

        setFormData((prev: FormData) => ({
            ...prev,
            rating: {
                ...prev.rating,
                value: newValue,
                status: newStatus
            }
        }));

        checkForm(formData);
    };

    const getHelperText = () => {
        if (formData.rating.status === FormDataFieldStatus.Invalid) {
            return FeedbackForm.PageRating.helperTextA;
        }
        return `Selected: ${formData.rating.value}`;
    };

    return (
        <Stack direction={"row"} alignItems={"center"} m={1}>
            <Typography
                component="legend"
                sx={{
                    marginRight: `1rem`,
                    textTransform: "capitalize",
                    userSelect: `none`
                }}
            >
                Rate UX
            </Typography>
            <Rating
                value={parseFloat(formData.rating.value)}
                size="medium"
                precision={0.5}
                max={5}
                icon={<OfflineBoltIcon fontSize="inherit" />}
                emptyIcon={<OfflineBoltOutlinedIcon fontSize="inherit" />}
                onChange={handleRatingChange}
                sx={{
                    userSelect: `none`
                }}
            />
            <FormHelperText sx={{ ml: 2, userSelect: `none` }} >
                {getHelperText()}
            </FormHelperText>
        </Stack>
    );
}
