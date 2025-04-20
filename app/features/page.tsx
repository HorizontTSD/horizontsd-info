"use client"
import * as React from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Toolbar from "@mui/material/Toolbar";
import Navbar from "../_components/Navbar"
import Hero from "../_components/Hero"
import CallToAction from "../_components/CallToAction"
import Footer from "../_components/Footer"
import Optimization from "./_components/Optimization";
import Prediction from "./_components/Prediction";
import Processing from "./_components/Processing";
import ScrollTop from "../_components/ScrollTop"

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
      overflowX: `hidden`,
      minWidth: `320px`,
      margin: `0 auto`,
    }}>
      <Toolbar id="back-to-top-anchor" sx={{ position: `absolute` }} />
      <PageContent />
      <ScrollTop>
        <Fab size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </Box>
  )
}
