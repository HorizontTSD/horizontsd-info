"use client";
import React, { ReactNode } from "react";
import { Box, Container, Grid, SxProps } from "@mui/material";
import ScrollGrow from "./ScrollGrow";
import { bebasNeue } from "../../fonts";


interface HeaderProps {
    children: ReactNode;
    sx?: SxProps;
}

export default function Header({ children, sx }: HeaderProps) {
    return (
        <Box
            className="section-header"
            sx={{
                display: 'flex',
                width: '100%',
                minHeight: '9rem',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                textTransform: 'uppercase',
                ...sx
            }}
        >
            <ScrollGrow>
                <Container
                    maxWidth="xl"
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <Grid
                        container
                        direction="column"
                        spacing={1}
                        alignContent="center"
                        justifyContent="center"

                        sx={{ fontFamily: bebasNeue.style.fontFamily, display: "flex", color: "var(--mui-palette-text-primary)" }}
                    >
                        {children}
                    </Grid>
                </Container>
            </ScrollGrow>
        </Box>
    );
}
