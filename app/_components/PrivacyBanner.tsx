"use client";
import React, { useEffect, useState, memo, useCallback, useMemo } from "react";
import { Stack, Paper, Link, Button, Switch, CircularProgress } from "@mui/material";
import { useI18n } from "@/app/_providers/I18nProvider";
import { useColorScheme } from "@mui/material/styles";

const defaultState = {
  cookies: true,
  analytics: true,
  terms: true,
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
      if (!saved) setOpen(true);
      else setState(JSON.parse(saved));
    } catch (error) {
      console.error("Error reading from localStorage:", error);
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
      maxWidth: { xs: "100vw", sm: 340, md: 400, lg: 500 },
      width: { xs: "100vw", sm: "auto" },
      p: { xs: 1, sm: 2 },
      border: `2px dashed ${
        isDark ? "var(--mui-palette-primary-light)" : "var(--mui-palette-primary-dark)"
      }`,
      background: bgPalette[~~!isDark],
      color: isDark ? "var(--mui-palette-primary-light)" : "var(--mui-palette-text-primary)",
      borderRadius: { xs: 0, sm: "var(--mui-shape-borderRadius)" },
      backdropFilter: "blur(36px)",
      willChange: "transform",
      boxShadow: { xs: 4, sm: 8 },
    };
  }, [isDark]);

  const buttonStyles = useMemo(
    () => ({
      accept: {
        color: isDark ? "var(--mui-palette-primary-light)" : "var(--mui-palette-text-primary)",
        borderColor: isDark
          ? "var(--mui-palette-primary-light)"
          : "var(--mui-palette-primary-dark)",
        "&:hover": {
          borderColor: "var(--mui-palette-info-main)",
          color: "var(--mui-palette-info-main)",
        },
      },
      acceptAll: {
        background: "var(--mui-palette-info-main)",
        color: "var(--mui-palette-primary-light)",
        "&:hover": {
          background: "var(--mui-palette-info-dark)",
        },
      },
    }),
    [isDark]
  );

  if (!open || !dict?.PrivacyBanner) return null;

  return (
    <Paper sx={paperStyles} elevation={8}>
      <Stack spacing={2}>
        {loading ? (
          <Stack alignItems="center" justifyContent="center" sx={{ minHeight: 160, width: "100%" }}>
            <CircularProgress size={44} color="info" />
          </Stack>
        ) : (
          <>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ flexWrap: { xs: "wrap", sm: "nowrap" } }}
            >
              <Link
                href="/privacy"
                target="_blank"
                color="inherit"
                underline="hover"
                sx={{ fontSize: { xs: 14, sm: 16 } }}
              >
                {dict.PrivacyBanner.cookies}
              </Link>
              <Switch
                checked={state.cookies}
                onChange={handleChange("cookies")}
                color="info"
                size="small"
              />
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ flexWrap: { xs: "wrap", sm: "nowrap" } }}
            >
              <Link
                href="/analytics"
                target="_blank"
                color="inherit"
                underline="hover"
                sx={{ fontSize: { xs: 14, sm: 16 } }}
              >
                {dict.PrivacyBanner.analytics}
              </Link>
              <Switch
                checked={state.analytics}
                onChange={handleChange("analytics")}
                color="info"
                size="small"
              />
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ flexWrap: { xs: "wrap", sm: "nowrap" } }}
            >
              <Link
                href="/terms"
                target="_blank"
                color="inherit"
                underline="hover"
                sx={{ fontSize: { xs: 14, sm: 16 } }}
              >
                {dict.PrivacyBanner.terms}
              </Link>
              <Switch
                checked={state.terms}
                onChange={handleChange("terms")}
                color="info"
                size="small"
              />
            </Stack>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              flexWrap={{ xs: "nowrap", sm: "nowrap" }}
              spacing={2}
              justifyContent="flex-end"
              mt={2}
            >
              <Button
                sx={{
                  ...buttonStyles.acceptAll,
                  fontSize: { xs: 13, sm: 13, md: 13 },
                  py: { xs: 0.5, sm: 0.7, md: 0.7 },
                  minHeight: { xs: 32, sm: 36, md: 36 },
                  minWidth: { xs: 80, sm: 110, md: 100 },
                  maxWidth: { xs: "100%", sm: 180 },
                  width: { xs: "100%", sm: "auto" },
                  whiteSpace: { xs: "normal", sm: "nowrap" },
                  order: { xs: 0, sm: 1 },
                }}
                variant="contained"
                onClick={handleAcceptAll}
              >
                {dict.PrivacyBanner.acceptAll}
              </Button>
              <Button
                sx={{
                  ...buttonStyles.accept,
                  fontSize: { xs: 13, sm: 13, md: 13 },
                  py: { xs: 0.5, sm: 0.7, md: 0.7 },
                  minHeight: { xs: 32, sm: 36, md: 36 },
                  minWidth: { xs: 80, sm: 100, md: 90 },
                  maxWidth: { xs: "100%", sm: 160 },
                  width: { xs: "100%", sm: "auto" },
                  whiteSpace: { xs: "normal", sm: "nowrap" },
                  order: { xs: 1, sm: 2 },
                }}
                variant="outlined"
                onClick={handleAccept}
              >
                {dict.PrivacyBanner.accept}
              </Button>
            </Stack>
          </>
        )}
      </Stack>
    </Paper>
  );
});

export { PrivacyBanner };
