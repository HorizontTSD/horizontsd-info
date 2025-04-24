import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Section from "@/app/_components/Section";
import { Mobile } from "@/app/_components/Hero/Mobile";
import { Desktop } from "@/app/_components/Hero/Desktop";
import { Container, useMediaQuery } from "@mui/material";
export interface HeroProps {
    fullsize?: boolean;
}

function Content({ fullsize = false }: HeroProps) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    return (
        <Container
            maxWidth="lg"
            sx={{
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
                height: `100%`,
                justifyContent: "center",
                width: `100%`,
            }}
        >
            {isMobile ? <Mobile fullsize={fullsize} /> : <Desktop fullsize={fullsize} />}
        </Container>
    );
}

export default function Hero({ fullsize = false }: HeroProps) {
    return (
        <Section
            id="hero"
            sx={{
                alignItems: "center",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                maxHeight: `1080px`,
                overflow: "hidden",
                position: "relative",
                userSelect: "none",
                width: "100vw",
                zIndex: 2,
            }}
            fullsize={fullsize}
        >
            <Content fullsize={fullsize} />
        </Section >
    );
}
