import * as React from "react";
import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import {
  SvgIcon,
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  useMediaQuery,
  useColorScheme,
  Chip,
} from "@mui/material";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import TurnRightIcon from "@mui/icons-material/TurnRight";
import DatasetIcon from "@mui/icons-material/Dataset";
import DataObjectIcon from "@mui/icons-material/DataObject";
import DataArrayIcon from "@mui/icons-material/DataArray";
import AreaChartIcon from "@mui/icons-material/AreaChart";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import OnlinePredictionIcon from "@mui/icons-material/OnlinePrediction";
import BatchPrediction from "@mui/icons-material/BatchPrediction";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import PsychologyIcon from "@mui/icons-material/Psychology";
import ForumIcon from "@mui/icons-material/Forum";
import DescriptionIcon from "@mui/icons-material/Description";
import CodeIcon from "@mui/icons-material/Code";
import ApiIcon from "@mui/icons-material/Api";
import HttpIcon from "@mui/icons-material/Http";
import { useI18n } from "@/app/_providers/I18nProvider";
import { bebasNeue } from "@/fonts";

const DEFAULT_BG_LIGHT = "var(--mui-palette-primary-light)"; // #90caf9
const DEFAULT_BG_DARK = "#222";
const HOVER_COLORS_LIGHT = {
  primary: "#FF9800",
  secondary: "#4CAF50",
  chat: "#F44336",
  api: "#2196F3",
};
const HOVER_COLORS_DARK = {
  primary: "#FFA726",
  secondary: "#81C784",
  chat: "#E57373",
  api: "#64B5F6",
};

export interface HeroCardProps {
  type: "primary" | "secondary" | "chat" | "api";
  active?: boolean;
  onMouseEnter?: () => void;
}

export interface HeroCardBoxProps {
  offset: number;
  size: number;
  Icon: typeof SvgIcon;
  type: "primary" | "secondary" | "chat" | "api";
}

export interface HeroCardIllustrationProps {
  type: "primary" | "secondary" | "chat" | "api";
}

export function HeroCardIllustrationBox({ type, size = 6, offset = 0, Icon }: HeroCardBoxProps) {
  const { mode } = useColorScheme();
  const isDark = mode == "dark";
  const primaryColor = isDark
    ? `var(--mui-palette-primary-light)`
    : `var(--mui-palette-text-primary)`;
  const secondaryColor = isDark
    ? `var(--mui-palette-primary-light)`
    : `var(--mui-palette-text-primary)`;
  let bg;
  if (type === "primary" || type === "api") {
    bg = "rgba(0,0,0,0.1)";
  } else if (type === "chat") {
    bg = "rgba(0,0,0,0.1)";
  } else if (type === "secondary") {
    bg = "rgba(0,0,0,0.1)";
  } else {
    bg = "rgba(0,0,0,0.1)";
  }

  return (
    <Box
      sx={{
        alignItems: `center`,
        background: bg,
        borderRadius: "var(--mui-shape-borderRadius)",
        display: `flex`,
        flexDirection: `column`,
        height: `${size}rem`,
        justifyContent: `center`,
        left: `${offset * 1.5}px`,
        position: `relative`,
        top: `${-offset * 0.5}px`,
        width: `${size}rem`,
      }}
    >
      <Icon
        sx={{
          color: type == "primary" ? primaryColor : secondaryColor,
          width: `64px`,
          height: `64px`,
        }}
      />
    </Box>
  );
}

export function HeroCardIllustration({ type = "primary" }: HeroCardIllustrationProps) {
  const boxSize = 6;
  let firstBoxIcons, secondBoxIcons, interval1, interval2;
  if (type === "primary") {
    firstBoxIcons = [DatasetIcon, DataObjectIcon, DataArrayIcon];
    secondBoxIcons = [AreaChartIcon, AutoGraphIcon];
    interval1 = 4000;
    interval2 = 7000;
  } else if (type === "secondary") {
    firstBoxIcons = [OnlinePredictionIcon, BatchPrediction];
    secondBoxIcons = [AutoGraphIcon, AreaChartIcon];
    interval1 = 6000;
    interval2 = 3000;
  } else if (type === "api") {
    firstBoxIcons = [ApiIcon, HttpIcon];
    secondBoxIcons = [CodeIcon, DescriptionIcon];
    interval1 = 4000;
    interval2 = 6000;
  } else {
    // chat
    firstBoxIcons = [SmartToyIcon, PsychologyIcon];
    secondBoxIcons = [ChatBubbleIcon, ForumIcon];
    interval1 = 3500;
    interval2 = 3500;
  }
  const [currentFirstIcon, setCurrentFirstIcon] = useState(0);
  const [currentSecondIcon, setCurrentSecondIcon] = useState(0);
  useEffect(() => {
    const firstInterval = setInterval(() => {
      setCurrentFirstIcon((prev) => (prev + 1) % firstBoxIcons.length);
    }, interval1);
    const secondInterval = setInterval(() => {
      setCurrentSecondIcon((prev) => (prev + 1) % secondBoxIcons.length);
    }, interval2);
    return () => {
      clearInterval(firstInterval);
      clearInterval(secondInterval);
    };
  }, [type, firstBoxIcons.length, secondBoxIcons.length, interval1, interval2]);
  return (
    <div
      style={{
        alignItems: `center`,
        display: `flex`,
        height: `200px`,
        justifyContent: `center`,
        width: `200px`,
      }}
    >
      <div>
        <HeroCardIllustrationBox
          type={type}
          Icon={firstBoxIcons[currentFirstIcon]}
          size={boxSize}
          offset={0}
        />
        <HeroCardIllustrationBox
          type={type}
          Icon={secondBoxIcons[currentSecondIcon]}
          size={boxSize}
          offset={boxSize * 8}
        />
      </div>
    </div>
  );
}

