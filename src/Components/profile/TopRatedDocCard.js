import React from "react";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 230,
  },

  img: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },

  likeBox: {
    display: "flex",
    flexDirection: "row",
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

//This card is imported in HospDetailedInfo.js

// Each indiivdual doctor card
export default function TopRatedDocCard(props) {
  const classes = useStyles();
  const { docInfo } = props;
  const history = useHistory();

  const likes = docInfo.likes ? docInfo.likes : 0;

  const handleOnclick = () => {
    // props.setProfileBackToDestination("hospprofile");
    let hospital = docInfo?.hospital.replace(/\s+/g, "-");
    let specialty = docInfo?.specialty.replace(" & ", "-");
    let name = docInfo?.name.replace(/\s+/g, "-");
    history.push(`/profile/${hospital}/${specialty}/${name}`);
  };

  return (
    <Card className={classes.root} onClick={handleOnclick}>
      <CardActionArea>
        <CardContent>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            {/* doctor image */}
            <div style={{ width: 100, height: 150 }}>
              <CardMedia
                component="img"
                className={classes.img}
                src={docInfo?.imgSrc}
              ></CardMedia>
            </div>
            {/* doctor details */}
            <Typography variant="body1" color="primary">
              {docInfo?.name}
            </Typography>
            <br></br>
            <Typography
              variant="subtitle2"
              color="textSecondary"
              align="center"
            >
              <strong>Specialty: </strong> <span>{docInfo?.specialty}</span>
            </Typography>
            <br></br>
            {/* Like icon + number of likes */}
            <Box className={classes.likeBox}>
              <FavoriteIcon style={{ color: "red" }} />
              <Typography variant="body2" color="primary">
                &nbsp;{likes}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
