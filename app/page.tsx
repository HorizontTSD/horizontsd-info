"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Navbar from "@/app/_components/Navbar";
import Hero from "@/app/_components/Hero";
import Features from "@/app/_components/Features";
import Applications from "@/app/_components/Applications";
import Works from "@/app/_components/Works";
import Capabilities from "@/app/_components/Capabilities";
import CallToAction from "@/app/_components/CallToAction";
import About from "@/app/_components/About";
import Faq from "@/app/_components/Faq";
import Footer from "@/app/_components/Footer";
import ScrollTop from "@/app/_components/ScrollTop";
function PageContent() {
  return (
    <>
      <Navbar />
      <Hero fullsize={true} />
      <Applications />
      <Features />
      <Works />
      <CallToAction />
      <Capabilities />
      <About />
      <Faq />
      <Footer />
    </>
  );
}

export default function Page() {
  return (
    <Box
      sx={{
        alignItems: `center`,
        display: `flex`,
        flexDirection: `column`,
        justifyContent: `start`,
        margin: `0 auto`,
        overflow: `hidden`,
        overflowX: `hidden`,
        width: `100%`,
      }}
    >
      <Toolbar id="back-to-top-anchor" sx={{ position: `absolute` }} />
              <PageContent />
        <ScrollTop />
      </Box>
  );
}
