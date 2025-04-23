import * as React from "react";
import { useI18n } from "../_providers/I18nProvider";
import { useTheme } from "@mui/material/styles";
import {
    Typography, useMediaQuery
} from "@mui/material";
import type { } from "swiper/types";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./swiper.css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import SectionHeader from "./SectionHeader";
import Section from "./Section";
import { Desktop } from "./Applications/Desktop"
import { Mobile } from "./Applications/Mobile"

function Content() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
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
                    userSelect: "none",
                    textAlign: "center",
                    fontFamily: `inherit`
                }}>
                    {dictionary.SectionHeader.h4}
                </Typography>
                <Typography variant="body2" gutterBottom sx={{
                    textAlign: "center",
                    fontFamily: `inherit`
                }}>
                    {dictionary.SectionHeader.body2}
                </Typography>
            </SectionHeader>
            <Content />
        </Section>
    );
}
