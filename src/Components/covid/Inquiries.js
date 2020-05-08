import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

//image
import callIcon from "../../img/covid/callIcon.png";

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

export default function Inquiries() {
  const classes = useStyles();

  return (
    <a id="inquiries" className={classes.anchor}>
      <Card className={classes.root}>
        <CardHeader
          avatar={<Avatar variant="rounded" alt="callIcon" src={callIcon} />}
          title="Inquiries"
          titleTypographyProps={{ variant: "h6", color: "primary" }}
          className={classes.cardHeader}
        />

        <CardContent>
          <Typography component={"div"}>
            For any information on COVID-19 and whether one needs screening, you
            can call the national Crisis Preparedness and Response Centre
            hotline:{" "}
            <ul>
              <li>+603-88810200</li>
              <li>+603-88810600</li>
              <li>+03-88810700</li>
            </ul>
          </Typography>
        </CardContent>
      </Card>
    </a>
  );
}
