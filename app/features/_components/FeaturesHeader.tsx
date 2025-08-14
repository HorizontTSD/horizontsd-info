"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useI18n } from "@/app/_providers/I18nProvider";

export default function FeaturesHeader() {
  const { dict } = useI18n();

  if (!dict?.Features?.sectionTitle) return null;

  const content = dict.Features;

  return (
    <Box component="section" sx={{ py: 8, textAlign: "center" }}>
      <Box sx={{ maxWidth: 800, mx: "auto", px: 2 }}>
        <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: "bold", mb: 3 }}>
          {content.sectionTitle}
        </Typography>
        <Typography variant="h5" component="p" color="text.secondary" sx={{ lineHeight: 1.6 }}>
          {content.sectionSubtitle}
        </Typography>
      </Box>
    </Box>
  );
}
