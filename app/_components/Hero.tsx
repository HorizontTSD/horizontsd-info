import * as React from "react";
import { useColorScheme } from "@mui/material/styles";
import { useI18n } from "../_providers/I18nProvider";
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import { Card, CardActionArea, CardContent, Chip, Container, Typography, useMediaQuery } from "@mui/material";
import { bebasNeue } from "../../fonts";
import Section from "./Section";

import "./gradient-text.css";

import { WebGLBackground } from "./Wow";

interface HeroContent {
    slogan: string;
}

function Mobile({ fullsize = false }: HeroProps) {
    const { dict } = useI18n();
    const { mode } = useColorScheme();

    if (!dict || !dict.Home || !dict.Home.Hero) {
        return null;
    }

    const content: HeroContent = dict.Home.Hero;
    const isDark = mode === "dark";
    const baseColor = isDark ? "var(--mui-palette-secondary-main)" : "var(--mui-palette-secondary-main)";
    const accentColor = isDark ? "var(--mui-palette-secondary-light)" : "var(--mui-palette-primary-main)";
    return (
        <Stack direction="column"
            sx={{
                height: `100%`,
                width: `100%`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <WebGLBackground color={isDark ? [0.1, 0.5, 0.9] : [0.1, 0.3, 1.0]} />

            <Stack direction="column"
                sx={{
                    paddingTop: `30%`,
                    position: "relative",
                    height: `30%`,
                    width: `100%`,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                    justifyContent: "start",
                }}>
                <Stack spacing={3} direction="column">
                    <Typography
                        variant="h2"
                        sx={{
                            fontFamily: bebasNeue.style.fontFamily,
                            color: baseColor
                        }}
                    >
                        Horizon™
                    </Typography>
                    <Typography
                        variant="h2"
                        sx={{
                            fontFamily: bebasNeue.style.fontFamily,
                            color: accentColor
                        }}
                    >
                        Time Series Data
                    </Typography>
                </Stack>
                <Stack
                    direction="column"
                    sx={{
                        justifyContent: "start"
                    }}
                >
                    <Typography
                        variant="h4"
                        className={isDark ? "gradient-text" : "gradient-text__dark"}
                        sx={{
                            fontFamily: bebasNeue.style.fontFamily,
                            textAlign: "center",
                            color: baseColor
                        }}
                    >
                        {content.slogan}
                    </Typography>
                </Stack>
            </Stack>
            {fullsize &&
                <Stack direction="row"
                    sx={{
                        marginTop: `13%`,
                        position: "relative",
                        width: `100%`,
                        display: "flex",
                        height: `100%`,
                        flexDirection: "row",
                        alignItems: "start",
                        justifyContent: "start",
                    }}>
                    <HeroCardPrimary />
                    <HeroCardSecondary />
                </Stack>
            }
        </Stack>
    );
}

function HeroCardSecondary() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const isExtraSmall = useMediaQuery(theme.breakpoints.down("sm"));
    return (
        <Card sx={{
            height: isMobile ? `60%` : `40%`,
            border: `1px solid var(--mui-palette-primary-main)`,
            background: "success",
            width: isMobile ? `80%` : `45%`,
            margin: isMobile ? `0.7rem` : `none`
        }}>
            <CardActionArea
                sx={{
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
                    justifyContent: `space-between`
                }}>
                    <div>
                        <Typography variant="h5">Quick Forecast</Typography>
                        <Typography
                            variant="body2"
                            color="textSecondary"
                        >Quick Forecast short description</Typography>
                        <Typography
                            variant="body2"
                            color="textSecondary"
                        >Quick Forecast short description</Typography>
                        <Stack direction={isExtraSmall ? "column" : "row"} sx={{ width: isExtraSmall ? `100%` : `50%`, justifyContent: `space-around` }}>
                            <Chip sx={{
                                margin: `0.5rem`,
                                background: `var(--mui-palette-primary-dark)`,
                                color: `var(--mui-palette-primary-light)`
                            }}
                                label="Chip Filled"
                            />
                            <Chip sx={{
                                margin: `0.5rem`,
                                background: `var(--mui-palette-primary-dark)`,
                                color: `var(--mui-palette-primary-light)`
                            }}
                                label="Chip Filled"
                            />
                        </Stack>
                    </div>
                    <div style={{ padding: `0.5rem`, display: `flex`, flexDirection: `row`, justifyContent: `center` }}>
                        <Typography
                            color="textSecondary"
                            variant="h6"
                            className="gradient-text"
                        >LEARN MORE</Typography>
                    </div>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

function HeroCardPrimary() {
    const { mode } = useColorScheme();
    const { dict } = useI18n();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const isExtraSmall = useMediaQuery(theme.breakpoints.down("sm"));

    if (!dict || !dict.Home || !dict.Home.Hero) {
        return null;
    }

    const isDark = mode === "dark";

    return (
        <Card sx={{
            height: isMobile ? `60%` : `40%`,
            background: isDark ? `var(--mui-palette-secondary-dark)` : `var(--mui-palette-secondary-dark)`,
            marginRight: `1rem`,
            width: isMobile ? `80%` : `45%`,
            margin: isMobile ? `0.7rem` : `none`
        }}>
            <CardActionArea
                sx={{
                    p: 0,
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
                    justifyContent: `space-between`
                }}>
                    <div >
                        <Typography
                            variant="h5"
                            color={isDark ? "textPrimary" : "var(--mui-palette-primary-light)"}
                        >Quick Forecast</Typography>
                        <Typography
                            variant="body2"
                            sx={{ color: "var(--mui-palette-primary-light)" }}
                        >Quick Forecast short description</Typography>
                        <Typography
                            variant="body2"
                            sx={{ color: "var(--mui-palette-primary-light)" }}
                        >Quick Forecast short description</Typography>
                        <Stack direction={isExtraSmall ? "column" : "row"} sx={{ width: isExtraSmall ? `100%` : `50%`, justifyContent: `space-around` }}>
                            <Chip sx={{
                                margin: `0.5rem`,
                                background: `var(--mui-palette-primary-dark)`,
                                color: `var(--mui-palette-primary-light)`
                            }}
                                label="Chip Filled"
                            />
                            <Chip sx={{
                                margin: `0.5rem`,
                                background: `var(--mui-palette-primary-dark)`,
                                color: `var(--mui-palette-primary-light)`
                            }}
                                label="Chip Filled"
                            />
                        </Stack>
                    </div>
                    <div style={{ padding: `0.5rem`, display: `flex`, flexDirection: `row`, justifyContent: `center` }}>
                        <Typography
                            color="secondary"
                            variant="h6"
                        >LEARN MORE</Typography>
                    </div>
                </CardContent>
            </CardActionArea>
        </Card >
    )
}

function Desktop({ fullsize = false }: HeroProps) {
    const { mode } = useColorScheme();
    const { dict } = useI18n();

    if (!dict || !dict.Home || !dict.Home.Hero) {
        return null;
    }

    const content: HeroContent = dict.Home.Hero;
    const isDark = mode === "dark";
    const baseColor = isDark ? "var(--mui-palette-secondary-main)" : "var(--mui-palette-secondary-main)";
    const accentColor = isDark ? "var(--mui-palette-secondary-light)" : "var(--mui-palette-primary-main)";

    return (
        <Stack direction="column"
            sx={{
                height: `100%`,
                width: `100%`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <WebGLBackground color={isDark ? [0.1, 0.5, 0.9] : [0.1, 0.3, 1.0]} />

            <Stack direction="column"
                sx={{
                    paddingTop: `20%`,
                    position: "relative",
                    height: `100%`,
                    width: `100%`,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                    justifyContent: "start",
                }}>
                <Stack spacing={4} direction="row">
                    <Typography
                        variant="h1"
                        sx={{
                            fontFamily: bebasNeue.style.fontFamily,
                            color: baseColor
                        }}
                    >
                        Horizon™
                    </Typography>
                    <Typography
                        variant="h1"
                        sx={{
                            fontFamily: bebasNeue.style.fontFamily,
                            color: accentColor
                        }}
                    >
                        Time Series Data
                    </Typography>
                </Stack>
                <Stack
                    direction="column"
                    sx={{
                        justifyContent: "start"
                    }}
                >
                    <Typography
                        variant="h4"
                        className={isDark ? "gradient-text" : "gradient-text__dark"}
                        sx={{
                            fontFamily: bebasNeue.style.fontFamily,
                            textAlign: "center",
                            color: baseColor
                        }}>
                        {content.slogan}
                    </Typography>
                </Stack>
            </Stack>
            {fullsize &&
                <Stack direction="row"
                    sx={{
                        marginTop: `13%`,
                        position: "relative",
                        width: `100%`,
                        display: "flex",
                        height: `100%`,
                        flexDirection: "row",
                        alignItems: "start",
                        justifyContent: "start",
                    }}>
                    <HeroCardPrimary />
                    <HeroCardSecondary />
                </Stack>
            }
        </Stack>
    );
}

function Content({ fullsize = false }: HeroProps) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <Container
            sx={{
                height: `100%`,
                width: `100%`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            {isMobile ? <Mobile fullsize={fullsize} /> : <Desktop fullsize={fullsize} />}
        </Container>
    );
}


interface HeroProps {
    fullsize?: boolean;
}

export default function Hero({ fullsize = false }: HeroProps) {
    return (
        <Section
            id="hero"
            sx={{
                alignItems: "center",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                overflow: "hidden",
                position: "relative",
                width: "100vw",
                zIndex: 2,
                userSelect: "none",
                maxHeight: "1080px",
                minHeight: fullsize ? "100vh" : "50vh"
            }}
        >
            <Content fullsize={fullsize} />
        </Section>
    );
}
