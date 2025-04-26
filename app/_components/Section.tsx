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
    const bgPalette = ['var(--mui-palette-primary-dark)', 'var(--mui-palette-primary-light)']

    const breakpoint = [
        useMediaQuery(theme.breakpoints.up("lg")),
        useMediaQuery(theme.breakpoints.between("md", "lg")),
        useMediaQuery(theme.breakpoints.between("sm", "md")),
        useMediaQuery(theme.breakpoints.between("xs", "sm")),
        useMediaQuery(theme.breakpoints.down("xs")),
    ].indexOf(true)

    const minHeightFullsize: string[] = [
        "1080px",
        "100vh",
        "100vh",
        "100vh",
        "100vh"
    ]
    const minHeightHalfsize: string[] = [
        "540px",
        "540px",
        "540px",
        "540px",
    ]

    const currentBreakpoint = Math.max(0, breakpoint);
    const minHeight = props?.fullsize
        ? minHeightFullsize[currentBreakpoint]
        : minHeightHalfsize[currentBreakpoint]

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
        minHeight: minHeight,
        backgroundColor: bgPalette[~~(!isDark)],
        color: theme.palette.text.primary,
        backgroundSize: "cover",
        height: "100%",
        imageRendering: "smooth",
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