"use client";
import * as React from "react";
import { CircularProgress, Button, Stack } from "@mui/material";
import { FieldSetterProps } from "./Form";
import { FormDataFieldStatus } from "@/app/_providers/ModalFormProvider";
import { useI18n } from "@/app/_providers/I18nProvider";

export function Submit({ formData, submitHandle, formStatus, checkForm }: FieldSetterProps) {
	const [isFormValid, setIsFormValid] = React.useState(false);
	const [isSubmitting, setIsSubmitting] = React.useState(false);
	React.useEffect(() => {
		const validateForm = async () => {
			const isValid = await checkForm(formData);
			setIsFormValid(isValid);
		};
		validateForm();
	}, [formData, checkForm]);

	const handleClick = async () => {
		setIsSubmitting(true);
		try {
			const isValid = await checkForm(formData);
			if (isValid) {
				await submitHandle(formData);
			}
		} finally {
			setIsSubmitting(false);
		}
	};
	const isPending = formStatus.status === FormDataFieldStatus.Pending || isSubmitting;
	const { dict } = useI18n();
	if (!dict || !dict.FeedbackForm) return null;
	const { FeedbackForm } = dict;
	return (
		<Stack direction="row" justifyContent="center" alignItems="center" m={3}>
			{isPending && (
				<CircularProgress
					color="primary"
					sx={{ zIndex: 3, position: "absolute", right: "15%", p: 0.3 }}
				/>
			)}
			<Button
				fullWidth
				disabled={!isFormValid || isPending}
				size="large"
				variant="contained"
				color={isPending ? "warning" : "secondary"}
				sx={{ color: "primary.light" }}
				onClick={handleClick}
			>
				{FeedbackForm.Submit.button}
			</Button>
		</Stack>
	);
}