function HeroCardIllustrationWrapper({ type }: { type: "primary" | "secondary" | "chat" | "api" }) {
  return (
    <div
      style={{
        display: "flex",
        left: type === "primary" ? "-19%" : type === "secondary" ? "-15%" : "-15%",
        minWidth: `200px`,
        position: "relative",
        top: `-1rem`,
        width: "200px",
        height: `140px`,
      }}
    >
      <div
        style={{
          display: `flex`,
          left: `87%`,
          position: `relative`,
          top: `10px`,
        }}
      >
        <TurnRightIcon
          sx={{
            height: `64px`,
            transform: `rotate(90deg)`,
            width: `64px`,
          }}
        />
      </div>
      <HeroCardIllustration type={type} />
    </div>
  );
}

function HeroCardDesktop({ type, active = false, onMouseEnter }: HeroCardProps) {
  const { dict } = useI18n();
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down("lg"));
  const { mode } = useColorScheme();
  const isDark = mode === "dark";
  const DEFAULT_BG = isDark ? DEFAULT_BG_DARK : DEFAULT_BG_LIGHT;
  const HOVER_COLORS = isDark ? HOVER_COLORS_DARK : HOVER_COLORS_LIGHT;

  let content, icon;
  if (!dict || !dict.Home || !dict.Home.Hero || !dict.Home.Hero.button) return null;
  if (type === "api") {
    content = {
      ...dict.Home.Hero.button[3],
      title: `${dict.Home.Hero.button[3].title} `,
    };
    icon = <CodeIcon sx={{ color: isDark ? "#fff" : "#111" }} />;
  } else if (type === "chat") {
    content = dict.Home.Hero.button[2];
    icon = <SmartToyIcon sx={{ color: isDark ? "#fff" : "#111" }} />;
  } else if (type === "secondary") {
    content = dict.Home.Hero.button[1];
    icon = <OnlinePredictionIcon sx={{ color: isDark ? "#fff" : "#111" }} />;
  } else {
    content = dict.Home.Hero.button[0];
    icon = <FlashOnIcon sx={{ color: isDark ? "#fff" : "#111" }} />;
  }

  // Определяем ссылку для перехода
  let cardLink: string | undefined = undefined;
  if (type === "api") cardLink = "https://nikitasavvin2000-api-docs-c9bf.twc1.net";
  if (type === "chat") cardLink = "https://nikitasavvin2000-streamlit-ui-agent-9ad1.twc1.net";
  if (type === "primary") cardLink = "https://horizon-tool.ru/forecast";
  if (type === "secondary") cardLink = "https://horizon-tool.ru";

  return (
    <Card
      sx={{
        background: active ? HOVER_COLORS[type] : DEFAULT_BG,
        width: isMd ? `38%` : `40%`,
        minWidth: `385px`,
        maxHeight: `200px`,
        boxShadow: 10,
        transition: "background ease-in-out 0.5s",
        cursor: cardLink ? "pointer" : "default",
      }}
      onMouseEnter={onMouseEnter}
      onClick={cardLink ? () => window.open(cardLink, "_blank", "noopener,noreferrer") : undefined}
    >
      <CardActionArea
        sx={{
          padding: `0.4rem`,
          transition: "background 0.2s",
        }}
      >
        <CardContent
          sx={{
            display: `flex`,
            flexDirection: `column`,
            justifyContent: `space-between`,
          }}
        >
          <Stack
            direction={"row"}
            sx={{
              display: `flex`,
              flexDirection: `row`,
              justifyContent: `space-between`,
              alignItems: `normal`,
              padding: `0 0 0 0`,
            }}
          >
            <Stack
              direction={"column"}
              sx={{ justifyContent: `space-around`, minWidth: isMd ? `200px` : `13rem` }}
            >
              <Stack direction={"row"} sx={{ marginBottom: `0.5rem` }}>
                {icon}
                <Typography
                  variant={isMd ? "h6" : "h4"}
                  sx={{
                    fontFamily: bebasNeue.style.fontFamily,
                    textTransform: `uppercase`,
                    lineHeight: `1.8rem`,
                  }}
                >
                  {content.title}
                </Typography>
              </Stack>
              <Stack direction={"column"}>
                <Typography
                  variant={isMd ? "subtitle1" : "h5"}
                  sx={{
                    fontFamily: bebasNeue.style.fontFamily,
                    textTransform: `uppercase`,
                    lineHeight: `1.5rem`,
                    maxHeight: `5rem`,
                    overflow: `hidden`,
                    position: `relative`,
                    color: isDark ? "#fff" : "#111",
                  }}
                >
                  {content.description[0]}
                </Typography>
                <Stack
                  direction={"row"}
                  spacing={1}
                  sx={{ width: "250px", flexWrap: "wrap", position: `relative`, bottom: `-15px` }}
                >
                  {content.description.slice(1).map((e, i) => (
                    <Chip
                      key={i}
                      variant="filled"
                      label={e}
                      size="small"
                      sx={{
                        fontFamily: bebasNeue.style.fontFamily,
                        textTransform: `uppercase`,
                        padding: `0.5rem 0.5rem 0.3rem 0.5rem`,
                        color: isDark ? "#fff" : "#111",
                        background: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
                        marginBottom: "4px",
                      }}
                    />
                  ))}
                </Stack>
              </Stack>
            </Stack>
            <HeroCardIllustrationWrapper type={type} />
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

function HeroCardMobile({ type }: HeroCardProps) {
  const { dict } = useI18n();
  const CARD_COLORS: Record<string, string> = {
    primary: "#FF7A00",
    secondary: "#26AD50",
    chat: "#EB5757",
    api: "#2291FF",
  };
  let content, icon;
  if (!dict || !dict.Home || !dict.Home.Hero || !dict.Home.Hero.button) return null;
  if (type === "api") {
    content = dict.Home.Hero.button[3];
    icon = <CodeIcon sx={{ color: "#fff" }} />;
  } else if (type === "chat") {
    content = dict.Home.Hero.button[2];
    icon = <SmartToyIcon sx={{ color: "#fff" }} />;
  } else if (type === "secondary") {
    content = dict.Home.Hero.button[1];
    icon = <OnlinePredictionIcon sx={{ color: "#fff" }} />;
  } else {
    content = dict.Home.Hero.button[0];
    icon = <FlashOnIcon sx={{ color: "#fff" }} />;
  }

  // Определяем ссылку для перехода
  let cardLink: string | undefined = undefined;
  if (type === "api") cardLink = "https://nikitasavvin2000-api-docs-c9bf.twc1.net";
  if (type === "chat") cardLink = "https://nikitasavvin2000-streamlit-ui-agent-9ad1.twc1.net";
  if (type === "primary") cardLink = "https://horizon-tool.ru/forecast";
  if (type === "secondary") cardLink = "https://horizon-tool.ru";

  return (
    <Card
      sx={{
        background: CARD_COLORS[type],
        marginBottom: `1rem`,
        marginTop: type === "primary" ? `1rem` : undefined,
        width: `100%`,
        transition: "background 0.5s",
        cursor: cardLink ? "pointer" : "default",
      }}
      onClick={cardLink ? () => window.open(cardLink, "_blank", "noopener,noreferrer") : undefined}
    >
      <CardActionArea
        sx={{
          background: "none",
          "&:active": { background: "none" },
          "&:focus": { background: "none" },
          "&:hover": { background: "none" },
        }}
      >
        <CardContent>
          <Stack direction={"column"}>
            <Stack direction={"row"}>
              {icon}
              <Typography
                variant="h6"
                sx={{
                  fontFamily: bebasNeue.style.fontFamily,
                  textTransform: `uppercase`,
                  lineHeight: `1.8rem`,
                  color: "#fff",
                }}
              >
                {content.title}
              </Typography>
            </Stack>
            <Stack direction={"column"}>
              <Typography
                variant={"subtitle1"}
                sx={{
                  fontFamily: bebasNeue.style.fontFamily,
                  textTransform: `uppercase`,
                  overflow: `hidden`,
                  position: `relative`,
                  color: "#fff",
                }}
              >
                {content.description[0]}
              </Typography>
              <Stack direction={"row"} spacing={1} sx={{ position: `relative`, bottom: `-5px` }}>
                {content.description.slice(1).map((e, i) => (
                  <Chip
                    key={i}
                    variant="filled"
                    label={e}
                    size="small"
                    sx={{
                      fontFamily: bebasNeue.style.fontFamily,
                      textTransform: `uppercase`,
                      padding: `0.5rem 0.5rem 0.3rem 0.5rem`,
                      color: "#fff",
                      background: "rgba(255,255,255,0.18)",
                      marginBottom: "4px",
                    }}
                  />
                ))}
              </Stack>
            </Stack>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export function HeroCard({ type, active = false, onMouseEnter }: HeroCardProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return isMobile ? (
    <HeroCardMobile type={type} />
  ) : (
    <HeroCardDesktop type={type} active={active} onMouseEnter={onMouseEnter} />
  );
}
