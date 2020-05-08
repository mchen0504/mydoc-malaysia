import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  ...theme.home,

  heading: {
    [theme.breakpoints.down("sm")]: {
      fontSize: 24,
    },
    fontSize: 28,
  },

  aboutBody: {
    lineHeight: 2,
    color: "rgba(0, 0,0, 0.6)",
  },
}));

// Homepage: About MYDOC
export default function About() {
  const classes = useStyles();

  return (
    <div style={{ marginTop: 120, backgroundColor: "#D3EAF0" }}>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            mt={5}
          >
            <Divider className={classes.divider} />
            <br></br>
            <Typography
              color="primary"
              align="center"
              className={classes.heading}
            >
              About <span className={classes.highlightText}>MY</span>Doc
            </Typography>
            <br></br>
          </Box>
          <Box
            mb={8}
            mt={3}
            ml={10}
            mr={10}
            display="flex"
            flexDirection="column"
          >
            <Typography variant="body1" className={classes.aboutBody}>
              MyDoc is a comprehensive doctor information platform aims at
              helping people in Malaysia to search for doctor information
              related to their unique medical needs efficiently.
            </Typography>
            <br></br>
            <Typography variant="body1" className={classes.aboutBody}>
              We hope MyDoc will be a new way for people to recommend doctor and
              make doctors more discoverable for people seeking their services.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}
