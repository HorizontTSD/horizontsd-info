"use client";
import React, { ReactNode } from "react";
import { Box, Container, Grid, SxProps } from "@mui/material";
import ScrollGrow from "@/app/_components/ScrollGrow";
import { bebasNeue } from "@/fonts";

interface HeaderProps {
    children: ReactNode;
    sx?: SxProps;
}

export default function Header({ children, sx }: HeaderProps) {
    return (
        <Box
            className="section-header"
            sx={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                minHeight: '9rem',
                textTransform: 'uppercase',
                width: '100%',
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
                        alignContent="center"
                        container
                        direction="column"
                        justifyContent="center"
                        spacing={1}
                        sx={{
                            fontFamily: bebasNeue.style.fontFamily,
                            display: "flex",
                            color: "var(--mui-palette-text-primary)"
                        }}
                    >
                        {children}
                    </Grid>
                </Container>
            </ScrollGrow>
        </Box>
    );
}
