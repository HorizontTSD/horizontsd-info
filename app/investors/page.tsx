"use client";
import { useI18n } from "@/app/_providers/I18nProvider";
import { Typography, Container, Box, Toolbar } from "@mui/material";
import Navbar from "@/app/_components/Navbar";
import { useColorScheme } from "@mui/material/styles";
import { WebGLBackground } from "@/app/_components/Wow";
import TimelineBlock from "./_components/Timeline";
import MaterialsBlock from "./_components/MaterialsBlock";

interface InvestorRelationsDict {
  title: string;
  stub: string;
}

export default function InvestorRelationsPage() {
  const { dict } = useI18n();
  const { mode } = useColorScheme();
  const isDark = mode === "dark";
  const content = dict?.InvestorRelations as InvestorRelationsDict | undefined;
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
        overflowX: "hidden",
      }}
    >
      <Navbar />
      <Toolbar id="back-to-top-anchor" sx={{ position: `absolute` }} />
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "20%",
          zIndex: 1,
          opacity: isDark ? 0.4 : 0.3,
          pointerEvents: "none",
        }}
      >
        <WebGLBackground color={isDark ? [0.5, 0.9, 0.9] : [0.0, 0.0, 0.0]} />
      </Box>
      <Container
        maxWidth="lg"
        sx={{
          minHeight: "60vh",
          maxWidth: "1200px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 2,
          position: "relative",
          overflow: "visible",
          width: "100%",
          px: { xs: 2, md: 4 },
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
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            width: "100%",
            gap: { xs: 0.5, sm: 1 },
            alignItems: "start",
            mt: { xs: 2, sm: 4, md: 6 },
            position: "relative",
          }}
        >
          <Box
            sx={{
              flex: 2,
              width: { xs: "100%", md: "calc(100% - 420px)" },
              maxWidth: { md: 760, xs: "100%" },
              zIndex: 99999,
              px: { xs: 0, sm: 0, md: 0 },
            }}
          >
            <TimelineBlock />
          </Box>
          {/* Заполнитель для layout, чтобы место под фиксированный блок сохранялось */}
          <Box sx={{ display: { xs: "none", md: "block" }, width: { md: 400 }, flexShrink: 0 }} />
          <Box
            sx={{
              flex: 1,
              width: { xs: "100%", md: 400 },
              pl: { md: 4, xs: 0 },
              mt: { xs: 2, md: 0 },
              px: { xs: 0, sm: 0, md: 0 },
              position: { md: "fixed", xs: "static" },
              top: { md: 120, xs: "auto" },
              right: { md: "max(calc((100vw - 1200px) / 2), 16px)", xs: "auto" },
              zIndex: 1200,
              maxWidth: { md: 400, xs: "100%" },
            }}
          >
            <MaterialsBlock />
          </Box>
        </Box>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: 0,
            width: "100%",
            height: "20%",
            transform: "translateY(-50%)",
            zIndex: 1,
            opacity: isDark ? 0.4 : 0.3,
            pointerEvents: "none",
          }}
        >
          <WebGLBackground color={isDark ? [0.5, 0.9, 0.9] : [0.0, 0.0, 0.0]} />
        </Box>
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "20%",
            zIndex: 1,
            opacity: isDark ? 0.4 : 0.3,
            pointerEvents: "none",
          }}
        >
          <WebGLBackground color={isDark ? [0.5, 0.9, 0.9] : [0.0, 0.0, 0.0]} />
        </Box>
      </Container>
    </Box>
  );
}
