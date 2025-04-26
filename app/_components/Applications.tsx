import * as React from "react";
import { useI18n } from "@/app/_providers/I18nProvider";
import { useTheme } from "@mui/material/styles";
import {
    Typography, useMediaQuery
} from "@mui/material";
import SectionHeader from "@/app/_components/SectionHeader";
import Section from "@/app/_components/Section";
import { Desktop } from "@/app/_components/Applications/Desktop"
import { Mobile } from "@/app/_components/Applications/Mobile"
import type { } from "swiper/types";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import "swiper/css/thumbs";

function Content() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    return isMobile ? <Mobile /> : <Desktop />;
}

export default function Applications() {
    const { dict } = useI18n();
    if (!dict || !dict.Home || !dict.Home.Applications || !dict.Home.Applications.SectionHeader) return null;
    const dictionary = dict.Home.Applications;
    return (
        <Section id="applications">
            <SectionHeader >
                <Typography variant="h4" gutterBottom sx={{
                    fontFamily: `inherit`,
                    textAlign: "center",
                    userSelect: "none",
                }}>
                    {dictionary.SectionHeader.h4}
                </Typography>
                <Typography variant="h5" gutterBottom sx={{
                    fontFamily: `inherit`,
                    textAlign: "center",
                }}>
                    {dictionary.SectionHeader.body2}
                </Typography>
            </SectionHeader>
            <Content />
        </Section>
    );
}
