import * as React from "react";
import NextLink from "next/link";
import Image from "next/image";
import { Typography, Button, Box, useMediaQuery, Grid, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SectionHeader from "@/app/_components/SectionHeader";
import { ResearchItem } from "@/app/_components/types";
import Section from "@/app/_components/Section";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";

interface PaperWorkProps {
    item: ResearchItem;
}

function Mobile({ content }: { content: ResearchItem }) {
    const buttonContent = content.Button;
    return (
        <Grid container sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "1rem",
            width: "100%"
        }}>
            <Box sx={{
                alignItems: "center",
                backgroundColor: "transparent",
                display: "flex",
                justifyContent: "center",
                maxHeight: "45vh",
                paddingBottom: "2rem",
                position: "relative",
                width: "100%",
            }}>
                <Image
                    alt={content.title}
                    height={450}
                    src={content.image}
                    style={{
                        maxHeight: "45vh",
                        objectFit: "contain",
                        width: "100%",
                    }}
                    width={800}
                />
            </Box>
            <Stack sx={{
                marginBottom: "2rem",
                width: "100%",
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
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                margin: "2rem 0",
                padding: "1rem",
                width: "80%",
            }}>
            <Box sx={{
                alignItems: "center",
                backgroundColor: "transparent",
                display: "flex",
                justifyContent: "center",
                maxHeight: "45vh",
                paddingBottom: "2rem",
                position: "relative",
                width: "50%",
            }}>
                <Image
                    alt={content.title}
                    height={450}
                    src={content.image}
                    style={{
                        maxHeight: "45vh",
                        objectFit: "contain",
                        width: "100%",
                    }}
                    width={800}

                />
            </Box>
            <Stack sx={{
                width: "100%",
                margin: "1rem 0"
            }}>
                {content.description.map((item: string, i: number) => (
                    <Typography key={i} color="textPrimary" gutterBottom variant="body1" sx={{
                        textAlign: 'justify'
                    }}>
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
                    fontFamily: `inherit`,
                    textAlign: "center",
                    userSelect: "none",
                }}>
                    {item.title}
                </Typography>
            </SectionHeader>
            <Content content={item} />
        </Section>
    );
}