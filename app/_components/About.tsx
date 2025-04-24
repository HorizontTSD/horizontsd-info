import * as React from "react";
import Image from "next/image";
import { Card, CardContent, Box, Container, Typography, Grid, Divider, Button } from "@mui/material";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import TelegramIcon from "@mui/icons-material/Telegram";
import { useColorScheme } from "@mui/material/styles";
import GithubIcon from "@mui/icons-material/GitHub";
import SchoolIcon from "@mui/icons-material/School";
import BadgeIcon from "@mui/icons-material/Badge";
import LabelIcon from "@mui/icons-material/Label";
import Tooltip from '@mui/material/Tooltip';
import Stack from "@mui/material/Stack";
import SectionHeader from "@/app/_components/SectionHeader";
import { useI18n } from "@/app/_providers/I18nProvider";
import Section from "@/app/_components/Section";

interface ContactInfo {
    telegram?: string;
    github?: string;
    email?: string;
    orcid?: string;
}

interface TeamMember {
    first_name: string;
    last_name: string;
    job_title: string;
    education: string;
    photo: string;
    contacts: ContactInfo;
}

interface MemberFieldProps {
    children: React.ReactNode[];
    tooltip?: boolean;
    product?: string;
    size?: string;
}

const capitalizeFirstLetter = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1);

declare module 'react' {
    interface CSSProperties {
        [key: `--${string}`]: string | number;
    }
}

function MemberField({ children, size, product = "", tooltip = false }: MemberFieldProps) {
    const [tooltipOpen, setTooltipOpen] = React.useState(false);

    const handleTooltipClose = () => {
        setTooltipOpen(false);
    };

    const handleClipboardCopy = (event: React.MouseEvent<HTMLDivElement>) => {
        const target = event.target as HTMLElement;
        if (target.innerText) {
            navigator.clipboard.writeText(target.innerText);
            setTooltipOpen(true);
        }
    };

    return (
        <Tooltip
            disableFocusListener={!tooltip}
            disableHoverListener={!tooltip}
            disableTouchListener={!tooltip}
            open={tooltipOpen}
            title={"Copied!"}
        >
            <Stack
                onClick={handleClipboardCopy}
                onMouseLeave={handleTooltipClose}
                direction="row"
                sx={{
                    alignItems: size && size == "large" ? "start" : "center",
                    cursor: "pointer",
                    height: size && size == "large" ? "auto" : "2.4rem",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                }}
            >{tooltip
                ? <Button
                    color="secondary"
                    variant="outlined"
                    sx={{
                        alignItems: `center`,
                        borderColor: `var(--mui-palette-text-primary)`,
                        borderRadius: "var(--mui-shape-borderRadius)",
                        color: `var(--mui-palette-text-primary)`,
                        fontSize: `0.7rem`,
                        justifyContent: "center",
                        lineHeight: `1rem`,
                        margin: `0`,
                        padding: `0.2rem 0.45rem`,
                    }}
                    startIcon={children[0]}
                >
                    {product}
                </Button>
                : children
                }
            </Stack>
        </Tooltip >
    );
}

