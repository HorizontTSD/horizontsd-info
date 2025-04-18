"use client"
import localFont from "next/font/local"

export const roboto = localFont({
    src: [
        { path: "./fonts/RobotoMono-Bold.ttf", weight: "700", style: "normal" },
        { path: "./fonts/RobotoMono-BoldItalic.ttf", weight: "700", style: "italic" },
        { path: "./fonts/RobotoMono-ExtraLight.ttf", weight: "200", style: "normal" },
        { path: "./fonts/RobotoMono-ExtraLightItalic.ttf", weight: "200", style: "italic" },
        { path: "./fonts/RobotoMono-Italic.ttf", weight: "400", style: "italic" },
        { path: "./fonts/RobotoMono-Light.ttf", weight: "300", style: "normal" },
        { path: "./fonts/RobotoMono-LightItalic.ttf", weight: "300", style: "italic" },
        { path: "./fonts/RobotoMono-Medium.ttf", weight: "500", style: "normal" },
        { path: "./fonts/RobotoMono-MediumItalic.ttf", weight: "500", style: "italic" },
        { path: "./fonts/RobotoMono-Regular.ttf", weight: "400", style: "normal" },
        { path: "./fonts/RobotoMono-SemiBold.ttf", weight: "600", style: "normal" },
        { path: "./fonts/RobotoMono-SemiBoldItalic.ttf", weight: "600", style: "italic" },
        { path: "./fonts/RobotoMono-Thin.ttf", weight: "100", style: "normal" },
        { path: "./fonts/RobotoMono-ThinItalic.ttf", weight: "100", style: "italic" }
    ]
});

export const bebasNeue = localFont({
    src: [
        { path: "./fonts/BebasNeue-Regular.ttf", weight: "400", style: "normal" }
    ]
});
