import * as React from "react";
import { useI18n } from "../_providers/I18nProvider";
import Stack from "@mui/material/Stack";
import { Card, CardContent, Box, Container, Typography, Grid, Divider, Button } from "@mui/material";
import Tooltip from '@mui/material/Tooltip';
import { useColorScheme } from "@mui/material/styles";
import SectionHeader from "./SectionHeader";
import Section from "./Section";
import Image from "next/image";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import TelegramIcon from "@mui/icons-material/Telegram";
import SchoolIcon from "@mui/icons-material/School";
import BadgeIcon from "@mui/icons-material/Badge";
import LabelIcon from "@mui/icons-material/Label";
import GithubIcon from "@mui/icons-material/GitHub";
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import "./card-gradient.css";
import "./gradient.css";
import { useState } from "react";

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

interface GameProps {
    setShowGame: (show: boolean) => void;
}

const Game: React.FC<GameProps> = ({ setShowGame }) => {
    const handlePlayAgain = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setShowGame(false);
    };

    return (
        <div>
            <div id="main-wrapper">
                <div id="game">
                    {[...Array(9)].map((_, index) => {
                        const delays = [
                            { mole: "0s", branch: "2s" },
                            { mole: "5s", branch: "0s" },
                            { mole: "2s", branch: "4s" },
                            { mole: "6s", branch: "5s" },
                            { mole: "2s", branch: "4s" },
                            { mole: "2s", branch: "12s" },
                            { mole: "1s", branch: "4s" },
                            { mole: "2s", branch: "12s" },
                            { mole: "2s", branch: "12s" },
                        ][index];

                        return (
                            <div key={index} className="hideout">
                                <a
                                    href="#success"
                                    style={{ "--delay": delays.mole } as React.CSSProperties}
                                    className="mole"
                                />
                                <a
                                    href="#failure"
                                    style={{ "--delay": delays.branch } as React.CSSProperties}
                                    className="branch"
                                />
                            </div>
                        );
                    })}
                </div>

                <div id="success" className="endscreen">
                    <p>Congratulations! You did it!</p>
                    <a href="#" className="cta" onClick={handlePlayAgain}>
                        Play again
                    </a>
                </div>

                <div id="failure" className="endscreen">
                    <p>Game over! You lost, too bad!</p>
                    <a href="#" className="cta" onClick={handlePlayAgain}>
                        Play again
                    </a>
                </div>
            </div>
        </div>
    );
};

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
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    cursor: "pointer",
                    width: "100%",
                    marginBottom: `0.1rem`,
                    height: size && size == "large" ? "auto" : "3rem",
                }}
            >{tooltip
                ? <Button
                    className="button-gradient-section"
                    sx={{ width: `100%`, justifyContent: "space-between" }}
                    variant="outlined"
                    color="primary"
                    startIcon={children[0]}
                >{product}</Button>
                : children
                }
            </Stack>
        </Tooltip>
    );
}

