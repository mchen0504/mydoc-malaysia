import React, { Fragment, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Link from "@material-ui/core/Link";
import BodyParts from "../../img/home/bodyparts.png";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  bodypartList: {
    position: "relative",
    overflow: "auto",
    maxHeight: 400,
  },

  conditionList: {
    position: "relative",
    overflow: "auto",
    maxHeight: 400,
  },
}));

export default function BodyPartsDialog(props) {
  const classes = useStyles();

  //dialog open/close
  const [open, setOpen] = useState(false);
  const [fullWidth] = useState(true);
  const [maxWidth] = useState("lg");
  const [selectedSym, setSelectedSym] = useState("");
  const [selectedCondition, setSelectedCondition] = useState("");
  const [selectedBodyPart, setSelectedBodyPart] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    props.setSearchValue(selectedCondition);
    props.setConditionLabel(selectedCondition);
    setOpen(false);
  };

  //get symptoms' name and user selection
  const getSymName = (value) => {
    setSelectedSym(value);
  };

  //get condition name and user selection
  const getConditionName = (condition) => {
    setSelectedCondition(condition);
  };

  const getBodyPart = (bodyPart) => {
    setSelectedBodyPart(bodyPart);
    setSelectedSym("");
  };

  let symList = [];
  if (selectedBodyPart !== "") {
    symList = Object.keys(
      props.bodyPartsDic[selectedBodyPart].SymptomsConditionDic
    );
  }

  let condition = [];
  if (selectedSym !== "") {
    condition =
      props.bodyPartsDic[selectedBodyPart].SymptomsConditionDic[selectedSym];
  }

  return (
    <Fragment>
      <Typography style={{ color: "white" }}>
        Don’t know your condition name?{" "}
        <Link
          style={{ color: "#ff8686", textDecoration: "underline" }}
          href="#"
          onClick={handleClickOpen}
        >
          Search by body parts
        </Link>{" "}
      </Typography>

      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
      >
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <Typography
                variant="body1"
                color="primary"
                style={{ marginLeft: 20 }}
              >
                <strong>1. Select Body Part</strong>
              </Typography>

              <Box display="flex" justifyContent="center">
                <img src={BodyParts} useMap="#image-map" alt="bodyparts" />

                <map name="image-map">
                  <area
                    target=""
                    alt="head"
                    title="Head"
                    href="#"
                    coords="88,8,76,14,71,21,69,33,69,41,71,50,77,60,79,74,57,85,125,84,104,74,104,63,108,55,113,39,112,29,107,16,100,11"
                    shape="poly"
                    onClick={() => {
                      getBodyPart("head");
                    }}
                  />
                  <area
                    target=""
                    alt="leftarm"
                    title="Arm"
                    href="#"
                    coords="42,92,32,106,33,158,25,191,22,233,8,250,8,258,9,270,15,276,29,267,33,244,33,234,43,209,46,194,53,152,54,86"
                    shape="poly"
                    onClick={() => {
                      getBodyPart("leftarm");
                    }}
                  />
                  <area
                    target=""
                    alt="rightarm"
                    title="Arm"
                    href="#"
                    coords="129,86,147,101,149,120,148,158,157,192,159,232,172,246,171,265,165,276,151,267,147,233,141,219,135,195,130,164,128,147"
                    shape="poly"
                    onClick={() => {
                      getBodyPart("rightarm");
                    }}
                  />
                  <area
                    target=""
                    alt="chest"
                    title="Chest"
                    href="#"
                    coords="54,85,128,141"
                    shape="rect"
                    onClick={() => {
                      getBodyPart("chest");
                    }}
                  />
                  <area
                    target=""
                    alt="abdomen"
                    title="Abdomen"
                    href="#"
                    coords="54,142,54,153,58,169,54,200,126,200,123,167,129,153,129,142"
                    shape="poly"
                    onClick={() => {
                      getBodyPart("abdomen");
                    }}
                  />
                  <area
                    target=""
                    alt="pelvis"
                    title="Pelvis"
                    href="#"
                    coords="54,200,47,253,135,253,127,201"
                    shape="poly"
                    onClick={() => {
                      getBodyPart("pelvis");
                    }}
                  />
                  <area
                    target=""
                    alt="legs"
                    title="legs"
                    href="#"
                    coords="47,272,56,303,58,336,54,354,58,383,65,433,53,449,55,459,70,465,79,444,79,432,78,413,82,379,82,346,84,305,90,266,97,305,99,334,100,352,99,363,102,395,102,416,102,434,101,444,111,463,122,462,130,451,115,433,121,398,127,356,123,334,125,305,132,273,134,253,90,253,47,253"
                    shape="poly"
                    onClick={() => {
                      getBodyPart("legs");
                    }}
                  />
                </map>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography
                variant="body1"
                color="primary"
                style={{ marginLeft: 20 }}
              >
                <strong>2. Select organ</strong>
              </Typography>
              <Box
                style={{ border: "1px solid rgba(237, 235, 237, 1)" }}
                mt={5}
                ml={2}
              >
                <List className={classes.bodypartList}>
                  {symList.map((text) => (
                    <ListItem
                      button
                      key={text}
                      selected={selectedSym === text}
                      onClick={getSymName.bind(this, text)}
                    >
                      <ListItemText primary={text} />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Grid>
            <Grid item xs={12} md={5}>
              <Typography
                variant="body1"
                color="primary"
                style={{ marginLeft: 20 }}
              >
                <strong>3. Select Condition</strong>
              </Typography>

              <Box
                style={{ border: "1px solid rgba(237, 235, 237, 1)" }}
                mt={2}
                ml={2}
              >
                <List className={classes.conditionList}>
                  {condition.map((text) => (
                    <ListItem
                      button
                      key={text}
                      selected={selectedCondition === text}
                      onClick={getConditionName.bind(this, text)}
                    >
                      <ListItemText primary={text} />
                    </ListItem>
                  ))}
                </List>
              </Box>
              <DialogActions style={{ marginTop: 10, marginBottom: 10 }}>
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "#ff8686",
                    textTransform: "none",
                  }}
                  startIcon={<SearchIcon />}
                  onClick={handleSubmit}
                  color="primary"
                >
                  Confirm
                </Button>
              </DialogActions>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}
