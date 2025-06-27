"use client";
import { useI18n } from "@/app/_providers/I18nProvider";
import { Typography, Container, Box, Toolbar } from "@mui/material";
import Navbar from "@/app/_components/Navbar";
import { useColorScheme } from "@mui/material/styles";
import { WebGLBackground } from "@/app/_components/Wow";

interface BenchmarksDict {
  title: string;
  stub: string;
}

export default function BenchmarksPage() {
  const { dict } = useI18n();
  const { mode } = useColorScheme();
  const isDark = mode === "dark";
  const content = dict?.Benchmarks as BenchmarksDict | undefined;
  if (!content) return null;
  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        position: "relative",
        overflow: "hidden",
        background: isDark
          ? `linear-gradient(180deg,var(--mui-palette-secondary-dark) ,var(--mui-palette-primary-dark))`
          : `linear-gradient(180deg, rgb(from var(--mui-palette-common-white) r g b / 1), var(--mui-palette-primary-light) 10%)`,
      }}
    >
      <Navbar />
      <Toolbar id="back-to-top-anchor" sx={{ position: `absolute` }} />
      {/* Эффект длинных палочек на фоне */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "60%",
          zIndex: 1,
          opacity: isDark ? 0.4 : 0.3,
          pointerEvents: "none",
        }}
      >
        <WebGLBackground color={isDark ? [0.5, 0.9, 0.9] : [0.0, 0.0, 0.0]} />
      </Box>
      <Container
        maxWidth="md"
        sx={{
          minHeight: "60vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 2,
          position: "relative",
        }}
      >
        <Box sx={{ textAlign: "center", mt: 12 }}>
          <Typography variant="h3" gutterBottom>
            {content.title}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            {content.stub}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
