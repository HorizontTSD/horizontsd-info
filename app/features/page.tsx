"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Navbar from "@/app/_components/Navbar";
import CallToAction from "@/app/_components/CallToAction";
import Footer from "@/app/_components/Footer";
import ScrollTop from "@/app/_components/ScrollTop";
import FeaturesHeader from "@/app/features/_components/FeaturesHeader";
import QuickForecast from "@/app/features/_components/QuickForecast";
import InteractiveDashboard from "@/app/features/_components/InteractiveDashboard";
import AIAgent from "@/app/features/_components/AIAgent";
import APIIntegration from "@/app/features/_components/APIIntegration";

function PageContent() {
  return (
    <>
      <Navbar />
      <FeaturesHeader />
      <QuickForecast />
      <InteractiveDashboard />
      <AIAgent />
      <APIIntegration />
      <CallToAction />
      <Footer />
    </>
  );
}

export default function Page() {
  return (
    <Box
      sx={{
        margin: `0 auto`,
        minWidth: `320px`,
        overflowX: `hidden`,
      }}
    >
      <Toolbar id="back-to-top-anchor" sx={{ position: `absolute` }} />
      <PageContent />
      <ScrollTop />
    </Box>
  );
}
