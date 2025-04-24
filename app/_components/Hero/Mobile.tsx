import * as React from "react";
import { useColorScheme } from "@mui/material/styles";
import { Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import { HeroCard } from "@/app/_components/Hero/HeroCard";
import { WebGLBackground } from "@/app/_components/Wow";
import { useI18n } from "@/app/_providers/I18nProvider";
import { HeroProps } from "@/app/_components/Hero";
import { bebasNeue } from "@/fonts";

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
				alignItems: "center",
				display: "flex",
				flexDirection: "column",
				height: `100%`,
				justifyContent: "center",
				width: `100%`,
			}}>
			<WebGLBackground color={isDark ? [0.1, 0.5, 0.9] : [0.1, 0.3, 1.0]} />
			<Stack direction="column"
				sx={{
					alignItems: "start",
					display: "flex",
					flexDirection: "column",
					justifyContent: "start",
					marginTop: `50%`,
					position: "relative",
				}}>
				<Stack spacing={0} direction="column">
					<Typography
						variant="h3"
						sx={{
							color: `white`,
							fontFamily: bebasNeue.style.fontFamily,
							textShadow: `0px 0px 10px black`
						}}>
						Horizon
					</Typography>
					<Typography
						variant="h3"
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
						variant="h5"
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
				<Stack direction="column"
					sx={{
						alignItems: "center",
						display: "flex",
						justifyContent: "start",
						position: "relative",
					}}>
					<HeroCard type="primary" />
					<HeroCard type="secondary" />
				</Stack>
			}
		</Stack>
	);
}
