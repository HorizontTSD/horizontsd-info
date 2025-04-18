import * as React from "react";
import { useColorScheme } from "@mui/material/styles";
import { useI18n } from "../_providers/I18nProvider";
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import { Card, CardContent, Typography, useMediaQuery, Grid } from "@mui/material";
import type { } from "swiper/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, EffectCoverflow } from "swiper/modules";
import SectionHeader from "./SectionHeader";
import Section from "./Section";
import LabelIcon from "@mui/icons-material/Label";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import "./swiper.css";

interface FeatureItem {
    title: string;
    description: string[];
    more: string[];
}

interface MobileSwiperSlideProps {
    item: FeatureItem;
}

function Desktop() {
    const { mode } = useColorScheme();
    const isDark = mode === "dark";
    const { dict } = useI18n();
    if (!dict || !dict.Home || !dict.Home.Features || !dict.Home.Features.Content) {
        return null; 
    }
    const content: FeatureItem[] = dict.Home.Features.Content;

    return (
        <Grid
            container
            direction="column"
            justifyContent="center"
            spacing={1}
            sx={{
                display: { xs: "none", sm: "none", md: "flex" },
                width: { lg: "80%", md: "100%" },
                height: "80vh"
            }}>
            <Swiper
                loop={true}
                modules={[Pagination, Navigation, EffectCoverflow]}
                navigation={{ enabled: true }}
                pagination={{ clickable: true }}
                spaceBetween={10}
                slidesPerView={3}
                effect={"coverflow"}
                grabCursor={true}
                className="swiper-slider"
                coverflowEffect={{
                    rotate: 45,
                    stretch: 50,
                    depth: 50,
                    modifier: 0.7,
                    slideShadows: true,
                }}
                style={{
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    display: "flex",
                    height: "100%",
                    width: "100%",
                    maxHeight: "540px",
                    maxWidth: "80%",
                    padding: "20px 0"
                }}>
                {content.map((item: FeatureItem, i: number) => (
                    <SwiperSlide key={i}>
                        <Card sx={{
                            width: "100%",
                            height: "100%",
                            borderRadius: "var(--mui-shape-borderRadius)",
                            background: isDark
                                ? "var(--mui-palette-primary-dark)"
                                : "var(--mui-palette-common-white)"
                        }}>
                            <CardContent sx={{
                                backgroundSize: "fill",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center",
                                borderRadius: "var(--mui-shape-borderRadius)",
                                height: "100%",
                            }}>
                                <Stack direction="row" alignItems="center">
                                    <LabelIcon color="secondary" sx={{ marginRight: "1rem" }} />
                                    <Typography variant="button" color="primary" component="div">
                                        {item.title}
                                    </Typography>
                                </Stack>
                                {item.description.map((e: string, i: number) => (
                                    <Typography key={i} gutterBottom color="textPrimary" variant="subtitle2">
                                        {e}
                                    </Typography>
                                ))}
                                {item.more.map((e: string, i: number) => (
                                    <Typography key={i} gutterBottom color="textSecondary" variant="body2">
                                        {e}
                                    </Typography>
                                ))}
                            </CardContent>
                        </Card>
                    </SwiperSlide>
                ))}
            </Swiper>
        </Grid>
    );
}

function MobileSwiperSlide({ item }: MobileSwiperSlideProps) {
    return (
        <Card sx={{
            width: "80%",
            height: "93%",
            border: "1px solid var(--mui-palette-primary-contrastText)",
            borderRadius: "var(--mui-shape-borderRadius)",
            display: "flex",
            justifySelf: "center",
        }}>
            <CardContent sx={{
                borderRadius: "var(--mui-shape-borderRadius)",
            }}>
                <div>
                    <Typography variant="button" color="primary">
                        {item.title}
                    </Typography>
                    <Typography variant="subtitle1" color="textPrimary">
                        {item.description[0]}
                    </Typography>
                    {item.more.map((e: string, i: number) => (
                        <Typography key={i} gutterBottom variant="body2" color="textSecondary">
                            {e}
                        </Typography>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}

function Mobile() {
    const { dict } = useI18n();
    if (!dict || !dict.Home || !dict.Home.Features || !dict.Home.Features.Content) {
        return null; 
    }
    const content: FeatureItem[] = dict.Home.Features.Content;

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
                {content.map((item: FeatureItem, i: number) => (
                    <SwiperSlide key={i}>
                        <MobileSwiperSlide item={item} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </Grid>
    );
}

function Content() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    return isMobile ? <Mobile /> : <Desktop />;
}

export default function Features() {
    const { dict } = useI18n();
    if (!dict || !dict.Home || !dict.Home.Features || !dict.Home.Features.SectionHeader) {
        return null;
    }
    const content = dict.Home.Features.SectionHeader;

    return (
        <Section id="features" sx={{ alignItems: "center" }}>
            <SectionHeader>
                <Typography variant="h4" gutterBottom sx={{
                    // textShadow: "0px 3px 5px var(--mui-palette-primary-dark)",
                    userSelect: "none",
                    textAlign: "center",
                }}>
                    {content.h4}
                </Typography>
                <Typography variant="body2" gutterBottom sx={{
                    // textShadow: "0px 3px 5px var(--mui-palette-primary-dark)",
                    textAlign: "center",
                }}>
                    {content.body2}
                </Typography>
            </SectionHeader>
            <Content />
        </Section>
    );
}
