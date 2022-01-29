import React, { Fragment, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Dialog from "@material-ui/core/Dialog";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import DialogActions from "@material-ui/core/DialogActions";
import Hidden from "@material-ui/core/Hidden";
import Divider from "@material-ui/core/Divider";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import CircularProgress from "@material-ui/core/CircularProgress";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import axios from "axios";

import { updateUserStoredHospTags } from "../../redux/actions/userActions";
import { updateHospTags } from "../../redux/actions/dataActions";

const useStyles = makeStyles((theme) => ({
  editTagDialog: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(0.5),
    margin: 0,
  },

  tag: {
    margin: theme.spacing(0.5),
  },

  tagDialog: {
    display: "flex",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(0.5),
    margin: 0,
    [theme.breakpoints.down("xs")]: {
      marginLeft: 10,
    },
    marginBottom: 20,
  },

  editTagsButton: {
    [theme.breakpoints.down("xs")]: {
      marginLeft: 20,
    },
  },

  line: {
    [theme.breakpoints.down("xs")]: {
      border: "5px solid rgba(0, 0, 0, 0.05)",
    },
  },

  reviewTagsBox: {
    [theme.breakpoints.down("xs")]: {
      justifyContent: "left",
      alignItems: "left",
      marginLeft: 20,
    },
  },

  divider: {
    height: 2,
    width: 115,
    backgroundColor: "#FF8686",
  },
}));

// Edit Hospital Tags (用在HospInfo.js)
function HospTags(props) {
  const classes = useStyles();
  const { hospInfo, userInfo } = props;
  const authenticated = props.authenticated;

  const [allTags, setState] = React.useState({
    currentTags: [],
    storedUserTags: [],
  });

  useEffect(() => {
    if (hospInfo) {
      let userStored = "";
      if (
        userInfo &&
        userInfo.addedHospTags &&
        userInfo.addedHospTags[hospInfo.name.replace(/\s/g, "")]
      ) {
        userStored = userInfo.addedHospTags[hospInfo.name.replace(/\s/g, "")];
      }
      setState({
        currentTags: hospInfo.tags ? hospInfo.tags : "",
        storedUserTags: userStored,
      });
    }
  }, [hospInfo]);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addRemoveTag = (tag) => {
    let currentTagsCopy = allTags.currentTags;
    let currentTagIndex = currentTagsCopy
      ? currentTagsCopy.findIndex((eachTag) => eachTag.tagName === tag)
      : -1;

    let userStoredTagsCopy = allTags.storedUserTags;
    let userStoredTagIndex = userStoredTagsCopy
      ? userStoredTagsCopy.indexOf(tag)
      : -1;

    if (userStoredTagIndex !== -1) {
      userStoredTagsCopy.splice(userStoredTagIndex, 1);
      currentTagsCopy[currentTagIndex].count--;
      if (currentTagsCopy[currentTagIndex].count === 0) {
        currentTagsCopy.splice(currentTagIndex, 1);
      }
      setState({
        currentTags: currentTagsCopy,
        storedUserTags: userStoredTagsCopy,
      });
    } else {
      if (currentTagIndex !== -1) {
        currentTagsCopy[currentTagIndex].count++;

        setState((prevState) => ({
          currentTags: currentTagsCopy,
          storedUserTags: [...prevState.storedUserTags, tag],
        }));
      } else {
        setState((prevState) => ({
          currentTags: allTags.currentTags
            ? [...prevState.currentTags, { tagName: tag, count: 1 }]
            : [{ tagName: tag, count: 1 }],
          storedUserTags: allTags.storedUserTags
            ? [...prevState.storedUserTags, tag]
            : [tag],
        }));
      }
    }
  };

  // create a tag list that contains all tags for this hospital
  let tagList = allTags["currentTags"]
    ? allTags["currentTags"].map((tag) => {
        return (
          <Fragment key={tag.tagName}>
            <li key={tag.tagName}>
              <Chip
                label={tag.tagName + " (" + tag.count + ")"}
                className={classes.tag}
                color="secondary"
                size="small"
              />
            </li>
          </Fragment>
        );
      })
    : "";

  // predefined tags in edit tags diagolue
  const predefinedTags = [
    "Clean",
    "Customer Service",
    "Modern",
    "Organized",
    "Reliable",
    "Spacious",
    "Welcoming",
    "Well-equipped",
  ];

  let predefinedTagList = predefinedTags.map((tag) => {
    let selected;
    if (allTags.storedUserTags) {
      if (allTags.storedUserTags.includes(tag)) {
        selected = true;
      } else {
        selected = false;
      }
    } else {
      selected = false;
    }
    return (
      <Fragment key={tag}>
        <PreDefinedTag
          key={tag}
          label={tag}
          selected={selected}
          addRemoveTag={addRemoveTag}
        />
      </Fragment>
    );
  });

  const updateSelectedTags = () => {
    const hospitalNewTags = {
      hospital: hospInfo.name,
      tags: allTags.storedUserTags,
    };
    props.updateUserStoredHospTags(hospitalNewTags);

    const updateInfo = {
      specialty: hospInfo.relatedSpecialty,
      hospital: hospInfo.name,
      tags: allTags.currentTags,
    };
    props.updateHospTags(updateInfo);
    setOpen(false);
  };

  return (
    <div>
      <Hidden smUp>
        <hr className={classes.line}></hr>
        <Box
          mt={2}
          mb={2}
          display="flex"
          flexDirection="column"
          className={classes.reviewTagsBox}
        >
          <Typography variant="h6" color="primary">
            Review Tags
          </Typography>
          <Divider className={classes.divider} />
        </Box>
      </Hidden>

      <div className={classes.tagDialog}>
        {tagList}
        {authenticated ? (
          <Button
            color="primary"
            startIcon={<EditOutlinedIcon />}
            onClick={handleClickOpen}
            style={{ textTransform: "none" }}
            className={classes.editTagsButton}
          >
            Edit Tags
          </Button>
        ) : (
          <Button
            color="primary"
            startIcon={<EditOutlinedIcon />}
            onClick={() => props.handleLoginOpen("Tag")}
            style={{ textTransform: "none" }}
            className={classes.editTagsButton}
          >
            Edit Tags
          </Button>
        )}
      </div>

      <Dialog onClose={handleClose} open={open} maxWidth="xs">
        <Typography variant="Body" style={{ margin: 20 }}>
          Please select tag(s) that best describe this hospital from the list
          below:
        </Typography>

        <div className={classes.editTagDialog}>{predefinedTagList}</div>

        <DialogActions>
          <Button
            onClick={updateSelectedTags}
            variant="outlined"
            color="primary"
            style={{ textTransform: "none", margin: 10 }}
          >
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

function PreDefinedTag(props) {
  const classes = useStyles();

  const [selected, selectUnselectTag] = React.useState(props.selected);

  const handleClick = () => {
    selectUnselectTag(!selected);
    props.addRemoveTag(props.label);
  };

  return (
    <li key={props.key}>
      <Chip
        label={props.label}
        className={classes.tag}
        color="secondary"
        variant={selected ? "default" : "secondary"}
        onClick={handleClick}
      />
    </li>
  );
}

HospTags.propTypes = {
  updateUserStoredHospTags: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
  storedCredentials: state.user.credentials,
  searchInfo: state.data.searchInfoHospital,
});

const mapActionsToProps = {
  updateUserStoredHospTags,
  updateHospTags,
};

export default connect(mapStateToProps, mapActionsToProps)(HospTags);
