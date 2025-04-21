import * as React from "react";
import { useColorScheme } from "@mui/material/styles";
import { useI18n } from "../../_providers/I18nProvider";
import Stack from "@mui/material/Stack";
import { Grid, Typography } from "@mui/material";
import { bebasNeue } from "../../../fonts";

import { WebGLBackground } from "../Wow";
import "../gradient-text.css";
import { HeroProps } from "../Hero";
import { HeroCard } from "./HeroCard";

export interface HeroContent {
	slogan: string;
}

export function Desktop({ fullsize = false }: HeroProps) {
	const { mode } = useColorScheme();
	const { dict } = useI18n();

	if (!dict || !dict.Home || !dict.Home.Hero) return null;

	const content: HeroContent = dict.Home.Hero;
	const isDark = mode === "dark";
	const baseColor = isDark
		? "var(--mui-palette-secondary-main)"
		: "var(--mui-palette-secondary-main)";
	const accentColor = isDark
		? "var(--mui-palette-secondary-light)"
		: "var(--mui-palette-primary-main)";

	return (
		<Stack direction="column"
			sx={{
				height: `100%`,
				width: `100%`,
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<WebGLBackground color={isDark ? [0.1, 0.5, 0.9] : [0.1, 0.3, 1.0]} />

			<Stack direction="column"
				sx={{
					paddingTop: `20%`,
					position: "relative",
					height: `100%`,
					width: `100%`,
					display: "flex",
					flexDirection: "column",
					alignItems: "start",
					justifyContent: "start",
				}}>
				<Stack spacing={4} direction="row">
					<Typography
						variant="h1"
						sx={{
							fontFamily: bebasNeue.style.fontFamily,
							color: baseColor
						}}
					>
						Horizon™
					</Typography>
					<Typography
						variant="h1"
						sx={{
							fontFamily: bebasNeue.style.fontFamily,
							color: accentColor
						}}
					>
						Time Series Data
					</Typography>
				</Stack>
				<Stack
					direction="column"
					sx={{
						justifyContent: "start"
					}}
				>
					<Typography
						variant="h4"
						className={isDark ? "gradient-text" : "gradient-text__dark"}
						sx={{
							fontFamily: bebasNeue.style.fontFamily,
							textAlign: "center",
							color: baseColor
						}}>
						{content.slogan}
					</Typography>
				</Stack>
			</Stack>
			{fullsize &&
				<Grid container spacing={2}
					sx={{
						marginTop: `10%`,
						width: `100%`,
						height: `100%`,
						zIndex: `1`
					}}>
					<HeroCard type="primary" />
					<HeroCard type="secondary" />
				</Grid>
			}
		</Stack>
	);
}
