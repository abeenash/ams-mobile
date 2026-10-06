/** @type {import('tailwindcss').Config} */

const colors = require("./src/constants/colors")

module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            colors: { colors },
            borderRadius: {
                chip: "10px",
                card: "14px",
                sheet: "20px",
            },
            fontSize: {
                display: ["34px", { lineHeight: "40px" }],
                title1: ["28px", { lineHeight: "34px" }],
                title2: ["24px", { lineHeight: "30px" }],
                headline: ["17px", { lineHeight: "22px" }],
                body: ["15px", { lineHeight: "22px" }],
                callout: ["14px", { lineHeight: "20px" }],
                footnote: ["13px", { lineHeight: "18px" }],
                caption: ["12px", { lineHeight: "16px" }],
            },
            fontFamily: {
                sans: ["Inter_400Regular"],
                "sans-medium": ["Inter_500Medium"],
                "sans-semibold": ["Inter_600SemiBold"],
                "sans-bold": ["Inter_700Bold"],
            },
        },
    },
    plugins: [],
};