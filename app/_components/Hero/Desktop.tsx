import * as React from "react";
import { Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import Stack from "@mui/material/Stack";
import { HeroCard } from "@/app/_components/Hero/HeroCard";
import { useI18n } from "@/app/_providers/I18nProvider";
import { HeroProps } from "@/app/_components/Hero";
import { bebasNeue } from "@/fonts";
import { useState } from "react";

export interface HeroContent {
  slogan: string;
}

export function Desktop({ fullsize = false }: HeroProps) {
  const { dict } = useI18n();
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const isMd = useMediaQuery(theme.breakpoints.down("md"));
  const [activeCard, setActiveCard] = useState<string | null>(null);
  if (!dict || !dict.Home || !dict.Home.Hero) return null;
  const accentColor = `var(--mui-palette-secondary-contrastText)`;
  const content: HeroContent = dict.Home.Hero;
  return (
    <Stack
      direction="column"
      sx={{
        alignItems: "center",
        borderRadius: "var(--mui-shape-borderRadius)",
        display: "flex",
        height: `100%`,
        justifyContent: "center",
        padding: `2rem`,
        width: `100%`,
        zIndex: 3,
        marginTop: { xs: "7.5rem", md: "-9.5rem" },
      }}
    >
      <Stack
        direction={"column"}
        sx={{
          alignItems: "start",
          display: "flex",
          height: `100%`,
          justifyContent: "start",
          position: "relative",
          width: `100%`,
        }}
      >
        <Stack spacing={isSm ? 1 : 3} direction={isMd ? "column" : "row"}>
          <Typography
            variant="h1"
            sx={{
              color: `var(--mui-palette-common-white)`,
              fontFamily: bebasNeue.style.fontFamily,
              textShadow: `0px 0px 10px black`,
            }}
          >
            Horizon
          </Typography>
          <Typography
            variant="h1"
            sx={{
              color: accentColor,
              fontFamily: bebasNeue.style.fontFamily,
            }}
          >
            Time Series Data
          </Typography>
        </Stack>
        <Stack
          direction="column"
          sx={{
            justifyContent: "start",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: accentColor,
              fontFamily: bebasNeue.style.fontFamily,
              textAlign: "center",
            }}
          >
            {content.slogan}
          </Typography>
        </Stack>
      </Stack>
      {fullsize && (
        <Grid
          container
          spacing={1}
          sx={{
            height: `100%`,
            marginTop: `5%`,
            width: `100%`,
            zIndex: `1`,
          }}
        >
          <HeroCard
            type="primary"
            active={activeCard === "primary"}
            onMouseEnter={() => setActiveCard("primary")}
          />
          <HeroCard
            type="secondary"
            active={activeCard === "secondary"}
            onMouseEnter={() => setActiveCard("secondary")}
          />
          <HeroCard
            type="chat"
            active={activeCard === "chat"}
            onMouseEnter={() => setActiveCard("chat")}
          />
          <HeroCard
            type="api"
            active={activeCard === "api"}
            onMouseEnter={() => setActiveCard("api")}
          />
        </Grid>
      )}
    </Stack>
  );
}
