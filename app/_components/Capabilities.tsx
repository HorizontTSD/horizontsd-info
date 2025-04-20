import * as React from "react";
import { useColorScheme } from "@mui/material/styles";
import { useI18n } from "../_providers/I18nProvider";
import { useTheme } from "@mui/material/styles";
import { Card, CardContent, Box, Container, Typography, useMediaQuery, Grid, Button, Stack } from "@mui/material";
import type { } from "swiper/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import SectionHeader from "./SectionHeader";
import Section from "./Section";
import LabelIcon from "@mui/icons-material/Label";
import Link from "next/link";
import ScrollGrow from "./ScrollGrow";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import "./swiper.css";

interface CapabilityItem {
    title: string;
    description: string[];
}

interface FooterContent {
    header: string;
    description: string;
    content: string[];
    Button: string;
}

interface MobileSwiperSlideProps {
    item: CapabilityItem;
}

function MobileSwiperSlide({ item }: MobileSwiperSlideProps) {
    return (
        <Card sx={{
            width: "80%",
            height: "93%",
            border: "1px solid var(--mui-palette-primary-main)",
            borderRadius: "var(--mui-shape-borderRadius)",
            display: "grid",
            justifySelf: "center",
            alignSelf: "center"
        }}>
            <CardContent sx={{
                borderRadius: "var(--mui-shape-borderRadius)",
            }}>
                <Stack direction="row" alignItems="center">
                    <LabelIcon color="secondary" sx={{ marginRight: "1rem" }} />
                    <Typography color="primary" variant="button" component="div">
                        {item.title}
                    </Typography>
                </Stack>
                {item.description.slice(0, 2).map((e: string, i: number) => (
                    <Typography key={i} variant="subtitle2" color="secondary" gutterBottom>{e}</Typography>
                ))}
                {item.description.slice(2, -1).map((e: string, i: number) => (
                    <Typography key={i} variant="body2" gutterBottom>{e}</Typography>
                ))}
                {item.description.slice(-1).map((e: string, i: number) => (
                    <Typography key={i} variant="caption" color="textSecondary" gutterBottom>
                        {e}
                    </Typography>
                ))}
            </CardContent>
        </Card>
    );
}

function SliderMobile() {
    const { dict } = useI18n();

    if (!dict || !dict.Home || !dict.Home.Capabilities || !dict.Home.Capabilities.Content) {
        return null;
    }

    const content: CapabilityItem[] = dict.Home.Capabilities.Content;

    return (
        <Grid container direction="column" sx={{
            display: { xs: "flex", sm: "flex", md: "none" },
            width: "100%",
        }}>
            <Swiper
                spaceBetween={10}
                pagination={{ clickable: true }}
                navigation={{ enabled: true }}
                loop={true}
                modules={[Pagination, Navigation]}
                className="swiper-slider"
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    width: "100%",
                    height: "80vh",
                    margin: "1rem 0",
                }}>
                {content.map((item: CapabilityItem, i: number) => (
                    <SwiperSlide key={i}>
                        <MobileSwiperSlide item={item} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </Grid>
    );
}

function Desktop() {
    const theme = useTheme();
    const { mode } = useColorScheme();
    const isDark = mode === "dark";
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const { dict } = useI18n();

    if (!dict || !dict.Home || !dict.Home.Capabilities || !dict.Home.Capabilities.Content) {
        return null;
    }

    const content: CapabilityItem[] = dict.Home.Capabilities.Content;
    const backgroundColor2 = isDark ? "var(--mui-palette-primary-dark)" : "var(--mui-palette-common-white)"

    return (
        <Grid container spacing={2} sx={{ padding: "2rem", maxWidth: "1480px" }}>
            {content.map((item: CapabilityItem, index: number) => (
                <Grid size={6} key={index} spacing={2}>
                    <ScrollGrow
                        animationDelay={200}
                        threshold={0.01}
                        timeout={200}
                        transformOrigin="0 0 0"
                    >
                        <Stack
                            direction="column"
                            component={Card}
                            useFlexGap
                            sx={{
                                color: "textPrimary",
                                p: 3,
                                height: isMobile ? "unset" : "30vh",
                                background: `linear-gradient(-179.99deg, transparent 0%, ${backgroundColor2} 2%)`
                            }}>
                            <div>
                                <Stack direction="row" sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "start",
                                    alignItems: "center",
                                    marginBottom: "1rem"
                                }}>
                                    <LabelIcon color="secondary" sx={{ marginRight: "1rem" }} />
                                    <Typography variant="h6" color="secondary" component="div">{item.title}</Typography>
                                </Stack>
                                {item.description.slice(0, 2).map((e: string, i: number) => (
                                    <Typography key={i} variant="subtitle2" color="textSecondary" gutterBottom>{e}</Typography>
                                ))}
                                {item.description.slice(2, -1).map((e: string, i: number) => (
                                    <Typography key={i} variant="body2" gutterBottom>{e}</Typography>
                                ))}
                                {item.description.slice(-1).map((e: string, i: number) => (
                                    <Typography key={i} variant="caption" color="textSecondary" gutterBottom>
                                        {e}
                                    </Typography>
                                ))}
                            </div>
                        </Stack>
                    </ScrollGrow>
                </Grid>
            ))}
        </Grid>
    );
}

