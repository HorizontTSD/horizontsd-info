"use client";
import React, { useEffect, useState, memo, useCallback, useMemo } from "react";
import { Stack, Paper, Button, Switch, CircularProgress, Typography, Box } from "@mui/material";
import { useI18n } from "@/app/_providers/I18nProvider";
import { useColorScheme } from "@mui/material/styles";

const defaultState = {
  cookies: false,
  privacy: false,
  terms: false,
};

const STORAGE_KEY = "privacy-consent";

const PrivacyBanner = memo(function PrivacyBanner() {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState(defaultState);
  const [loading, setLoading] = useState(false);
  const { dict } = useI18n();
  const { mode } = useColorScheme();
  const isDark = mode === "dark";

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) {
        setState(defaultState);
        setOpen(true);
      } else {
        const parsed = JSON.parse(saved);
        setState({ ...defaultState, ...parsed });
      }
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      setState(defaultState);
      setOpen(true);
    }
  }, []);

  const handleChange = useCallback(
    (key: keyof typeof defaultState) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setState((prev) => ({ ...prev, [key]: e.target.checked }));
    },
    []
  );

  const handleAccept = useCallback(async (): Promise<void> => {
    setLoading(true);
    // Здесь отправляется запрос на сервер
    try {
      const response = await fetch("https://example.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(state),
      });
      if (!response.ok) throw new Error("Ошибка отправки на сервер");
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      setOpen(false);
    } catch (error) {
      console.error("Ошибка при отправке данных на сервер:", error);
    } finally {
      setLoading(false);
    }
  }, [state]);

  const handleAcceptAll = useCallback(async () => {
    setLoading(true);
    // Здесь отправляется запрос на сервер
    try {
      const allTrue = Object.fromEntries(
        Object.keys(defaultState).map((k) => [k, true])
      ) as typeof defaultState;
      const response = await fetch("https://example.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(allTrue),
      });
      if (!response.ok) throw new Error("Ошибка отправки на сервер");
      setState(allTrue);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(allTrue));
      setOpen(false);
    } catch (error) {
      console.error("Ошибка при отправке данных на сервер:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const paperStyles = useMemo(() => {
    const bgPalette = ["var(--mui-palette-secondary-dark)", "var(--mui-palette-secondary-light)"];
    return {
      position: "fixed",
      bottom: { xs: 0, sm: 32 },
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 2000,
      minWidth: { xs: "100vw", sm: 260, md: 340, lg: 400 },
      maxWidth: { xs: "100vw", sm: 500, md: 600, lg: 700 },
      width: { xs: "100vw", sm: "auto" },
      p: { xs: 1, sm: 2 },
      background: bgPalette[~~!isDark],
      color: isDark ? "var(--mui-palette-primary-light)" : "var(--mui-palette-text-primary)",
      borderRadius: { xs: 0, sm: "var(--mui-shape-borderRadius)" },
      backdropFilter: "blur(36px)",
      willChange: "transform",
      boxShadow: { xs: 4, sm: 8 },
    };
  }, [isDark]);

  if (!open || !dict?.PrivacyBanner) return null;

  return (
    <Paper sx={paperStyles} elevation={8}>
      <Stack spacing={2}>
        {loading ? (
          <Stack
            alignItems="center"
            justifyContent="center"
            sx={{
              minHeight: { xs: 280, sm: 320, md: 340 },
              width: { xs: 700, sm: 420, md: 640 },
              p: { xs: 1, sm: 2, md: 2 },
              boxSizing: "border-box",
              gap: 2,
              position: "relative",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <CircularProgress size={128} color="info" />
          </Stack>
        ) : (
          <>
            <Typography variant="h6" sx={{ userSelect: "none", mb: 1 }}>
              {dict.PrivacyBanner.title}
            </Typography>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{
                flexWrap: { xs: "wrap", sm: "nowrap" },
                borderBottom: "1px solid",
                borderColor: "info.main",
                pb: 0.5,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1, minWidth: 0 }}>
                <Typography variant="body1" sx={{ fontWeight: 500, mr: 0.5, whiteSpace: "nowrap" }}>
                  {dict.PrivacyBanner.cookies}
                </Typography>
                <a
                  href="/cookies"
                  target="_blank"
                  style={{
                    color: "var(--mui-palette-info-main)",
                    textDecoration: "none",
                    fontWeight: 500,
                    cursor: "pointer",
                    fontSize: "1rem",
                    whiteSpace: "nowrap",
                  }}
                >
                  /cookies
                </a>
              </Box>
              <Switch
                checked={state.cookies}
                onChange={handleChange("cookies")}
                color="info"
                size="medium"
              />
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{
                flexWrap: { xs: "wrap", sm: "nowrap" },
                borderBottom: "1px solid",
                borderColor: "info.main",
                pb: 0.5,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1, minWidth: 0 }}>
                <Typography variant="body1" sx={{ fontWeight: 500, mr: 0.5, whiteSpace: "nowrap" }}>
                  {dict.PrivacyBanner.privacy}
                </Typography>
                <a
                  href="/privacy"
                  target="_blank"
                  style={{
                    color: "var(--mui-palette-info-main)",
                    textDecoration: "none",
                    fontWeight: 500,
                    cursor: "pointer",
                    fontSize: "1rem",
                    whiteSpace: "nowrap",
                  }}
                >
                  /privacy
                </a>
              </Box>
              <Switch
                checked={state.privacy}
                onChange={handleChange("privacy")}
                color="info"
                size="medium"
              />
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{
                flexWrap: { xs: "wrap", sm: "nowrap" },
                borderBottom: "1px solid",
                borderColor: "info.main",
                pb: 0.5,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1, minWidth: 0 }}>
                <Typography variant="body1" sx={{ fontWeight: 500, mr: 0.5, whiteSpace: "nowrap" }}>
                  {dict.PrivacyBanner.terms}
                </Typography>
                <a
                  href="/terms"
                  target="_blank"
                  style={{
                    color: "var(--mui-palette-info-main)",
                    textDecoration: "none",
                    fontWeight: 500,
                    cursor: "pointer",
                    fontSize: "1rem",
                    whiteSpace: "nowrap",
                  }}
                >
                  /terms
                </a>
              </Box>
              <Switch
                checked={state.terms}
                onChange={handleChange("terms")}
                color="info"
                size="medium"
              />
            </Stack>
            <Typography variant="body2" sx={{ mt: 1, color: "text.primary", fontWeight: 400 }}>
              {dict.PrivacyBanner.agreementGDPRText}
            </Typography>
            <Stack
              direction="row"
              flexWrap={{ xs: "nowrap", sm: "nowrap" }}
              spacing={2}
              justifyContent="space-between"
              mt={2}
            >
              <Button
                sx={{
                  fontSize: { xs: 13, sm: 13, md: 13 },
                  py: { xs: 0.5, sm: 0.7, md: 0.7 },
                  minHeight: { xs: 32, sm: 36, md: 36 },
                  minWidth: { xs: 80, sm: 100, md: 90 },
                  maxWidth: { xs: "100%", sm: 160 },
                  width: "50%",
                  whiteSpace: { xs: "normal", sm: "nowrap" },
                  color: "text.primary",
                  fontWeight: 600,
                  borderColor: "secondary.main",
                  boxShadow: 2,
                  backgroundColor: "transparent",
                  "&:hover": { backgroundColor: "secondary.light", borderColor: "secondary.dark" },
                }}
                variant="outlined"
                onClick={handleAccept}
                size="small"
              >
                <Typography variant="button" color="text.primary" fontWeight={600}>
                  {dict.PrivacyBanner.accept}
                </Typography>
              </Button>
              <Button
                sx={{
                  fontSize: { xs: 13, sm: 13, md: 13 },
                  py: { xs: 0.5, sm: 0.7, md: 0.7 },
                  minHeight: { xs: 32, sm: 36, md: 36 },
                  minWidth: { xs: 80, sm: 110, md: 100 },
                  maxWidth: { xs: "100%", sm: 180 },
                  width: "50%",
                  whiteSpace: { xs: "normal", sm: "nowrap" },
                  backgroundColor: "secondary.main",
                  color: "text.primary",
                  fontWeight: 600,
                  boxShadow: 2,
                  "&:hover": { backgroundColor: "secondary.dark" },
                }}
                variant="contained"
                onClick={handleAcceptAll}
                size="small"
              >
                <Typography variant="button" color="text.primary" fontWeight={600}>
                  {dict.PrivacyBanner.acceptAll}
                </Typography>
              </Button>
            </Stack>
          </>
        )}
      </Stack>
    </Paper>
  );
});

export { PrivacyBanner };
