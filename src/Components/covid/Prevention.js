import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

// images
import preventionIcon from "../../img/covid/preventionIcon.png";
import washhandIcon from "../../img/covid/washhandIcon.png";
import socialdistanceIcon from "../../img/covid/socialdistanceIcon.png";
import hygieneIcon from "../../img/covid/hygieneIcon.png";
import avoidtouchIcon from "../../img/covid/avoidtouchIcon.png";
import coughIcon from "../../img/covid/coughIcon.png";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginBottom: 40,
  },

  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },

  grid: {
    marginTop: 20,
    marginBottom: 20,
  },
  image: {
    width: 40,
    height: 40,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  anchor: {
    display: "block",
    paddingTop: 100,
    marginTop: -100,
  },

  body: {
    marginRight: 20,
  },
}));

export default function Prevention() {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <a id="prevention" className={classes.anchor}>
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar
              variant="rounded"
              alt="preventionIcon"
              src={preventionIcon}
            />
          }
          action={
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          }
          title="Prevention"
          titleTypographyProps={{ variant: "h6", color: "primary" }}
        />

        <CardContent>
          <Typography>
            There is currently no vaccine to protect against COVID-19. To lower
            the risk of getting the disease, you can:
          </Typography>{" "}
          <Grid container spacing={4} className={classes.grid}>
            <Grid item>
              <CardMedia className={classes.image}>
                <img
                  className={classes.img}
                  alt="washhandIcon"
                  src={washhandIcon}
                />
              </CardMedia>
            </Grid>
            <Grid item xs container direction="column" spacing={2}>
              <Typography gutterBottom variant="subtitle1" color="primary">
                <strong>Wash your hands frequently</strong>
              </Typography>
              <Typography className={classes.body} gutterBottom>
                Regularly and thoroughly clean your hands with an alcohol-based
                hand rub or wash them with soap and water.{" "}
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={4} className={classes.grid}>
            <Grid item>
              <CardMedia className={classes.image}>
                <img
                  className={classes.img}
                  alt="socialdistanceIcon"
                  src={socialdistanceIcon}
                />
              </CardMedia>
            </Grid>
            <Grid item xs container direction="column" spacing={2}>
              <Typography gutterBottom variant="subtitle1" color="primary">
                <strong>Maintain social distancing</strong>
              </Typography>
              <Typography className={classes.body} gutterBottom>
                Maintain at least 1 meter (3 feet) distance between yourself and
                anyone who is coughing or sneezing.{" "}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Grid container spacing={4}>
              {" "}
              <Grid item>
                <CardMedia className={classes.image}>
                  <img
                    className={classes.img}
                    alt="hygieneIcon"
                    src={hygieneIcon}
                  />
                </CardMedia>
              </Grid>
              <Grid item xs container direction="column" spacing={2}>
                <Typography gutterBottom variant="subtitle1" color="primary">
                  <strong>Practice respiratory hygiene</strong>
                </Typography>
                <Typography className={classes.body} gutterBottom>
                  Cover your mouth and noes with your bent elbow or tissue when
                  you cough or sneeze. Then dispose of the used tissue
                  immediately.{" "}
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={4} className={classes.grid}>
              {" "}
              <Grid item>
                <CardMedia className={classes.image}>
                  <img
                    className={classes.img}
                    alt="avoidtouchIcon"
                    src={avoidtouchIcon}
                  />
                </CardMedia>
              </Grid>
              <Grid item xs container direction="column" spacing={2}>
                <Typography gutterBottom variant="subtitle1" color="primary">
                  <strong>Avoid touching eyes, nose and mouth</strong>
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={4} className={classes.grid}>
              <Grid item>
                <CardMedia className={classes.image}>
                  <img
                    className={classes.img}
                    alt="coughIcon"
                    src={coughIcon}
                  />
                </CardMedia>
              </Grid>
              <Grid item xs container direction="column" spacing={2}>
                <Typography gutterBottom variant="subtitle1" color="primary">
                  <strong>
                    If you have fever, cough and diffculty breathing, seek
                    medical care early
                  </strong>
                </Typography>
                <Typography className={classes.body} gutterBottom>
                  Stay home if you feel unwell. If you have a fever, cough and
                  difficulty breathing, see medical attention and call in
                  advance. Follow the directions of your local health authority.{" "}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Collapse>
      </Card>
    </a>
  );
}
