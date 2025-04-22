import * as React from "react";
import { useEffect, useState } from "react";
import { useColorScheme } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import { SvgIcon, Box, Card, CardActionArea, CardContent, Typography, useMediaQuery } from "@mui/material";
import FlashOnIcon from '@mui/icons-material/FlashOn';
import TurnRightIcon from '@mui/icons-material/TurnRight';
import DatasetIcon from '@mui/icons-material/Dataset';
import DataObjectIcon from '@mui/icons-material/DataObject';
import DataArrayIcon from '@mui/icons-material/DataArray';
import AreaChartIcon from '@mui/icons-material/AreaChart';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import OnlinePredictionIcon from '@mui/icons-material/OnlinePrediction';
import BatchPrediction from '@mui/icons-material/BatchPrediction';
import { useI18n } from "@/app/_providers/I18nProvider";

export interface HeroCardProps {
	type: "primary" | "secondary";
}

export interface HeroCardBoxProps {
	offset: number;
	size: number;
	Icon: typeof SvgIcon;
	color: string;
}

export interface HeroCardProps {
	type: "primary" | "secondary";
}

export interface HeroCardIllustrationProps {
	type: HeroCardProps["type"];
}


export function HeroCardIllustrationBox({ color = "black", size = 6, offset = 0, Icon }: HeroCardBoxProps) {
	return (
		<Box sx={{
			position: `relative`,
			left: `${offset * 1.5}px`,
			top: `${-offset * 0.5}px`,
			width: `${size}rem`,
			height: `${size}rem`,
			background: `linear-gradient(-30deg, rgba(0,0,0,0.1), rgba(0,0,0,0.5))`,
			border: `1px solid ${color}`,
			borderRadius: "var(--mui-shape-borderRadius)",
			display: `flex`,
			flexDirection: `column`,
			justifyContent: `center`,
			alignItems: `center`
		}}>
			<Icon sx={{ color: color, width: `64px`, height: `64px` }} />
		</Box>
	)
}

export function HeroCardIllustration({ type = "primary" }: HeroCardIllustrationProps) {
	const boxSize = 6;

	const firstBoxIcons = type == "primary"
		? [DatasetIcon, DataObjectIcon, DataArrayIcon]
		: [OnlinePredictionIcon, BatchPrediction];
	const secondBoxIcons = [AreaChartIcon, AutoGraphIcon]

	const [currentFirstIcon, setCurrentFirstIcon] = useState(0);
	const [currentSecondIcon, setCurrentSecondIcon] = useState(0);

	useEffect(() => {
		const firstInterval = setInterval(() => {
			setCurrentFirstIcon(prev => (prev + 1) % firstBoxIcons.length);
		}, 2000);

		const secondInterval = setInterval(() => {
			setCurrentSecondIcon(prev => (prev + 1) % secondBoxIcons.length);
		}, 6000);

		return () => {
			clearInterval(firstInterval);
			clearInterval(secondInterval);
		};
	}, [firstBoxIcons.length, secondBoxIcons.length]); 

	const colors = ["var(--mui-palette-common-white)", "var(--mui-palette-grey-900)"]

	return (
		<div style={{
			display: `flex`,
			width: `200px`,
			height: `200px`,
			justifyContent: `center`,
			alignItems: `center`,
			paddingRight: `65px`,
		}}>
			<div>
				<HeroCardIllustrationBox
					color={colors[type == "primary" ? 0 : 1]}
					Icon={firstBoxIcons[currentFirstIcon]}
					size={boxSize}
					offset={0}
				/>
				<HeroCardIllustrationBox
					color={colors[type == "primary" ? 0 : 1]}
					Icon={secondBoxIcons[currentSecondIcon]}
					size={boxSize}
					offset={boxSize * 8}
				/>
			</div>
		</div>
	);
}

export function HeroCard({ type }: HeroCardProps) {
	const { mode } = useColorScheme();
	const { dict } = useI18n();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("md"));
	if (!dict || !dict.Home || !dict.Home.Hero || !dict.Home.Hero.button) return null;
	const content = dict.Home.Hero.button[type == 'primary' ? 0 : 1]
	const isDark = mode === "dark";

	const primaryTheme = {
		background: isDark
			? `linear-gradient(-200deg,  var(--mui-palette-secondary-dark) 10%, var(--mui-palette-secondary-dark) 70%, var(--mui-palette-primary-main) 95%)`
			: `var(--mui-palette-secondary-dark)`
	}

	const SecondaryTheme = {
		background: `linear-gradient(-30deg,  var(--mui-palette-success-light) 0%, var(--mui-palette-success-dark) 30%, var(--mui-palette-success-dark) 60%)`
	}

	const t = { primary: primaryTheme, secondary: SecondaryTheme }[type]

	return (
		<Card sx={{
			margin: `0.5rem`,
			background: t.background,
			width: isMobile ? `80%` : `unset`
		}}>
			<CardActionArea
				sx={{
					'&[data-active]': {
						backgroundColor: 'action.selected',
						'&:hover': {
							backgroundColor: 'action.selectedHover',
						},
					},
				}}>
				<CardContent sx={{
					display: `flex`,
					flexDirection: `column`,
					justifyContent: `space-between`
				}}>
					<Stack direction={isMobile ? "column" : "row"} sx={{
						justifyContent: `center`,
						alignItems: `baseline`
					}}>
						<Stack direction={"column"}>
							<Stack
								direction={"row"}
								sx={{
									marginBottom: `0.5rem`,
									justifyContent: isMobile ? `center` : `start`,
									alignItems: `start`,
									maxWidth: '300px',
								}}
							>
								{type == 'primary'
									? <FlashOnIcon sx={{ color: "var(--mui-palette-warning-light)", marginRight: `5px` }} />
									: <OnlinePredictionIcon sx={{ color: "var(--mui-palette-primary-light)", marginRight: `5px` }} />
								}
								<Typography
									variant="h6"
									color={isDark ? "textPrimary" : "var(--mui-palette-primary-light)"}
									sx={{
										whiteSpace: 'normal',
										wordBreak: 'break-word',
										lineHeight: `1rem`
									}}
								>
									{content.title}
								</Typography>
							</Stack>
							<Stack direction={"column"} sx={{
								maxWidth: '300px',
							}}>
								<Typography
									variant="body2"
									sx={{
										color: "var(--mui-palette-primary-light)",
										whiteSpace: 'normal',
										wordBreak: 'break-word',
										lineHeight: `1rem`
									}}
								>{content.description}</Typography>
							</Stack>
						</Stack>
						<div style={{
							display: `flex`,
							flexDirection: `column`,
							alignItems: `center`,
							width: isMobile ? `100%` : `auto`
						}}>
							<div style={{
								display: `flex`,
								position: `relative`,
								left: `40px`,
								top: `80px`
							}}><TurnRightIcon sx={{ color: type == "primary" ? `white` : "var(--mui-palette-grey-900)", width: `64px`, height: `64px`, transform: `rotate(90deg)` }} /></div>
							<HeroCardIllustration type={type} />
						</div>
					</Stack>
				</CardContent>
			</CardActionArea>
		</Card >
	)
}