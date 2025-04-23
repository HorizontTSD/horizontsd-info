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
			position: `relative`,
			left: `${offset * 1.5}px`,
			top: `${-offset * 0.5}px`,
			width: `${size}rem`,
			height: `${size}rem`,
			background: `rgba(255,255,255,0.1)`,
			borderRadius: "var(--mui-shape-borderRadius)",
			display: `flex`,
			flexDirection: `column`,
			justifyContent: `center`,
			alignItems: `center`
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
			display: `flex`,
			width: `200px`,
			height: `200px`,
			justifyContent: `center`,
			alignItems: `center`,
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
			width: isMd ? `60%` : `45%`,
			height: isMd ? `185px` : `200px`,
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
									marginBottom: `0.3rem`,
									justifyContent: `start`,
									alignItems: `start`,
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
										whiteSpace: 'normal',
										wordBreak: 'break-word',
										lineHeight: `1rem`
									}}
								>
									{content.title}
								</Typography>
							</Stack>
							<Stack direction={"column"}>
								<Typography
									variant="body2"
									sx={{
										overflow: `hidden`,
										maxHeight: `5rem`,
										position: `relative`,
										lineHeight: `1.0rem`,
										"&:after": {
											content: `""`,
											textAlign: `right`,
											position: `absolute`,
											bottom: `0`,
											right: `0`,
											width: `70%`,
											height: `1.1rem`,
											background: `linear-gradient(to right, rgba(255, 255, 255, 0), ${t.background} 70%)`,
										}
									}}
								>{content.description}</Typography>
							</Stack>
						</Stack>
						<div style={{
							display: "flex",
							width: isMd ? "150px" : "200px",
							position: "relative",
							left: isMd ? "-65px" : "-35px",
							top: isMd ? `-20px` : `-12px`,
							maxWidth: `50%`
						}}>
							<div style={{
								display: `flex`,
								position: `relative`,
								left: `180px`,
								top: `10px`,
							}}>
								<TurnRightIcon sx={{ width: `64px`, height: `64px`, transform: `rotate(90deg)` }} />
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
			width: `90%`,
			marginBottom: `1rem`,
			marginTop: type == "primary" ? `1rem` : "unset"
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
									marginBottom: `0.5rem`,
									justifyContent: `start`,
									alignItems: `start`,
								}}>
								{type == 'primary'
									? <FlashOnIcon sx={{ color: "var(--mui-palette-warning-dark)", marginRight: `5px` }} />
									: <OnlinePredictionIcon sx={{ color: "var(--mui-palette-text-primary)", marginRight: `5px` }} />
								}
								<Typography variant="h6"
									sx={{
										whiteSpace: 'normal',
										wordBreak: 'break-word',
										lineHeight: `1rem`
									}}
								>
									{content.title}
								</Typography>
							</Stack>
							<Stack direction={"column"}>
								<Typography
									variant="body2"
									sx={{
										overflow: `hidden`,
										maxHeight: `3rem`,
										maxWidth: `20rem`,
										position: `relative`,
										lineHeight: `1rem`,
										"&:after": {
											content: `""`,
											textAlign: `right`,
											position: `absolute`,
											bottom: `0`,
											right: `0`,
											width: `70%`,
											height: `1.1rem`,
											background: `linear-gradient(to right, rgba(255, 255, 255, 0), ${t.background} 70%)`,
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