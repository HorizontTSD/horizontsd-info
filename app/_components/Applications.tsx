import * as React from "react";
import { useI18n } from "../_providers/I18nProvider";
import { useColorScheme, useTheme } from "@mui/material/styles";
import {
    Card, CardContent,
    Box, Container, Typography, Button,
    useMediaQuery, Grid, Stack,
    CardActions
} from "@mui/material";
import NextLink from "next/link";
import type { } from "swiper/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./swiper.css";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import SectionHeader from "./SectionHeader";
import Section from "./Section";

interface ApplicationItem {
    title: string;
    description: string[];
    link: string;
}

interface ButtonItem {
    title: string;
    description: string;
}

interface ContentItem {
    block: ApplicationItem;
    button: ButtonItem;
}

interface MobileSwiperSlideProps {
    item: ApplicationItem;
}

function MobileSwiperSlide({ item }: MobileSwiperSlideProps) {
    const { dict } = useI18n();

    if (!dict || !dict.Home || !dict.Home.Applications) {
        return null;
    }

    const dictionary = dict.Home.Applications;

    return (
        <Card sx={{
            width: "80%",
            height: "93%",
            border: "1px solid var(--mui-palette-secondary-dark)",
            borderRadius: "var(--mui-shape-borderRadius)",
            display: "flex",
            justifySelf: "center",
            flexDirection: "column",
            justifyContent: "start",
            alignItems: "center"
        }}>
            <CardContent sx={{
                borderRadius: "var(--mui-shape-borderRadius)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                height: "100%",
                width: "95%"
            }}>
                <Stack direction="column" sx={{ justifyContent: "start", width: "100%" }}>
                    <Typography variant="h6" sx={{ color: "text.primary" }}>
                        {item.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                        {item.description[0]}
                    </Typography>
                </Stack>
                <CardActions sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 0,
                    margin: 0,
                    height: "10%"
                }}>
                    <NextLink href={item.link}>
                        <Button color="secondary" variant="contained" sx={{
                            color: "secondary.light"
                        }}>
                            {dictionary.Button}
                        </Button>
                    </NextLink>
                </CardActions>
            </CardContent>
        </Card>
    );
}

