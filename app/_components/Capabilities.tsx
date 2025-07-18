import * as React from "react";
import Link from "next/link";
import { Card, CardContent, Box, Container, Typography, useMediaQuery, Grid, Button, Stack } from "@mui/material";
import { useColorScheme } from "@mui/material/styles";
import LabelIcon from "@mui/icons-material/Label";
import { useTheme } from "@mui/material/styles";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import SectionHeader from "@/app/_components/SectionHeader";
import { useI18n } from "@/app/_providers/I18nProvider";
import ScrollGrow from "@/app/_components/ScrollGrow";
import Section from "@/app/_components/Section";
import type { } from "swiper/types";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";

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
    size?: number;
}

function MobileSwiperSlide({ item }: MobileSwiperSlideProps) {
    const { mode } = useColorScheme();
    const isDark = mode === "dark";
    const bgPalette = ['var(--mui-palette-secondary-dark)', 'var(--mui-palette-secondary-light)']

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
                borderRadius: "var(--mui-shape-borderRadius)",
                display: `flex`,
                flexDirection: `column`,
                height: `100%`,
                justifyContent: "space-between",
            }}>
                <Stack>
                    <Stack direction="row" alignItems="center" marginBottom={1}>
                        <LabelIcon color="primary" sx={{ marginRight: "1rem" }} />
                        <Typography variant="button" component="div">
                            {item.title}
                        </Typography>
                    </Stack>
                    {item.description.slice(0, 2).map((e: string, i: number) => (
                        <Typography key={i} variant="subtitle1" gutterBottom>{e}</Typography>
                    ))}
                    {item.description.slice(2, -1).map((e: string, i: number) => (
                        <Typography key={i} variant="body1" gutterBottom>{e}</Typography>
                    ))}
                </Stack>
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
    if (!dict || !dict.Home || !dict.Home.Capabilities || !dict.Home.Capabilities.Content) return null;
    const content: CapabilityItem[] = dict.Home.Capabilities.Content;
    const size = 35
    return (
        <Grid container direction="column" sx={{
            width: "100%",
            height: `100%`
        }}>
            <Swiper
                className="swiper-slider"
                loop={true}
                modules={[Pagination, Navigation]}
                navigation={{ enabled: true }}
                pagination={{ clickable: true }}
                spaceBetween={10}
                style={{
                    alignItems: "center",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    display: "flex",
                    height: "80vh",
                    justifyContent: "center",
                    margin: "1rem 0",
                    width: "100%",
                }}>
                {content.map((item: CapabilityItem, i: number) => (
                    <SwiperSlide key={i}>
                        <MobileSwiperSlide size={size} item={item} />
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
    const { dict } = useI18n();
    const isSm = useMediaQuery(theme.breakpoints.down("lg"));
    if (!dict || !dict.Home || !dict.Home.Capabilities || !dict.Home.Capabilities.Content) return null;
    const content: CapabilityItem[] = dict.Home.Capabilities.Content;
    const bgPalette = ['var(--mui-palette-secondary-dark)', 'var(--mui-palette-secondary-light)']
    return (
        <Grid container maxWidth={"lg"} spacing={1} rowSpacing={1} sx={{ padding: "1rem" }}>
            {content.map((item: CapabilityItem, index: number) => (
                <Grid size={isSm ? 12 : 6} key={index} >
                    <ScrollGrow>
                        <Stack
                            direction="column"
                            component={Card}
                            useFlexGap
                            sx={{
                                background: bgPalette[~~(!isDark)],
                                color: "textPrimary",
                                justifyContent: "space-between",
                                minHeight: isSm ? `auto` : "25rem",
                                padding: `0.7rem`,
                            }}>
                            <Stack direction={"column"}>
                                <Stack direction="row" sx={{
                                    alignItems: "center",
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "start",
                                }}>
                                    <LabelIcon color="primary" sx={{ marginRight: "1rem" }} />
                                    <Box display="flex" justifyContent="center" width="100%">
                                      <Typography variant={isSm ? "subtitle1" : "h4"} component="div" style={{ fontWeight: 'bold', textAlign: 'center', width: '100%' }}>
                                        {item.title}
                                      </Typography>
                                    </Box>
                                </Stack>
                                {item.description.slice(0, 2).map((e: string, i: number) => (
                                    <Typography key={i} variant={isSm ? "subtitle2" : "subtitle1"} gutterBottom>{e}</Typography>
                                ))}
                                {item.description.slice(2, -1).map((e: string, i: number) => (
                                    <Typography key={i} variant={isSm ? "caption" : "body2"} gutterBottom>{e}</Typography>
                                ))}
                            </Stack>

                            {item.description.slice(-1).map((e: string, i: number) => (
                                <Typography key={i} variant={isSm ? "subtitle2" : "caption"} color="textSecondary" gutterBottom>
                                    {e}
                                </Typography>
                            ))}
                        </Stack>
                    </ScrollGrow>
                </Grid>
            ))}
        </Grid>
    );
}

function Content() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    return isMobile ? <SliderMobile /> : <Desktop />;
}

function Footer() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const { dict } = useI18n();
    if (!dict || !dict.Home || !dict.Home.Capabilities || !dict.Home.Capabilities.Footer) return null;
    const content: FooterContent = dict.Home.Capabilities.Footer;

    return (
        <Box sx={{
            alignItems: "center",
            display: "flex",
            flex: "auto",
            flexDirection: "column",
            justifyContent: "end",
            minHeight: "180px",
            paddingBottom: "2rem",
            width: "100%",
        }}>
            <Container maxWidth="xl" sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
            }}>
                <Grid container direction="column" spacing={2} alignContent="center"
                    sx={{
                        alignItems: "center",
                        display: "flex",
                        justifyContent: "center",
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
                            <Typography key={i} variant="caption" gutterBottom color="secondary" sx={{
                                textAlign: "center",
                            }}>
                                {e}
                            </Typography>
                        ))}
                    </Stack>
                    <Link href="/research">
                        <Button color="secondary" variant="contained" sx={{ color: "primary.light" }}>
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
    if (!dict || !dict.Home || !dict.Home.Capabilities || !dict.Home.Capabilities.SectionHeader) return null;
    const content = dict.Home.Capabilities.SectionHeader;

    return (
        <Section id="capabilities" sx={{
            display: `flex`,
            flexDirection: `column`,
        }}>
            <SectionHeader>
                <Typography variant="h3" gutterBottom sx={{
                    fontFamily: `inherit`,
                    textAlign: "center",
                    userSelect: "none",
                }}>
                    {content.h4}
                </Typography>
                <Typography variant="h5" gutterBottom sx={{
                    fontFamily: `inherit`,
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