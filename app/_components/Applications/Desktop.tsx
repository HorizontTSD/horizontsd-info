import * as React from "react";
import { useI18n } from "../../_providers/I18nProvider";
import { useColorScheme } from "@mui/material/styles";
import { Card, Box, Container, Typography, Button, Stack } from "@mui/material";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import NextLink from "next/link";
import type { } from "swiper/types";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../swiper.css";
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
	return (
		<Box onClick={() => handleItemClick(index)} sx={{
			border: `none`,
			background: active
				? "rgb(54, 106, 243)"
				: isDark
					? "var(--mui-palette-primary-dark)"
					: "var(--mui-palette-primary-light)",
			cursor: "pointer",
			borderRadius: "var(--mui-shape-borderRadius)",
			display: "flex",
			flexDirection: "column",
			justifyContent: "start",
			alignItems: "center",
			padding: 2,
			height: `100%`,
			width: "auto",
			color: active
				? `var(--mui-palette-primary-light)`
				: `var(--mui-palette-text-primary)`,
			marginLeft: index != 0 ? "1rem" : 0,
			"&:hover": {
				background: active
					? "rgb(54, 106, 243)" : isDark
						? "var(--mui-palette-secondary-dark)"
						: "var(--mui-palette-secondary-light)",
				color: isDark
					? `var(--mui-palette-primary-light)`
					: `var(--mui-palette-primary-dark)`
			}
		}}>
			<Box sx={{
				width: "100%",
				display: "flex",
				flexDirection: "column",
				alignItems: "left",
				textAlign: "left",
				textTransform: "none",
			}}>
				<Stack>
					<Stack direction="row" alignItems="center">
						<FormatListBulletedIcon sx={{ marginRight: "1rem" }} />
						<Typography variant="h6">
							{content.title}
						</Typography>
					</Stack>
					<Typography variant="body2">
						{content.description}
					</Typography>
				</Stack>
			</Box>
		</Box>
	)
}

function DesktopCard({ selected, dictionary }: DesktopCardProps) {
	return (
		<Box sx={{
			display: "flex",
			width: "100%",
			overflow: "hidden",
			zIndex: 3
		}}>
			<Card variant="outlined" sx={{
				width: "100%",
				height: "100%"
			}}>
				<Box sx={{
					position: "relative",
					top: 0,
					left: 0,
					width: "100%",
					height: "25vh",
					zIndex: 3
				}} >
					<Box sx={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "space-between",
						alignItems: "start",
						position: "relative",
						top: 0,
						left: 0,
						width: "100%",
						height: "100%",
						padding: "0.8rem",
						zIndex: 4
					}} >
						<Stack>
							<Typography gutterBottom variant="h6">
								{selected.title}
							</Typography>
							{selected.description.map((e: string, i: number) => (
								<Typography key={i} gutterBottom variant="body2">
									{e}
								</Typography>
							))}
						</Stack>
						<Stack>
							<NextLink href={selected.link}>
								<Button color="secondary" variant="contained" sx={{ color: "primary.light" }}>
									{dictionary.Button}
								</Button>
							</NextLink>
						</Stack>
					</Box>
				</Box>
			</Card>
		</Box>
	)
}

export function Desktop() {

	const { dict } = useI18n();
	const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);
	if (!dict || !dict.Home || !dict.Home.Applications || !dict.Home.Applications.Content) return null;
	const dictionary = dict.Home.Applications;
	const handleItemClick = (index: number) => setSelectedItemIndex(index);
	const selected = dictionary.Content[selectedItemIndex].block;
	return (
		<Container
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				pt: { xs: 14, sm: 20 },
				pb: { xs: 8, sm: 12 },
			}}>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					width: "100%"
				}}>
				<Stack direction="column">
					<Box
						sx={{
							display: "flex",
							flexDirection: "row",
							justifyContent: "space-between",
							alignItems: "center",
							margin: "0 0 1rem 0",
							width: "100%",
							height: `auto`
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
					</Box>
				</Stack>
				<DesktopCard dictionary={dictionary} selected={selected} />
			</Box >
		</Container >
	);
}