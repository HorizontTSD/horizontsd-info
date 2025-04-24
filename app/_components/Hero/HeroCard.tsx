import * as React from "react";
import { useEffect, useState } from "react";
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
}

export interface HeroCardProps {
	type: "primary" | "secondary";
}

export interface HeroCardIllustrationProps {
	type: HeroCardProps["type"];
}

export function HeroCardIllustrationBox({ size = 6, offset = 0, Icon }: HeroCardBoxProps) {
	return (
		<Box sx={{
			alignItems: `center`,
			background: `rgba(255,255,255,0.1)`,
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
			<Icon sx={{ color: `var(--mui-palette-text-primary)`, width: `64px`, height: `64px` }} />
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
					Icon={firstBoxIcons[currentFirstIcon]}
					size={boxSize}
					offset={0}
				/>
				<HeroCardIllustrationBox
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
			height: isMd ? `185px` : `200px`,
			width: isMd ? `60%` : `45%`,
		}}>
			<CardActionArea
				sx={{
					padding: `0.5rem`,
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
					<Stack direction={"row"} sx={{
						justifyContent: `center`,
						alignItems: `start`,
					}}>
						<Stack direction={"column"} sx={{ maxWidth: isMd ? `65%` : `50%` }}>
							<Stack
								direction={"row"}
								sx={{
									alignItems: `start`,
									justifyContent: `start`,
									marginBottom: `0.3rem`,
									maxWidth: '300px',
								}}
							>
								{type == 'primary'
									? <FlashOnIcon sx={{ color: "var(--mui-palette-warning-dark)", marginRight: `5px` }} />
									: <OnlinePredictionIcon sx={{ color: "var(--mui-palette-text-primary)", marginRight: `5px`, marginTop: `-3px` }} />
								}
								<Typography
									variant="h6"
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
										lineHeight: `1.0rem`,
										maxHeight: `5rem`,
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
						<div style={{
							display: "flex",
							left: isMd ? "-65px" : "-35px",
							maxWidth: `50%`,
							position: "relative",
							top: isMd ? `-20px` : `-12px`,
							width: isMd ? "150px" : "200px",
						}}>
							<div style={{
								display: `flex`,
								left: `180px`,
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