function Content() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    return isMobile ? <SliderMobile /> : <Desktop />;
}

function Footer() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const { dict } = useI18n();

    if (!dict || !dict.Home || !dict.Home.Capabilities || !dict.Home.Capabilities.Footer) {
        return null;
    }

    const content: FooterContent = dict.Home.Capabilities.Footer;

    return (
        <Box sx={{
            display: "flex",
            width: "100%",
            minHeight: "180px",
            justifyContent: "end",
            alignItems: "center",
            flexDirection: "column",
            paddingBottom: "20px",
            flex: "auto"
        }}>
            <Container maxWidth="xl" sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
            }}>
                <Grid container direction="column" spacing={2} alignContent="center"
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                    <Typography variant="caption" gutterBottom color="textPrimary" sx={{
                        textAlign: "center",
                    }}>
                        {content.header}
                    </Typography>
                    <Typography variant="caption" gutterBottom color="textPrimary" sx={{
                        textAlign: "center",
                    }}>
                        {content.description}
                    </Typography>
                    <Stack direction={isMobile ? "column" : "row"} sx={{ width: "90%", justifyContent: "space-between" }}>
                        {content.content.map((e: string, i: number) => (
                            <Typography key={i} variant="caption" gutterBottom color="primary" sx={{
                                textAlign: "center",
                            }}>
                                {e}
                            </Typography>
                        ))}
                    </Stack>
                    <Link href="/research">
                        <Button color="primary" variant="contained" sx={{ color: "primary.light" }}>
                            {content.Button}
                        </Button>
                    </Link>
                </Grid>
            </Container>
        </Box>
    );
}

export default function Capabilities() {
    const { dict } = useI18n();

    if (!dict || !dict.Home || !dict.Home.Capabilities || !dict.Home.Capabilities.SectionHeader) {
        return null;
    }

    const content = dict.Home.Capabilities.SectionHeader;

    return (
        <Section id="capabilities" sx={{ justifyContent: "space-between" }}>
            <SectionHeader>
                <Typography variant="h4" gutterBottom sx={{
                    // textShadow: "0px 1px 1px var(--mui-palette-primary-main)",
                    userSelect: "none",
                    textAlign: "center",
                }}>
                    {content.h4}
                </Typography>
                <Typography variant="body2" gutterBottom sx={{
                    // textShadow: "0px 1px 1px var(--mui-palette-primary-main)",
                    textAlign: "center",
                }}>
                    {content.body2}
                </Typography>
            </SectionHeader>
            <Content />
            <Footer />
        </Section>
    );
}