"use client";
import { Container, Box, Typography } from "@mui/material";
import Navbar from "@/app/_components/Navbar";
import Toolbar from "@mui/material/Toolbar";
import { useColorScheme, useTheme } from "@mui/material/styles";
import { WebGLBackground } from "@/app/_components/Wow";
import { useI18n } from "@/app/_providers/I18nProvider";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import React from "react";
import QuickForecastCardsLine from "./QuickForecastCardsLine";

export default function PricePage() {
  const { mode } = useColorScheme();
  const theme = useTheme();
  const isDark = mode === "dark";
  const { dict } = useI18n();
  const pricing = dict?.Pricing as {
    title: string;
    sections: string[];
    offers: Array<{
      header: string;
      price: string;
      features: string[];
      color: keyof typeof theme.palette;
    }>;
    custom: string;
    perUserLabel: string;
  };
  if (!pricing) return null;
  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        position: "relative",
        overflowX: "hidden",
        background: isDark
          ? `linear-gradient(180deg,var(--mui-palette-secondary-dark) ,var(--mui-palette-primary-dark))`
          : `linear-gradient(180deg, rgb(from var(--mui-palette-common-white) r g b / 1), var(--mui-palette-primary-light) 10%)`,
      }}
    >
      <Navbar />
      <Toolbar id="back-to-top-anchor" sx={{ position: `absolute` }} />
      {/* Анимационный фон */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "60%",
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
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 2,
          position: "relative",
          pt: { xs: 8, md: 12 },
          pb: { xs: 4, md: 6 },
        }}
      >
        <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: 700, mb: 6 }}>
          {pricing.title}
        </Typography>
        <QuickForecastCardsLine offers={pricing.offers} />
        {pricing.sections.map((section: string) => {
          const offers = pricing.offers;
          return (
            <Box key={section} sx={{ mb: { xs: 4, md: 7 }, width: "100%" }}>
              <Typography variant="h4" align="center" sx={{ mb: 1.5, fontWeight: 600 }}>
                {section}
              </Typography>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    sm: "1fr 1fr",
                    lg: "1fr 1fr 1fr 1fr",
                  },
                  gap: { xs: 2, md: 4 },
                  width: "100%",
                  justifyItems: "center",
                }}
              >
                {offers.map((plan, idx) => {
                  const colorObj = theme.palette[plan.color];
                  const accentColor =
                    typeof colorObj === "object" && colorObj && "main" in colorObj
                      ? colorObj.main
                      : theme.palette.primary.main;
                  return (
                    <Box
                      key={plan.header + idx}
                      sx={{
                        maxWidth: 340,
                        minWidth: 0,
                        background: isDark
                          ? theme.palette.background.default
                          : theme.palette.background.paper,
                        borderRadius: 2,
                        boxShadow: isDark
                          ? "0 4px 24px 0 rgba(0,0,0,0.40)"
                          : "0 2px 12px 0 rgba(0,0,0,0.07)",
                        p: { xs: 2, md: 3 },
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        border: `2.5px solid ${theme.palette.divider}`,
                        transition: "transform 0.18s, box-shadow 0.18s, border 0.18s",
                        cursor: "pointer",
                        position: "relative",
                        height: "100%",
                        minHeight: 340,
                        ":hover": {
                          transform: "translateY(-8px) scale(1.03)",
                          boxShadow: isDark
                            ? `0 10px 40px 0 ${theme.palette.grey[800]}55, 0 2px 12px 0 #000`
                            : `0 10px 40px 0 ${theme.palette.grey[400]}22, 0 2px 12px 0 #0003`,
                          borderColor: accentColor,
                        },
                      }}
                    >
                      {/* Цветная полоска убрана */}
                      <Typography
                        variant="h5"
                        sx={{
                          fontWeight: 800,
                          mb: 2,
                          color: accentColor,
                          textAlign: "center",
                          wordBreak: "break-word",
                        }}
                      >
                        {plan.header}
                      </Typography>
                      <Box
                        component="ul"
                        sx={{
                          listStyle: "none",
                          p: 0,
                          m: 0,
                          mb: 2,
                          textAlign: "left",
                          width: "100%",
                          flexGrow: 1,
                        }}
                      >
                        {plan.features.map((f: string, i: number) => (
                          <Box
                            component="li"
                            key={i}
                            sx={{
                              mb: 1.2,
                              color: "text.secondary",
                              fontSize: 15,
                              display: "flex",
                              alignItems: "center",
                              wordBreak: "break-word",
                            }}
                          >
                            <CheckCircleIcon
                              sx={{ color: theme.palette.success.main, fontSize: 18, mr: 1 }}
                            />
                            {f}
                          </Box>
                        ))}
                      </Box>
                      <Box sx={{ mt: "auto", width: "100%", textAlign: "center" }}>
                        <Typography
                          sx={{
                            fontWeight: 700,
                            fontSize: 20,
                            color: accentColor,
                            mb: 0.5,
                            wordBreak: "break-word",
                          }}
                        >
                          {plan.price}
                        </Typography>
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          );
        })}
        <Typography align="center" sx={{ mt: 4, fontSize: 18, color: "text.secondary" }}>
          {pricing.custom}
        </Typography>
      </Container>
    </Box>
  );
}
