"use client";
import * as React from "react";
import { Typography, Modal, Card, Fade, Box, Stack, useTheme, useMediaQuery } from "@mui/material";
import { Company } from "@/app/_components/Email/Company"
import { Email } from "@/app/_components/Email/Email"
import { FormData, FormStatus } from "@/app/_providers/ModalFormProvider"
import { LegalInfo } from "@/app/_components/Email/LegalInfo"
import { Name } from "@/app/_components/Email/Name"
import { PageRating } from "@/app/_components/Email/PageRating"
import { Phone } from "@/app/_components/Email/Phone"
import { Submit } from "@/app/_components/Email/Submit"
import { useI18n } from "@/app/_providers/I18nProvider";

export interface FormProps {
	opened: boolean;
	close: () => void;
	setFormData: (next: FormData | ((prev: FormData) => FormData)) => void;
	formData: FormData;
	submitHandle: (payload: FormData) => void;
	formStatus: FormStatus;
	checkForm: (data: FormData) => Promise<boolean>
}

export interface FieldSetterProps {
	setFormData: (next: FormData | ((prev: FormData) => FormData)) => void;
	formData: FormData;
	submitHandle: (payload: FormData) => void;
	formStatus: FormStatus;
	checkForm: (data: FormData) => Promise<boolean>
}

const baseStyle = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	bgcolor: 'background.paper',
}

const styleDesktop = {
	width: `720px`,
	p: `3rem`,
};

const styleMd = {
	width: `540px`,
	height: `auto`,
	p: `1.5rem`,
};

const styleMobile = {
	width: `97%`,
	height: `auto`,
	maxHeight: `85%`,
	p: `0.5rem`,
};


export function Form({
	close,
	formData,
	opened,
	setFormData,
	submitHandle,
	formStatus,
	checkForm,
}: FormProps) {

	const theme = useTheme();
	const mediaQuery = [
		useMediaQuery(theme.breakpoints.down("lg")),
		useMediaQuery(theme.breakpoints.down("md")),
		useMediaQuery(theme.breakpoints.down("sm"))
	]
	const styles = [
		styleDesktop,
		styleMd,
		styleMobile,
	]
	const current = mediaQuery.reduce((a, e) => e ? ++a : a, 0)
	const { dict } = useI18n();
	if (!dict || !dict.FeedbackForm) return null;
	const { FeedbackForm } = dict;
	return (
		<Modal
			aria-describedby="modal-submit-description"
			aria-labelledby="modal-submit-title"
			onClose={close}
			open={opened}
		>
			<Fade in={opened}>
				<Card sx={{ ...baseStyle, ...styles[Math.max(current - 1, 0)] }} >
					<Stack direction={"row"} alignItems={"baseline"} justifyContent={"center"} m={current}>
						<Typography gutterBottom variant={`h3`} >
							{FeedbackForm.Header.value}
						</Typography>
					</Stack>
					<Box component="form" noValidate autoComplete="off">
						<Name
							formData={formData}
							submitHandle={submitHandle}
							setFormData={setFormData}
							formStatus={formStatus}
							checkForm={checkForm}
						/>
						<Email
							formData={formData}
							setFormData={setFormData}
							submitHandle={submitHandle}
							formStatus={formStatus}
							checkForm={checkForm}
						/>
						<Phone
							formData={formData}
							submitHandle={submitHandle}
							setFormData={setFormData}
							formStatus={formStatus}
							checkForm={checkForm}
						/>
						<Company
							formData={formData}
							submitHandle={submitHandle}
							setFormData={setFormData}
							formStatus={formStatus}
							checkForm={checkForm}
						/>
						<PageRating
							formData={formData}
							submitHandle={submitHandle}
							setFormData={setFormData}
							formStatus={formStatus}
							checkForm={checkForm}
						/>
						<LegalInfo />
						<Submit
							formData={formData}
							setFormData={setFormData}
							submitHandle={submitHandle}
							formStatus={formStatus}
							checkForm={checkForm}
						/>
					</Box>
				</Card>
			</Fade>
		</Modal>
	)
}
