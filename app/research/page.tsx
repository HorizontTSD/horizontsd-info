"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Toolbar from "@mui/material/Toolbar";
import Navbar from "../_components/Navbar";
import Hero from "../_components/Hero";
import CallToAction from "../_components/CallToAction";
import Footer from "../_components/Footer";
import ScrollTop from "../_components/ScrollTop";
import PaperWork from "./_components/PaperWork";
import { useI18n } from "../_providers/I18nProvider";
import { ResearchItem } from "../_components/types";

function PageContent() {
  const { dict } = useI18n();

  if (!dict?.Research?.Content) {
    return <div>Loading research content...</div>;
  }

  const content = dict.Research.Content;

  return (
    <>
      <Navbar />
      <Hero fullsize={false} />
      {content.map((item, index) => {
        const researchItem: ResearchItem = {
          id: item.id || `item-${index}`,
          title: item.title,
          image: item.image,
          description: item.description,
          Button: item.Button || dict.Research.Button || "Learn More"
        };

        return <PaperWork item={researchItem} key={researchItem.id} />;
      })}
      <CallToAction />
      <Footer />
    </>
  );
}

export default function Page() {
  return (
    <Box sx={{
      overflowX: "hidden",
      minWidth: "320px",
      margin: "0 auto",
    }}>
      <Toolbar id="back-to-top-anchor" sx={{ position: "absolute" }} />
      <PageContent />
      <ScrollTop>
        <Fab size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </Box>
  );
}
