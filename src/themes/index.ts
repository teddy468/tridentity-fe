import { BreakpointsOptions, createTheme, PaletteMode } from "@mui/material";
import breakpoints from "./breakpoints";
import palette, { CustomPalette } from "./palette";
import typography from "./typography";

interface CustomTheme {
  palette: CustomPalette;
  typography: typeof typography;
  breakpoints: BreakpointsOptions;
  mode: PaletteMode;
  isDark: boolean;
}

const lightTheme: CustomTheme = {
  palette: palette.light,
  typography: typography,
  breakpoints: breakpoints,
  mode: "light",
  isDark: false,
};

const darkTheme: CustomTheme = {
  palette: palette.light,
  typography: typography,
  breakpoints: breakpoints,
  mode: "dark",
  isDark: false,
};
declare module "@mui/material/styles" {
  interface Theme extends CustomTheme {}
  interface ThemeOptions extends CustomTheme {}
}

declare module "@mui/material" {
  interface Theme extends CustomTheme {}
  interface ThemeOptions extends CustomTheme {}
}

declare module "@emotion/react" {
  interface Theme extends CustomTheme {}
  interface ThemeOptions extends CustomTheme {}
}

const light = createTheme(lightTheme);
const dark = createTheme(darkTheme);

const themes: { [key in PaletteMode]: typeof light } = {
  light,
  dark,
};

export default themes;
