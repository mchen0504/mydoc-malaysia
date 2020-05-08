import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

//images
import yin from "../../img/home/yin.png";
import eshin from "../../img/home/eshin.png";
import he from "../../img/home/he.png";
import michelle from "../../img/home/michelle.png";

const useStyles = makeStyles((theme) => ({
  ...theme.home,

  heading: {
    [theme.breakpoints.down("sm")]: {
      fontSize: 24,
    },
    fontSize: 28,
  },

  teamImg: {
    marginLeft: 20,
    marginRight: 20,
    width: "40%",
    height: "40%",
  },

  teamBody: {
    marginRight: 60,
    lineHeight: 2,
    marginLeft: 60,
    color: "#003367",
    [theme.breakpoints.down("sm")]: {
      marginRight: 40,
      marginLeft: 30,
    },
  },

  teamBody2: {
    color: "rgba(0, 0, 0, 0.6)",
    marginBottom: 30,
  },
}));

//Homepage: Meet the Team
export default function Team() {
  const classes = useStyles();

  return (
    <div style={{ marginTop: 120 }}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Divider className={classes.divider} />
        <br></br>
        <Typography color="primary" align="center" className={classes.heading}>
          Meet the Team
        </Typography>
        <br></br>
      </Box>
      <Grid container spacing={0} style={{ marginTop: 30 }}>
        <Grid item xs={12} sm={3}>
          <br></br>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <img src={he} alt="he" className={classes.teamImg} />

            <br></br>

            <Typography
              variant="body1"
              align="center"
              className={classes.teamBody}
            >
              He Chen{" "}
            </Typography>
            <Typography
              align="center"
              variant="body2"
              className={classes.teamBody2}
            >
              Developer<br></br>chenh57@uw.edu
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} sm={3}>
          <br></br>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <img src={michelle} alt="michelle" className={classes.teamImg} />

            <br></br>

            <Typography
              variant="body1"
              align="center"
              className={classes.teamBody}
            >
              Michelle Chen
            </Typography>
            <Typography
              align="center"
              variant="body2"
              className={classes.teamBody2}
            >
              Developer<br></br> mc0504@uw.edu
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} sm={3}>
          <br></br>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <img src={yin} alt="yin" className={classes.teamImg} />

            <br></br>

            <Typography
              variant="body1"
              align="center"
              className={classes.teamBody}
            >
              Yin Chen{" "}
            </Typography>
            <Typography
              align="center"
              variant="body2"
              className={classes.teamBody2}
            >
              UI/UX Designer<br></br>chen0504@uw.edu
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={3}>
          <br></br>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <img src={eshin} alt="eshin" className={classes.teamImg} />

            <br></br>

            <Typography
              variant="body1"
              align="center"
              className={classes.teamBody}
            >
              Eshin Ang{" "}
            </Typography>
            <Typography
              align="center"
              variant="body2"
              className={classes.teamBody2}
            >
              Project Manager<br></br>eang16@uw.edu
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}
