import * as React from "react";
import { useTheme } from "@mui/material/styles";
import { Container, useMediaQuery } from "@mui/material";

import Section from "./Section";

import "./gradient-text.css";
import { Mobile } from "./Hero/Mobile";
import { Desktop } from "./Hero/Desktop";

function Content({ fullsize = false }: HeroProps) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <Container
            sx={{
                height: `100%`,
                width: `100%`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            {isMobile ? <Mobile fullsize={fullsize} /> : <Desktop fullsize={fullsize} />}
        </Container>
    );
}


export interface HeroProps {
    fullsize?: boolean;
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
                overflow: "hidden",
                position: "relative",
                width: "100vw",
                zIndex: 2,
                userSelect: "none",
                minHeight: fullsize ? "1080px" : "50vh",
            }}
        >
            <Content fullsize={fullsize} />
        </Section>
    );
}
