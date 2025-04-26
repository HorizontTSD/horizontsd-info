"use client";
import * as React from "react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { CircularProgress, TextField, Stack } from "@mui/material";
import { FormData, FormDataFieldStatus } from "@/app/_providers/ModalFormProvider";
import { FieldSetterProps } from "./Form";
import validator from 'validator';
import { useI18n } from "@/app/_providers/I18nProvider";

export function Email({ formData, setFormData, checkForm }: FieldSetterProps) {
	const [inputValue, setInputValue] = useState(formData.email);
	const [isValidating, setIsValidating] = useState(false);
	const debounceTimer = useRef<NodeJS.Timeout | null>(null);
	const validateEmail = async (email: string) => {
		setIsValidating(true);
		try {
			const response = await fetch("/api/internal/validate", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email }),
			});
			const { en } = await response.json();
			return en == "Email - Valid" ? FormDataFieldStatus.Valid : FormDataFieldStatus.Invalid;
		} catch {
			return FormDataFieldStatus.Invalid;
		} finally {
			setIsValidating(false);
		}
	};

	const handleInputChange = async (event: ChangeEvent<HTMLInputElement>) => {
		const newValue = event.target.value;
		let newStatus = FormDataFieldStatus.Empty;
		if (newValue.length === 0) {
			newStatus = FormDataFieldStatus.Empty;
		} else if (!validator.isEmail(newValue)) {
			newStatus = FormDataFieldStatus.Invalid;
		} else {
			newStatus = FormDataFieldStatus.Pending;
		}

		setInputValue({
			value: newValue,
			status: newStatus
		});

		if (debounceTimer.current) {
			clearTimeout(debounceTimer.current);
		}

		if (newStatus !== FormDataFieldStatus.Invalid) {
			debounceTimer.current = setTimeout(async () => {
				const validatedStatus = await validateEmail(newValue);
				setInputValue(prev => ({
					...prev,
					status: validatedStatus
				}));
				setFormData((prev: FormData) => ({
					...prev,
					email: {
						value: newValue,
						status: validatedStatus
					}
				}));
				checkForm(formData);
			}, 1800);
		} else {
			setFormData((prev: FormData) => ({
				...prev,
				email: {
					value: newValue,
					status: newStatus
				}
			}));
			checkForm(formData);
		}
	};

	useEffect(() => {
		setInputValue(formData.email);
	}, [formData.email]);

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
		if (inputValue.value.length === 0) return "";
		if (inputValue.status === FormDataFieldStatus.Invalid) {
			return FeedbackForm.Email.helperA;
		}
		if (inputValue.status === FormDataFieldStatus.Valid) {
			return FeedbackForm.Email.helperB;
		}
		return "";
	};
	return (
		<Stack direction="row" alignItems="start" m={1} position="relative">
			{(inputValue.status === FormDataFieldStatus.Pending || isValidating) && (
				<CircularProgress
					color="secondary"
					size={24}
					sx={{
						userSelect: `none`,
						position: 'absolute',
						right: `0%`,
						top: `18%`,
						zIndex: 1
					}}
				/>
			)}
			<TextField
				required={true}
				color={getTextFieldColor()}
				value={inputValue.value}
				error={inputValue.status === FormDataFieldStatus.Invalid && inputValue.value.length > 0}
				fullWidth={true}
				size="small"
				type="email"
				label={FeedbackForm.Email.label}
				variant="standard"
				helperText={getHelperText()}
				onChange={handleInputChange}
				disabled={isValidating}
			/>
		</Stack>
	);
}
