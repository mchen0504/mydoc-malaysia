import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

//image
import covidIcon from "../../img/covid/covidIcon.png";

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

  anchor: {
    display: "block",
    paddingTop: 100,
    marginTop: -100,
  },
}));

export default function AboutCovid() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <a id="covid" className={classes.anchor}>
      <Card className={classes.root}>
        <CardHeader
          avatar={<Avatar variant="rounded" alt="covidIcon" src={covidIcon} />}
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
          title="What is COVID-19?"
          titleTypographyProps={{ variant: "h6", color: "primary" }}
        />

        <CardContent>
          <Typography>
            COVID-19 is a respiratory illness that can spread from person to
            person, it is a new disease caused by a new coronavirus that has not
            previously been identified in humans. The full name for this disease
            is coronavirus disease 2019.
          </Typography>
        </CardContent>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography className={classes.body}>
              The virus probably emerged from an animal source, it spreads
              mainly between people who are in close contact with each other
              when an infected person coughs or sneezes. It is also possible for
              a person to get COVID-19 by touching an object that has the virus
              on it and then touching their mouths, nose or eyes.
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </a>
  );
}
