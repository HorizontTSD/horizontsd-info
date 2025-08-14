import * as React from "react";
import { Box, Typography, Button, useMediaQuery, Stack } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import { useColorScheme } from "@mui/material/styles";
import YouTubeIcon from "@mui/icons-material/YouTube";
import IconButton from "@mui/material/IconButton";
import EastIcon from "@mui/icons-material/East";
import { useTheme } from "@mui/material/styles";
import XIcon from "@mui/icons-material/X";
import { useI18n } from "@/app/_providers/I18nProvider";
import { useConsent } from "@/app/_providers/ConsentProvider";
import { FooterContent } from "@/app/_components/types";
import Section from "@/app/_components/Section";
import { useModalForm } from "@/app/_providers/ModalFormProvider";
import Link from "next/link";

function Row1() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { dict } = useI18n();
  const { mode } = useColorScheme();
  const isDark = mode == "dark";
  const modal = useModalForm();
  if (!dict || !dict.Footer) return null;

  const content = dict.Footer as FooterContent;
  return (
    <Stack
      direction={isMobile ? "column" : "row"}
      justifyContent={"space-between"}
      sx={{ height: `50%` }}
    >
      <Stack direction={"column"}>
        <Typography
          color="textPrimary"
          variant={isMobile ? "h4" : "h3"}
          sx={{
            userSelect: `none`,
            maxWidth: isMobile ? `100%` : `70%`,
          }}
        >
          {content.row1Title}
        </Typography>
      </Stack>
      <Stack direction={"column"} justifyContent={"space-between"} sx={{ height: `100%` }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            fontFamily: "roboto",
            fontSize: "24px",
            fontWeight: "400",
            justifyContent: "end",
            position: "relative",
            textAlign: "right",
            userSelect: `none`,
            width: "100%",
            zIndex: 2,
          }}
        >
          <Typography color="textPrimary" gutterBottom variant="h5">
            {content.row1Title2}
          </Typography>
        </Box>
        <Box
          sx={{
            alignItems: isMobile ? "center" : `end`,
            display: "flex",
            flexDirection: "column",
            fontFamily: "roboto",
            fontSize: "16px",
            fontWeight: "200",
            justifyContent: "end",
            margin: `0`,
            padding: `0`,
            position: "relative",
            textAlign: isMobile ? "center" : "right",
            userSelect: `none`,
            width: `100%`,
            zIndex: 2,
          }}
        >
          <Typography
            color="textPrimary"
            variant="body2"
            sx={{
              margin: isMobile ? "1rem 0" : 0,
              userSelect: `none`,
            }}
          >
            {content.row1Subtitle}
          </Typography>
          <Typography
            color="textPrimary"
            variant="body2"
            gutterBottom
            sx={{
              userSelect: `none`,
            }}
          >
            {content.row1Subtitle2}
          </Typography>
          <Button
            onClick={() => modal.setOpen(true)}
            variant="contained"
            sx={{
              alignItems: `center`,
              background: isDark
                ? `var(--mui-palette-secondary-contrastText)`
                : `var(--mui-palette-secondary-dark)`,
              color: `var(--mui-palette-primary-light)`,
              display: `inline-flex`,
              justifyContent: `center`,
              lineHeight: `1rem`,
              minWidth: "250px",
              userSelect: `none`,
            }}
          >
            {content.row1ButtonText}
            <EastIcon
              sx={{
                marginLeft: `0.5rem`,
                color: `var(--mui-palette-primary-light)`,
              }}
            />
          </Button>
        </Box>
      </Stack>
    </Stack>
  );
}

