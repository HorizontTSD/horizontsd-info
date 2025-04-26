"use client"
import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Navbar from "@/app/_components/Navbar"
import Hero from "@/app/_components/Hero"
import CallToAction from "@/app/_components/CallToAction"
import Footer from "@/app/_components/Footer"
import Optimization from "@/app/features/_components/Optimization";
import Prediction from "@/app/features/_components/Prediction";
import Processing from "@/app/features/_components/Processing";
import ScrollTop from "@/app/_components/ScrollTop"

function PageContent() {
  return (
    <>
      <Navbar />
      <Hero fullsize={false} />
      <Optimization />
      <Prediction />
      <CallToAction />
      <Processing />
      <Footer />
    </>
  )
}


export default function Page() {
  return (
    <Box sx={{
      margin: `0 auto`,
      minWidth: `320px`,
      overflowX: `hidden`,
    }}>
      <Toolbar id="back-to-top-anchor" sx={{ position: `absolute` }} />
      <PageContent />
      <ScrollTop />
    </Box>
  )
}
