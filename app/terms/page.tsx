"use client";
import { Box, Stack, Container, Typography, Toolbar } from "@mui/material";
import Section from "@/app/_components/Section";
import SectionHeader from "@/app/_components/SectionHeader";
import Navbar from "@/app/_components/Navbar";
import Hero from "@/app/_components/Hero";
import Footer from "@/app/_components/Footer";
import Paragraph from "@/app/_components/Paragraph";
import { useI18n } from "@/app/_providers/I18nProvider";
import ScrollTop from "@/app/_components/ScrollTop";


function PageContent() {
  const { dict } = useI18n();
  const termsContent = dict?.Legal?.Terms;
  if (!termsContent) return null;
  return (
    <>
      <Navbar />
      <Hero fullsize={false} />
      <Section id="terms">
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
