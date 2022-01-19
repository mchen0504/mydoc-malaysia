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

// const proxyurl = "https://cors-anywhere.herokuapp.com/";

// ～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～
// ～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～
// "hospital tags" used in this js is actually referred to the tags attached to a specialty in this hospital
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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
// 目前hospital所有的tags and edit tags 都是hardcoded， 麻烦你了
function HospTags(props) {
  const classes = useStyles();
  const authenticated = props.authenticated;

  const [allTags, setState] = React.useState({
    currentTags: [],
    storedUserTags: [],
  });

  const [renderCount, setRenderCount] = React.useState(0);

  // only call useEffect if renderCount = 0 (will be updated to 1 if stored data
  // in firebase is successfully set to state)
  useEffect(() => {
    if (renderCount === 0) {
      return displayStoredData();
    }
  }, [allTags]);

  const displayStoredData = () => {
    // call function to get data from returned props from firebase
    getStoredData()
      .then((res) => {
        // set state
        let userStored;
        if (!res[1].addedHospTags) {
          userStored = "";
        } else {
          if (
            !res[1].addedHospTags[
              props.targetHos.HospitalName.replace(/\s/g, "")
            ]
          ) {
            userStored = "";
          } else {
            userStored =
              res[1].addedHospTags[
                props.targetHos.HospitalName.replace(/\s/g, "")
              ];
          }
        }
        setState({
          currentTags: res[0].data.tags ? res[0].data.tags : "",
          storedUserTags: userStored,
        });
        // update renderCount to 1 to stop react from making any more useEffect call
        setRenderCount(1);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // wait for returned props from firebase to be ready
  let getStoredData = async () => {
    let [storedSearchInfo, userStoredCredentials] = await Promise.all([
      await axios.get("/hospitalprofile", {
        params: {
          specialty: props.targetHos.relatedSpecialty,
          hospital: props.targetHos.HospitalName.replace(/\s+/g, ""),
        },
      }),
      props.storedCredentials,
    ]);
    return [storedSearchInfo, userStoredCredentials];
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  // add or remove hospital review tags: make changes to both the current hospital and user stored tags
  const addRemoveTag = (tag) => {
    let currentTagsCopy = allTags.currentTags;
    // if currentTagsCopy doesn't exist (no tags have been selected for this hospital before),
    // assign index -1 (not found)
    let currentTagIndex = currentTagsCopy
      ? currentTagsCopy.findIndex((eachTag) => eachTag.tagName === tag)
      : -1;

    let userStoredTagsCopy = allTags.storedUserTags;
    // if the userStoredTagsCopy doesn't exist (the user has never selected any tags for this
    // hospital before), assign index -1
    let userStoredTagIndex = userStoredTagsCopy
      ? userStoredTagsCopy.indexOf(tag)
      : -1;

    // if the tag has been selected by user, which means it should also exist
    // in the database
    if (userStoredTagIndex !== -1) {
      // remove from user selected tag list in the modal
      userStoredTagsCopy.splice(userStoredTagIndex, 1);
      // decrease this tag's count for this hospital in database; this tag should
      // have already existed in the database since the user selected it
      currentTagsCopy[currentTagIndex].count--;
      if (currentTagsCopy[currentTagIndex].count === 0) {
        currentTagsCopy.splice(currentTagIndex, 1);
      }
      setState({
        currentTags: currentTagsCopy,
        storedUserTags: userStoredTagsCopy,
      });
      // the tag hasn't been selected by the user
    } else {
      // if the tag already exists in the database (other users had selected this
      //  tag for this hospital)
      if (currentTagIndex !== -1) {
        // increase the count for this tag in database by 1
        currentTagsCopy[currentTagIndex].count++;

        setState((prevState) => ({
          currentTags: currentTagsCopy,
          // add the new tag to this user's tag list
          storedUserTags: [...prevState.storedUserTags, tag],
        }));
        // the tag doesn't exist in the database; this is the first time a user
        // selects this tag
      } else {
        setState((prevState) => ({
          // if currentTags exist (hospital had users added tags for him before), add the new tag to the list
          // otherwise (no one had added tags for the hospital before), use the new tag to start the list
          currentTags: allTags.currentTags
            ? [...prevState.currentTags, { tagName: tag, count: 1 }]
            : [{ tagName: tag, count: 1 }],
          // if the user has selected tags for this hospital before, add the new tag to the list
          // otherwise, use the new tag to start a list
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
    // if the user has selected any tags for this hospital before
    if (allTags.storedUserTags) {
      // if the tag exists in the user selected tag list
      if (allTags.storedUserTags.includes(tag)) {
        selected = true;
      } else {
        selected = false;
      }
      // all tags have never been selected before by the user
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
      hospital: props.targetHos.HospitalName,
      tags: allTags["storedUserTags"],
    };
    props.updateUserStoredHospTags(hospitalNewTags);

    const updateInfo = {
      specialty: props.targetHos.RelateSpecialty,
      hospital: props.targetHos.HospitalName,
      tags: allTags["currentTags"],
    };
    props.updateHospTags(updateInfo);
    setOpen(false);
  };

  if (renderCount === 0) {
    // loading spinner if prop data is not yet available
    return (
      <div>
        <CircularProgress
          color="secondary"
          style={{ marginLeft: "45%", marginTop: "5%" }}
        />
      </div>
    );
  } else {
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
        {/* 显示这个hospital现在有的tags, 目前是hardcoded的， 麻烦你了 */}
        <div className={classes.tagDialog}>
          {tagList} {/* 如果登入了，edit tags的button会出现，否则不会出现 */}
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
            // michelle 5/16: 这边原来是“”  现在用下面的button替换掉
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
          {/* 弹窗出现所有tags选项 */}
          <div className={classes.editTagDialog}>{predefinedTagList}</div>

          {/* Done button， 目前是点了就关掉窗口，没有save user点了什么 */}
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
  // a hospital's information from firebase
  searchInfo: state.data.searchInfoHospital,
});

const mapActionsToProps = {
  updateUserStoredHospTags,
  updateHospTags,
};

export default connect(mapStateToProps, mapActionsToProps)(HospTags);
