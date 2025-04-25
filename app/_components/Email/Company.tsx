"use client";
import * as React from "react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { TextField, Stack, FormHelperText } from "@mui/material";
import { FormData, FormDataFieldStatus } from "@/app/_providers/ModalFormProvider";
import { FieldSetterProps } from "./Form";
import { useI18n } from "@/app/_providers/I18nProvider";

export function Company({ formData, setFormData, checkForm }: FieldSetterProps) {
	const [inputValue, setInputValue] = useState(formData.company);
	const debounceTimer = useRef<NodeJS.Timeout | null>(null);
	const maxLength = 50;

	const validateCompany = (company: string) => {
		if (company.length === 0) {
			return FormDataFieldStatus.Empty;
		}
		if (company.length > maxLength) {
			return FormDataFieldStatus.Invalid;
		}
		return FormDataFieldStatus.Valid;
	};

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		const newValue = event.target.value;
		const newStatus = validateCompany(newValue);

		setInputValue({
			value: newValue,
			status: newStatus
		});

		if (debounceTimer.current) {
			clearTimeout(debounceTimer.current);
		}

		debounceTimer.current = setTimeout(() => {
			setFormData((prev: FormData) => ({
				...prev,
				company: {
					value: newValue,
					status: newStatus
				}
			}));
			checkForm(formData);
		}, 300);
	};

	useEffect(() => {
		setInputValue(formData.company);
	}, [formData.company]);

	useEffect(() => {
		return () => {
			if (debounceTimer.current) {
				clearTimeout(debounceTimer.current);
			}
		};
	}, []);

	const { dict } = useI18n();
	if (!dict || !dict.FeedbackForm) return null;
	const { FeedbackForm } = dict;

	const getTextFieldColor = () => {
		if (inputValue.status === FormDataFieldStatus.Invalid) return "error";
		if (inputValue.status === FormDataFieldStatus.Valid) return "secondary";
		return "primary";
	};

	const getHelperText = () => {
		if (inputValue.status === FormDataFieldStatus.Invalid) {
			return `${FeedbackForm.Company.helperTextA} ${maxLength} ${FeedbackForm.Company.helperTextB}`;
		}
		if (inputValue.status === FormDataFieldStatus.Valid) {
			return `${inputValue.value.length}/${maxLength} ${FeedbackForm.Company.helperTextB}`;
		}
		return "";
	};

	return (
		<Stack direction={"row"} alignItems={"baseline"} m={1}>
			<TextField
				required={true}
				value={inputValue.value}
				fullWidth={true}
				size="small"
				type="text"
				label={FeedbackForm.Company.label}
				color={getTextFieldColor()}
				error={inputValue.status === FormDataFieldStatus.Invalid}
				variant="standard"
				onChange={handleInputChange}
				inputProps={{
					maxLength: maxLength
				}}
			/>
			{inputValue.value.length > 0 && (
				<FormHelperText sx={{ ml: 1 }}>
					{getHelperText()}
				</FormHelperText>
			)}
		</Stack>
	);
}