function Content() {
    const { mode } = useColorScheme();
    const isDark = mode === "dark";
    const { dict } = useI18n();
    const teamData: TeamMember[] = dict?.Team as TeamMember[];

    const [showGame, setShowGame] = useState(false);

    return (
        <Container maxWidth="xl" sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "auto",
            alignItems: "center",
            margin: "auto",
            padding: "0 0 2rem 0",
        }}>
            <Grid
                container
                spacing={{ xs: 1, sm: 1, md: 1, lg: 1 }}
                justifyContent="center"
                sx={{
                    width: { xs: "99%", sm: "100%", md: "80%", lg: "80%" }
                }}
            >
                {teamData.map((member: TeamMember, i: number) => (
                    <Grid
                        key={i}
                        size={{ xs: 12, sm: 6, md: 6, lg: 4 }}
                        rowSpacing={{ xs: 1, sm: 1, md: 1, lg: 1 }}
                        spacing={{ xs: 1, sm: 1, md: 1, lg: 1 }}
                    >
                        <Card
                            className="card-background"
                            sx={{
                                height: "100%",
                                border: "1px solid var(--mui-palette-secondary-dark)",
                            }}>
                            <div style={{
                                width: "100%",
                                height: "420px",
                            }}>
                                {member?.photo?.length && (
                                    <div style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        width: "100%",
                                        height: "100%",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        background: `url(${member.photo})`,
                                        backgroundPosition: "0% 100%",
                                        backgroundSize: "contain",
                                        backgroundRepeat: "no-repeat",
                                    }}>
                                    </div>
                                )}
                            </div>

                            <CardContent
                                sx={{
                                    height: "100%",
                                    borderTop: "1px solid var(--mui-palette-secondary-dark)",
                                    background: isDark
                                        ? "linear-gradient(280deg, #263238 0%, var(--mui-palette-primary-dark) 30%)"
                                        : "linear-gradient(var(--mui-palette-primary-light), var(--mui-palette-common-white))"
                                }}
                            >
                                {member?.first_name && member?.last_name &&
                                    <MemberField>
                                        <BadgeIcon color="disabled" sx={{ marginRight: "1rem" }} />
                                        <Typography
                                            fontFamily={"sans-serif"}
                                            sx={{
                                                color: `var(--mui-palette-text-primary)`,
                                                textOverflow: "ellipsis", userSelect: "text"
                                            }}
                                            variant="h6"
                                        >
                                            {capitalizeFirstLetter(member.first_name)} {capitalizeFirstLetter(member.last_name)}
                                        </Typography>
                                    </MemberField>
                                }
                                {member?.job_title &&
                                    <MemberField >
                                        <LabelIcon color="disabled" sx={{ marginRight: "1rem" }} />
                                        <Typography color="textPrimary" sx={{ userSelect: "text" }} variant="caption" component="div">
                                            {member.job_title}
                                        </Typography>
                                    </MemberField>
                                }
                                <Divider sx={{ marginBottom: "1rem" }} />
                                <Stack sx={{
                                    height: member?.education ? `4rem` : "unset"
                                }}
                                >{member?.education &&
                                    <MemberField
                                        tooltip={false}
                                        size="large"
                                    >
                                        <SchoolIcon sx={{ marginRight: "1rem" }} />
                                        <Typography
                                            color="textPrimary"
                                            sx={{
                                                userSelect: "text",
                                                whiteSpace: "pre-wrap"
                                            }}
                                            variant="caption"
                                            component="div"
                                        >
                                            {member.education}
                                        </Typography>
                                    </MemberField>
                                    }
                                </Stack>
                                <Stack sx={{
                                    display: `grid`,
                                }}>
                                    {member?.contacts?.telegram &&
                                        <MemberField
                                            tooltip={true}
                                            product={"telegram"}
                                        >
                                            <TelegramIcon color="secondary" />
                                            <Typography color="textPrimary" sx={{ userSelect: "text" }} variant="caption" component="div">
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
                                            <Typography color="textPrimary"
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
                                            <Typography color="textPrimary"
                                                sx={{ textOverflow: "ellipsis", userSelect: "text" }}
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
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                width: "24px",
                                                height: "24px",
                                            }}>
                                                <Image
                                                    src="/images/orcid_id.svg"
                                                    alt="ORCID logo"
                                                    width={24}
                                                    height={24}
                                                    unoptimized
                                                    style={{ userSelect: "none" }}
                                                />
                                            </Box>
                                            <Typography sx={{ userSelect: "text" }} variant="caption" component="div">
                                                {member.contacts.orcid}
                                            </Typography>
                                        </MemberField>
                                    }
                                    {Object.keys(member.contacts).length == 1 &&
                                        <div className="app">
                                            {showGame ? (
                                                <Game setShowGame={setShowGame} />
                                            ) : (
                                                <Button
                                                    onClick={() => setShowGame(true)}
                                                    className="button-gradient-section"
                                                    sx={{ width: `100%`, justifyContent: "center" }}
                                                    variant="outlined"
                                                    color="warning"
                                                    startIcon={<QuestionMarkIcon />}
                                                />
                                            )}
                                        </div>
                                    }
                                </Stack>
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

    if (!dict || !dict.Home) {
        return <div>Loading...</div>;
    }

    const { Home } = dict;

    return (
        <Section id="about">
            <SectionHeader>
                <Typography variant="h4" gutterBottom sx={{
                    // textShadow: "0px 3px 5px var(--mui-palette-primary-main)",
                    userSelect: "none",
                    textAlign: "center",
                }}>
                    {Home.About.SectionHeader.h4}
                </Typography>
                <Typography variant="body2" gutterBottom sx={{
                    // textShadow: "0px 3px 3px var(--mui-palette-primary-main)",
                    textAlign: "center",
                }}>
                    {Home.About.SectionHeader.body2}
                </Typography>
            </SectionHeader>
            <Content />
        </Section>
    );
}
