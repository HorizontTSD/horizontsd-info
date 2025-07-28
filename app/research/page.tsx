"use client";
import { useI18n } from "@/app/_providers/I18nProvider";
import { Typography, Container, Box, Toolbar } from "@mui/material";
import Navbar from "@/app/_components/Navbar";
import { useColorScheme } from "@mui/material/styles";
import { WebGLBackground } from "@/app/_components/Wow";
import CallToAction from "@/app/_components/CallToAction";
import Footer from "@/app/_components/Footer";
import ScrollTop from "@/app/_components/ScrollTop";
import PaperWork from "@/app/research/_components/PaperWork";
import { ResearchItem } from "@/app/_components/types";

interface ResearchDict {
  title: string;
  stub: string;
  Button: string;
  Content: ResearchItem[];
}

function ResearchPage() {
  const { dict } = useI18n();
  const { mode } = useColorScheme();
  const isDark = mode === "dark";
  const content = dict?.Research as ResearchDict | undefined;
  if (!content) return null;
  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        position: "relative",
        overflow: "hidden",
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
        <Box sx={{ textAlign: "center", mt: 12, mb: 4 }}>
          <Typography
            variant="h3"
            gutterBottom
            sx={{
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
              fontWeight: 600,
            }}
          >
            {content.title}
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{
              fontSize: { xs: "1rem", sm: "1.1rem", md: "1.25rem" },
              maxWidth: "800px",
              mx: "auto",
            }}
          >
            {content.stub}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: { xs: 0.5, sm: 1 },
            alignItems: "center",
            mt: { xs: 2, sm: 4, md: 6 },
            position: "relative",
          }}
        >
          {content.Content.map((item: ResearchItem, index: number) => {
            return <PaperWork item={item} button={content.Button} key={index} />;
          })}
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

export default function Page() {
  return (
    <Box
      sx={{
        margin: "0 auto",
        minWidth: "320px",
        overflowX: "hidden",
      }}
    >
      <Toolbar id="back-to-top-anchor" sx={{ position: "absolute" }} />
      <ResearchPage />
      <CallToAction />
      <Footer />
      <ScrollTop />
    </Box>
  );
}
