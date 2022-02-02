import React, { useState } from "react";

import { withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import GeneralSignup from "./GeneralSignup";
import DoctorSignup from "./DoctorSignup";

// material ui tab for general sign u and doctor sign up
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const StyledTabs = withStyles({
  indicator: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
    "& > div": {
      width: "100%",
      backgroundColor: "#FF8686",
    },
  },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <div /> }} />);

const StyledTab = withStyles((theme) => ({
  root: {
    textTransform: "none",
    color: "#003367",
    fontWeight: "bold",
    fontSize: "1em",
    marginTop: 60,
    marginRight: theme.spacing(1),
    "&:focus": {
      opacity: 1,
    },
  },
}))((props) => <Tab disableRipple {...props} />);

export default function CustomizedTabs() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <div>
        <StyledTabs
          value={value}
          onChange={handleChange}
          aria-label="sign up tabs"
          centered
        >
          <StyledTab label="General Sign Up" {...a11yProps(0)} />
          <StyledTab label="Doctor Sign Up" {...a11yProps(1)} />
        </StyledTabs>

        <Typography />
      </div>
      <TabPanel value={value} index={0}>
        <GeneralSignup />
      </TabPanel>

      <TabPanel value={value} index={1}>
        <DoctorSignup />
      </TabPanel>
    </div>
  );
}
