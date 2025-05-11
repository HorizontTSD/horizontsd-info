import * as React from "react";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Container, Typography } from "@mui/material";
import { useColorScheme } from "@mui/material/styles";
import Accordion from "@mui/material/Accordion";
import { useI18n } from "@/app/_providers/I18nProvider";
import SectionHeader from "@/app/_components/SectionHeader";
import Section from "@/app/_components/Section";

interface FAQItem {
  question: string;
  answer: string[];
}

interface FAQContent {
  h2: string;
  Content: FAQItem[];
  SectionHeader: {
    h4: string;
    body2: string;
  };
}

function FAQ() {
  const [expanded, setExpanded] = React.useState<string[]>([]);
  const { dict } = useI18n();
  const { mode } = useColorScheme();
  if (!dict || !dict.Home || !dict.Home.Faq) return null;
  const { Content: content } = dict.Home.Faq as FAQContent;
  const isDark = mode === "dark";
  const bgSelect = isDark
    ? "var(--mui-palette-secondary-dark)"
    : "var(--mui-palette-primary-light)";
  const handleChange = (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) =>
    setExpanded(isExpanded ? [...expanded, panel] : expanded.filter((item) => item !== panel));
  return (
    <Container
      id="faq"
      sx={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        gap: { xs: 3, sm: 6 },
        pb: { xs: 8, sm: 16 },
        position: "relative",
        pt: { xs: 4, sm: 12 },
      }}
    >
      <Box sx={{ width: "100%" }}>
        {content.map((item: FAQItem, i: number) => (
          <Accordion
            key={i}
            expanded={expanded.includes(`panel${i + 1}`)}
            onChange={handleChange(`panel${i + 1}`)}
          >
            <AccordionSummary
              expandIcon={
                <ExpandMoreIcon color={expanded.includes(`panel${i + 1}`) ? "info" : "action"} />
              }
              aria-controls={`panel${i + 1}d-content`}
              id={`panel${i + 1}d-header`}
              sx={{
                background: expanded.includes(`panel${i + 1}`) ? bgSelect : "none",
              }}
            >
              <Typography component="span" variant="subtitle2" color="textPrimary">
                {item.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {item.answer.map((answer: string, j: number) => (
                <Typography
                  gutterBottom
                  key={j}
                  sx={{ maxWidth: { sm: "100%", md: "70%" } }}
                  variant="body2"
                >
                  {answer}
                </Typography>
              ))}
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Container>
  );
}

export default function Faq() {
  const { mode } = useColorScheme();
  const isDark = mode === "dark";
  const bgSelect = isDark ? "var(--mui-palette-primary-dark)" : "var(--mui-palette-primary-light)";
  const bgSelect2 = isDark
    ? "rgb(from var(--mui-palette-secondary-dark) r g b / 0.8)"
    : "rgb(from var(--mui-palette-primary-main) r g b / 0.2)";
  const { dict } = useI18n();
  if (!dict || !dict.Home || !dict.Home.Faq || !dict.Home.Faq.SectionHeader) return null;
  const { SectionHeader: content } = dict.Home.Faq;
  return (
    <Section
      id="faq"
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
          }}
        >
          {content.h4}
        </Typography>
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            fontFamily: `inherit`,
            textAlign: "center",
          }}
        >
          {content.body2}
        </Typography>
      </SectionHeader>
      <FAQ />
    </Section>
  );
}
