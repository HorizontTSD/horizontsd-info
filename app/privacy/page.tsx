"use client";
import { Box, Stack, Container, Typography, Toolbar } from "@mui/material";
import Navbar from "@/app/_components/Navbar";
import Hero from "@/app/_components/Hero";
import Footer from "@/app/_components/Footer";
import Paragraph from "@/app/_components/Paragraph";
import { useI18n } from "@/app/_providers/I18nProvider";
import ScrollTop from "@/app/_components/ScrollTop";
import Section from "@/app/_components/Section";
import SectionHeader from "@/app/_components/SectionHeader";

function PageContent() {
  const { dict } = useI18n();
  const privacyContent = dict?.Legal?.Privacy;
  if (!privacyContent) return null;
  return (
    <>
      <Navbar />
      <Hero fullsize={false} />
      <Section id="privacy">
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
            {privacyContent.Title}
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
            {privacyContent.LastUpdated}
          </Typography>
        </SectionHeader>
        <Container>
          <Stack spacing={4} sx={{ py: 4 }}>
            {privacyContent.Sections.map((section, index) => (
              <Paragraph key={index} item={section} />
            ))}
          </Stack>
        </Container>
      </Section>
      <Footer />
    </>
  )
}

export default function Page() {
  return (
    <Box sx={{
      alignItems: `center`,
      display: `flex`,
      flexDirection: `column`,
      justifyContent: `start`,
      margin: `0 auto`,
      overflow: `hidden`,
      overflowX: `hidden`,
      width: `100%`,
    }}>
      <Toolbar id="back-to-top-anchor" sx={{ position: `absolute` }} />
      <PageContent />
      <ScrollTop />
    </Box>
  )
}
