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

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    margin: 30,
  },

  img: {
    width: "60%",
    [theme.breakpoints.only("md")]: {
      width: "80%",
    },
    [theme.breakpoints.down("xs")]: {
      width: "40%",
    },
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

// Each indiivdual doctor card
export default function DocCard(props) {
  const classes = useStyles();
  // create language strings
  let language = "";
  props.resultData["Language"].forEach((lang) => {
    language = language + ", " + lang;
  });
  language = language.substring(1);
  // he chen 
  const handleClick = () => {
    props.updateTargetDoc(props.resultData);
    props.setProfileBackToDestination("resultsPage");
    if (props.history != null) {
      props.history.push("/docprofile");
    }
  };

  let cardImage =  <CardMedia component="img" className={classes.img} src = {props.resultData["imgSrc"]}></CardMedia>;

  let docLikes;
  if (props.resultData["NumberOfLikes"]){
    docLikes = props.resultData["NumberOfLikes"];
  } else {
    docLikes = 0;
  }

  return (
    <Card className={classes.root} onClick={handleClick}>
      <Grid container spacing={0}>
        <Grid item xs={12} sm={3} className={classes.imageGrid}>
          {/* doctor image */}
          {/* <CardMedia
            component="img"
            className={classes.img}
            image={docImg2}
          ></CardMedia> */}
          {cardImage}
        </Grid>
        <Grid item xs={12} sm={7}>
          <CardContent>
            {/* doctor details */}
            <Typography variant="h6" color="primary">
              {"Dr." + props.resultData["DocName"]}
            </Typography>
            <br></br>
            <Typography variant="subtitle1" color="textSecondary">
              <strong>Specialty: </strong>{" "}
              <span>{props.resultData["Specialty"]}</span>
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              <strong>Hospital: </strong>
              <span>{props.resultData["Hospital"]}</span>
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              <strong>Languages: </strong>
              <span>{language}</span>
            </Typography>
            <br></br>
            {/* private tag */}
            <Chip color="secondary" size="small" label="Private"></Chip>
          </CardContent>
        </Grid>
        <Grid item xs={12} sm={2}>
          {/* Like icon + number of likes */}
          <Box className={classes.likeBox}>
            <FavoriteIcon style={{ color: "red" }} />
            <Typography variant="body2" color="primary">
              { docLikes}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
}
