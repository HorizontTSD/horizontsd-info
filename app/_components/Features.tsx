import * as React from "react";
import { Card, CardContent, Typography, useMediaQuery, Grid } from "@mui/material";
import { useColorScheme } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import LabelIcon from "@mui/icons-material/Label";
import Stack from "@mui/material/Stack";
import { Pagination, Navigation, EffectCoverflow } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import SectionHeader from "@/app/_components/SectionHeader";
import Section from "@/app/_components/Section";
import { useI18n } from "@/app/_providers/I18nProvider";
import type { } from "swiper/types";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import { bebasNeue } from "@/fonts";

interface FeatureItem {
    title: string;
    description: string[];
    more: string[];
}

interface MobileSwiperSlideProps {
    item: FeatureItem;
    size?: number;
}

function Desktop() {
    const { mode } = useColorScheme();
    const isDark = mode === "dark";
    const { dict } = useI18n();
    if (!dict || !dict.Home || !dict.Home.Features || !dict.Home.Features.Content) {
        return null;
    }
    const content: FeatureItem[] = dict.Home.Features.Content;
    const bgPalette = ['var(--mui-palette-secondary-dark)', 'var(--mui-palette-secondary-light)']
    return (
        <Grid
            container
            maxWidth={"lg"}
            direction="column"
            justifyContent="center"
            sx={{
                height: `1px`,
                minHeight: `720px`,
                width: `100%`
            }}>
            <Swiper
                className="swiper-slider"
                effect={"coverflow"}
                grabCursor={true}
                loop={true}
                modules={[Pagination, Navigation, EffectCoverflow]}
                navigation={{ enabled: true }}
                pagination={{ clickable: true }}
                slidesPerView={3}
                spaceBetween={20}
                coverflowEffect={{
                    depth: 50,
                    modifier: 0.9,
                    rotate: 50,
                    slideShadows: false,
                    stretch: 50,
                }}
                style={{
                    alignItems: `center`,
                    display: `inline-flex`,
                    height: `100%`,
                    justifyContent: `center`,
                    maxHeight: "540px",
                    maxWidth: "1920px",
                    paddingTop: `1.1rem`,
                    width: "90%",
                }}>
                {content.map((item: FeatureItem, i: number) => (
                    <SwiperSlide key={i}>
                        <Card sx={{
                            alignSelf: "center",
                            background: bgPalette[~~(!isDark)],
                            borderRadius: "var(--mui-shape-borderRadius)",
                            display: "grid",
                            height: `${30}rem`,
                            justifySelf: "center",
                            width: `100%`,
                        }}>
                            <CardContent sx={{
                                borderRadius: "var(--mui-shape-borderRadius)",
                            }}>
                                <Stack direction="row" alignItems="center">
                                    <LabelIcon color="primary" sx={{ marginRight: "1rem" }} />
                                    <Typography
                                     variant="h4"
                                     component="div"
                                     sx={{
                                         fontFamily: `inherit`,
                                         textAlign: "center",
                                         userSelect: "none",
                                         fontFamily: bebasNeue.style.fontFamily,
                                     }}
                                     >
                                        {item.title}
                                    </Typography>
                                </Stack>
                                {item.description.map((e: string, i: number) => (
                                    <Typography key={i} gutterBottom variant="h6">
                                        {e}
                                    </Typography>
                                ))}
                                {item.more.slice(0, -1).map((e: string, i: number) => (
                                    <Typography key={i} gutterBottom variant="body2" color="textPrimary">
                                        {e}
                                    </Typography>
                                ))}
                                {item.more.slice(-1).map((e: string, i: number) => (
                                    <Typography key={i} gutterBottom variant="caption" color="textSecondary">
                                        {e}
                                    </Typography>
                                ))}
                            </CardContent>
                        </Card>
                    </SwiperSlide>
                ))}
            </Swiper>
        </Grid >
    );
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
                height: "100%",
            }}>
                <Stack direction="row" alignItems="center">
                    <LabelIcon color="primary" sx={{ marginRight: "1rem" }} />
                    <Typography variant="button" component="div">
                        {item.title}
                    </Typography>
                </Stack>
                {item.description.map((e: string, i: number) => (
                    <Typography key={i} gutterBottom variant="subtitle2">
                        {e}
                    </Typography>
                ))}
                {item.more.map((e: string, i: number) => (
                    <Typography key={i} gutterBottom variant="body2">
                        {e}
                    </Typography>
                ))}
            </CardContent>
        </Card>
    );
}

function Mobile() {
    const { dict } = useI18n();
    if (!dict || !dict.Home || !dict.Home.Features || !dict.Home.Features.Content) return null;
    const content: FeatureItem[] = dict.Home.Features.Content;
    const size = 20
    return (
        <Grid container direction="column" sx={{ width: "100%" }}>
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
                    height: "70vh",
                    justifyContent: "center",
                    margin: "1rem 0",
                    width: "100%",
                }}>
                {content.map((item: FeatureItem, i: number) => (
                    <SwiperSlide key={i}>
                        <MobileSwiperSlide size={size} item={item} />
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
    if (!dict || !dict.Home || !dict.Home.Features || !dict.Home.Features.SectionHeader) return null;
    const content = dict.Home.Features.SectionHeader;
    return (
        <Section id="features" >
            <SectionHeader>
                <Typography variant="h2" gutterBottom sx={{
                    fontFamily: `inherit`,
                    textAlign: "center",
                    userSelect: "none",
                    fontFamily: bebasNeue.style.fontFamily,
                }}>
                    {content.h4}
                </Typography>
                <Typography variant="h5" gutterBottom sx={{
                    fontFamily: `inherit`,
                    textAlign: "center",
                    fontFamily: bebasNeue.style.fontFamily,
                }}>
                    {content.body2}
                </Typography>
            </SectionHeader>
            <Content />
        </Section>
    );
}