function Row2() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { dict } = useI18n();
  const { showConsentModal } = useConsent();

  if (!dict || !dict.Footer) return null;

  const content = dict.Footer as FooterContent;

  return (
    <Stack
      direction={isMobile ? "column-reverse" : "row"}
      sx={{
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        marginTop: "3rem",
        gap: theme.spacing(2),
        py: theme.spacing(2),
      }}
    >
      <Stack
        direction={isMobile ? "column" : "row"}
        spacing={isMobile ? 1 : 2}
        sx={{
          "& .MuiTypography-root": {
            color: "text.primary",
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            transition: theme.transitions.create("color"),
            "&:hover": {
              color: "Highlight",
              textDecoration: "underline",
            },
          },
        }}
      >
        <Link
          href="/terms#terms"
          passHref
          style={{
            textDecoration: `none`,
          }}
        >
          <Typography variant="subtitle2">{content.row2TermsTitle}</Typography>
        </Link>

        <Link
          href="/privacy#privacy"
          passHref
          style={{
            textDecoration: `none`,
          }}
        >
          <Typography variant="subtitle2">{content.row2PrivacyTitle}</Typography>
        </Link>
        <Link
          href="/cookies#cookies"
          passHref
          style={{
            textDecoration: `none`,
          }}
        >
          <Typography variant="subtitle2">{content.row2CookiesTitle}</Typography>
        </Link>
        <Button
          variant="text"
          onClick={showConsentModal}
          sx={{
            color: "text.primary",
            textTransform: "none",
            fontSize: "0.875rem",
            fontWeight: 500,
            padding: 0,
            minWidth: "auto",
            "&:hover": {
              backgroundColor: "transparent",
              textDecoration: "underline",
            },
          }}
        >
          {content.privacySettings}
        </Button>
      </Stack>
    </Stack>
  );
}

function Row3() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { dict } = useI18n();

  if (!dict || !dict.Footer) {
    return null;
  }

  const content = dict.Footer as FooterContent;
  return (
    <Stack
      direction={isMobile ? "column-reverse" : "row"}
      sx={{
        alignItems: isMobile ? `center` : `end`,
        display: `flex`,
        justifyContent: `space-between`,
        padding: isMobile ? `0rem 1rem` : "unset",
        width: `100%`,
      }}
    >
      <Stack direction={isMobile ? "column" : "row"}>
        <Typography
          color="textPrimary"
          variant="caption"
          sx={{
            alignItems: `center`,
            display: `flex`,
            fontFamily: "roboto",
            fontSize: `1rem`,
            fontWeight: `400`,
            position: "relative",
            userSelect: `none`,
          }}
        >
          {content.row3Copyright}
        </Typography>
      </Stack>
      <Stack direction={"column"}>
        <Stack
          direction={isMobile ? "column" : "row"}
          sx={{
            alignItems: `center`,
            display: `flex`,
            textAlign: "center",
          }}
        >
          <Stack
            direction={"column"}
            sx={{
              alignItems: "center",
              display: "flex",
              fontFamily: "roboto",
              fontSize: `1rem`,
              fontWeight: "400",
              justifyContent: "center",
              position: "relative",
              textAlign: "right",
              width: "80%",
              zIndex: 2,
            }}
          >
            <Typography
              color="textPrimary"
              variant="button"
              sx={{
                userSelect: `none`,
                lineHeight: `1rem`,
              }}
            >
              {content.row3Follows}
            </Typography>
          </Stack>
          <Stack
            direction={"row"}
            sx={{
              position: "relative",
              zIndex: 2,
            }}
          >
            {[LinkedInIcon, FacebookIcon, XIcon, InstagramIcon, YouTubeIcon].map((Icon, index) => (
              <IconButton key={index} color="default">
                <Icon />
              </IconButton>
            ))}
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}

function Background() {
  const { mode } = useColorScheme();
  const isDark = mode == "dark";
  return (
    <>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: isDark
            ? `var(--mui-palette-secondary-dark)`
            : `var(--mui-palette-grey-50)`,
          zIndex: 1,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: `var(--mui-palette-primary-dark)`,
          maskImage: `url(/images/mask.webp), linear-gradient(0deg,rgba(255, 255, 255, 0.3))`,
          maskRepeat: "no-repeat",
          maskSize: "100% 100%",
          maskComposite: "add",
          maskPosition: "start",
          zIndex: 1,
          opacity: 0.3,
        }}
      />
    </>
  );
}

function Content() {
  return (
    <Stack direction={"column"} sx={{ padding: `5vh 5vw`, height: `100%` }}>
      <Stack
        direction={"column"}
        justifyContent={"space-between"}
        alignItems={"center"}
        sx={{
          height: `100%`,
          zIndex: `2`,
          gap: "20px",
        }}
      >
        <Row1 />
        <Row2 />
        <Row3 />
      </Stack>
      <Background />
    </Stack>
  );
}

export default function Footer() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Section
      id={"footer"}
      sx={{
        minHeight: isMobile ? `100vh` : `480px`,
        maxHeight: `1080px`,
      }}
    >
      <Content />
    </Section>
  );
}
