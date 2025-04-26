import * as React from "react";
import { Box, useColorScheme } from "@mui/material";


export function CardBackground({ direction }: { direction: boolean }) {
	const { mode } = useColorScheme();
	const isDark = mode == "dark"
	return (
		<>
			< Box
				sx={{
					borderRadius: "var(--mui-shape-borderRadius)",
					position: "absolute",
					top: 0,
					left: 0,
					width: "100%",
					height: "100%",
					backgroundColor: isDark ? `rgb(from var(--mui-palette-common-white) r g b / 0.1)` : `rgb(from var(--mui-palette-common-black) r g b / 0.1)`,
					zIndex: 1
				}} />
			<Box
				sx={{
					borderRadius: "var(--mui-shape-borderRadius)",
					position: "absolute",
					top: 0,
					left: 0,
					width: "100%",
					height: "100%",
					background: `var(--mui-palette-primary-dark)`,
					maskImage: `url(/images/mask.webp), linear-gradient(${!direction ? 270 : 120}deg, ${isDark ? `var(--mui-palette-secondary-light)` : `var(--mui-palette-common-white)`},  transparent 30%)`,
					maskRepeat: "no-repeat",
					maskSize: "100% 100%",
					maskComposite: "add",
					maskPosition: "start",
					zIndex: 1,
					opacity: isDark ? 0.9 : 0.1
				}} />
		</>
	)
}


export function Background() {
	const { mode } = useColorScheme();
	const isDark = mode == "dark"
	return (
		<>
			< Box
				sx={{
					position: "absolute",
					top: 0,
					left: 0,
					width: "100%",
					height: "100%",
					backgroundColor: isDark
						? `var(--mui-palette-secondary-dark)`
						: `var(--mui-palette-grey-50)`,
					zIndex: 1
				}} />
			<Box
				sx={{
					position: "absolute",
					top: 0,
					left: 0,
					width: "100%",
					height: "100%",
					background: `var(--mui-palette-primary-dark)`,
					maskImage: `url(/images/mask.webp), linear-gradient(0deg,rgba(255, 255, 255, 0.3))`,
					maskRepeat: "no-repeat",
					maskSize: "100% 100%",
					maskComposite: "add",
					maskPosition: "start",
					zIndex: 1,
					opacity: 0.3
				}} />
		</>
	)
}
