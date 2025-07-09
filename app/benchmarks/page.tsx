"use client";
import { useI18n } from "@/app/_providers/I18nProvider";
import { Typography, Container, Box, Toolbar } from "@mui/material";
import Navbar from "@/app/_components/Navbar";
import { useColorScheme } from "@mui/material/styles";
import { WebGLBackground } from "@/app/_components/Wow";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Link,
} from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import React, { useEffect, useState, useRef } from "react";

interface BenchmarksDict {
  title: string;
  stub: string;
}

interface BenchmarkMetrics {
  MAE: number;
  RMSE: number;
  MAPE: number;
}

interface BenchmarkModel {
  name: string;
  metrics: BenchmarkMetrics;
  relative_to_horizon: BenchmarkMetrics;
}

interface BenchmarkDataset {
  name: string;
  source_url: string;
  models: BenchmarkModel[];
}

interface ColabLinks {
  [key: string]: string;
}

interface BenchmarkData {
  datasets: BenchmarkDataset[];
  colab_links: ColabLinks;
}

export default function BenchmarksPage() {
  const { dict } = useI18n();
  const { mode } = useColorScheme();
  const isDark = mode === "dark";
  const content = dict?.Benchmarks as BenchmarksDict | undefined;
  if (!content) return null;
  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        position: "relative",
        overflow: "hidden",
        background: isDark
          ? `linear-gradient(180deg,var(--mui-palette-secondary-dark) ,var(--mui-palette-primary-dark))`
          : `linear-gradient(180deg, rgb(from var(--mui-palette-common-white) r g b / 1), var(--mui-palette-primary-light) 10%)`,
      }}
    >
      <Navbar />
      <Toolbar id="back-to-top-anchor" sx={{ position: `absolute` }} />
      {/* Эффект длинных палочек на фоне */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "60%",
          zIndex: 1,
          opacity: isDark ? 0.4 : 0.3,
          pointerEvents: "none",
        }}
      >
        <WebGLBackground color={isDark ? [0.5, 0.9, 0.9] : [0.0, 0.0, 0.0]} />
      </Box>
      <Container
        maxWidth="lg"
        sx={{
          minHeight: "60vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 2,
          position: "relative",
        }}
      >
        <Box sx={{ textAlign: "center", mt: 12 }}>
          <Typography variant="h3" gutterBottom>
            {content.title}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            {content.stub}
          </Typography>
        </Box>
        <BenchmarksTable />
      </Container>
    </Box>
  );
}

function BenchmarksTable() {
  const [data, setData] = useState<BenchmarkData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetchedRef = useRef(false);
  const { dict } = useI18n();
  const testLinkLabel = dict?.Benchmarks?.testLink || "Test link";

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/benchmark_metrics");
        if (!response.ok) throw new Error("Ошибка загрузки данных");
        const json = await response.json();
        setData(json);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Неизвестная ошибка");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <Typography sx={{ mt: 4 }}>Загрузка...</Typography>;
  if (error)
    return (
      <Typography color="error" sx={{ mt: 4 }}>
        {error}
      </Typography>
    );
  if (!data || !Array.isArray(data.datasets) || data.datasets.length === 0)
    return <Typography sx={{ mt: 4 }}>Нет данных</Typography>;

  // Для простоты — только первый датасет (как на скрине)
  const dataset = data.datasets[0];
  const allModels = dataset.models.map((m) => m.name);
  const colabLinks = data.colab_links;

  return (
    <TableContainer component={Paper} sx={{ mt: 6 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Dataset</TableCell>
            {allModels.map((model) => (
              <TableCell align="center" key={model}>
                {model}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {/* Строка с данными */}
          <TableRow>
            <TableCell>
              <Link
                href={dataset.source_url}
                target="_blank"
                rel="noopener noreferrer"
                color="info.main"
                underline="hover"
              >
                {dataset.name}
              </Link>
            </TableCell>
            {dataset.models.map((model, idx) => (
              <TableCell align="center" key={model.name}>
                <Typography>{model.metrics.MAPE.toFixed(1)}%</Typography>
                {idx !== 0 && (
                  <Box display="flex" alignItems="center" justifyContent="center">
                    <ArrowDownwardIcon fontSize="small" color="error" />
                    <Typography variant="body2" color="error">
                      {model.relative_to_horizon.MAPE > 0 ? "+" : ""}
                      {model.relative_to_horizon.MAPE.toFixed(1)}%
                    </Typography>
                  </Box>
                )}
              </TableCell>
            ))}
          </TableRow>
          {/* Строка с Colab-ссылками */}
          <TableRow>
            <TableCell>{testLinkLabel}</TableCell>
            {allModels.map((model) => (
              <TableCell align="center" key={model}>
                {colabLinks[model] ? (
                  <Link
                    href={colabLinks[model]}
                    target="_blank"
                    rel="noopener noreferrer"
                    color="info.main"
                    underline="hover"
                  >
                    {model} link
                  </Link>
                ) : (
                  "—"
                )}
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
