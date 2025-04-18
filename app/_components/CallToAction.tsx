import * as React from "react";
import { styled } from "@mui/material/styles";
import { useColorScheme } from "@mui/material/styles";
import { useI18n } from "../_providers/I18nProvider";
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import ScrollGrow from "./ScrollGrow";
import {
    Card, CardContent, CardMedia,
    Container, Typography, Button,
    useMediaQuery, Grid
} from "@mui/material";
import Section from "./Section";

import "./card-gradient.css"

const StyledButton = styled(Button)(({ theme }) => {
    return ({
        fontWeight: 700,
        textTransform: "none",
        padding: theme.spacing(1.5, 4),
        borderRadius: "12px",
        transition: "all 0.3s ease",
        backgroundImage: `linear-gradient(90deg, var(--mui-palette-primary-contrastText), var(--mui-palette-primary-main))`,
        "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: theme.shadows[6],
        }
    })
});

const GradientCard = styled(Card)(({ theme }) => ({
    borderRadius: "24px",
    overflow: "hidden",
    boxShadow: theme.shadows[10],
}));

function CTA() {
    const theme = useTheme();
    const { mode } = useColorScheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const { dict } = useI18n();

    if (!dict || !dict.Home || !dict.Home.CallToAction) {
        return null;
    }

    const content = dict.Home.CallToAction;

    return (
        <Container
            maxWidth="lg" sx={{
                padding: `2rem`,
                display: `flex`,
                justifyContent: `center`,
                alignItems: `center`,
            }}>
            <ScrollGrow
                animationDelay={200}
                threshold={0.01}
                timeout={200}
                transformOrigin="0 0 0"
            >
                <GradientCard className="gradient-section">
                    <Grid container alignItems="center" spacing={2}>
                        <Grid size={{ xs: 12, md: 6 }} >
                            <CardContent sx={{ p: { sx: 3, md: 5 } }}>
                                <Typography
                                    variant="h4"
                                    color="textPrimary"
                                    gutterBottom
                                    sx={{
                                        fontWeight: 800,
                                        backgroundImage: `linear-gradient(0deg, var(--mui-palette-secondary-light), var(--mui-palette-primary-light))`,
                                        color: `transparent`,
                                        backgroundClip: `text`,
                                    }}
                                >
                                    {content.h3}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    color="textPrimary"
                                    sx={{
                                        mb: 2, fontSize: "1.1rem",
                                        backgroundImage: `linear-gradient(40deg, var(--mui-palette-common-white), var(--mui-palette-secondary-light))`,
                                        color: `transparent`,
                                        backgroundClip: `text`,
                                    }}
                                >{content.body1}</Typography>
                                <Stack
                                    direction={isMobile ? "column" : "row"}
                                    spacing={2}
                                    sx={{
                                        justifyContent: `center`
                                    }}
                                >
                                    <StyledButton
                                        variant="contained"
                                        size="large"
                                        sx={{ color: "primary.light" }}
                                    >
                                        {content.StyledButton[0]}
                                    </StyledButton>
                                    <StyledButton
                                        variant="outlined"
                                        size="large"
                                        sx={{ color: "secondary.light" }}
                                    >{content.StyledButton[1]}</StyledButton>
                                </Stack>
                            </CardContent>
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }} sx={{
                            display: `flex`,
                            justifyContent: `center`,
                            alignItems: `center`
                        }} >
                            <CardMedia
                                component="img"
                                image={mode === "dark"
                                    ? "/images/short_logo_black.webp"
                                    : "/images/short_logo_white.webp"}
                                alt="CTA Illustration"
                                sx={{
                                    width: `100%`,
                                    height: "100%",
                                    maxHeight: `60vh`,
                                    maxWidth: `60vw`,
                                    objectFit: "cover",
                                    objectPosition: "center"
                                }}
                            />
                        </Grid>
                    </Grid>
                </GradientCard>
            </ScrollGrow>
        </Container>
    );
}

export default function CallToAction() {
    return (
        <Section id="call-to-action" sx={{ minHeight: "30vh" }}><CTA /></Section>
    )
}