function Mobile() {
    const { dict } = useI18n();

    if (!dict || !dict.Home || !dict.Home.Applications || !dict.Home.Applications.Content) {
        return null;
    }

    const dictionary = dict.Home.Applications;

    return (
        <Grid
            container direction="column" sx={{
                display: { xs: "flex", sm: "flex", md: "none" },
                width: "100%"
            }}
        >
            <Swiper
                spaceBetween={10}
                loop={true}
                modules={[Pagination, Navigation]}
                pagination={{ clickable: true }}
                navigation={{ enabled: true }}
                className="swiper-slider"
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    width: "100%",
                    height: "70vh",
                    margin: "1rem 0",
                }}
            >
                {dictionary.Content.map(({ block }: ContentItem, i: number) => (
                    <SwiperSlide key={i}>
                        <MobileSwiperSlide item={block} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </Grid>
    );
}
function Desktop() {
    const { mode } = useColorScheme();
    const isDark = mode === "dark";
    const backgroundColor = isDark ? "var(--mui-palette-primary-dark)" : "var(--mui-palette-primary-light)";
    const hoverBackground = isDark ? "var(--mui-palette-secondary-dark)" : "var(--mui-palette-secondary-main)";
    const backgroundSelected = isDark ? "var(--mui-palette-primary-main)" : "var(--mui-palette-primary-dark)";
    const { dict } = useI18n();

    const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);

    if (!dict || !dict.Home || !dict.Home.Applications || !dict.Home.Applications.Content) {
        return null;
    }

    const dictionary = dict.Home.Applications;

    const handleItemClick = (index: number) => {
        setSelectedItemIndex(index);
    };

    const selected = dictionary.Content[selectedItemIndex].block;


    return (
        <Container
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                pt: { xs: 14, sm: 20 },
                pb: { xs: 8, sm: 12 },
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%"
                }}
            >
                <Stack direction="column">
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            margin: "0 0 1rem 0",
                            width: "100%",
                            height: `auto`
                        }}
                    >
                        {dictionary.Content.map(({ button }: ContentItem, index: number) => (
                            <Box
                                key={index}
                                onClick={() => handleItemClick(index)}
                                sx={[
                                    {
                                        border: `none`,
                                        background: `var(--mui-palette-LinearProgress-secondaryBg)`,
                                        cursor: "pointer",
                                        borderRadius: "var(--mui-shape-borderRadius)",
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "start",
                                        alignItems: "center",
                                        padding: 2,
                                        height: `100%`,
                                        width: "auto",
                                        color: `var(--mui-palette-text-primary)`,
                                        marginLeft: index === 0 ? 0 : "1rem",
                                        "&:hover": {
                                            backgroundColor: hoverBackground,
                                            color: `var(--mui-palette-secondary-light)`
                                        },
                                    },
                                    selectedItemIndex === index && {
                                        backgroundColor: backgroundSelected,
                                        color: `var(--mui-palette-secondary-light)`
                                    },
                                ]}
                            >
                                <Box sx={{
                                    width: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "left",
                                    textAlign: "left",
                                    textTransform: "none",
                                }}>
                                    <Stack>
                                        <Stack direction="row" alignItems="center">
                                            <FormatListBulletedIcon
                                                sx={{
                                                    marginRight: "1rem"
                                                }}
                                            />
                                            <Typography
                                                variant="h6"
                                            >
                                                {button.title}
                                            </Typography>
                                        </Stack>
                                        <Typography
                                            variant="body2"
                                        >
                                            {button.description}
                                        </Typography>
                                    </Stack>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                </Stack>
                <Box sx={{
                    display: "flex",
                    width: "100%",
                    overflow: "hidden",
                    zIndex: 33
                }}>
                    <Card variant="outlined" sx={{
                        width: "100%",
                        height: "100%"
                    }}>
                        <Box sx={{
                            position: "relative",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "25vh",
                            background: `linear-gradient(180deg, ${backgroundColor}, transparent)`,
                            backgroundPosition: "70% 30%",
                            zIndex: 3
                        }} >
                            <Box sx={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                alignItems: "start",
                                position: "relative",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                padding: "1rem",
                                zIndex: 4
                            }} >
                                <Stack>
                                    <Typography color="textPrimary" gutterBottom variant="h6">
                                        {selected.title}
                                    </Typography>
                                    {selected.description.map((e: string, i: number) => (
                                        <Typography color="textSecondary" key={i} gutterBottom variant="body2">
                                            {e}
                                        </Typography>
                                    ))}
                                </Stack>
                                <Stack>
                                    <NextLink href={selected.link}>
                                        <Button color="secondary" variant="contained" sx={{ color: "primary.light" }}>
                                            {dictionary.Button}
                                        </Button>
                                    </NextLink>
                                </Stack>
                            </Box>
                        </Box>
                    </Card>
                </Box>
            </Box>
        </Container>
    );
}

function Content() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    return isMobile ? <Mobile /> : <Desktop />;
}

export default function Applications() {
    const { dict } = useI18n();

    if (!dict || !dict.Home || !dict.Home.Applications || !dict.Home.Applications.SectionHeader) {
        return null;
    }

    const dictionary = dict.Home.Applications;

    return (
        <Section id="applications">
            <SectionHeader>
                <Typography variant="h4" gutterBottom sx={{
                    // textShadow: "0px 3px 5px var(--mui-palette-primary-dark)",
                    userSelect: "none",
                    textAlign: "center",
                }}>
                    {dictionary.SectionHeader.h4}
                </Typography>
                <Typography variant="body2" gutterBottom sx={{
                    // textShadow: "0px 3px 5px var(--mui-palette-primary-dark)",
                    textAlign: "center",
                }}>
                    {dictionary.SectionHeader.body2}
                </Typography>
            </SectionHeader>
            <Content />
        </Section>
    );
}
