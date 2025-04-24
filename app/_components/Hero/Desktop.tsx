import * as React from "react";
import { useColorScheme } from "@mui/material/styles";
import { Grid, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import { HeroCard } from "@/app/_components/Hero/HeroCard";
import { useI18n } from "@/app/_providers/I18nProvider";
import { WebGLBackground } from "@/app/_components/Wow";
import { HeroProps } from "@/app/_components/Hero";
import { bebasNeue } from "@/fonts";

export interface HeroContent {
	slogan: string;
}

export function Desktop({ fullsize = false }: HeroProps) {
	const { mode } = useColorScheme();
	const { dict } = useI18n();
	if (!dict || !dict.Home || !dict.Home.Hero) return null;
	const accentColor = `var(--mui-palette-secondary-contrastText)`
	const content: HeroContent = dict.Home.Hero;
	const isDark = mode === "dark";
	return (
		<Stack direction="column"
			sx={{
				alignItems: "center",
				background: isDark ? `transparent` : `#FAFAFA`,
				borderRadius: "var(--mui-shape-borderRadius)",
				display: "flex",
				height: `100%`,
				justifyContent: "center",
				padding: `2rem`,
				width: `100%`,
				zIndex: 3,
			}}>
			<WebGLBackground color={isDark ? [0.1, 0.5, 0.9] : [0.1, 0.3, 1.0]} />
			<Stack direction="column"
				sx={{
					alignItems: "start",
					display: "flex",
					flexDirection: "column",
					height: `100%`,
					justifyContent: "start",
					position: "relative",
					width: `100%`,
				}}>
				<Stack spacing={3} direction="row">
					<Typography
						variant="h1"
						sx={{
							color: `#FAFAFA`,
							fontFamily: bebasNeue.style.fontFamily,
							textShadow: `0px 0px 10px black`
						}}>
						Horizon
					</Typography>
					<Typography
						variant="h1"
						sx={{
							color: accentColor,
							fontFamily: bebasNeue.style.fontFamily,
						}}>
						Time Series Data
					</Typography>
				</Stack>
				<Stack
					direction="column"
					sx={{
						justifyContent: "start"
					}}>
					<Typography
						variant="h4"
						sx={{
							color: accentColor,
							fontFamily: bebasNeue.style.fontFamily,
							textAlign: "center",
						}}>
						{content.slogan}
					</Typography>
				</Stack>
			</Stack>
			{fullsize &&
				<Grid container spacing={1}
					sx={{
						height: `100%`,
						marginTop: `5%`,
						width: `100%`,
						zIndex: `1`
					}}>
					<HeroCard type="primary" />
					<HeroCard type="secondary" />
				</Grid>
			}
		</Stack>
	);
}
