import * as React from "react";
import NextLink from "next/link";
import { Card, CardContent, Typography, Button, Grid, Stack, CardActions } from "@mui/material";
import { useColorScheme } from "@mui/material/styles";
import { Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
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

export interface MobileSwiperSlideProps {
	item: ApplicationItem;
}

export function MobileSwiperSlide({ item }: MobileSwiperSlideProps) {
	const { dict } = useI18n();
	const { mode } = useColorScheme();
	const isDark = mode === "dark";
	const bgPalette = ['var(--mui-palette-secondary-dark)', 'var(--mui-palette-secondary-light)']

	if (!dict || !dict.Home || !dict.Home.Applications) {
		return null;
	}

	const dictionary = dict.Home.Applications;

	return (
		<Card sx={{
			alignItems: "center",
			background: bgPalette[~~(!isDark)],
			borderRadius: "var(--mui-shape-borderRadius)",
			display: "flex",
			flexDirection: "column",
			height: "93%",
			justifyContent: "start",
			justifySelf: "center",
			width: "80%",
		}}>
			<CardContent sx={{
				alignItems: "center",
				borderRadius: "var(--mui-shape-borderRadius)",
				display: "flex",
				flexDirection: "column",
				height: "100%",
				justifyContent: "space-between",
				width: "95%"
			}}>
				<Stack direction="column" sx={{ justifyContent: "start", width: "100%" }}>
					<Typography variant="h6" sx={{ color: "text.primary" }}>
						{item.title}
					</Typography>
					{item.description.slice(0, -1).map((e, i) => (
						<Typography key={i} gutterBottom variant="body2" sx={{ color: "text.primary" }}>
							{e}
						</Typography>
					))}
					{item.description.slice(-1).map((e, i) => (
						<Typography key={i} variant="caption" sx={{ color: "text.secondary" }}>
							{e}
						</Typography>
					))}

				</Stack>
				<CardActions sx={{
					alignItems: "center",
					display: "flex",
					height: "10%",
					justifyContent: "center",
					margin: 0,
					padding: 0,
				}}>
					<NextLink href={item.link}>
						<Button color="secondary" variant="contained" sx={{
							color: "secondary.light"
						}}>
							{dictionary.Button}
						</Button>
					</NextLink>
				</CardActions>
			</CardContent>
		</Card>
	);
}

export function Mobile() {
	const { dict } = useI18n();
	if (!dict || !dict.Home || !dict.Home.Applications || !dict.Home.Applications.Content) return null;
	const dictionary = dict.Home.Applications;

	return (
		<Grid
			container direction="column" sx={{
				display: { xs: "flex", sm: "flex", md: "none" },
				width: "100%"
			}}>
			<Swiper
				spaceBetween={10}
				loop={true}
				modules={[Pagination, Navigation]}
				pagination={{ clickable: true }}
				navigation={{ enabled: true }}
				className="swiper-slider"
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					backgroundPosition: "center",
					backgroundSize: "cover",
					width: "100%",
					height: "70vh",
					margin: "1rem 0",
				}}>
				{dictionary.Content.map(({ block }: ContentItem, i: number) => (
					<SwiperSlide key={i}>
						<MobileSwiperSlide item={block} />
					</SwiperSlide>
				))}
			</Swiper>
		</Grid>
	);
}