function Content() {
    const { mode } = useColorScheme();
    const isDark = mode === "dark";
    const { dict } = useI18n();
    const teamData: TeamMember[] = dict?.Team as TeamMember[];
    const bgPalette = ['#263238', 'var(--mui-palette-secondary-light)']

    return (
        <Container maxWidth="xl" sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            height: "auto",
            justifyContent: "center",
            margin: "auto",
            padding: "0 0 2rem 0",
        }}>
            <Grid
                container
                spacing={{ xs: 1, sm: 1, md: 1, lg: 1 }}
                justifyContent="center"
                sx={{ width: { xs: "95%", sm: "100%", md: "80%", lg: "80%" } }}
            >
                {teamData.map((member: TeamMember, i: number) => (
                    <Grid
                        key={i}
                        size={{ xs: 12, sm: 6, md: 6, lg: 4 }}
                        rowSpacing={{ xs: 1, sm: 1, md: 1, lg: 1 }}
                        spacing={{ xs: 1, sm: 1, md: 1, lg: 1 }}
                    >
                        <Card sx={{ height: "100%" }}>
                            <div style={{
                                height: "420px",
                                width: "100%",
                            }}>
                                {member?.photo?.length && (
                                    <div style={{
                                        alignItems: "center",
                                        background: `url(${member.photo})`,
                                        backgroundPosition: "0% 100%",
                                        backgroundRepeat: "no-repeat",
                                        backgroundSize: "contain",
                                        display: "flex",
                                        flexDirection: "column",
                                        height: "100%",
                                        justifyContent: "center",
                                        width: "100%",
                                    }}>
                                    </div>
                                )}
                            </div>

                            <CardContent
                                sx={{ background: bgPalette[~~(!isDark)], height: "100%" }}
                            >
                                {member?.first_name && member?.last_name &&
                                    <MemberField>
                                        <BadgeIcon color="disabled" sx={{ marginRight: "1rem" }} />
                                        <Typography
                                            fontFamily={"sans-serif"}
                                            sx={{ textOverflow: "ellipsis", userSelect: "text" }}
                                            variant="h6"
                                        >
                                            {capitalizeFirstLetter(member.first_name)} {capitalizeFirstLetter(member.last_name)}
                                        </Typography>
                                    </MemberField>
                                }
                                {member?.job_title &&
                                    <MemberField >
                                        <LabelIcon color="disabled" sx={{ marginRight: "1rem" }} />
                                        <Typography sx={{ userSelect: "text" }} variant="caption" component="div">
                                            {member.job_title}
                                        </Typography>
                                    </MemberField>
                                }
                                <Divider sx={{ marginBottom: "1rem" }} />
                                <Stack sx={{ height: member?.education ? `4rem` : "unset" }}
                                >{member?.education &&
                                    <MemberField
                                        tooltip={false}
                                        size="large"
                                    >
                                        <SchoolIcon sx={{ marginRight: "1rem" }} />
                                        <Typography
                                            sx={{ userSelect: "text", whiteSpace: "pre-wrap" }}
                                            variant="caption"
                                            component="div"
                                        >
                                            {member.education}
                                        </Typography>
                                    </MemberField>
                                    }
                                </Stack>
                                <Grid container spacing={0.5} justifyContent={"center"}>
                                    {member?.contacts?.telegram &&
                                        <MemberField
                                            tooltip={true}
                                            product={"telegram"}
                                        >
                                            <TelegramIcon color="secondary" />
                                            <Typography sx={{ userSelect: "text" }} variant="caption" component="div">
                                                {member.contacts.telegram}
                                            </Typography>
                                        </MemberField>
                                    }
                                    {member?.contacts?.github &&
                                        <MemberField
                                            tooltip={true}
                                            product={"github"}
                                        >
                                            <GithubIcon />
                                            <Typography
                                                sx={{ textOverflow: "ellipsis", userSelect: "text" }}
                                                variant="caption"
                                                component="div"
                                            >
                                                {member.contacts.github}
                                            </Typography>
                                        </MemberField>
                                    }
                                    {member?.contacts?.email &&
                                        <MemberField
                                            tooltip={true}
                                            product={"email"}
                                        >
                                            <AlternateEmailIcon />
                                            <Typography sx={{ textOverflow: "ellipsis", userSelect: "text" }}
                                                variant="caption"
                                                component="div"
                                            >
                                                {member.contacts.email}
                                            </Typography>
                                        </MemberField>
                                    }
                                    {member?.contacts?.orcid &&
                                        <MemberField
                                            tooltip={true}
                                            product={"orcid"}
                                        >
                                            <Box sx={{
                                                alignItems: "center",
                                                display: "flex",
                                                height: "20px",
                                                justifyContent: "center",
                                                width: "20px",
                                            }}>
                                                <Image
                                                    alt="ORCID logo"
                                                    height={20}
                                                    src="/images/orcid_id.svg"
                                                    style={{ userSelect: "none" }}
                                                    unoptimized
                                                    width={20}
                                                />
                                            </Box>
                                            <Typography sx={{ userSelect: "text" }} variant="caption" component="div">
                                                {member.contacts.orcid}
                                            </Typography>
                                        </MemberField>
                                    }
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}


export default function About() {
    const { dict } = useI18n();
    if (!dict || !dict.Home) return null;
    const { Home } = dict;
    return (
        <Section id="about">
            <SectionHeader>
                <Typography variant="h4" gutterBottom sx={{
                    fontFamily: `inherit`,
                    textAlign: "center",
                    userSelect: "none",
                }}>
                    {Home.About.SectionHeader.h4}
                </Typography>
                <Typography variant="h6" gutterBottom sx={{
                    fontFamily: `inherit`,
                    textAlign: "center",
                }}>
                    {Home.About.SectionHeader.body2}
                </Typography>
            </SectionHeader>
            <Content />
        </Section>
    );
}
