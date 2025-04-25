import * as React from "react";
import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import { SvgIcon, Box, Card, CardActionArea, CardContent, Typography, useMediaQuery, useColorScheme, Chip } from "@mui/material";
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
import { bebasNeue } from "@/fonts";
export interface HeroCardProps {
	type: "primary" | "secondary";
}

export interface HeroCardBoxProps {
	offset: number;
	size: number;
	Icon: typeof SvgIcon;
	type: "primary" | "secondary";
}

export interface HeroCardProps {
	type: "primary" | "secondary";
}

export interface HeroCardIllustrationProps {
	type: HeroCardProps["type"];
}

export function HeroCardIllustrationBox({ type, size = 6, offset = 0, Icon }: HeroCardBoxProps) {
	const { mode } = useColorScheme();
	const isDark = mode == 'dark'
	const primaryColor = isDark ?
		`var(--mui-palette-primary-light)`
		: `var(--mui-palette-text-primary)`
	const secondaryColor = isDark ?
		`var(--mui-palette-primary-light)`
		: `var(--mui-palette-text-primary)`
	return (
		<Box sx={{
			alignItems: `center`,
			background: type == "primary" ? `rgba(0,0,0,0.1)` : `rgba(255,255,255,0.1)`,
			borderRadius: "var(--mui-shape-borderRadius)",
			display: `flex`,
			flexDirection: `column`,
			height: `${size}rem`,
			justifyContent: `center`,
			left: `${offset * 1.5}px`,
			position: `relative`,
			top: `${-offset * 0.5}px`,
			width: `${size}rem`,
		}}>
			<Icon sx={{ color: type == "primary" ? primaryColor : secondaryColor, width: `64px`, height: `64px` }} />
		</Box>
	)
}

export function HeroCardIllustration({ type = "primary" }: HeroCardIllustrationProps) {
	const boxSize = 6;
	const firstBoxIcons = type == "primary"
		? [DatasetIcon, DataObjectIcon, DataArrayIcon]
		: [OnlinePredictionIcon, BatchPrediction];
	const secondBoxIcons = type == "primary" ? [AreaChartIcon, AutoGraphIcon] : [AutoGraphIcon, AreaChartIcon];
	const [currentFirstIcon, setCurrentFirstIcon] = useState(0);
	const [currentSecondIcon, setCurrentSecondIcon] = useState(0);
	useEffect(() => {
		const firstInterval = setInterval(() => {
			setCurrentFirstIcon(prev => (prev + 1) % firstBoxIcons.length);
		}, type == "primary" ? 2100 : 3200);

		const secondInterval = setInterval(() => {
			setCurrentSecondIcon(prev => (prev + 1) % secondBoxIcons.length);
		}, type == "primary" ? 6300 : 2400);
		return () => {
			clearInterval(firstInterval);
			clearInterval(secondInterval);
		};
	}, [type, firstBoxIcons.length, secondBoxIcons.length]);
	return (
		<div style={{
			alignItems: `center`,
			display: `flex`,
			height: `200px`,
			justifyContent: `center`,
			width: `200px`,
		}}>
			<div>
				<HeroCardIllustrationBox
					type={type}
					Icon={firstBoxIcons[currentFirstIcon]}
					size={boxSize}
					offset={0}
				/>
				<HeroCardIllustrationBox
					type={type}
					Icon={secondBoxIcons[currentSecondIcon]}
					size={boxSize}
					offset={boxSize * 8}
				/>
			</div>
		</div>
	);
}

