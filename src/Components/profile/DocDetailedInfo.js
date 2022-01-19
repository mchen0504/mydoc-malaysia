import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import Hidden from "@material-ui/core/Hidden";
const useStyles = makeStyles((theme) => ({
  divider: {
    height: 2,
    backgroundColor: "#FF8686",
  },
  line: {
    border: "0.5px solid rgba(0, 0, 0, 0.2)",
    [theme.breakpoints.down("xs")]: {
      border: "5px solid rgba(0, 0, 0, 0.05)",
    },
  },
}));

// for Qualifications, Languages, Procedures, Conditions section (used in DocProfile.js under pages folder)
export default function DocInfo(props) {
  const classes = useStyles();

  // create language List
  let languageList = props.targetDoc["Language"].map((lang) => {
    let langCard = <p key={lang}>{lang}</p>;
    return langCard;
  });

  // create procedure List
  let procList = props.targetDoc["Procedures"].map((proc) => {
    let procCard = <p key={proc}>{proc}</p>;
    return procCard;
  });

  // create condition List
  let conditionCardList = props.targetDoc["Conditions"].map((condition) => {
    let conditionCard = <p key={condition}>{condition}</p>;
    return conditionCard;
  });

  return (
    <div>
      <Grid container spacing={0}>
        <Grid item sm={1}></Grid>
        <Grid item xs={12} sm={4}>
          <Box display="flex" flexDirection="column" mb={2} ml={2} mt={2}>
            <Typography variant="h6" color="primary">
              Qualifications
            </Typography>
            <Divider className={classes.divider} style={{ width: 120 }} />
            <br></br>
            <Typography variant="body1">
              {props.targetDoc["Qualifications"]}
            </Typography>
          </Box>
          <Hidden smUp>
            <hr className={classes.line}></hr>
          </Hidden>
        </Grid>
        <Grid item sm={2}></Grid>

        <Grid item xs={12} sm={4}>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            mb={2}
            ml={2}
            mt={2}
          >
            <Typography variant="h6" color="primary">
              Languages
            </Typography>
            <Divider className={classes.divider} style={{ width: 100 }} />
            <Typography variant="body1">{languageList}</Typography>
          </Box>
          <Hidden smUp>
            <hr className={classes.line}></hr>
          </Hidden>
        </Grid>
        <Grid item sm={1}></Grid>
      </Grid>
      <Grid container spacing={0}>
        <Grid item sm={1}></Grid>
        <Grid item xs={12} sm={4}>
          <Box display="flex" flexDirection="column" mb={2} ml={2} mt={2}>
            <Typography variant="h6" color="primary">
              Procedures
            </Typography>
            <Divider className={classes.divider} style={{ width: 120 }} />
            <Typography variant="body1">{procList}</Typography>
          </Box>
          <Hidden smUp>
            <hr className={classes.line}></hr>
          </Hidden>
        </Grid>
        <Grid item sm={2}></Grid>

        <Grid item xs={12} sm={4}>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            mb={2}
            ml={2}
            mt={2}
          >
            <Typography variant="h6" color="primary">
              Conditions
            </Typography>
            <Divider className={classes.divider} style={{ width: 100 }} />
            <Typography variant="body1">{conditionCardList}</Typography>
          </Box>
        </Grid>
        <Grid item sm={1}></Grid>
      </Grid>
    </div>
  );
}
