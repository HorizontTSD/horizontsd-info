"use client"
import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Navbar from "./_components/Navbar"
import Hero from "./_components/Hero"
import Features from "./_components/Features"
import Applications from "./_components/Applications"
import Works from "./_components/Works"
import Capabilities from "./_components/Capabilities"
import CallToAction from "./_components/CallToAction"
import About from "./_components/About"
import Faq from "./_components/Faq"
import Footer from "./_components/Footer"
import ScrollTop from "./_components/ScrollTop"

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
  )
}

export default function Page() {
  return (
    <Box sx={{
      overflowX: `hidden`,
      minWidth: `320px`,
      margin: `0 auto`,
    }}>
      <Toolbar id="back-to-top-anchor" sx={{ position: `absolute` }} />
      <PageContent />
      <ScrollTop />
    </Box>
  )
}
