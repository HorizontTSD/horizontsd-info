"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Image from "next/image";
import { useI18n } from "@/app/_providers/I18nProvider";
import { useTheme } from "@mui/material/styles";
import ImageModal from "./ImageModal";

export default function APIIntegration() {
  const { dict } = useI18n();
  const theme = useTheme();
  const [modalOpen, setModalOpen] = React.useState(false);

  if (!dict?.Features?.APIIntegration) return null;

  const content = dict.Features.APIIntegration;
  const headers = dict.Features.sectionHeaders;

  const handleImageClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <Box
      component="section"
      sx={{ py: 8, bgcolor: (theme) => (theme.palette.mode === "dark" ? "grey.900" : "grey.50") }}
    >
      <Box sx={{ maxWidth: 1200, mx: "auto", px: 2 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper
              elevation={3}
              sx={{
                p: 2,
                borderRadius: 2,
                cursor: "pointer",
                transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
                "&:hover": {
                  transform: "scale(1.02)",
                  boxShadow: 8,
                },
              }}
              onClick={handleImageClick}
            >
              <Box sx={{ position: "relative", height: 500, borderRadius: 1, overflow: "hidden" }}>
                <Image
                  src="/images/images_features/api.png"
                  alt="Иконки API, документации или структура интеграции"
                  fill
                  style={{ objectFit: "cover" }}
                  priority
                />
              </Box>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h3"
                component="h2"
                gutterBottom
                sx={{
                  fontWeight: "bold",
                  color: theme.palette.mode === "dark" ? "white" : "black",
                }}
              >
                {content.title}
              </Typography>
              <Typography
                variant="body1"
                component="p"
                sx={{
                  fontSize: "1.1rem",
                  mb: 3,
                  color: theme.palette.mode === "dark" ? "white" : "black",
                }}
              >
                {content.description}
              </Typography>

              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    fontWeight: "bold",
                    color: theme.palette.mode === "dark" ? "white" : "black",
                  }}
                >
                  {headers.problems}
                </Typography>
                <Typography
                  variant="body1"
                  component="p"
                  sx={{
                    color: theme.palette.mode === "dark" ? "white" : "black",
                  }}
                >
                  {content.problems}
                </Typography>
              </Box>

              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    fontWeight: "bold",
                    color: theme.palette.mode === "dark" ? "white" : "black",
                  }}
                >
                  {headers.market}
                </Typography>
                <Typography
                  variant="body1"
                  component="p"
                  sx={{
                    color: theme.palette.mode === "dark" ? "white" : "black",
                  }}
                >
                  {content.market}
                </Typography>
              </Box>

              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    fontWeight: "bold",
                    color: theme.palette.mode === "dark" ? "white" : "black",
                  }}
                >
                  {headers.example}
                </Typography>
                <Typography
                  variant="body1"
                  component="p"
                  sx={{
                    color: theme.palette.mode === "dark" ? "white" : "black",
                  }}
                >
                  {content.example}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <ImageModal
        open={modalOpen}
        onClose={handleCloseModal}
        imageSrc="/images/images_features/api.png"
        imageAlt="Иконки API, документации или структура интеграции"
      />
    </Box>
  );
}
