import React from "react";
import { Card, CardContent, Stack, Button, Divider, Box, useTheme } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Link from "next/link";
import { useColorScheme } from "@mui/material/styles";

const offerLink = process.env.NEXT_PUBLIC_OFFER_LINK || "mailto:offer@company_name.com";

export default function NewMemberSkeleton() {
  const { mode } = useColorScheme();
  const isDark = mode === "dark";
  const bgPalette = ["#263238", "var(--mui-palette-secondary-light)"];
  const background = bgPalette[~~!isDark];
  const theme = useTheme();
  const skeletonBaseColor = theme.palette.mode === "dark" ? "#333" : "#e0e0e0";

  return (
    <Card sx={{ height: "100%", minHeight: `620px` }}>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          height: { xs: `300px`, md: "420px" },
          justifyContent: "center",
          width: "100%",
          background: background,
        }}
      >
        <HelpOutlineIcon
          sx={{ fontSize: 120, color: theme.palette.mode === "dark" ? "#555" : "#bdbdbd" }}
        />
      </Box>
      <CardContent
        sx={{
          background: background,
          height: "100%",
          display: `flex`,
          flexDirection: `column`,
          justifyContent: `space-between`,
          maxHeight: { xs: `320px`, md: `200px` },
        }}
      >
        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 1 }}>
          <Skeleton
            variant="rounded"
            width={220}
            height={20}
            sx={{ bgcolor: skeletonBaseColor }}
            animation="wave"
          />
        </Stack>
        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 1 }}>
          <Skeleton
            variant="rounded"
            width={120}
            height={20}
            sx={{ bgcolor: skeletonBaseColor }}
            animation="wave"
          />
        </Stack>
        <Divider sx={{ marginBottom: 1 }} />
        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
          <Skeleton
            variant="rounded"
            width={120}
            height={20}
            sx={{ bgcolor: skeletonBaseColor }}
            animation="wave"
          />
        </Stack>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Link href={offerLink} passHref>
            <Button variant="contained" color="primary" sx={{ borderRadius: 8, px: 4 }}>
              Join team
            </Button>
          </Link>
        </Box>
      </CardContent>
    </Card>
  );
}
