import * as React from "react";
import NextLink from "next/link";
import { Card, Box, Container, Typography, Button, Stack, useMediaQuery, useTheme } from "@mui/material";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { useColorScheme } from "@mui/material/styles";
import type { } from "swiper/types";
import { useI18n } from "@/app/_providers/I18nProvider";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import "swiper/css/thumbs";

export interface ApplicationItem {
	title: string;
	description: string[];
	link: string;
}

export interface ButtonItem {
	title: string;
	description: string;
}

export interface ContentItem {
	block: ApplicationItem;
	button: ButtonItem;
}

export interface DesktopButtonProps {
	active: boolean;
	index: number;
	handleItemClick: (index: number) => void;
	content: {
		title: string;
		description: string;
	}
}

export interface DesktopCardProps {
	selected: {
		title: string;
		description: string[];
		link: string;
	};
	dictionary: {
		Button: string;
	}
}



function DesktopButton({ active = false, index, handleItemClick, content }: DesktopButtonProps) {
	const { mode } = useColorScheme();
	const isDark = mode == 'dark'
	const theme = useTheme();
	const isSm = useMediaQuery(theme.breakpoints.down("md"));
	const bgPalette = ['var(--mui-palette-secondary-dark)', 'var(--mui-palette-secondary-light)']
	const activeBackground = ["var(--mui-palette-info-main)", `rgb(from var(--mui-palette-info-main) r g b / 0.9)`]
	const hoverBackground = ['rgb(from var(--mui-palette-info-main) r g b / 0.2)', 'rgb(from var(--mui-palette-info-dark) r g b / 0.2)']
	const activeColor = ["var(--mui-palette-info-light)", `var(--mui-palette-info-dark)`]

	return (
		<Box
			sx={{
				minHeight: `9rem`,
				borderRadius: "var(--mui-shape-borderRadius)",
				border: `none`,
				background: active
					? activeBackground[~~isDark]
					: bgPalette[~~!isDark],
				cursor: "pointer",
				color: active
					? `var(--mui-palette-primary-light)`
					: `var(--mui-palette-text-primary)`,
				display: "flex",
				flexDirection: "column",
				marginLeft: index != 0 ? "1rem" : 0,
				"&:hover": {
					background: active
						? activeBackground[~~!isDark]
						: hoverBackground[~~(isDark)],
					color: active
						? activeColor[~~(isDark)]
						: activeColor[~~(!isDark)]
				}
			}}
			onClick={() => handleItemClick(index)}
		>
			<Box sx={{
				alignItems: "left",
				display: "flex",
				flexDirection: "column",
				textAlign: "left",
				textTransform: "none",
				padding: `1rem`,
			}}>
				<Stack direction={"column"} >
					<Stack direction="row" alignItems="center">
						<FormatListBulletedIcon sx={{ marginRight: "1rem" }} />
						<Typography variant={isSm ? "caption" : "h6"} sx={{ lineHeight: `1.5rem` }}>
							{content.title}
						</Typography>
					</Stack>
					<Typography variant={isSm ? "caption" : "body2"}>
						{content.description}
					</Typography>
				</Stack>
			</Box>
		</Box>
	)
}

function DesktopCard({ selected, dictionary }: DesktopCardProps) {
	const { mode } = useColorScheme();
	const isDark = mode == 'dark'

	const bgPalette = ['var(--mui-palette-secondary-dark)', 'var(--mui-palette-secondary-light)']

	return (
		<Box sx={{
			display: "flex",
			overflow: "hidden",
			width: "100%",
			zIndex: 3
		}}>
			<Card variant="outlined" sx={{
				border: `none`,
				width: "100%",
				background: bgPalette[~~(!isDark)],
			}}>
				<Box sx={{
					left: 0,
					position: "relative",
					top: 0,
					width: "100%",
					zIndex: 3
				}} >
					<Box sx={{
						alignItems: "start",
						display: "flex",
						flexDirection: "column",
						justifyContent: "space-between",
						left: 0,
						minHeight: "20rem",
						padding: "0.8rem",
						position: "relative",
						top: 0,
						width: "100%",
						zIndex: 4
					}} >
						<Stack>
							<Typography gutterBottom variant="h6">
								{selected.title}
							</Typography>
							{selected.description.map((e: string, i: number) => (
								<Typography key={i} gutterBottom variant="body1">
									{e}
								</Typography>
							))}
						</Stack>
						<Stack>
							<NextLink href={selected.link}>
								<Button color="secondary" variant="contained" sx={{ background: "var(--mui-palette-info-main)", color: "primary.light" }}>
									{dictionary.Button}
								</Button>
							</NextLink>
						</Stack>
					</Box>
				</Box>
			</Card>
		</Box >
	)
}

export function Desktop() {
	const theme = useTheme();
	const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);
	const handleItemClick = (index: number) => setSelectedItemIndex(index);
	const breakpoint = [
		useMediaQuery(theme.breakpoints.up("lg")),
		useMediaQuery(theme.breakpoints.between("md", "lg")),
		useMediaQuery(theme.breakpoints.between("sm", "md")),
		useMediaQuery(theme.breakpoints.between("xs", "sm")),
		useMediaQuery(theme.breakpoints.down("xs")),
	].indexOf(true) + 1

	const { dict } = useI18n();
	if (!dict || !dict.Home || !dict.Home.Applications || !dict.Home.Applications.Content) return null;
	const dictionary = dict.Home.Applications;
	const selected = dictionary.Content[selectedItemIndex].block;

	return (
		<Container
			sx={{
				alignItems: "center",
				display: "flex",
				flexDirection: "column",
				height: `100%`,
				width: "100%",
				pb: { xs: breakpoint, sm: breakpoint },
				pt: { xs: breakpoint, sm: breakpoint },
			}}>
			<Stack
				direction="column"
				sx={{
					height: '100%',
					width: '100%',
				}}
			>
				<Stack
					direction="row"
					sx={{
						alignItems: "stretch",
						justifyContent: "space-between",
						marginBottom: `1rem`
					}}>
					{dictionary.Content.map(({ button }: ContentItem, index: number) => (
						<DesktopButton
							active={selectedItemIndex === index}
							content={button}
							handleItemClick={handleItemClick}
							index={index}
							key={index}
						/>
					))}
				</Stack>
				<DesktopCard dictionary={dictionary} selected={selected} />
			</Stack>
		</Container>
	);
}