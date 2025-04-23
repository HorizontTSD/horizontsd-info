import * as React from "react";
import { useI18n } from "../../_providers/I18nProvider";
import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";
import { bebasNeue } from "../../../fonts";
import { HeroProps } from "../Hero";
import { HeroCard } from "./HeroCard";
import { WebGLBackground } from "../Wow";
import { useColorScheme } from "@mui/material/styles";

export interface HeroContent {
	slogan: string;
}

export function Mobile({ fullsize = false }: HeroProps) {
	const { dict } = useI18n();
	const { mode } = useColorScheme();
	const isDark = mode === "dark";
	if (!dict || !dict.Home || !dict.Home.Hero) return null;
	const content: HeroContent = dict.Home.Hero;
	const accentColor = `var(--mui-palette-secondary-contrastText)`
	return (
		<Stack direction="column"
			sx={{
				height: `100%`,
				width: `100%`,
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
			}}>
			<WebGLBackground color={isDark ? [0.1, 0.5, 0.9] : [0.1, 0.3, 1.0]} />
			<Stack direction="column"
				sx={{
					marginTop: `50%`,
					position: "relative",
					display: "flex",
					flexDirection: "column",
					alignItems: "start",
					justifyContent: "start",
				}}>
				<Stack spacing={0} direction="column">
					<Typography
						variant="h3"
						sx={{
							fontFamily: bebasNeue.style.fontFamily,
							color: `white`,
							textShadow: `0px 0px 10px black`
						}}
					>
						Horizon
					</Typography>
					<Typography
						variant="h3"
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
						variant="h5"
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
				<Stack direction="column"
					sx={{
						position: "relative",
						display: "flex",
						alignItems: "center",
						justifyContent: "start",
					}}>
					<HeroCard type="primary" />
					<HeroCard type="secondary" />
				</Stack>
			}
		</Stack>
	);
}
