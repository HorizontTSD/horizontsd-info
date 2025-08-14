"use client";
import * as React from "react";
import {
  Box,
  Modal,
  Typography,
  Button,
  Stack,
  Switch,
  FormControlLabel,
  Link,
  Paper,
  useTheme,
  useMediaQuery,
  Snackbar,
  Alert,
} from "@mui/material";
import { useI18n } from "@/app/_providers/I18nProvider";
import { useConsent } from "@/app/_providers/ConsentProvider";

export default function ConsentModal() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { dict } = useI18n();
  const {
    showConsent,
    settings,
    handleAcceptAll,
    handleDeclineAll,
    handleAcceptSelected,
    handleSettingChange,
    showNotification,
    notificationMessage,
    notificationType,
    hideNotification,
  } = useConsent();

  if (!dict?.Legal?.ConsentModal) return null;

  const modalContent = dict.Legal.ConsentModal;

  return (
    <>
      <Modal
        open={showConsent}
        sx={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          p: 2,
        }}
      >
        <Paper
          elevation={8}
          sx={{
            width: "100%",
            maxWidth: "800px",
            borderRadius: "18px",
            p: 3,
            background: theme.palette.mode === "dark" ? "primary.dark" : "secondary.light",
            border: `1px solid ${theme.palette.mode === "dark" ? "primary.main" : "primary.light"}`,
            boxShadow:
              theme.palette.mode === "dark"
                ? "0 8px 32px rgba(0, 0, 0, 0.4)"
                : "0 8px 32px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Stack spacing={3}>
            {/* Header */}
            <Box>
              <Typography
                variant="h5"
                component="h2"
                gutterBottom
                sx={{
                  fontWeight: "bold",
                  color: "text.primary",
                  fontFamily: "inherit",
                }}
              >
                {modalContent.title}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "text.secondary",
                  lineHeight: 1.6,
                  fontFamily: "inherit",
                }}
              >
                {modalContent.description}
              </Typography>
            </Box>

            {/* Policy Settings */}
            <Box>
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  fontWeight: "600",
                  color: "text.primary",
                  mb: 2,
                  fontFamily: "inherit",
                }}
              >
                {modalContent.settingsTitle}
              </Typography>

              <Stack spacing={2}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.privacyPolicy}
                      onChange={(e) => handleSettingChange("privacyPolicy")(e.target.checked)}
                      color="info"
                    />
                  }
                  label={
                    <Box>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: "600",
                          color: "text.primary",
                          fontFamily: "inherit",
                        }}
                      >
                        {modalContent.privacyPolicyTitle}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "text.secondary",
                          fontFamily: "inherit",
                        }}
                      >
                        {modalContent.privacyPolicyDescription}
                      </Typography>
                    </Box>
                  }
                  sx={{ alignItems: "flex-start" }}
                />

                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.cookiePolicy}
                      onChange={(e) => handleSettingChange("cookiePolicy")(e.target.checked)}
                      color="info"
                    />
                  }
                  label={
                    <Box>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: "600",
                          color: "text.primary",
                          fontFamily: "inherit",
                        }}
                      >
                        {modalContent.cookiePolicyTitle}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "text.secondary",
                          fontFamily: "inherit",
                        }}
                      >
                        {modalContent.cookiePolicyDescription}
                      </Typography>
                    </Box>
                  }
                  sx={{ alignItems: "flex-start" }}
                />

                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.termsOfService}
                      onChange={(e) => handleSettingChange("termsOfService")(e.target.checked)}
                      color="info"
                    />
                  }
                  label={
                    <Box>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: "600",
                          color: "text.primary",
                          fontFamily: "inherit",
                        }}
                      >
                        {modalContent.termsOfServiceTitle}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "text.secondary",
                          fontFamily: "inherit",
                        }}
                      >
                        {modalContent.termsOfServiceDescription}
                      </Typography>
                    </Box>
                  }
                  sx={{ alignItems: "flex-start" }}
                />
              </Stack>
            </Box>

            {/* Links */}
            <Box>
              <Typography
                variant="body2"
                sx={{
                  color: "text.secondary",
                  mb: 1,
                  fontFamily: "inherit",
                }}
              >
                {modalContent.learnMore}
              </Typography>
              <Stack direction="row" spacing={2} flexWrap="wrap">
                <Link
                  href="/privacy"
                  sx={{
                    color: "info.main",
                    textDecoration: "none",
                    fontFamily: "inherit",
                    "&:hover": {
                      textDecoration: "underline",
                      color: "info.dark",
                    },
                  }}
                >
                  {modalContent.privacyPolicy}
                </Link>
                <Link
                  href="/cookies"
                  sx={{
                    color: "info.main",
                    textDecoration: "none",
                    fontFamily: "inherit",
                    "&:hover": {
                      textDecoration: "underline",
                      color: "info.dark",
                    },
                  }}
                >
                  {modalContent.cookiePolicy}
                </Link>
                <Link
                  href="/terms"
                  sx={{
                    color: "info.main",
                    textDecoration: "none",
                    fontFamily: "inherit",
                    "&:hover": {
                      textDecoration: "underline",
                      color: "info.dark",
                    },
                  }}
                >
                  {modalContent.termsOfService}
                </Link>
              </Stack>
            </Box>

            {/* Buttons */}
            <Stack direction={isMobile ? "column" : "row"} spacing={2} justifyContent="flex-end">
              <Button
                variant="outlined"
                onClick={handleDeclineAll}
                sx={{
                  borderColor: "text.secondary",
                  color: "text.secondary",
                  fontFamily: "inherit",
                  borderRadius: "18px",
                  "&:hover": {
                    borderColor: "text.primary",
                    backgroundColor: "action.hover",
                    color: "text.primary",
                  },
                }}
              >
                {modalContent.declineAll}
              </Button>
              <Button
                variant="outlined"
                onClick={handleAcceptSelected}
                sx={{
                  borderColor: "info.main",
                  color: "info.main",
                  fontFamily: "inherit",
                  borderRadius: "18px",
                  "&:hover": {
                    backgroundColor: "info.main",
                    color: "white",
                    borderColor: "info.main",
                  },
                }}
              >
                {modalContent.acceptSelected}
              </Button>
              <Button
                variant="contained"
                onClick={handleAcceptAll}
                sx={{
                  backgroundColor: "info.main",
                  color: "white",
                  fontFamily: "inherit",
                  borderRadius: "18px",
                  "&:hover": {
                    backgroundColor: "info.dark",
                  },
                }}
              >
                {modalContent.acceptAll}
              </Button>
            </Stack>
          </Stack>
        </Paper>
      </Modal>

      {/* Notification Snackbar */}
      <Snackbar
        open={showNotification}
        autoHideDuration={5000}
        onClose={hideNotification}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={hideNotification}
          severity={notificationType}
          sx={{
            width: "100%",
            borderRadius: "18px",
            fontFamily: "inherit",
          }}
        >
          {notificationMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
