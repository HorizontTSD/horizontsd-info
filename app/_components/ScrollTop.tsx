"use client"
import * as React from "react";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Fab from "@mui/material/Fab";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useColorScheme } from "@mui/material";

export default function ScrollTop({ children }: { children?: React.ReactNode }) {
    const { mode } = useColorScheme();
    const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 100 });
    const handleClick = () => {
        const anchor = (document).querySelector("#back-to-top-anchor");
        if (anchor) anchor.scrollIntoView({ block: "center", behavior: "smooth" });
    };
    return (
        <Fade in={trigger}>
            <Box
                onClick={handleClick}
                role="presentation"
                sx={{
                    bottom: 16, 
                    position: "fixed", 
                    right: 16, 
                    zIndex: 999
                }}
            >
                {children || (
                    <Fab size="small" aria-label="scroll back to top" sx={{
                        background: mode == 'dark' ? `white` : `black`
                    }}>
                        <KeyboardArrowUpIcon fontSize="large" sx={{ color: mode == 'dark' ? `black` : `white` }} />
                    </Fab>
                )}
            </Box>
        </Fade>
    );
}