import * as React from "react";
import { useColorScheme } from "@mui/material/styles";
import { useI18n } from "../../_providers/I18nProvider";
import Stack from "@mui/material/Stack";
import { Grid, Typography } from "@mui/material";
import { bebasNeue } from "../../../fonts";

import { HeroProps } from "../Hero";
import { HeroCard } from "./HeroCard";
import { WebGLBackground } from "../Wow";

export interface HeroContent {
	slogan: string;
}

export function Desktop({ fullsize = false }: HeroProps) {
	const { mode } = useColorScheme();
	const { dict } = useI18n();

	if (!dict || !dict.Home || !dict.Home.Hero) return null;

	const content: HeroContent = dict.Home.Hero;
	const isDark = mode === "dark";
	const accentColor = `var(--mui-palette-secondary-contrastText)`

	return (
		<Stack direction="column"
			sx={{
				zIndex: 3,
				height: `100%`,
				width: `100%`,
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				background: isDark ? `transparent` : `#FAFAFA`,
				padding: `2rem`,
				borderRadius: "var(--mui-shape-borderRadius)",
			}}
		>
            <WebGLBackground color={isDark ? [0.1, 0.5, 0.9] : [0.1, 0.3, 1.0]} />
			<Stack direction="column"
				sx={{
					position: "relative",
					height: `100%`,
					width: `100%`,
					display: "flex",
					flexDirection: "column",
					alignItems: "start",
					justifyContent: "start",

				}}>
				<Stack spacing={3} direction="row">
					<Typography
						variant="h1"
						sx={{
							fontFamily: bebasNeue.style.fontFamily,
							color: `#FAFAFA`,
							textShadow: `0px 0px 10px black`
						}}
					>
						Horizon
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
						sx={{
							fontFamily: bebasNeue.style.fontFamily,
							textAlign: "center",
							color: accentColor
						}}>
						{content.slogan}
					</Typography>
				</Stack>
			</Stack>
			{fullsize &&
				<Grid container spacing={1}
					sx={{
						marginTop: `5%`,
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
