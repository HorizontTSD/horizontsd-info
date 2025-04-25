import * as React from "react";
import NextLink from "next/link";
import { Card, Box, Container, Typography, Button, Stack } from "@mui/material";
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
	return (
		<Box onClick={() => handleItemClick(index)} sx={{
			alignItems: "center",
			borderRadius: "var(--mui-shape-borderRadius)",
			border: `none`,
			background: active
				? "var(--mui-palette-info-dark)"
				: isDark
					? "var(--mui-palette-primary-dark)"
					: "var(--mui-palette-primary-light)",
			cursor: "pointer",
			color: active
				? `var(--mui-palette-primary-light)`
				: `var(--mui-palette-text-primary)`,
			display: "flex",
			flexDirection: "column",
			height: `100%`,
			justifyContent: "start",
			marginLeft: index != 0 ? "1rem" : 0,
			padding: 2,
			width: "auto",
			"&:hover": {
				background: active
					? "var(--mui-palette-info-light)" : isDark
						? "var(--mui-palette-info-dark)"
						: "var(--mui-palette-info-light)",
				color: `var(--mui-palette-primary-light)`
			}
		}}>
			<Box sx={{
				alignItems: "left",
				display: "flex",
				flexDirection: "column",
				textAlign: "left",
				textTransform: "none",
				width: "100%",
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
			overflow: "hidden",
			width: "100%",
			zIndex: 3
		}}>
			<Card variant="outlined" sx={{
				width: "100%",
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
								<Typography key={i} gutterBottom variant="body2">
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
				alignItems: "center",
				display: "flex",
				flexDirection: "column",
				pb: { xs: 8, sm: 12 },
				pt: { xs: 14, sm: 20 },
			}}>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					height: `100%`,
					width: "100%",
				}}>
				<Stack direction="column">
					<Box
						sx={{
							alignItems: "center",
							display: "flex",
							flexDirection: "row",
							height: `auto`,
							justifyContent: "space-between",
							margin: "0 0 1rem 0",
							width: "100%",
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