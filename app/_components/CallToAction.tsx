import * as React from "react";
import { useColorScheme } from "@mui/material/styles";
import { useI18n } from "@/app/_providers/I18nProvider";
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import ScrollGrow from "@/app/_components/ScrollGrow";
import {
    Card, CardContent, CardMedia,
    Container, Typography, Button,
    useMediaQuery, Grid
} from "@mui/material";
import Section from "@/app/_components/Section";

function CTA() {
    const theme = useTheme();
    const { mode } = useColorScheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const { dict } = useI18n();

    if (!dict || !dict.Home || !dict.Home.CallToAction) return null;

    const content = dict.Home.CallToAction;

    return (
        <Container
            maxWidth="lg" sx={{
                alignItems: `center`,
                display: `flex`,
                justifyContent: `center`,
                padding: `2rem`,
            }}>
            <ScrollGrow>
                <Card >
                    <Grid container alignItems="center" spacing={2}>
                        <Grid size={{ xs: 12, md: 6 }} >
                            <CardContent sx={{ p: { sx: 3, md: 5 } }}>
                                <Typography
                                    variant="h4"
                                    gutterBottom
                                    sx={{ fontWeight: 800, }}
                                >
                                    {content.h3}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    color="textPrimary"
                                    sx={{ mb: 2, fontSize: "1.1rem", }}
                                >{content.body1}</Typography>
                                <Stack
                                    direction={isMobile ? "column" : "row"}
                                    spacing={2}
                                    sx={{ justifyContent: `center` }}
                                >
                                    <Button
                                        color="info"
                                        variant="contained"
                                        size="large"
                                        sx={{ color: `var(--mui-palette-secondary-light)` }}
                                    >
                                        {content.StyledButton[0]}
                                    </Button>
                                    <Button
                                        color="info"
                                        variant="outlined"
                                        size="large"
                                    >
                                        {content.StyledButton[1]}
                                    </Button>
                                </Stack>
                            </CardContent>
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }} sx={{
                            alignItems: `center`,
                            display: `flex`,
                            justifyContent: `center`,
                        }} >
                            <CardMedia
                                component="img"
                                image={mode === "dark"
                                    ? "/images/short_logo_white.webp"
                                    : "/images/short_logo_black.webp"
                                }
                                alt="CTA Illustration"
                                sx={{
                                    height: "100%",
                                    maxHeight: `40vh`,
                                    maxWidth: `40vw`,
                                    objectFit: "cover",
                                    objectPosition: "center",
                                    width: `100%`,
                                }}
                            />
                        </Grid>
                    </Grid>
                </Card>
            </ScrollGrow>
        </Container>
    );
}

export default function CallToAction() {
    return (
        <Section id="call-to-action" sx={{ minHeight: "720px", justifyContent: `center` }}><CTA /></Section>
    )
}
