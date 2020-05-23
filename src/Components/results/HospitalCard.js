import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

import hospImg from "../../img/results/pantaihospital.png";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    margin: 30,
  },

  img: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },

  imageGrid: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("xs")]: {
      marginTop: 30,
      marginBottom: 10,
    },
  },

  likeBox: {
    marginTop: 16,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("xs")]: {
      marginTop: 0,
      alignItems: "flex-start",
      marginLeft: 20,
      marginRight: 20,
      marginBottom: 20,
    },
  },
}));

//This card is imported in SearchResult.js

// Each indiivdual hospital card
export default function HospitalCard(props) {
  const classes = useStyles();

  const handleClick = () => {
    props.updateTargetHos(props.resultData);
    if (props.history != null) {
      props.history.push("/hospprofile");
    }
  };

  let cardImage = (
    <div style={{ width: 150, height: 150 }}>
      <img
        className={classes.img}
        src={props.resultData["imgSrc"]}
      ></img>
    </div>
  );

  return (
    <Card className={classes.root} onClick={handleClick}>
      <Grid container spacing={0}>
        <Grid item xs={12} sm={3} className={classes.imageGrid}>
          {cardImage}
        </Grid>

        <Grid item xs={12} sm={7}>
          <CardContent>
            {/* hospital details */}
            <Typography variant="h6" color="primary">
              {props.resultData["HospitalName"]}
            </Typography>
            <br></br>
            <Typography variant="subtitle1" color="textSecondary">
              <strong>Address: </strong>
              <span>{props.resultData["Address"]}</span>
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              <strong>Related Specialty: </strong>
              <span>{props.resultData["RelateSpecialty"]}</span>
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              <strong>Phone: </strong>
              <span>{props.resultData["Phone"]}</span>
            </Typography>

            <br></br>
            <Chip color="secondary" size="small" label="Private"></Chip>
          </CardContent>
        </Grid>
        <Grid item xs={12} sm={2}>
          {/* like icon + number of likes */}
          <Box className={classes.likeBox}>
          <div align="center">
            <FavoriteIcon style={{ color: "red" }} />
            <Typography variant="body2" color="primary">
              {props.resultData["likes"]}
            </Typography>
            </div>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
}
