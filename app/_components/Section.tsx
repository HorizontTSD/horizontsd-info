import * as React from "react";
import Divider from "@mui/material/Divider";
import { Box, SxProps, Theme } from "@mui/material";
import { Suspense } from "react";
import Skeleton from "@mui/material/Skeleton";
import { useColorScheme, useTheme } from "@mui/material/styles";
import { SystemStyleObject } from "@mui/system";

interface SectionProps {
    id?: string;
    ref?: React.RefObject<HTMLElement>;
    sx?: SxProps<Theme>;
    children?: React.ReactNode;
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
        minHeight: "100vh",
        backgroundSize: "cover",
        backgroundColor: isDark ? "primary.dark" : "primary.light"
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
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    height: "100%",
                    imageRendering: "smooth",
                    flex: "auto",
                    justifyContent: "center",
                    flexFlow: "wrap",
                    color: theme.palette.text.primary
                }}>
                    <Suspense fallback={<Test />}>
                        {props.children}
                    </Suspense>
                </Box>
            </Box>
            <Divider />
        </>
    );
}