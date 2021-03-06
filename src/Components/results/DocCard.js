import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import DocInfo from "../profile/DocDetailedInfo";
import DocAccountVerification from "../docAccount/DocAccountVerification";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    margin: 30,
    paddingLeft: 20,
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

// Each indiivdual doctor card
export default function DocCard(props) {
  const classes = useStyles();
  const history = useHistory();
  const { docInfo } = props;

  // create language strings
  let languages = "";
  docInfo.languages.forEach((lang) => {
    languages = languages + ", " + lang;
  });
  languages = languages.substring(1);

  const handleClick = () => {
    let hospital = docInfo?.hospital.replace(/\s+/g, "-");
    let specialty;
    if (docInfo?.specialty.includes("&")) {
      specialty = docInfo?.specialty.replace(" & ", "-");
    } else {
      specialty = docInfo?.specialty.replace(/\s+/g, "-");
    }
    let name = docInfo?.name.replace(/\s+/g, "-");
    history.push(`/profile/${hospital}/${specialty}/${name}`);
  };

  let cardImage = (
    <div style={{ width: 150, height: 150 }}>
      <img className={classes.img} src={docInfo.imgSrc}></img>
    </div>
  );

  let likes = docInfo.likes ? docInfo.likes : 0;

  return (
    <Card
      style={{ cursor: "pointer" }}
      className={classes.root}
      onClick={handleClick}
    >
      <Grid container spacing={0}>
        <Grid item xs={12} sm={3} className={classes.imageGrid}>
          {cardImage}
        </Grid>
        <Grid item xs={12} sm={7}>
          <CardContent>
            <Typography variant="h6" color="primary">
              {"Dr. " + docInfo.name}
            </Typography>
            <br></br>
            <Typography variant="subtitle1" color="textSecondary">
              <strong>Specialty: </strong> <span>{docInfo.specialty}</span>
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              <strong>Hospital: </strong>
              <span>{docInfo.hospital}</span>
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              <strong>Languages: </strong>
              <span>{languages}</span>
            </Typography>
            <br></br>
            {/* private tag */}
            <Chip color="secondary" size="small" label={docInfo.type}></Chip>
          </CardContent>
        </Grid>
        <Grid item xs={12} sm={2}>
          {/* Like icon + number of likes */}
          <Box className={classes.likeBox}>
            <div align="center">
              <FavoriteIcon style={{ color: "red" }} />
              <Typography variant="body2" color="primary">
                {likes.toLocaleString(navigator.language, {
                  minimumFractionDigits: 0,
                })}
              </Typography>
            </div>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
}
