"use client"
import * as React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import ListSubheader from "@mui/material/ListSubheader";
import ListItemText from "@mui/material/ListItemText";
import { useColorScheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import { useTheme } from "@mui/material/styles";
import { ListItemButton } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Icon from "@/app/_components/Icon";
import AppBar from "@mui/material/AppBar";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import Slide from "@mui/material/Slide";
import Stack from "@mui/material/Stack";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import LanguageSwitcher from "@/app/_components/LanguageSwitcher";
import ThemeSwitcher from "@/app/_components/ThemeSwitcher";
import { useI18n } from "@/app/_providers/I18nProvider";
import { NavbarContent } from "@/app/_components/types";

interface NavButtonProps {
    href: string;
    children: React.ReactNode;
    active?: boolean;
}

const NavButton = ({ href, children }: NavButtonProps) => {
    const pathname = usePathname();
    return (
        <Link href={href} passHref>
            <Button
                variant="text"
                sx={{
                    borderBottom: pathname === href ? '2px solid var(--mui-palette-secondary-main)' : "unset",
                    borderRadius: 0,
                    color: 'var(--mui-palette-text-primary)',
                    minWidth: '7rem',
                    width: 'auto',
                }}>
                {children}
            </Button>
        </Link>
    );
};

function Mobile() {
    const { mode, setMode } = useColorScheme();
    const isDark = mode === "dark";
    const [open, setOpen] = React.useState(false);
    const { dict } = useI18n();
    const isSmall = useMediaQuery("(min-width:400px)");
    const bgPalette = ['var(--mui-palette-secondary-dark)', 'var(--mui-palette-secondary-light)']
    if (!dict || !dict.Navbar) return null;
    const content = dict.Navbar as NavbarContent;
    const toggleDrawer = (newOpen: boolean) => () => setOpen(newOpen);
    const toggleMode = () => { setMode(isDark ? "light" : "dark") };
    return (
        <Container maxWidth="lg">
            <Toolbar sx={{
                alignItems: "center",
                backdropFilter: "blur(24px)",
                background: bgPalette[~~(!isDark)],
                borderRadius: '4rem',
                display: "flex",
                flexGrow: 1,
                justifyContent: "space-between",
            }}>
                <IconButton
                    aria-label="Menu button"
                    onClick={toggleDrawer(true)}
                >
                    <MenuIcon />
                </IconButton>
                <Drawer
                    anchor="top"
                    onClose={toggleDrawer(false)}
                    open={open}
                >
                    <Box sx={{ p: 2 }}>
                        <Box
                            sx={{
                                background: 'transparent',
                                display: "flex",
                                justifyContent: "flex-end",
                            }}
                        >
                            <IconButton onClick={toggleDrawer(false)}>
                                <CloseRoundedIcon />
                            </IconButton>
                        </Box>
                        <List
                            aria-labelledby="nested-list-subheader"
                            component="nav"
                            sx={{ width: "100%", maxWidth: 360 }}
                            subheader={
                                <ListSubheader
                                    component="div"
                                    id="nested-list-subheader"
                                    sx={{
                                        alignContent: 'center',
                                        background: 'transparent',
                                        display: 'flex',
                                        justifyContent: 'start',
                                    }}
                                >
                                    <Icon color={bgPalette[~~(isDark)]} size="s" />
                                    <Typography
                                        color="textPrimary"
                                        variant="button"
                                        sx={{
                                            lineHeight: '2.1rem',
                                            marginLeft: '1rem',
                                        }}
                                    >
                                        Horizon
                                    </Typography>
                                </ListSubheader>
                            }
                        >
                            <ListItemButton component="a" href="/">
                                <ListItemText
                                    primary={content.home}
                                    sx={{ textTransform: "uppercase" }}
                                />
                            </ListItemButton>
                            <ListItemButton component="a" href="/features">
                                <ListItemText
                                    primary={content.features}
                                    sx={{ textTransform: "uppercase" }}
                                />
                            </ListItemButton>
                            <ListItemButton component="a" href="/research">
                                <ListItemText
                                    primary={content.research}
                                    sx={{ textTransform: "uppercase" }}
                                />
                            </ListItemButton>
                        </List>
                    </Box>
                </Drawer>
                <Box sx={{
                    alignItems: "center",
                    background: 'transparent',
                    display: "flex",
                    justifyContent: "start",
                    width: '30%',
                }}>
                    <Icon color={bgPalette[~~(isDark)]} size="s" />
                    {isSmall &&
                        <Typography
                            color="textPrimary"
                            variant="button"
                            sx={{
                                lineHeight: '2.1rem',
                                marginLeft: '1rem',
                            }}
                        >
                            Horizon
                        </Typography>
                    }
                </Box>
                <Box sx={{
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "start",
                    width: '30%'
                }} />
                <LanguageSwitcher />
                <ThemeSwitcher checked={isDark} onChange={toggleMode} />
            </Toolbar>
        </Container>
    );
}

function Desktop() {
    const { mode, setMode } = useColorScheme();
    const toggleMode = () => { setMode(mode === "dark" ? "light" : "dark") };
    const isDark = mode === "dark";
    const bgPalette = ['var(--mui-palette-secondary-dark)', 'var(--mui-palette-secondary-light)']
    const { dict } = useI18n();
    if (!dict || !dict.Navbar) return null;
    const content = dict.Navbar as NavbarContent;
    const bg = bgPalette[~~(!isDark)]
    return (
        <Container maxWidth="lg" sx={{
            display: `flex`,
            justifyContent: `center`,
        }}>
            <Toolbar
                disableGutters
                variant="dense"
                sx={{
                    alignItems: "center",
                    backdropFilter: "blur(36px)",
                    background: bg,
                    borderRadius: '4rem',
                    display: "flex",
                    justifyContent: "start",
                    padding: '0.5rem',
                    width: `100%`,
                }}
            >
                <Icon color={bgPalette[~~(isDark)]} size="m" />
                <Stack
                    direction="row"
                    justifyContent="start"
                    spacing={1}
                    sx={{ marginLeft: '1rem' }}
                >
                    <NavButton href="/">
                        <Typography variant="button">{content.home}</Typography>
                    </NavButton>
                    <NavButton href="/features">
                        <Typography variant="button">{content.features}</Typography>
                    </NavButton>
                    <NavButton href="/research">
                        <Typography variant="button">{content.research}</Typography>
                    </NavButton>
                </Stack>
                <Stack
                    direction="row"
                    justifySelf="end"
                    spacing={1}
                    sx={{ width: '100%', justifyContent: 'end', alignItems: 'center' }}
                >
                    <LanguageSwitcher />
                    <ThemeSwitcher checked={isDark} onChange={toggleMode} />
                </Stack>
            </Toolbar>
        </Container >
    );
}

interface HideOnScrollProps {
    children: React.ReactNode;
}

function HideOnScroll({ children }: HideOnScrollProps) {
    const trigger = useScrollTrigger();
    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {React.isValidElement(children) ? children : <div />}
        </Slide>
    );
}

export default function Navbar() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    return (
        <HideOnScroll>
            <AppBar
                enableColorOnDark
                position="fixed"
                sx={{
                    backgroundImage: "none",
                    bgcolor: "transparent",
                    boxShadow: 0,
                    mt: "1rem",
                    paddingLeft: isMobile ? `0px` : `15px`
                }}
            >
                {isMobile ? <Mobile /> : <Desktop />}
            </AppBar>
        </HideOnScroll>
    );
}