import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import hospitalIcon from "../../img/covid/hospitalIcon.png";
import hosptreatment from "../../img/covid/hosptreatment.jpg";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
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

  image: {
    width: "100%",
    height: "auto",
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },

  testingList: {
    width: "100%",
    maxWidth: 360,
  },

  anchor: {
    display: "block",
    paddingTop: 100,
    marginTop: -100,
  },
}));

export default function Treatment() {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <a id="treatment" className={classes.anchor}>
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar variant="rounded" alt="hosiptalIcon" src={hospitalIcon} />
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
          title="Treatment"
          titleTypographyProps={{ variant: "h6", color: "primary" }}
        />

        <CardContent>
          <Typography>
            The Health Ministry has designated 26 hospitals nationwide that will
            serve as referral hospitals in handling cases of patients under
            investigation (PUI) and those who tested positive. These hospitals
            will provide treatment to patients with no cost.
          </Typography>
        </CardContent>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <CardMedia className={classes.image}>
              <img
                className={classes.img}
                alt="hosptreatment"
                src={hosptreatment}
              />
            </CardMedia>
          </CardContent>
        </Collapse>
      </Card>
    </a>
  );
}
