"use client"
import * as React from "react";
import { ListItemButton } from "@mui/material";
import { useColorScheme } from "@mui/material/styles";
import { useI18n } from "../_providers/I18nProvider";
import { useMediaQuery } from "@mui/material";
import { usePathname } from "next/navigation";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Container from "@mui/material/Container";
import Drawer from "@mui/material/Drawer";
import Icon from "./Icon";
import IconButton from "@mui/material/IconButton";
import LanguageSwitcher from "./LanguageSwitcher";
import Link from "next/link";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import MenuIcon from "@mui/icons-material/Menu";
import Slide from "@mui/material/Slide";
import Stack from "@mui/material/Stack";
import ThemeSwitcher from "./ThemeSwitcher";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import { NavbarContent } from "./types";

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
                    width: 'auto',
                    minWidth: '7rem',
                    color: 'var(--mui-palette-primary-light)',
                    borderBottom: pathname === href ? '2px solid var(--mui-palette-primary-light)' : "unset",
                    borderRadius: 0,
                }}
            >
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

    if (!dict || !dict.Navbar) {
        return null; 
    }

    const content = dict.Navbar as NavbarContent;
    const toggleDrawer = (newOpen: boolean) => () => setOpen(newOpen);
    const toggleMode = () => { setMode(isDark ? "light" : "dark") };

    return (
        <Container maxWidth="lg">
            <Toolbar sx={{
                borderRadius: '4rem',
                backdropFilter: "blur(24px)",
                flexGrow: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: 'linear-gradient(30deg, var(--mui-palette-secondary-contrastText), var(--mui-palette-primary-dark))'
            }}>
                <IconButton
                    sx={{ color: 'var(--mui-palette-primary-light)' }}
                    aria-label="Menu button"
                    onClick={toggleDrawer(true)}
                >
                    <MenuIcon />
                </IconButton>
                <Drawer
                    anchor="top"
                    open={open}
                    onClose={toggleDrawer(false)}
                >
                    <Box sx={{ p: 2, background: 'linear-gradient(25deg, var(--mui-palette-secondary-dark), var(--mui-palette-primary-dark))' }}>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "flex-end",
                                background: 'transparent'
                            }}
                        >
                            <IconButton onClick={toggleDrawer(false)} sx={{ color: 'var(--mui-palette-primary-light)' }}>
                                <CloseRoundedIcon />
                            </IconButton>
                        </Box>
                        <List
                            sx={{ width: "100%", maxWidth: 360 }}
                            component="nav"
                            aria-labelledby="nested-list-subheader"
                            subheader={
                                <ListSubheader
                                    component="div"
                                    id="nested-list-subheader"
                                    sx={{
                                        display: 'flex',
                                        alignContent: 'center',
                                        justifyContent: 'start',
                                        background: 'transparent'
                                    }}
                                >
                                    <Icon color={'var(--mui-palette-primary-light)'} size="s" />
                                    <Typography
                                        color="primary.light"
                                        variant="button"
                                        sx={{ marginLeft: '1rem', lineHeight: '2.1rem' }}
                                    >
                                        Horizon
                                    </Typography>
                                </ListSubheader>
                            }
                        >
                            <ListItemButton component="a" href="/">
                                <ListItemText
                                    primary={content.home}
                                    sx={{ color: 'primary.light', textTransform: "uppercase" }}
                                />
                            </ListItemButton>
                            <ListItemButton component="a" href="/features">
                                <ListItemText
                                    primary={content.features}
                                    sx={{ color: 'primary.light', textTransform: "uppercase" }}
                                />
                            </ListItemButton>
                            <ListItemButton component="a" href="/research">
                                <ListItemText
                                    primary={content.research}
                                    sx={{ color: 'primary.light', textTransform: "uppercase" }}
                                />
                            </ListItemButton>
                        </List>
                    </Box>
                </Drawer>
                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "start",
                    width: '30%',
                    background: 'transparent'
                }}>
                    <Icon color={'var(--mui-palette-primary-light)'} size="s" />
                    {isSmall &&
                        <Typography
                            color="primary.light"
                            variant="button"
                            sx={{ marginLeft: '1rem', lineHeight: '2.1rem' }}
                        >
                            Horizon
                        </Typography>
                    }
                </Box>
                <Box sx={{
                    display: "flex",
                    alignItems: "center",
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
    const { dict } = useI18n();

    if (!dict || !dict.Navbar) {
        return null; 
    }

    const content = dict.Navbar as NavbarContent;
    const bg = isDark
        ? 'linear-gradient(30deg, var(--mui-palette-primary-dark), var(--mui-palette-secondary-dark))'
        : 'linear-gradient(30deg, var(--mui-palette-secondary-dark), var(--mui-palette-primary-dark))';
    return (
        <Container maxWidth="lg">
            <Toolbar
                disableGutters
                variant="dense"
                sx={{
                    borderRadius: '4rem',
                    backdropFilter: "blur(36px)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "start",
                    padding: '0.5rem',
                    background: bg
                }}
            >
                <Icon color={'var(--mui-palette-primary-light)'} size="m" />
                <Stack
                    spacing={1}
                    direction="row"
                    justifyContent="start"
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
                    spacing={1}
                    direction="row"
                    justifySelf="end"
                    sx={{ width: '100%', justifyContent: 'end', alignItems: 'center' }}
                >
                    <LanguageSwitcher />
                    <ThemeSwitcher checked={isDark} onChange={toggleMode} />
                </Stack>
            </Toolbar>
        </Container>
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
                position="fixed"
                enableColorOnDark
                sx={{
                    boxShadow: 0,
                    bgcolor: "transparent",
                    backgroundImage: "none",
                    mt: "1rem",
                }}
            >
                {isMobile ? <Mobile /> : <Desktop />}
            </AppBar>
        </HideOnScroll>
    );
}