function HeroCardDesktop({ type }: HeroCardProps) {
	const { dict } = useI18n();
	const theme = useTheme();
	const isMd = useMediaQuery(theme.breakpoints.down("lg"));
	const { mode } = useColorScheme();
	if (!dict || !dict.Home || !dict.Home.Hero || !dict.Home.Hero.button) return null;
	const content = dict.Home.Hero.button[type == 'primary' ? 0 : 1]
	const isDark = mode == 'dark'
	const { background: cardBackground } = {
		primary: {
			background: isDark
				? `var(--mui-palette-primary-main)`
				: `var(--mui-palette-primary-light)`
		},
		secondary: {
			background: isDark
				? `var(--mui-palette-success-dark)`
				: `var(--mui-palette-success-light)`
		}
	}[type]
	
	return (
		<Card sx={{
			background: cardBackground,
			width: `49%`,
			maxHeight: `200px`
		}}>
			<CardActionArea
				sx={{
					padding: `0.4rem`,
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
					<Stack direction={"row"} >
						<Stack direction={"column"} sx={{ justifyContent: `space-around`, minWidth: `14rem` }} >
							<Stack
								direction={"row"}
								sx={{ marginBottom: `0.5rem` }}
							>
								{type == 'primary'
									? <FlashOnIcon sx={{ color: "var(--mui-palette-warning-dark)" }} />
									: <OnlinePredictionIcon sx={{ color: "var(--mui-palette-text-primary)" }} />
								}
								<Typography
									variant="h4"
									sx={{
										fontFamily: bebasNeue.style.fontFamily,
										textTransform: `uppercase`,
										lineHeight: `1.8rem`,
									}}
								>
									{content.title}
								</Typography>
							</Stack>
							<Stack direction={"column"} >
								<Typography
									variant="h6"
									sx={{
										fontFamily: bebasNeue.style.fontFamily,
										textTransform: `uppercase`,
										lineHeight: `1.0rem`,
										maxHeight: `5rem`,
										overflow: `hidden`,
										position: `relative`
									}}
								>{content.description[0]}</Typography>
							</Stack>
							<Stack direction={"row"} spacing={1} sx={{ width: `100px`, position: `relative`, bottom: `-20px` }}>
								{content.description.slice(1).map((e, i) => (
									<Chip key={i} variant="filled" label={e} size="small" sx={{
										fontFamily: bebasNeue.style.fontFamily,
										textTransform: `uppercase`,
										padding: `0.5rem`,
										color: type == "primary" ? `warning.main` : "text.primary"
									}} />
								))}
							</Stack>
						</Stack>
						<div style={{
							display: "flex",
							left: "-80px",
							maxWidth: `50%`,
							position: "relative",
							top: isMd ? `-20px` : `-12px`,
							width: isMd ? "150px" : "200px",
							height: `140px`
						}}>
							<div style={{
								display: `flex`,
								left: isMd ? `160px` : `180px`,
								position: `relative`,
								top: `10px`,
							}}>
								<TurnRightIcon sx={{
									height: `64px`,
									transform: `rotate(90deg)`,
									width: `64px`,
								}} />
							</div>
							<HeroCardIllustration type={type} />
						</div>
					</Stack>
				</CardContent>
			</CardActionArea>
		</Card >
	)
}

function HeroCardMobile({ type }: HeroCardProps) {
	const { dict } = useI18n();
	if (!dict || !dict.Home || !dict.Home.Hero || !dict.Home.Hero.button) return null;
	const content = dict.Home.Hero.button[type == 'primary' ? 0 : 1]
	const t = {
		primary: {
			background: `#2291FF`
		},
		secondary: {
			background: `#26AD50`
		}
	}[type]

	return (
		<Card sx={{
			background: t.background,
			marginBottom: `1rem`,
			marginTop: type == "primary" ? `1rem` : "unset",
			width: `90%`,
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
					<Stack direction={"column"} sx={{
						justifyContent: `center`,
						alignItems: `baseline`
					}}>
						<Stack direction={"column"}>
							<Stack direction={"row"}
								sx={{
									alignItems: `start`,
									justifyContent: `start`,
									marginBottom: `0.5rem`,
								}}>
								{type == 'primary'
									? <FlashOnIcon sx={{ color: "var(--mui-palette-warning-dark)", marginRight: `5px` }} />
									: <OnlinePredictionIcon sx={{ color: "var(--mui-palette-text-primary)", marginRight: `5px` }} />
								}
								<Typography variant="h6"
									sx={{
										lineHeight: `1rem`,
										whiteSpace: 'normal',
										wordBreak: 'break-word',
									}}
								>
									{content.title}
								</Typography>
							</Stack>
							<Stack direction={"column"}>
								<Typography
									variant="body2"
									sx={{
										lineHeight: `1rem`,
										maxHeight: `3rem`,
										maxWidth: `20rem`,
										overflow: `hidden`,
										position: `relative`,
										"&:after": {
											background: `linear-gradient(to right, rgba(255, 255, 255, 0), ${t.background} 70%)`,
											bottom: `0`,
											content: `""`,
											height: `1.1rem`,
											position: `absolute`,
											right: `0`,
											textAlign: `right`,
											width: `70%`,
										}
									}}
								>{content.description}</Typography>
							</Stack>
						</Stack>
					</Stack>
				</CardContent>
			</CardActionArea>
		</Card >
	)
}

export function HeroCard({ type }: HeroCardProps) {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("md"));
	return (
		isMobile ? <HeroCardMobile type={type} /> : <HeroCardDesktop type={type} />
	)
}