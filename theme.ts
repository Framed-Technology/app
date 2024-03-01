import { extendTheme } from "@chakra-ui/react";

export const colors = {
  "pink-salmon": {
    100: "#fef2f3",
    200: "#fde6e7",
    300: "#fbd0d4",
    400: "#f8a9b2",
    500: "#f48997",
    600: "#ea0091",
    700: "#b31d3f",
    800: "#961b3b",
    900: "#811a39",
    950: "#48091a",
  },
  "picton-blue": {
    50: "#f0f9ff",
    100: "#e0f2fe",
    200: "#bae6fd",
    300: "#7ed4fb",
    400: "#39bdf7",
    500: "#12acef",
    600: "#0385c6",
    700: "#046aa0",
    800: "#085a84",
    900: "#0d4b6d",
    950: "#082f49",
  },
  "lily-white": {
    50: "#f1fafe",
    100: "#e4f4fc",
    200: "#bfe8f8",
    300: "#86d7f3",
    400: "#46c3ea",
    500: "#1eabd9",
    600: "#108ab9",
    700: "#0f6f95",
    800: "#105d7c",
    900: "#134e67",
    950: "#0d3244",
  },
  hollywood: {
    "50": "#ffc9f4",
    "100": "#ff9ce9",
    "200": "#ff5fd8",
    "300": "#ff30c3",
    "400": "#f50da3",
    "500": "#ea0091",
    "600": "#b0046c",
    "700": "#92095c",
    "800": "#5b0035",
  },
} as const;

const components = {
  Button: {
    baseStyle: {
      shadow: "5px 5px 0 black",
      rounded: 0,
    },
  },
};

export default extendTheme({
  colors,
  components,
});
