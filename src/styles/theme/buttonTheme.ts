export const solidStyle = {
  primary: {
    _hover: { bgColor: "#ED1C29" },
    _pressed: { bgColor: "#ED1C29" },
    _disabled: { opacity: ".5" },
    bgColor: "#ED1C29",
    color: "white",
  },
  green: {
    _hover: { bgColor: "#80F994" },
    _pressed: { bgColor: "#80F994" },
    _disabled: { opacity: ".5" },
    bgColor: "#80F994",
    color: "black",
  },
};

export const boxStyle = {
  small: {
    alignItems: "center",
    height: "34px",
    borderRadius: "8px",
    padding: "8px 16px 8px 16px",
  },
  medium: {
    alignItems: "center",
    height: "40px",
    borderRadius: "8px",
    padding: "10px 20px 10px 20px",
  },
  large: {
    alignItems: "center",
    height: "45px",
    borderRadius: "8px",
    padding: "10px 20px 10px 20px",
  },
};

// MAIN STYLE
const buttonTheme = {
  variants: {
    "primary-solid-small": {
      ...solidStyle.primary,
      ...boxStyle.small,
    },
    "primary-solid-medium": {
      ...solidStyle.primary,
      ...boxStyle.medium,
    },
    "primary-solid-large": {
      ...solidStyle.primary,
      ...boxStyle.large,
    },
    "green-solid-small": {
      ...solidStyle.green,
      ...boxStyle.small,
    },
    "green-solid-medium": {
      ...solidStyle.green,
      ...boxStyle.medium,
    },
    "green-solid-large": {
      ...solidStyle.green,
      ...boxStyle.large,
    },
  },
};

export default buttonTheme;
