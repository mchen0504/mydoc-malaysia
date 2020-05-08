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
import CardMedia from "@material-ui/core/CardMedia";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import LinkIcon from "@material-ui/icons/Link";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

//image
import testingIcon from "../../img/covid/testingIcon.png";
import publichospscreening from "../../img/covid/publichospscreening.jpg";

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

export default function Testing() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <a id="testing" className={classes.anchor}>
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar variant="rounded" alt="testingIcon" src={testingIcon} />
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
          title="Testing for COVID-19"
          titleTypographyProps={{ variant: "h6", color: "primary" }}
        />

        <CardContent>
          <Typography color="primary">
            <strong>Public hospitals</strong>
          </Typography>
          <br></br>

          <Typography>
            There are 57 public hospitals with free screening services. If you
            have COVID-19 symptoms, please contact the screening hospitals for
            further examination. Note that in order to get tested at public
            hospitals, there are certain requirements to be met beforehand, such
            as close contact and previous travel history.
          </Typography>
        </CardContent>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <CardMedia className={classes.image}>
              <img
                className={classes.img}
                alt="publichospscreening"
                src={publichospscreening}
              />
            </CardMedia>

            <br></br>
            <Typography color="primary">
              <strong>Private institutions</strong>
            </Typography>
            <br></br>

            <Typography className={classes.body}>
              You can also get tested at one of the private
              institutions/hospitals listed below with cost ranging from RM360 -
              RM700.
            </Typography>
            <List className={classes.testingList}>
              <ListItem
                button
                component="a"
                target="_blank"
                href="https://www.facebook.com/BookDoc4u/photos/a.961497920580239/2883892761674069/?type=3&theater"
              >
                <ListItemText primary="Bookdoc" secondary="Download app" />
                <IconButton
                  edge="end"
                  aria-label="link"
                  component="a"
                  target="_blank"
                  href="https://www.facebook.com/BookDoc4u/photos/a.961497920580239/2883892761674069/?type=3&theater"
                >
                  <LinkIcon color="primary" />
                </IconButton>
              </ListItem>
              <ListItem
                button
                component="a"
                target="_blank"
                href="https://www.doctoroncall.com.my/medicine/coronavirus-covid-19-test-kit"
              >
                <ListItemText primary="DoctorOnCall" secondary="Book online" />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="link"
                    component="a"
                    target="_blank"
                    href="https://www.doctoroncall.com.my/medicine/coronavirus-covid-19-test-kit"
                  >
                    <LinkIcon color="primary" />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem
                button
                component="a"
                target="_blank"
                href="https://www.kpjlablink.com"
              >
                <ListItemText
                  primary="Lablink (M) Sdn Bhd (KPJ)"
                  secondary="Call: +603-40234588"
                />
                <IconButton
                  edge="end"
                  aria-label="link"
                  component="a"
                  target="_blank"
                  href="https://www.kpjlablink.com/"
                >
                  <LinkIcon color="primary" />
                </IconButton>
              </ListItem>
              <ListItem
                button
                component="a"
                target="_blank"
                href="http://qualitas.com.my/"
              >
                <ListItemText
                  primary="Qualitas Medical Group Sdn Bhd"
                  secondary="Call: +603-79646363"
                />
                <IconButton
                  edge="end"
                  aria-label="link"
                  component="a"
                  target="_blank"
                  href="http://qualitas.com.my/"
                >
                  <LinkIcon color="primary" />
                </IconButton>
              </ListItem>
              <ListItem
                button
                component="a"
                target="_blank"
                href="https://www.facebook.com/gleneagleskualalumpur/posts/2811872578893887"
              >
                <ListItemText
                  primary="Gleneagles Kuala Lumpur"
                  secondary="Call: +6011-13013579"
                />
                <IconButton
                  edge="end"
                  aria-label="link"
                  component="a"
                  target="_blank"
                  href="https://www.facebook.com/gleneagleskualalumpur/posts/2811872578893887"
                >
                  <LinkIcon color="primary" />
                </IconButton>
              </ListItem>
              <ListItem
                button
                component="a"
                target="_blank"
                href="https://www.pantai.com.my/COVID-19-On-Site-Screening-Services"
              >
                <ListItemText
                  primary="Pantai Hospital"
                  secondary="Call: +603-42892800"
                />
                <IconButton
                  edge="end"
                  aria-label="link"
                  component="a"
                  target="_blank"
                  href="https://www.pantai.com.my/COVID-19-On-Site-Screening-Services"
                >
                  <LinkIcon color="primary" />
                </IconButton>
              </ListItem>
              <ListItem
                button
                component="a"
                target="_blank"
                href="https://premierpathology.com.my/2020/03/16/how-to-request-booking-for-ppp-covid-19-mobile-service/"
              >
                <ListItemText
                  primary="Pantai Premier Pathology Sdn Bhd"
                  secondary="Call: +603-42809115"
                />
                <IconButton
                  edge="end"
                  aria-label="link"
                  component="a"
                  target="_blank"
                  href="https://premierpathology.com.my/2020/03/16/how-to-request-booking-for-ppp-covid-19-mobile-service/"
                >
                  <LinkIcon color="primary" />
                </IconButton>
              </ListItem>
              <ListItem
                button
                component="a"
                target="_blank"
                href="https://www.sunwaymedical.com/promotion/get-a-covid-19-test-for-a-peace-of-mind"
              >
                <ListItemText
                  primary="Sunway Medical"
                  secondary="Call: +603-74919191"
                />
                <IconButton
                  edge="end"
                  aria-label="link"
                  component="a"
                  target="_blank"
                  href="https://www.sunwaymedical.com/promotion/get-a-covid-19-test-for-a-peace-of-mind"
                >
                  <LinkIcon color="primary" />
                </IconButton>
              </ListItem>
            </List>
          </CardContent>
        </Collapse>
      </Card>
    </a>
  );
}
