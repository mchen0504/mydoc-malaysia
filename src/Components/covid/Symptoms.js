import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

//image
import symptomIcon from "../../img/covid/symptomIcon.png";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginBottom: 40,
  },
  anchor: {
    display: "block",
    paddingTop: 100,
    marginTop: -100,
  },
}));

export default function Symptoms() {
  const classes = useStyles();

  return (
    <a id="symptoms" className={classes.anchor}>
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar variant="rounded" alt="symptomIcon" src={symptomIcon} />
          }
          title="Symptoms"
          titleTypographyProps={{ variant: "h6", color: "primary" }}
        />

        <CardContent>
          <Typography component={"div"}>
            Reported illness ranges from mild symptoms to severe illness and
            death. The following symptoms may appear{" "}
            <strong>2-14 days after exposure</strong>.
            <ul>
              <li>Fever</li>
              <li>Cough</li>
              <li>Shortness of breath</li>
            </ul>{" "}
            If you develop any emergency signs for COVID-19, get medical
            assistance immediately.
          </Typography>
        </CardContent>
      </Card>
    </a>
  );
}
