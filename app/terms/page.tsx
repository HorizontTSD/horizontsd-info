"use client";
import { Box, Stack, Container, Typography } from "@mui/material";
import { useColorScheme } from "@mui/material/styles";
import Section from "@/app/_components/Section";
import SectionHeader from "@/app/_components/SectionHeader";
import Navbar from "@/app/_components/Navbar";
import Hero from "@/app/_components/Hero";
import Footer from "@/app/_components/Footer";
import Paragraph from "@/app/_components/Paragraph";
import { useI18n } from "@/app/_providers/I18nProvider";
import ScrollTop from "@/app/_components/ScrollTop";

export default function TermsPage() {
  const { dict } = useI18n();
  const termsContent = dict?.Legal?.Terms;
  const { mode } = useColorScheme();
  const isDark = mode === "dark";
  const bgSelect = isDark ? "var(--mui-palette-primary-dark)" : "var(--mui-palette-primary-light)";
  const bgSelect2 = isDark
    ? "rgb(from var(--mui-palette-secondary-dark) r g b / 0.8)"
    : "rgb(from var(--mui-palette-primary-main) r g b / 0.2)";

  if (!termsContent) return null;

  return (
    <Box sx={{ margin: "0 auto", minWidth: "320px", overflowX: "hidden" }}>
      <div id="back-to-top-anchor" />
      <Navbar />
      <Hero fullsize={false} />
      <Section
        id="terms"
        sx={{
          background: `linear-gradient(0deg, ${bgSelect2} 30%, ${bgSelect})`,
        }}
      >
        <SectionHeader>
          <Typography
            variant="h3"
            gutterBottom
            sx={{
              fontFamily: `inherit`,
              textAlign: "center",
              userSelect: "none",
              color: "text.primary",
            }}
          >
            {termsContent.Title}
          </Typography>
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              fontFamily: `inherit`,
              textAlign: "center",
              color: "text.secondary",
            }}
          >
            {termsContent.LastUpdated}
          </Typography>
        </SectionHeader>
        <Container>
          <Stack spacing={4} sx={{ py: 4 }}>
            {termsContent.Sections.map((section, index) => (
              <Paragraph key={index} item={section} />
            ))}
          </Stack>
        </Container>
      </Section>
      <Footer />
      <ScrollTop />
    </Box>
  );
}
