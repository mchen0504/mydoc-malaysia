// material ui theme
export default {
  palette: {
    primary: {
      main: "#003367",
      contrastText: "#FFF",
    },
    secondary: {
      main: "#FF8686",
      contrastText: "#FFF",
    },
  },

  //navbar
  userMenu: {
    avatar: {
      backgroundColor: "#FF8686",
    },
  },

  //login + signup
  auth: {
    form: {
      textAlign: "left",
    },

    loginGrid: {
      margin: "auto",
    },

    pageTitle: {
      color: "#003367",
      fontWeight: "bold",
      marginTop: 120,
      marginBottom: 30,
      fontSize: "1.25em",
    },

    textField: {
      margin: "10px auto 10px auto",
    },
    button: {
      marginTop: 12,
      fontFamily: "'Roboto', sans-serif",
      textTransform: "none",
      marginBottom: 30,
      position: "relative",
    },

    customError: {
      color: "red",
      fontSize: "0.8rem",
      marginTop: 10,
    },

    progress: {
      position: "absolute",
    },

    link: {
      fontWeight: "bold",
    },
  },

  //home
  home: {
    divider: {
      marginTop: 20,
      height: 6,
      width: 80,
      backgroundColor: "#FF8686",
      justifyContent: "center",
    },
    highlightText: {
      color: "#FF8686",
    },
  },

  //user account
  account: {
    anchor: {
      display: "block",
      paddingTop: 100,
      marginTop: -100,
    },

    backIcon: {
      "&.MuiSvgIcon-root": {
        fill: "#003367",
      },
    },
  },
};
