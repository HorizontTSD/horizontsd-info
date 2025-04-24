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

interface ContentItem {
    title: string;
    description: string[];
    image: string;
}

function Background() {
    const { mode } = useColorScheme();
    const maskOpacity = mode === "dark" ? "0.1" : "0.7";
    const background = `var(--mui-palette-primary-light)`
    return (
        <Box
            sx={{
                background: background,
                borderRadius: `1rem`,
                height: "100%",
                left: 0,
                maskComposite: "revert",
                maskImage: `url(/images/mask.webp), ${background}`,
                maskPosition: "0% 0%",
                maskRepeat: "no-repeat",
                maskSize: "100% 200%",
                opacity: maskOpacity,
                position: "absolute",
                top: 0,
                width: "100%",
                zIndex: 1,
            }}
        />
    )
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
    const { dict } = useI18n();
    if (!dict || !dict.Features || !dict.Features.Prediction || !dict.Features.Prediction.Content) return null;
    const content: ContentItem[] = dict.Features.Prediction.Content;
    return (
        <Grid container sx={{
            borderRadius: `1rem`,
            display: `flex`,
            flexDirection: `column`,
            padding: `2rem`,
            width: `100%`
        }}>
            {content?.map((item: ContentItem, i: number) => {
                return (
                    <Stack direction={"column"} key={i} sx={{
                        width: `100%`,
                        padding: `2rem`
                    }}>
                        <ScrollGrow>
                            <Stack direction={i % 2 === 0 ? "row" : `row-reverse`} sx={{
                                alignItems: `center`,
                                display: `flex`,
                                height: `50vh`,
                                justifyContent: `space-around`,
                                position: `relative`,
                                width: `100%`,
                                zIndex: `2`,
                            }}>
                                <Box sx={{
                                    alignItems: `center`,
                                    backgroundColor: `transparent`,
                                    border: `1px solid black`,
                                    borderRadius: `0.5rem`,
                                    display: `flex`,
                                    justifyContent: `center`,
                                    maxHeight: `45vh`,
                                    position: `relative`,
                                    transition: `transform 0.3s linear`,
                                    width: `40%`,
                                    zIndex: `10`,
                                    "&:hover": {
                                        transform: `scale(1.4) translateX(${i % 2 === 0 ? `10%` : `-10%`})`
                                    }
                                }}>
                                    <CardMedia
                                        alt={item.title}
                                        component="img"
                                        image={item.image}
                                        sx={{ maxHeight: `45vh`, width: `100%`, }}
                                    />
                                </Box>
                                <Box sx={{
                                    display: `flex`,
                                    flexDirection: `column`,
                                    justifyContent: `start`,
                                    width: `30%`,
                                }}>
                                    <Box sx={{
                                        alignItems: `start`,
                                        display: `flex`,
                                        flexDirection: `column`,
                                        height: `30vh`,
                                        justifyContent: `space-between`,
                                        left: `0`,
                                        padding: `1rem`,
                                        position: `relative`,
                                        top: `0`,
                                        width: `100%`,
                                        zIndex: 4
                                    }}>
                                        <Stack>
                                            <Typography gutterBottom variant="h6" color="textPrimary">{item.title}</Typography>
                                            {item.description.map((e: string, i: number) => (
                                                <Typography key={i} gutterBottom variant="body2" color="textPrimary">{e}</Typography>
                                            ))}
                                        </Stack>
                                    </Box>
                                </Box>
                                <Background />
                            </Stack>
                        </ScrollGrow>
                    </Stack>
                )
            })}
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
                <Typography variant="h4" gutterBottom sx={{
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