"use client";
import * as React from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import type { } from "@mui/material/themeCssVarsAugmentation";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";

import { theme } from "../theme"

export default function MuiProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppRouterCacheProvider options={{ enableCssLayer: true }}>
      <ThemeProvider defaultMode="light" theme={theme}>
        <CssBaseline />
        <InitColorSchemeScript attribute="class" />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}