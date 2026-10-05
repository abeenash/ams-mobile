/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            colors: {
                primary: { DEFAULT: "#372AAC", soft: "#EEF2FF" },
                foreground: "#0F172B",
                muted: "#45556C",
                border: "#E2E8F0",
                background: "#F8FAFC",
                card: "#FFFFFF",
                success: { DEFAULT: "#016630", soft: "#DCFCE7" },
                danger: { DEFAULT: "#C10007", soft: "#FFE2E2" },
                warning: { DEFAULT: "#973C00", soft: "#FEF3C6" },
                info: { DEFAULT: "#1447E6", soft: "#DBEAFE" },
                skeleton: "#EBEFF5",
            },
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
        },
    },
    plugins: [],
};