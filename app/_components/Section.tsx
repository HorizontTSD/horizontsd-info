import * as React from "react";
import { Suspense } from "react";
import { Box, SxProps, Theme, useMediaQuery } from "@mui/material";
import { useColorScheme, useTheme } from "@mui/material/styles";
import { SystemStyleObject } from "@mui/system";
import Skeleton from "@mui/material/Skeleton";
import Divider from "@mui/material/Divider";

interface SectionProps {
    id?: string;
    ref?: React.RefObject<HTMLElement>;
    sx?: SxProps<Theme>;
    children?: React.ReactNode;
    fullsize?: boolean;
}

function Test() {
    return (
        <Skeleton
            sx={{ bgcolor: "grey.900" }}
            variant="rectangular"
            width={210}
            height={118}
        />
    );
}

export default function Section(props: SectionProps) {
    const theme = useTheme();
    const { mode } = useColorScheme();
    const isDark = mode === "dark";
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const bgPalette = ['var(--mui-palette-primary-dark)', 'var(--mui-palette-primary-light)']

    const baseStyles: SystemStyleObject<Theme> = {
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        overflow: "hidden",
        position: "relative",
        width: "100vw",
        zIndex: 2,
        userSelect: "none",
        minHeight: isMobile
            ? (props?.fullsize ? "100vh" : "50vh")
            : (props?.fullsize ? "1080px" : "30vh"),
        backgroundSize: "cover",
        backgroundColor: bgPalette[~~(!isDark)],
        height: "100%",
        imageRendering: "smooth",
        color: theme.palette.text.primary,
    };

    const mergedStyles: SxProps<Theme> = props.sx
        ? { ...baseStyles, ...(typeof props.sx === 'function' ? props.sx(theme) : props.sx) }
        : baseStyles;

    return (
        <>
            <Box
                component="section"
                id={props.id}
                ref={props.ref}
                sx={mergedStyles}
            >
                <Suspense fallback={<Test />}>
                    {props.children}
                </Suspense>
            </Box>
            <Divider />
        </>
    );
}