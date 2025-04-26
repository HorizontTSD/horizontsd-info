"use client"
import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Navbar from "@/app/_components/Navbar";
import Hero from "@/app/_components/Hero";
import CallToAction from "@/app/_components/CallToAction";
import Footer from "@/app/_components/Footer";
import ScrollTop from "@/app/_components/ScrollTop";
import PaperWork from "@/app/research/_components/PaperWork";
import { useI18n } from "@/app/_providers/I18nProvider";
import { ResearchItem } from "@/app/_components/types";

function PageContent() {
  const { dict } = useI18n();
  if (!dict?.Research?.Content) return null
  const content = dict.Research.Content;
  return (
    <>
      <Navbar />
      <Hero fullsize={false} />
      {content.map((item, index) => {
        const researchItem: ResearchItem = {
          Button: item.Button || dict.Research.Button || "Learn More",
          description: item.description,
          id: item.id || `item-${index}`,
          image: item.image,
          title: item.title,
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
      margin: "0 auto",
      minWidth: "320px",
      overflowX: "hidden",
    }}>
      <Toolbar id="back-to-top-anchor" sx={{ position: "absolute" }} />
      <PageContent />
      <ScrollTop />
    </Box>
  );
}
