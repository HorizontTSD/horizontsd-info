import * as React from "react";
import { Card, CardMedia, CardContent, Typography, Box, useMediaQuery, Grid, Stack } from "@mui/material"
import { useColorScheme } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import { Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { } from "swiper/types";
import SectionHeader from "@/app/_components/SectionHeader"
import { useI18n } from "@/app/_providers/I18nProvider";
import ScrollGrow from "@/app/_components/ScrollGrow";
import Section from "@/app/_components/Section"
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import { CardBackground } from "@/app/_components/Common";

interface ContentItem {
    title: string;
    description: string[];
    image: string;
}

function Mobile() {
    const { dict } = useI18n();
    if (!dict || !dict.Features || !dict.Features.Prediction || !dict.Features.Prediction.Content) return null;
    const content: ContentItem[] = dict.Features.Prediction.Content;
    return (
        <Grid container direction="column" sx={{
            display: { xs: "flex", sm: "flex", md: "none" },
            width: `100%`,
        }}>
            <Swiper
                className="swiper-slider"
                loop={true}
                modules={[Pagination, Navigation]}
                navigation={{ enabled: true }}
                pagination={{ clickable: true }}
                spaceBetween={10}
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundPosition: `center`,
                    backgroundSize: `cover`,
                    width: `100%`,
                    height: `80vh`,
                    margin: `2rem 0`,
                }}>
                {content.map((item: ContentItem, i: number) => (
                    <SwiperSlide key={i}>
                        <Card sx={{
                            borderRadius: `1rem`,
                            display: "flex",
                            height: `90%`,
                            justifySelf: `center`,
                            width: `80%`,
                        }}>
                            <CardContent sx={{
                                borderRadius: `1rem`,
                                display: `flex`,
                                flexDirection: `column`,
                                height: `90%`,
                                justifyContent: `space-between`
                            }}>
                                <Stack>
                                    <Typography variant="h6" sx={{ color: "text.secondary" }}>
                                        {item.title}
                                    </Typography>
                                    {item.description.map((e: string, i: number) => (
                                        <Typography key={i} gutterBottom variant="body2">
                                            {e}
                                        </Typography>
                                    ))}
                                </Stack>
                                <CardMedia
                                    component="img"
                                    alt={item.title}
                                    sx={{
                                        width: `100%`,
                                        backgroundColor: `transparent`,
                                        height: `auto`,
                                        backgroundSize: `contain`
                                    }}
                                    image={item.image}
                                />
                            </CardContent>
                        </Card>
                    </SwiperSlide>
                ))}
            </Swiper>
        </Grid>
    )
}

function Desktop() {
    const { mode } = useColorScheme();
    const isDark = mode == "dark"
    const { dict } = useI18n();
    if (!dict || !dict.Features || !dict.Features.Prediction || !dict.Features.Prediction.Content) return null;
    const content: ContentItem[] = dict.Features.Prediction.Content;
    return (
        <Grid maxWidth={"xl"} container sx={{
            borderRadius: "var(--mui-shape-borderRadius)",
            display: `flex`,
            flexDirection: `column`,
            padding: `1rem`,
            width: `100%`
        }}>
            {content?.map((item: ContentItem, i: number) => (
                <ScrollGrow key={i}>
                    <Stack direction={"column"} key={i} sx={{
                        padding: `1rem`,
                        alignItems: `center`,
                        maxHeight: `45vh`,
                    }}>
                        <Stack direction={i % 2 === 0 ? "row" : `row-reverse`} sx={{
                            alignItems: `center`,
                            position: `relative`,
                            width: `100%`,
                            justifyContent: `space-between`,
                            zIndex: 4,
                        }}>
                            <Box sx={{
                                alignItems: `center`,
                                backgroundColor: `transparent`,
                                borderRadius: "var(--mui-shape-borderRadius)",
                                display: `flex`,
                                justifyContent: `center`,
                                position: `relative`,
                                width: `40%`,
                                maxHeight: `20vh`,
                                margin: i % 2 === 0 ? `0 0 0 1rem` : `0 1rem 0 0`,
                                transition: `transform 0.3s linear`,
                                zIndex: 5,
                                background: `url(${item.image})`,
                                backgroundPosition: "50% 50%",
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "contain",
                                flexDirection: "column",
                                height: "19vh",
                                "&:hover": {
                                    transform: `scale(2) translateX(${i % 2 === 0 ? `3%` : `-3%`})`
                                },
                            }} />
                            <Box sx={{
                                display: `flex`,
                                flexDirection: `column`,
                                justifyContent: `center`,
                                alignItems: i % 2 == 0 ? `end` : `start`,
                                width: `60%`,
                                borderRadius: "var(--mui-shape-borderRadius)",
                                zIndex: 4,
                                background: `linear-gradient(${i % 2 == 0 ? -90 : 90}deg, rgb(from var(${isDark ? "--mui-palette-secondary-dark" : "--mui-palette-common-white"}) r g b / 0.5) 80%, transparent)`,
                                height: `40vh`,
                                left: `0`,
                                padding: `1rem`,
                                position: `relative`,
                                top: `0`,
                            }} >
                                <Stack sx={{
                                    textAlign: i % 2 === 0 ? "right" : "left"
                                }}>
                                    <Typography gutterBottom variant="h6" color="textPrimary">{item.title}</Typography>
                                    {item.description.slice(0, 1).map((e: string, i: number) =>
                                        (<Typography key={i} gutterBottom variant="subtitle1" color="textSecondary" >{e}</Typography>)
                                    )}
                                    {item.description.slice(1).map((e: string, i: number) =>
                                        (<Typography key={i} gutterBottom variant="body1" color="textSecondary" >{e}</Typography>)
                                    )}
                                </Stack>
                            </Box>
                            <CardBackground direction={i % 2 === 0} />
                        </Stack>
                    </Stack >
                </ScrollGrow>
            ))}
        </Grid>
    )
}

function Content() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    return isMobile ? <Mobile /> : <Desktop />;
}

interface SectionHeaderContent {
    h4: string;
    body2: string;
}

export default function Prediction() {
    const { dict } = useI18n();
    if (!dict || !dict.Features || !dict.Features.Prediction || !dict.Features.Prediction.SectionHeader) return null;
    const content: SectionHeaderContent = dict.Features.Prediction.SectionHeader;
    return (
        <Section id="prediction">
            <SectionHeader>
                <Typography variant="h3" gutterBottom sx={{
                    fontFamily: `inherit`,
                    textAlign: `center`,
                    userSelect: `none`,
                }}>{content?.h4}</Typography>
                <Typography variant="subtitle1" gutterBottom sx={{
                    textAlign: `center`,
                    fontFamily: `inherit`
                }}>{content?.body2}</Typography>
            </SectionHeader>
            <Content />
        </Section>
    )
}