import React, { Fragment } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import CloseIcon from "@material-ui/icons/Close";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

// components (add global search tabs inside the dialog)
import GlobalSearchTabs from "./GlobalSearchTabs";

const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    cursor: "pointer",
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      border: "1px solid rgba(0, 0, 0, 0.12)",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      color: "#003367",
    },
  },
  inputRoot: {
    color: "inherit",
    [theme.breakpoints.down("sm")]: {
      color: "#003367",
    },
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
  },
}));

// Global search on Navbar
export default function GlobalSearch(props) {
  const classes = useStyles();
  const theme = useTheme();

  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("sm");
  const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));

  const handleClickOpen = () => {
    // props.setSearchType("Specialty");
    // props.setSearchValue("");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMaxWidthChange = (event) => {
    setMaxWidth(event.target.value);
  };

  const handleFullWidthChange = (event) => {
    setFullWidth(event.target.checked);
  };

  return (
    <div>
      <Fragment>
        {/* user clicks 'search' on Navbar and will render this dialog */}
        <Dialog
          fullScreen={fullScreen}
          fullWidth={fullWidth}
          maxWidth={maxWidth}
          open={open}
          onClose={handleClose}
        >
          {/* close icon on top-right */}
          <DialogActions>
            <Button autoFocus onClick={handleClose} color="primary">
              <CloseIcon />
            </Button>
          </DialogActions>
          <DialogContent>
            {/* Global search tabs + search by specialty/doc/hosp/condition */}
            <GlobalSearchTabs {...props} handleClose={handleClose} />
          </DialogContent>
        </Dialog>
      </Fragment>

      <div>
        {/* Global Search box on Navbar */}
        <div className={classes.search} onClick={handleClickOpen}>
          <div className={classes.searchIcon}>
            <SearchIcon />
            <span style={{ marginLeft: 12 }}>Search</span>
          </div>
          <InputBase
            disabled
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
          />
        </div>
      </div>
    </div>
  );
}
