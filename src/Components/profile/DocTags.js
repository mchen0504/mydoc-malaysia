import React, { Fragment } from "react";
import { connect } from "react-redux";
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




// Edit Tags (用在DocInfo.js)
// 目前doctor所有的tags and edit tags 都是hardcoded， 麻烦你了
function Tags(props) {

  const classes = useStyles();
  // load user authenticate 
  const authenticated = props.authenticated;
  // 这是点进去edit tags 会出现的tags选项
  const [editTags, displayEditedTags] = React.useState([
    { key: 0, label: "Attentive" },
    { key: 1, label: "Bedside manner" },
    { key: 2, label: "Empathetic" },
    { key: 3, label: "Enthusiastic" },
    { key: 4, label: "Friendly" },
    { key: 5, label: "Honest" },
    { key: 6, label: "Knowledgeable" },
    { key: 7, label: "Passionate" },
    { key: 8, label: "Patient" },
    { key: 9, label: "Respectful" },
    { key: 10, label: "Responsible" },
    { key: 11, label: "Trustworthy" },
  ]);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  // 这里我想说点了一个tag，就会换色（从outlined 换成default)
  // 但是我不会写那个logic,所以目前是点了一个tag,所有tag都一起换色了。。麻烦你了
  // 还有需要弄一个logic是 user再点一次又会换成原来outlined的style,麻烦你了
  // const [color, setColor] = React.useState("outlined");
  // const handleClick = () => {
  //   setColor("default");
  // };

  // create a tag list that contains all tags for this doctor
  let tagList = [];
  props.tagInfo.map((tag) => {

    tagList.push((
      <Fragment>
        <li key={tag.TagName}>
          <Chip
            label={tag.TagName + ' (' + tag.Number + ')'}
            className={classes.tag}
            color="secondary"
            size="small"
          />
        </li>
      </Fragment>
    ));
  })

  console.log(props.tagInfo)

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
      {/* 显示这个doctor现在有的tags, 目前是hardcoded的， 麻烦你了 */}
      <div className={classes.tagDialog}>
        {tagList}{" "}
        {/* 如果登入了，edit tags的button会出现，否则不会出现 */}
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
            ""
          )}
      </div>

      <Dialog onClose={handleClose} open={open} maxWidth="xs">
        <Typography variant="Body" style={{ margin: 20 }}>
          Please select tag(s) that best describe this doctor from the list
          below:
        </Typography>
        {/* 弹窗出现所有tags选项 */}
        <div className={classes.editTagDialog}>
          {editTags.map((tag) => {

            // let index = props.tagInfo.findIndex(eachTag => eachTag.tagName == tag)
            // // if the 
            // let selected = (index > -1)? "true" : "false";

            

              return (
                <Fragment>
                  <PreDefinedTag tag={tag} />
                </Fragment>
              );
          })}
        </div>

        {/* Done button， 目前是点了就关掉窗口，没有save user点了什么 */}
        <DialogActions>
          <Button
            onClick={handleClose}
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

  const [selected, selectUnselectTag] = React.useState(false);

  const handleClick = () => {
    selectUnselectTag(!selected);
  };

  return (
    <li key={props.tag.key}>
      <Chip
        label={props.tag.label}
        className={classes.tag}
        color="secondary"
        variant={selected ? "default" : "secondary"}
        onClick={handleClick}
      />
    </li>
  )
}


function mapStateToProps(state) {
  return { authenticated: state.user.authenticated };
}

export default connect(mapStateToProps)(Tags);
