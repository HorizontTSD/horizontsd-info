import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Section from "@/app/_components/Section";
import { Mobile } from "@/app/_components/Hero/Mobile";
import { Desktop } from "@/app/_components/Hero/Desktop";
import { Container, useColorScheme, useMediaQuery, Typography } from "@mui/material";
import { WebGLBackground } from "@/app/_components/Wow";

export interface HeroProps {
  fullsize: boolean;
  title?: string;
}

function Content({ fullsize = false }: HeroProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
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

export default function Hero({ fullsize, title }: HeroProps) {
  const { mode } = useColorScheme();
  const isDark = mode === "dark";
  return (
    <Section
      id="hero"
      sx={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        overflow: "hidden",
        position: "relative",
        userSelect: "none",
        width: "100vw",
        zIndex: 2,
        padding: 0,
        margin: 0,
        background: isDark
          ? `linear-gradient(180deg,var(--mui-palette-secondary-dark) ,var(--mui-palette-primary-dark))`
          : `linear-gradient(180deg, rgb(from var(--mui-palette-common-white) r g b / 1), var(--mui-palette-primary-light) 10%)`,
      }}
      fullsize={fullsize}
    >
      <Content fullsize={fullsize} />

      <div
        style={{
          position: `absolute`,
          height: `60%`,
          width: `100%`,
          display: `flex`,
          alignItems: `center`,
          justifyContent: `center`,
          opacity: isDark ? 0.4 : 0.3,
          zIndex: -1,
        }}
      >
        <WebGLBackground color={isDark ? [0.5, 0.9, 0.9] : [0.0, 0.0, 0.0]} />
      </div>

      {title && (
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: "2rem", md: "3rem" },
            fontWeight: 600,
            color: "white",
            marginTop: 2,
          }}
        >
          {title}
        </Typography>
      )}
    </Section>
  );
}
