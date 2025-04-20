"use client";
import * as React from "react";
import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Box } from "@mui/material";

function ScrollToAnchor() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const lastHash = useRef("");

    useEffect(() => {
        const url = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;
        const hashIndex = url.indexOf("#");

        if (hashIndex !== -1) {
            lastHash.current = url.slice(hashIndex + 1);
        }

        if (lastHash.current && document.getElementById(lastHash.current)) {
            setTimeout(() => {
                document.getElementById(lastHash.current)?.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
                lastHash.current = "";
            }, 100);
        }
    }, [pathname, searchParams]);

    return <Box display="none" />;
}

export default ScrollToAnchor;