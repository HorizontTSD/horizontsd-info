import React from "react";
import { useI18n } from "@/app/_providers/I18nProvider";
import { Box } from "@mui/material";

// Тип для элемента таймлинии с phase
interface TimelineItemWithPhase {
  date: string;
  title: string;
  type: "past" | "future";
  link?: string;
  description?: string;
  phase?: string;
}

const MaterialsBlock: React.FC = () => {
  const { dict } = useI18n();
  const materials = dict?.InvestorRelations?.materials || {
    why: { label: "Для чего", link: "https://example.com/why" },
    marketOverview: { label: "Обзор рынка", link: "https://example.com/market-overview" },
    financialModel: { label: "Фин модель", link: "https://example.com/financial-model" },
  };

  // Получаем список фаз и их описания из timeline
  const timeline: TimelineItemWithPhase[] = dict?.InvestorRelations?.timeline || [];
  // Собираем уникальные фазы с первым описанием
  const phases: { phase: string; description: string }[] = [];
  const seen = new Set();
  for (const item of timeline) {
    if (item.phase && !seen.has(item.phase)) {
      phases.push({ phase: item.phase, description: item.title });
      seen.add(item.phase);
    }
  }

  // Новые фирменные цвета для фаз
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

  return (
    <>
      <h2
        style={{
          textAlign: "center",
          fontWeight: 700,
          fontSize: 32,
          fontFamily: "BebasNeue, var(--font-roboto), Arial, sans-serif",
          letterSpacing: 1,
          margin: 0,
          marginBottom: 24,
        }}
      >
        {dict?.InvestorRelations?.materialsTitle || "Материалы"}
      </h2>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {Object.entries(materials)
          .filter(([key]) => key !== "downloadPdf")
          .map(([key, val]) => (
            <Box
              key={key}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                fontSize: 20,
              }}
            >
              <span>{val.label}</span>
              <a
                href={val.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#1976d2", fontSize: 18, textDecoration: "underline" }}
              >
                {dict?.InvestorRelations?.materials?.downloadPdf || "Скачать PDF"}
              </a>
            </Box>
          ))}
      </Box>
      {/* Фазы */}
      <Box
        sx={{
          mt: 6,
          borderTop: "2px solid #eee",
          pt: 4,
          display: "flex",
          alignItems: "flex-start",
          flexDirection: "column",
          gap: 2.25,
        }}
      >
        {phases.map(({ phase, description }) => (
          <Box
            key={phase}
            sx={{
              display: "grid",
              gridTemplateColumns: "24px 1fr",
              alignItems: "center",
              fontSize: 20,
              fontWeight: 700,
              mb: 0.5,
              columnGap: 2,
            }}
          >
            <Box
              component="span"
              sx={{
                width: 18,
                height: 18,
                borderRadius: "50%",
                background: phaseColorMap[phase] || "#888",
                display: "block",
                border: "none",
                justifySelf: "center",
              }}
            />
            <Box component="span" sx={{ lineHeight: 1 }}>
              {phase}: {description}
            </Box>
          </Box>
        ))}
      </Box>
    </>
  );
};

export default MaterialsBlock;
