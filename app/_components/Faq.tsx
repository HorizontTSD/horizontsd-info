import * as React from "react";
import { useI18n } from "../_providers/I18nProvider";
import {
    Box, Container, Typography,
} from "@mui/material";
import { useColorScheme } from "@mui/material/styles";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SectionHeader from "./SectionHeader";
import Section from "./Section";

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

    if (!dict || !dict.Home || !dict.Home.Faq) {
        return null;
    }

    const { h2, Content: content } = dict.Home.Faq as FAQContent;
    const isDark = mode === "dark";
    const bgSelect = isDark ? "var(--mui-palette-secondary-dark)" : "var(--mui-palette-primary-light)"

    const handleChange = (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded
            ? [...expanded, panel]
            : expanded.filter((item) => item !== panel)
        );
    };

    return (
        <Container
            id="faq"
            sx={{
                pt: { xs: 4, sm: 12 },
                pb: { xs: 8, sm: 16 },
                position: "relative",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: { xs: 3, sm: 6 },
            }}>
            <Typography
                component="h2"
                variant="h4"
                sx={{
                    color: "text.primary",
                    width: { sm: "100%", md: "60%" },
                    textAlign: { sm: "left", md: "center" },
                }}>
                {h2}
            </Typography>
            <Box sx={{ width: "100%" }}>
                {content.map((item: FAQItem, i: number) => (
                    <Accordion
                        key={i}
                        expanded={expanded.includes(`panel${i + 1}`)}
                        onChange={handleChange(`panel${i + 1}`)}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={`panel${i + 1}d-content`}
                            id={`panel${i + 1}d-header`}
                            sx={{
                                background: expanded.includes(`panel${i + 1}`)
                                    ? bgSelect
                                    : "none"
                            }}>
                            <Typography component="span" variant="subtitle2" color="textPrimary">
                                {item.question}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            {item.answer.map((answer: string, j: number) => (
                                <Typography
                                    key={j}
                                    variant="body2"
                                    gutterBottom
                                    sx={{ maxWidth: { sm: "100%", md: "70%" } }}
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
    const { dict } = useI18n();

    if (!dict || !dict.Home || !dict.Home.Faq || !dict.Home.Faq.SectionHeader) {
        return null;
    }

    const { SectionHeader: content } = dict.Home.Faq;

    return (
        <Section id="faq" sx={{ minHeight: "50vh" }}>
            <SectionHeader>
                <Typography variant="h4" gutterBottom sx={{
                    userSelect: "none",
                    textAlign: "center",
                    fontFamily: `inherit`
                }}>
                    {content.h4}
                </Typography>
                <Typography variant="body2" gutterBottom sx={{
                    textAlign: "center",
                    fontFamily: `inherit`
                }}>
                    {content.body2}
                </Typography>
            </SectionHeader>
            <FAQ />
        </Section>
    );
}