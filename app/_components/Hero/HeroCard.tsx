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
import Link from '@mui/material/Link';
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
		}, type == "primary" ? 4000 : 6000);

		const secondInterval = setInterval(() => {
			setCurrentSecondIcon(prev => (prev + 1) % secondBoxIcons.length);
		}, type == "primary" ? 7000 : 3000);
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
			width: isMd ? `38%` : `40%`,
			minWidth: `385px`,
			maxHeight: `200px`,
			boxShadow: 10,
		}}>
    		<Link href={"https://ranareinsit-horizontsd-tool-9d25.twc1.net"} target="_blank" rel="noopener noreferrer" underline="none">
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
                        justifyContent: `space-between`,
                    }}>
                        <Stack direction={"row"} sx={{
                            display: `flex`,
                            flexDirection: `row`,
                            justifyContent: `space-between`,
                            alignItems: `normal`,
                            padding: `0 0 0 0`
                        }}>
                            <Stack
                                direction={"column"}
                                sx={{ justifyContent: `space-around`, minWidth: isMd ? `200px` : `13rem` }}
                            >
                                <Stack
                                    direction={"row"}
                                    sx={{ marginBottom: `0.5rem` }}
                                >
                                    {type == 'primary'
                                        ? <FlashOnIcon sx={{ color: "var(--mui-palette-warning-dark)" }} />
                                        : <OnlinePredictionIcon sx={{ color: "var(--mui-palette-text-primary)" }} />
                                    }
                                    <Typography
                                        variant={isMd ? "h6" : "h4"}
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
                                        variant={isMd ? "subtitle1" : "h5"}
                                        sx={{
                                            fontFamily: bebasNeue.style.fontFamily,
                                            textTransform: `uppercase`,
                                            lineHeight: `1.5rem`,
                                            maxHeight: `5rem`,
                                            overflow: `hidden`,
                                            position: `relative`
                                        }}
                                    >{content.description[0]}</Typography>
                                </Stack>
                                <Stack direction={"row"} spacing={1} sx={{ width: `100px`, position: `relative`, bottom: `-15px` }}>
                                    {content.description.slice(1).map((e, i) => (
                                        <Chip key={i} variant="filled" label={e} size="small" sx={{
                                            fontFamily: bebasNeue.style.fontFamily,
                                            textTransform: `uppercase`,
                                            padding: `0.5rem 0.5rem 0.3rem 0.5rem`,
                                            color: type == "primary" ? `warning.main` : "text.primary"
                                        }} />
                                    ))}
                                </Stack>
                            </Stack>
                            <div style={{
                                display: "flex",
                                left: isMd ? "-95px" : "-15%",
                                minWidth: `200px`,
                                position: "relative",
                                top: `-1rem`,
                                width: "200px",
                                height: `140px`
                            }}>
                                <div style={{
                                    display: `flex`,
                                    left: `82%`,
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
            </Link>
		</Card >
	)
}

function HeroCardMobile({ type }: HeroCardProps) {
	const { dict } = useI18n();
	const { mode } = useColorScheme();
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
	if (!dict || !dict.Home || !dict.Home.Hero || !dict.Home.Hero.button) return null;
	const content = dict.Home.Hero.button[type == 'primary' ? 0 : 1]
	return (
		<Card sx={{
			background: cardBackground,
			marginBottom: `1rem`,
			marginTop: type == "primary" ? `1rem` : "unset",
			width: `100%`,
		}}>
            <Link href={content.link} target="_blank" rel="noopener noreferrer" underline="none">
                <CardActionArea
                    sx={{
                        '&[data-active]': {
                            backgroundColor: 'action.selected',
                            '&:hover': {
                                backgroundColor: 'action.selectedHover',
                            },
                        },
                    }}>
                    <CardContent>
                        <Stack direction={"column"}>
                            <Stack direction={"row"} >
                                {type == 'primary'
                                    ? <FlashOnIcon sx={{ color: "var(--mui-palette-warning-dark)" }} />
                                    : <OnlinePredictionIcon sx={{ color: "var(--mui-palette-text-primary)" }} />
                                }
                                <Typography
                                    variant="h6"
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
                                    variant={"subtitle1"}
                                    sx={{
                                        fontFamily: bebasNeue.style.fontFamily,
                                        textTransform: `uppercase`,
                                        overflow: `hidden`,
                                        position: `relative`
                                    }}
                                >{content.description[0]}</Typography>
                            </Stack>
                            <Stack direction={"row"} spacing={1} sx={{ position: `relative`, bottom: `-5px` }}>
                                {content.description.slice(1).map((e, i) => (
                                    <Chip key={i} variant="filled" label={e} size="small" sx={{
                                        fontFamily: bebasNeue.style.fontFamily,
                                        textTransform: `uppercase`,
                                        padding: `0.5rem 0.5rem 0.3rem 0.5rem`,
                                        color: type == "primary" ? `warning.main` : "text.primary"
                                    }} />
                                ))}
                            </Stack>
                        </Stack>
                    </CardContent>
                </CardActionArea>
            </Link>
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