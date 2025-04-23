import * as React from "react";
import { useTheme } from "@mui/material/styles";
import {
    Typography, Button, Box,
    useMediaQuery, Grid, Stack
} from "@mui/material";
import SectionHeader from "../../_components/SectionHeader";
import Section from "../../_components/Section";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import "../../_components/swiper.css";
import NextLink from "next/link";
import Image from "next/image";
import { ResearchItem } from "../../_components/types";

interface PaperWorkProps {
    item: ResearchItem;
}

function Mobile({ content }: { content: ResearchItem }) {
    const buttonContent = content.Button;

    return (
        <Grid
            container
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: "1rem",
                width: "100%"
            }}>
            <Box sx={{
                position: "relative",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "transparent",
                maxHeight: "45vh",
                width: "100%",
                paddingBottom: "2rem"
            }}>
                <Image
                    src={content.image}
                    alt={content.title}
                    width={800}
                    height={450}
                    style={{
                        maxHeight: "45vh",
                        width: "100%",
                        objectFit: "contain"
                    }}
                />
            </Box>
            <Stack sx={{
                width: "100%",
                marginBottom: "2rem"
            }}>
                {content.description.map((item: string, i: number) => (
                    <Typography key={i} color="textPrimary" gutterBottom variant="body1">
                        {item}
                    </Typography>
                ))}
            </Stack>
            <Stack>
                <NextLink href="#">
                    <Button variant="contained" sx={{ color: "primary.light" }}>
                        {buttonContent}
                    </Button>
                </NextLink>
            </Stack>
        </Grid>
    );
}

function Desktop({ content }: { content: ResearchItem }) {
    const buttonContent = content.Button;

    return (
        <Grid
            container
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: "1rem",
                width: "80%",
                margin: "2rem 0"
            }}>
            <Box sx={{
                position: "relative",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "transparent",
                maxHeight: "45vh",
                width: "50%",
                paddingBottom: "2rem"
            }}>
                <Image
                    src={content.image}
                    alt={content.title}
                    width={800}
                    height={450}
                    style={{
                        maxHeight: "45vh",
                        width: "100%",
                        objectFit: "contain"
                    }}
                />
            </Box>
            <Stack sx={{
                width: "100%",
                margin: "1rem 0"
            }}>
                {content.description.map((item: string, i: number) => (
                    <Typography key={i} color="textPrimary" gutterBottom variant="body1">
                        {item}
                    </Typography>
                ))}
            </Stack>
            <Stack>
                <NextLink href="#">
                    <Button variant="contained" color="secondary" sx={{ color: "primary.light" }}>
                        {buttonContent}
                    </Button>
                </NextLink>
            </Stack>
        </Grid>
    );
}

function Content({ content }: { content: ResearchItem }) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    return isMobile ? <Mobile content={content} /> : <Desktop content={content} />;
}

export default function PaperWork({ item }: PaperWorkProps) {
    return (
        <Section id="optimization" sx={{
            minHeight: "auto"
        }}>
            <SectionHeader sx={{
                height: "fit-content",
            }}>
                <Typography variant="h6" gutterBottom sx={{
                    userSelect: "none",
                    textAlign: "center",
                        fontFamily: `inherit`
                }}>
                    {item.title}
                </Typography>
            </SectionHeader>
            <Content content={item} />
        </Section>
    );
}