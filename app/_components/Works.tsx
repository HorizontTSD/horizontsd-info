import * as React from "react";
import Link from "next/link";
import { useColorScheme } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import {
  Card,
  CardMedia,
  Typography,
  Button,
  useMediaQuery,
  Grid,
  CardActions,
} from "@mui/material";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";
import { useI18n } from "@/app/_providers/I18nProvider";
import SectionHeader from "@/app/_components/SectionHeader";
import Section from "@/app/_components/Section";
import ScrollGrow from "@/app/_components/ScrollGrow";

function CustomizedTimeline() {
  return (
    <Timeline
      position="alternate"
      sx={{
        height: `100%`,
        width: `100%`,
      }}
    >
      <TimelineItem>
        <TimelineOppositeContent color="text.secondary">
          <Stack>
            <Typography variant="caption" color="textSecondary">
              historical data
            </Typography>
            <Typography variant="caption" color="textSecondary">
              external parameters
            </Typography>
          </Stack>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot variant="outlined" color="info" />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Typography variant="button" color="info">
            Data extraction
          </Typography>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent color="text.secondary">
          <Stack>
            <Typography variant="caption" color="textPrimary">
              <b>SKNN</b> & <b>HDIRT</b>
            </Typography>
            <Typography variant="caption" color="textSecondary">
              Distance Correlation
            </Typography>
          </Stack>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot variant="outlined" color="info" />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Typography variant="button" color="info">
            Data preprocessing
          </Typography>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent color="text.secondary">
          <Stack>
            <Typography variant="button" color="textPrimary">
              Realtime
            </Typography>
            <Typography variant="caption" color="textSecondary">
              By <b>LSTM</b> utilizing <b>Time2Vec</b>
            </Typography>
            <Typography variant="caption" color="textSecondary">
              Temporal Encoding
            </Typography>
          </Stack>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot variant="outlined" color="info" />
        </TimelineSeparator>
        <TimelineContent>
          <Typography variant="button" color="info">
            Data prediction
          </Typography>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}

function Mobile() {
  const { mode } = useColorScheme();
  const isDark = mode === "dark";
  const { dict } = useI18n();
  const bgPalette = ["#263238", "var(--mui-palette-secondary-light)"];
  if (!dict || !dict.Home || !dict.Home.Works || !dict.Home.Works.Content) return null;
  const content = dict.Home.Works.Content;
  const rawColor = isDark ? `var(--mui-palette-common-white)` : `var(--mui-palette-common-black)`;

  return (
    <Grid
      container
      sx={{
        background: bgPalette[~~!isDark],
        alignContent: `center`,
        display: `flex`,
        flexDirection: `column`,
        padding: `0.5rem`,
        margin: `0.5rem`,
        borderRadius: `0.9rem`,
      }}
    >
      <Stack
        direction={"column"}
        sx={{
          maxWidth: `100%`,
          alignSelf: `center`,
        }}
      >
        <Typography color="textPrimary" variant="h6" gutterBottom>
          {content[0]}
        </Typography>
      </Stack>
      <Stack
        direction={"column"}
        sx={{
          maxWidth: `100%`,
          alignSelf: `center`,
        }}
      >
        <Stack direction={"column"}>
          <Typography color="textPrimary" variant="subtitle1">
            {content[1]}
          </Typography>
          <CustomizedTimeline />
          <Typography
            color="textPrimary"
            variant="caption"
            sx={{ display: `flex`, justifyContent: "center" }}
            gutterBottom
          >
            {content[2]}
          </Typography>
        </Stack>
      </Stack>
      <Divider />
      <Stack direction={"column"}>
        <ScrollGrow>
          <Stack direction={"column"}>
            <Typography color="textPrimary" variant="subtitle1" gutterBottom>
              {content[3]}
            </Typography>
            <Typography color="textPrimary" variant="body1">
              {content[4]}
            </Typography>
            <ul style={{ color: rawColor }}>
              <li>
                {" "}
                <b>{content[5]}</b> {content[6]}
              </li>
              <li>
                {" "}
                <b>{content[7]}</b> {content[8]}
              </li>
              <li>
                {" "}
                <b>{content[9]}</b> {content[10]}
              </li>
            </ul>
          </Stack>
        </ScrollGrow>
        <ScrollGrow>
          <Stack direction={"column"}>
            <Typography color="textPrimary" variant="subtitle1" gutterBottom>
              {content[11]}
            </Typography>
            <ul style={{ color: rawColor }}>
              <li>
                {" "}
                <b>{content[12]}</b> {content[13]}
              </li>
              <li>
                {" "}
                <b>{content[14]}</b> {content[15]}
              </li>
              <li>
                {" "}
                <b>{content[16]}</b> {content[17]}
              </li>
              <li>
                {" "}
                <b>{content[18]}</b> {content[19]}
              </li>
              <li>
                {" "}
                <b>{content[20]}</b> {content[21]}
              </li>
            </ul>
          </Stack>
        </ScrollGrow>
        <ScrollGrow>
          <Stack direction={"column"}>
            <Typography color="textPrimary" variant="subtitle1" gutterBottom>
              {content[22]}
            </Typography>
            <ul style={{ color: rawColor }}>
              <li>
                {" "}
                <b>{content[23]}</b> {content[24]}
              </li>
              <li>
                {" "}
                <b>{content[25]}</b> {content[26]}
              </li>
              <li>
                {" "}
                <b>{content[27]}</b> {content[28]}
              </li>
            </ul>
          </Stack>
        </ScrollGrow>
      </Stack>
      <ScrollGrow>
        <Stack
          direction={"column"}
          sx={{
            alignItems: `center`,
            justifyContent: `center`,
          }}
        >
          <Card
            sx={{
              alignItems: `center`,
              maxWidth: 512,
              padding: `0.5rem`,
              width: `100%`,
            }}
          >
            <CardMedia
              sx={{
                borderRadius: "var(--mui-shape-borderRadius)",
                alignItems: `center`,
                height: 256,
              }}
              image={`/images/${isDark ? "dashboard-dark.webp" : "dashboard-light.webp"}`}
            />
            <CardActions sx={{ justifyContent: `center` }}>
              <Link href={`/images/${isDark ? "dashboard-dark.webp" : "dashboard-light.webp"}`}>
                <Button
                  color="secondary"
                  size="small"
                  sx={{
                    color: isDark ? "#fff" : "#263238",
                    background: isDark ? "#263238" : "#f5f5f5",
                    border: isDark ? "none" : "1.5px solid #263238",
                    fontWeight: 600,
                    boxShadow: isDark ? 2 : 1,
                    "&:hover": { background: isDark ? "#37474f" : "#e0e0e0" },
                  }}
                >
                  {content[29] || "Open image"}
                </Button>
              </Link>
            </CardActions>
          </Card>
        </Stack>
      </ScrollGrow>
    </Grid>
  );
}

function Desktop() {
  const { mode } = useColorScheme();
  const isDark = mode === "dark";
  const { dict } = useI18n();
  if (!dict || !dict.Home || !dict.Home.Works || !dict.Home.Works.Content) return null;
  const bgPalette = ["#263238", "var(--mui-palette-secondary-light)"];
  const content = dict.Home.Works.Content;
  const rawColor = isDark ? `var(--mui-palette-common-white)` : `var(--mui-palette-common-black)`;
  return (
    <Grid
      container
      maxWidth={"lg"}
      sx={{
        background: bgPalette[~~!isDark],
        borderRadius: "var(--mui-shape-borderRadius)",
        display: `flex`,
        flexDirection: `column`,
        margin: `1rem`,
        padding: `2rem`,
      }}
    >
      <ScrollGrow>
        <Stack direction={"column"}>
          <Typography color="textPrimary" variant="h6" gutterBottom>
            {content[0]}
          </Typography>
        </Stack>
      </ScrollGrow>
      <ScrollGrow>
        <Stack direction={"column"} padding={"2rem"}>
          <Stack direction={"column"}>
            <Typography color="textPrimary" variant="subtitle1">
              {content[1]}
            </Typography>
            <CustomizedTimeline />
            <Typography
              color="textPrimary"
              variant="caption"
              sx={{ display: `flex`, justifyContent: "center" }}
              gutterBottom
            >
              {content[2]}
            </Typography>
          </Stack>
        </Stack>
      </ScrollGrow>
      <Divider />
      <Stack direction={"column"} padding={"2rem"}>
        <ScrollGrow>
          <Stack direction={"column"}>
            <Typography color="textPrimary" variant="subtitle1" gutterBottom>
              {content[3]}
            </Typography>
            <Typography color="textPrimary" variant="body1">
              {content[4]}
            </Typography>
            <ul style={{ color: rawColor }}>
              <li>
                {" "}
                <b>{content[5]}</b> {content[6]}
              </li>
              <li>
                {" "}
                <b>{content[7]}</b> {content[8]}
              </li>
              <li>
                {" "}
                <b>{content[9]}</b> {content[10]}
              </li>
            </ul>
          </Stack>
        </ScrollGrow>
        <ScrollGrow>
          <Stack direction={"column"}>
            <Typography color="textPrimary" variant="subtitle1" gutterBottom>
              {content[11]}
            </Typography>
            <ul style={{ color: rawColor }}>
              <li>
                {" "}
                <b>{content[12]}</b> {content[13]}
              </li>
              <li>
                {" "}
                <b>{content[14]}</b> {content[15]}
              </li>
              <li>
                {" "}
                <b>{content[16]}</b> {content[17]}
              </li>
              <li>
                {" "}
                <b>{content[18]}</b> {content[19]}
              </li>
              <li>
                {" "}
                <b>{content[20]}</b> {content[21]}
              </li>
            </ul>
          </Stack>
        </ScrollGrow>
        <ScrollGrow>
          <Stack direction={"column"}>
            <Typography color="textPrimary" variant="subtitle1" gutterBottom>
              {content[22]}
            </Typography>
            <ul style={{ color: rawColor }}>
              <li>
                {" "}
                <b>{content[23]}</b> {content[24]}
              </li>
              <li>
                {" "}
                <b>{content[25]}</b> {content[26]}
              </li>
              <li>
                {" "}
                <b>{content[27]}</b> {content[28]}
              </li>
            </ul>
          </Stack>
        </ScrollGrow>
      </Stack>
      <ScrollGrow>
        <Stack
          direction={"column"}
          sx={{
            alignItems: `center`,
            justifyContent: `center`,
          }}
        >
          <Card
            sx={{
              alignItems: `center`,
              maxWidth: 512,
              padding: `2rem`,
              width: `100%`,
            }}
          >
            <CardMedia
              sx={{
                alignItems: `center`,
                height: 256,
              }}
              image={`/images/${isDark ? "dashboard-dark.webp" : "dashboard-light.webp"}`}
            />
            <CardActions sx={{ justifyContent: `center` }}>
              <Link href={`/images/${isDark ? "dashboard-dark.webp" : "dashboard-light.webp"}`}>
                <Button
                  color="secondary"
                  size="small"
                  sx={{
                    color: isDark ? "#fff" : "#263238",
                    background: isDark ? "#263238" : "#f5f5f5",
                    border: isDark ? "none" : "1.5px solid #263238",
                    fontWeight: 600,
                    boxShadow: isDark ? 2 : 1,
                    "&:hover": { background: isDark ? "#37474f" : "#e0e0e0" },
                  }}
                >
                  {content[29] || "Open image"}
                </Button>
              </Link>
            </CardActions>
          </Card>
        </Stack>
      </ScrollGrow>
    </Grid>
  );
}

function Content() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return isMobile ? <Mobile /> : <Desktop />;
}

export default function Works() {
  const { dict } = useI18n();
  if (!dict || !dict.Home || !dict.Home.Works || !dict.Home.Works.SectionHeader) return null;
  const content = dict.Home.Works.SectionHeader;
  return (
    <Section id="works">
      <SectionHeader>
        <Typography
          variant="h3"
          gutterBottom
          sx={{
            fontFamily: `inherit`,
            textAlign: `center`,
            userSelect: `none`,
          }}
        >
          {content.h4}
        </Typography>
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            fontFamily: `inherit`,
            textAlign: `center`,
          }}
        >
          {content.body2}
        </Typography>
      </SectionHeader>
      <Content />
    </Section>
  );
}
