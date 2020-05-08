import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

//image
import logo from "../../img/home/ischool-logo.png";

const useStyles = makeStyles((theme) => ({
  ...theme.home,
  logoImg: {
    width: "20%",
    height: "20%",
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "40%",
      height: "40%",
    },
  },

  footerBody: {
    lineHeight: 2,
    color: "white",
  },

  footerText: {
    [theme.breakpoints.down("xs")]: {
      marginLeft: 10,
      marginRight: 10,
    },
  },
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <div style={{ marginTop: 120, backgroundColor: "#003367" }}>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <Box
            mb={8}
            mt={3}
            ml={10}
            mr={10}
            display="flex"
            flexDirection="column"
            alignItems="center"
            className={classes.footerText}
          >
            <br></br>
            <img src={logo} alt="ischoollogo" className={classes.logoImg} />
            <br></br>
            <Typography variant="body2" className={classes.footerBody}>
              Support | Get Started | Terms of Use
            </Typography>
            <br></br>
            <Typography variant="caption" className={classes.footerBody}>
              © 2020 Eclipse
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}
