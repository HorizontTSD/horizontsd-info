"use client";
import * as React from "react";
import Link from "next/link";
import { Typography, Stack } from "@mui/material";
import { useI18n } from "@/app/_providers/I18nProvider";

export function LegalInfo() {
	const { dict } = useI18n();
	if (!dict || !dict.FeedbackForm) return null;
	const { FeedbackForm } = dict;
	return (
		<Stack direction={"column"} alignItems={"baseline"} m={1}>
			<Typography sx={{ fontSize: `0.6em` }} color="textSecondary" variant="caption">{FeedbackForm.LegalInfo.A}</Typography>
			<Typography sx={{ fontSize: `0.6em` }} color="textSecondary" variant="caption">{FeedbackForm.LegalInfo.B} <Link href={"/privacy"}>{FeedbackForm.LegalInfo.C}</Link>.</Typography>
			<Typography sx={{ fontSize: `0.6em` }} color="textSecondary" variant="caption">{FeedbackForm.LegalInfo.D} <Link href={`mailto:${process.env.NEXT_PUBLIC_EMAIL_LEGAL}`}>{process.env.NEXT_PUBLIC_EMAIL_LEGAL}</Link>.</Typography>
		</Stack>
	)
}
