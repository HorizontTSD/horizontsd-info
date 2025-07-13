import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { useI18n } from "@/app/_providers/I18nProvider";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

interface Offer {
  header: string;
  price: string;
  features: string[];
  color: string;
}

const QuickForecastCardsLine: React.FC<{ offers: Offer[] }> = ({ offers }) => {
  const { dict } = useI18n();
  const theme = useTheme();
  const title =
    (dict?.Pricing as { QuickForecastTitle?: string })?.QuickForecastTitle || "Быстрый прогноз";
  return (
    <Box sx={{ width: "100%", mb: { xs: 4, md: 7 } }}>
      <Typography variant="h4" align="center" sx={{ mb: 3, fontWeight: 700, letterSpacing: 1 }}>
        {title}
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
          const colorObj = theme.palette[plan.color as keyof typeof theme.palette];
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
                background: theme.palette.background.paper,
                borderRadius: 2,
                boxShadow:
                  theme.palette.mode === "dark"
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
                  boxShadow:
                    theme.palette.mode === "dark"
                      ? `0 10px 40px 0 ${theme.palette.grey[800]}55, 0 2px 12px 0 #000`
                      : `0 10px 40px 0 ${theme.palette.grey[400]}22, 0 2px 12px 0 #0003`,
                  borderColor: accentColor,
                },
              }}
            >
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
                {plan.features.map((f, i) => (
                  <li
                    key={i}
                    style={{
                      marginBottom: 12,
                      color: theme.palette.text.secondary,
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
                  </li>
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
};

export default QuickForecastCardsLine;
