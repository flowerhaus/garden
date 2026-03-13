import { heroui } from "@heroui/react";

export default heroui({
  themes: {
    light: {
      colors: {
        background: "#eae7de",
        foreground: "#1a1a1a",
        primary: { DEFAULT: "#1a1a1a", foreground: "#ffffff" },
        secondary: { DEFAULT: "#5a6b4a", foreground: "#ffffff" },
        success: { DEFAULT: "#5a6b4a", foreground: "#ffffff" },
        warning: { DEFAULT: "#b8953a", foreground: "#ffffff" },
        danger: { DEFAULT: "#c4593e", foreground: "#ffffff" },
        default: { DEFAULT: "#f5f3ee", foreground: "#1a1a1a" },
      },
      layout: {
        radius: { small: "10px", medium: "16px", large: "20px" },
      },
    },
  },
});
