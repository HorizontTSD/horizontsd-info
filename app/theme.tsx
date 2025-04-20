import { createTheme } from "@mui/material/styles";
import { lightBlue, blue, grey } from "@mui/material/colors";
const bg = {
  50: "#dddee0",
  100: "#b5b6bb",
  200: "#8e9098",
  300: "#6a6c73",
  400: "#484a4e",
  500: "#292A2D",
  600: "#101112",
  700: "#0E0F10",
  800: "#0C0D0E",
  900: "#090A0B",
}
export const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: "class",
  },
  shape: {
    borderRadius: 18
  },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: blue[600],
          light: blue[50],
          dark: blue[800],
          contrastText: blue[400],
        },
        secondary: {
          main: lightBlue[500],
          light: lightBlue[50],
          dark: lightBlue[900],
          contrastText: lightBlue[500],
        },
        text: {
          primary: grey[900],
          secondary: grey[800]
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: blue[500],
          light: blue[50],
          dark: bg[600],
          contrastText: blue[800],
        },
        secondary: {
          main: lightBlue[500],
          light: lightBlue[50],
          dark: lightBlue[900],
          contrastText: lightBlue[800],
        },
        text: {
          primary: grey[50],
          secondary: grey[100]
        },
      },
    },
  },
});
