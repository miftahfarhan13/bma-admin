import { extendTheme } from "@chakra-ui/react";
import colors from "./colorTheme";
import buttonTheme from "./buttonTheme";

const components = {
  Button: buttonTheme,
};

const theme = extendTheme({
  colors,
  components,
});

export default theme;
