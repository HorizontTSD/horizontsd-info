import React from "react";
import { useI18n } from "@/app/_providers/I18nProvider";
import type { InvestorRelationsDictionary, TimelineItemDict } from "@/app/_components/types";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { useColorScheme } from "@mui/material/styles";

// Цвета для фаз
const phaseColorMap: Record<string, string> = {
  "Фаза 1": "#222222",
  "Фаза 2": "#26AD50",
  "Фаза 3": "#2196F3",
  "Фаза 4": "#FFB300",
  "Фаза 5": "#8E24AA",
  "Фаза 6": "#E53935",
  "Phase 1": "#222222",
  "Phase 2": "#26AD50",
  "Phase 3": "#2196F3",
  "Phase 4": "#FFB300",
  "Phase 5": "#8E24AA",
  "Phase 6": "#E53935",
  "Fase 1": "#222222",
  "Fase 2": "#26AD50",
  "Fase 3": "#2196F3",
  "Fase 4": "#FFB300",
  "Fase 5": "#8E24AA",
  "Fase 6": "#E53935",
};

const TimelineBlock: React.FC = () => {
  const { dict } = useI18n();
  const { mode } = useColorScheme();
  const isDark = mode === "dark";
  const investorDict = dict?.InvestorRelations as InvestorRelationsDictionary | undefined;
  const timeline: TimelineItemDict[] = investorDict?.timeline || [];
  const isMobileXS = typeof window !== "undefined" && window.innerWidth < 489;

  return (
    <div
      style={{
        width: "100%",
        overflowX: "hidden",
        overflowY: "visible",
        fontFamily: "var(--font-roboto, Roboto, Arial, sans-serif)",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          fontWeight: 700,
          fontSize: 32,
          marginBottom: 32,
          fontFamily: "BebasNeue, var(--font-roboto), Arial, sans-serif",
          letterSpacing: 1,
        }}
      >
        {investorDict?.timelineTitle || "Наш путь"}
      </h2>
      <VerticalTimeline animate={true} lineColor="var(--timeline-line-past)">
        {timeline.map((item, idx) => {
          return (
            <VerticalTimelineElement
              key={idx}
              className={`vertical-timeline-element--${item.type}`}
              date={item.date}
              contentStyle={{
                background: isDark ? "#232426" : "#fff",
                color: "var(--mui-palette-text-primary)",
                borderRadius: 18,
                boxShadow: "none",
                border: "none",
                minWidth: "10px",
                flexWrap: "wrap",
                padding: isMobileXS ? "8px 2px" : "24px 28px",
                transition: "none",
                fontSize: isMobileXS ? 11 : 14,
              }}
              iconStyle={{
                background: item.phase
                  ? phaseColorMap[item.phase]
                  : `var(--timeline-icon-bg-${item.type})`,
                color: `var(--timeline-icon-color-${item.type})`,
                border: "4px solid #fff",
                boxShadow: "none",
                width: 32,
                height: 32,
                minWidth: 32,
                minHeight: 32,
                maxWidth: 32,
                maxHeight: 32,
                marginLeft: -16,
              }}
            >
              <h3
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  margin: 0,
                  color: "var(--mui-palette-text-primary)",
                }}
              >
                {item.title}
              </h3>
              <div style={{ color: "var(--mui-palette-text-secondary)", fontSize: 14 }}>
                {item.linkText && item.link ? (
                  <>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#1976d2", textDecoration: "underline", fontWeight: 500 }}
                    >
                      {item.linkText}
                    </a>
                    {item.description
                      ? ` ${item.description.replace(item.linkText, "").replace(item.link, "")}`
                      : ""}
                  </>
                ) : (
                  item.description
                )}
              </div>
            </VerticalTimelineElement>
          );
        })}
      </VerticalTimeline>
      <style jsx global>{`
        body {
          overflow-x: hidden !important;
        }
        :root {
          --timeline-icon-bg-past: #4a4a4a;
          --timeline-icon-bg-future: #26ad50;
          --timeline-icon-color-past: #fff;
          --timeline-icon-color-future: #fff;
          --timeline-icon-border-past: #4a4a4a;
          --timeline-icon-border-future: #26ad50;
          --timeline-line-past: #4a4a4a;
          --timeline-line-future: #26ad50;
        }
        .light {
          --timeline-icon-bg-past: #4a4a4a;
          --timeline-icon-bg-future: #26ad50;
          --timeline-icon-color-past: #fff;
          --timeline-icon-color-future: #fff;
          --timeline-icon-border-past: #4a4a4a;
          --timeline-icon-border-future: #26ad50;
          --timeline-line-past: #4a4a4a;
          --timeline-line-future: #26ad50;
        }
        .dark {
          --timeline-icon-bg-past: #fff;
          --timeline-icon-bg-future: #26ad50;
          --timeline-icon-color-past: #292a2d;
          --timeline-icon-color-future: #fff;
          --timeline-icon-border-past: #fff;
          --timeline-icon-border-future: #26ad50;
          --timeline-line-past: #fff;
          --timeline-line-future: #26ad50;
        }
        .vertical-timeline-element--future .vertical-timeline-element-content::before,
        .vertical-timeline-element--future::before {
          background: var(--timeline-line-future) !important;
        }
        .vertical-timeline-element--past .vertical-timeline-element-content::before,
        .vertical-timeline-element--past::before {
          background: var(--timeline-line-past) !important;
        }
        .vertical-timeline-element-icon {
          box-shadow: none !important;
        }
        @media (max-width: 1170px) {
          .vertical-timeline {
            left: 0 !important;
          }
          .vertical-timeline::before {
            left: 14px !important;
            width: 4px !important;
          }
          .vertical-timeline-element-icon {
            margin-left: 0 !important;
          }
        }
      `}</style>
    </div>
  );
};

export default TimelineBlock;
