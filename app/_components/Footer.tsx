import * as React from "react";
import { useColorScheme } from "@mui/material/styles";
import { useI18n } from "../_providers/I18nProvider";
import { useTheme } from "@mui/material/styles";
import {
    Box, Typography, Button, useMediaQuery, Stack
} from "@mui/material"
import EastIcon from "@mui/icons-material/East"
import LinkedInIcon from "@mui/icons-material/LinkedIn"
import FacebookIcon from "@mui/icons-material/Facebook"
import XIcon from "@mui/icons-material/X"
import InstagramIcon from "@mui/icons-material/Instagram"
import YouTubeIcon from "@mui/icons-material/YouTube"
import IconButton from "@mui/material/IconButton";
import Section from "./Section";
import { FooterContent } from "./types";

function Row1() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const { dict } = useI18n();
    const { mode } = useColorScheme();
    const isDark = mode == "dark"
    if (!dict || !dict.Footer) {
        return null;
    }

    const content = dict.Footer as FooterContent;
    return (
        <Stack direction={isMobile ? "column" : "row"} >
            <Stack direction={"column"}>
                <Typography
                    color="textPrimary"
                    variant={isMobile ? "h4" : "h3"}
                    sx={{
                        userSelect: `none`,
                        maxWidth: isMobile ? `100%` : `70%`,
                    }}>{content.row1Title}</Typography>
            </Stack>

            <Stack direction={"column"}>
                <Box sx={{
                    fontFamily: "roboto",
                    position: "relative",
                    zIndex: 2,
                    fontWeight: "400",
                    fontSize: "24px",
                    width: "100%",
                    textAlign: "right",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "end",
                    userSelect: `none`,
                }}>
                    <Typography
                        color="textPrimary"
                        variant="h5"
                        gutterBottom
                        sx={{
                        }}>{content.row1Title2}</Typography>
                </Box>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    fontFamily: "roboto",
                    fontSize: "16px",
                    fontWeight: "200",
                    justifyContent: "end",
                    margin: `0`,
                    padding: `0`,
                    position: "relative",
                    textAlign: isMobile ? "center" : "right",
                    width: `100%`,
                    zIndex: 2,
                    alignItems: isMobile ? "center" : `end`,
                    userSelect: `none`,
                }}>
                    <Typography color="textPrimary" variant="body2" sx={{
                        userSelect: `none`,
                        margin: isMobile ? "1rem 0" : 0,
                    }}>{content.row1Subtitle}</Typography>
                    <Typography color="textPrimary" variant="body2" gutterBottom sx={{
                        userSelect: `none`,
                    }}>{content.row1Subtitle2}</Typography>
                    <Button variant="contained" sx={{
                        minWidth: "250px",
                        display: `flex`,
                        alignItems: `center`,
                        userSelect: `none`,
                        justifyContent: `center`,
                        background: isDark ? `var(--mui-palette-secondary-contrastText)` : `var(--mui-palette-secondary-dark)`,
                        color: `var(--mui-palette-primary-light)`,
                        lineHeight: `1rem`
                    }}>
                        {content.row1ButtonText}
                        <EastIcon sx={{ marginLeft: `0.5rem`, color: `var(--mui-palette-primary-light)` }} />
                    </Button>
                </Box>
            </Stack>
        </Stack>
    )
}

function Row3() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const { dict } = useI18n();

    if (!dict || !dict.Footer) {
        return null;
    }

    const content = dict.Footer as FooterContent
    return (
        <Stack direction={isMobile ? "column-reverse" : "row"} sx={{
            display: `flex`,
            width: `100%`,
            justifyContent: `space-between`,
            alignItems: isMobile ? `center` : `end`,
            padding: isMobile ? `0rem 1rem` : "unset",
        }}>
            <Stack direction={isMobile ? "column" : "row"} >
                <Typography color="textPrimary" variant="caption" sx={{
                    fontFamily: "roboto",
                    userSelect: `none`,
                    position: "relative",
                    fontWeight: `400`,
                    fontSize: `1rem`,
                    display: `flex`,
                    alignItems: `center`,
                }} >{content.row3Copyright}</Typography>
            </Stack>
            <Stack direction={"column"}>
                <Stack direction={isMobile ? "column" : "row"} sx={{
                    display: `flex`,
                    alignItems: `center`,
                    textAlign: "center",
                }}>
                    <Stack direction={"column"} sx={{
                        fontFamily: "roboto",
                        position: "relative",
                        zIndex: 2,
                        fontWeight: "400",
                        fontSize: `1rem`,
                        width: "80%",
                        textAlign: "right",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <Typography color="textPrimary" variant="button" sx={{
                            userSelect: `none`
                        }}>{content.row3Follows}</Typography>
                    </Stack>
                    <Stack direction={"row"} sx={{
                        position: "relative",
                        zIndex: 2,
                    }}>{[
                        LinkedInIcon, FacebookIcon,
                        XIcon, InstagramIcon, YouTubeIcon
                    ].map((Icon, index) => (
                        <IconButton key={index} color="default"><Icon /></IconButton>
                    ))}
                    </Stack>
                </Stack >
            </Stack>
        </Stack >
    )
}

function Background() {
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
                    maskSize: "100vw 100vh",
                    maskComposite: "add",
                    maskPosition: "center",
                    zIndex: 1,
                    opacity: 0.3
                }} />
        </>
    )
}

function Content() {
    return (
        <Stack direction={"column"} sx={{
            display: `flex`,
            justifyContent: `center`,
            alignItems: `center`
        }}>
            <Stack direction={"column"}
                sx={{
                    zIndex: `2`,
                    position: `relative`,
                    display: `flex`,
                    height: `100%`,
                    justifyContent: `space-around`,
                    alignItems: `center`,
                    flexDirection: `column`,
                    padding: `0rem 1rem`,
                }}
            >
                <Row1 />
                <Row3 />
            </Stack>
            <Background />
        </Stack >
    )
}

export default function Footer() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    return (
        <Section id={"footer"} sx={{ minHeight: isMobile ? `100vh` : `50vh` }}>
            <Content />
        </Section>
    )
}
