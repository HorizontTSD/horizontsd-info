import * as React from "react";
import NextLink from "next/link";
import { Typography, Button, Box, useMediaQuery, Grid, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { ResearchItem } from "@/app/_components/types";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";

interface PaperWorkProps {
  item: ResearchItem;
  button: string;
}

function Mobile({ content, button }: { content: ResearchItem; button: string }) {
  return (
    <Grid
      container
      sx={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "1rem",
        width: "100%",
        maxWidth: "800px",
        mx: "auto",
      }}
    >
      <Box
        sx={{
          alignItems: "center",
          backgroundColor: "transparent",
          display: "flex",
          justifyContent: "center",
          maxHeight: "720px",
          width: "100%",
          aspectRatio: "1 / 1",
          backgroundImage: `url("${content.image}")`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      />
      <Stack
        sx={{
          marginBottom: "2rem",
          width: "100%",
        }}
      >
        {content.description.map((item: string, i: number) => (
          <Typography key={i} color="textPrimary" gutterBottom variant="body1">
            {item}
          </Typography>
        ))}
      </Stack>
      <Stack>
        <NextLink href="#">
          <Button variant="contained" sx={{ color: "primary.light" }}>
            {button}
          </Button>
        </NextLink>
      </Stack>
    </Grid>
  );
}

function Desktop({ content, button }: { content: ResearchItem; button: string }) {
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
        width: "100%",
        maxWidth: "800px",
        mx: "auto",
      }}
    >
      <Box
        sx={{
          alignItems: "center",
          backgroundColor: "transparent",
          display: "flex",
          justifyContent: "center",
          height: "480px",
          maxHeight: "720px",
          width: "100%",
          aspectRatio: "1 / 1",
          backgroundImage: `url("${content.image}")`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      />
      <Stack
        sx={{
          width: "100%",
          margin: "1rem 0",
        }}
      >
        {content.description.map((item: string, i: number) => (
          <Typography
            key={i}
            color="textPrimary"
            gutterBottom
            variant="body1"
            sx={{
              textAlign: "justify",
            }}
          >
            {item}
          </Typography>
        ))}
      </Stack>
      <Stack>
        <NextLink href={`${content?.link}`}>
          <Button variant="contained" color="secondary" sx={{ color: "primary.light" }}>
            {button}
          </Button>
        </NextLink>
      </Stack>
    </Grid>
  );
}

function Content({ content, button }: { content: ResearchItem; button: string }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return isMobile ? (
    <Mobile content={content} button={button} />
  ) : (
    <Desktop content={content} button={button} />
  );
}

export default function PaperWork({ item, button }: PaperWorkProps) {
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "transparent",
        mb: 4,
      }}
    >
      <Typography
        variant="h6"
        gutterBottom
        sx={{
          fontFamily: `inherit`,
          textAlign: "center",
          userSelect: "none",
          color: "text.primary",
          mb: 2,
        }}
      >
        {item.title}
      </Typography>
      <Content content={item} button={button} />
    </Box>
  );
}
