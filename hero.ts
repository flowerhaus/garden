import { heroui } from "@heroui/react";

export default heroui({
  themes: {
    light: {
      colors: {
        background: "#b5b8a4",
        foreground: "#2a2c24",
        primary: { DEFAULT: "#5a6b4a", foreground: "#edebe4" },
        secondary: { DEFAULT: "#e07356", foreground: "#fff" },
        success: { DEFAULT: "#5a6b4a", foreground: "#edebe4" },
        warning: { DEFAULT: "#b8953a", foreground: "#fff" },
        danger: { DEFAULT: "#c4593e", foreground: "#fff" },
        default: { DEFAULT: "#edebe4", foreground: "#2a2c24" },
      },
      layout: {
        radius: { small: "10px", medium: "16px", large: "16px" },
      },
    },
  },
});
