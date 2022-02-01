import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { updateVerification } from "../../redux/actions/userActions";

import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Hidden from "@material-ui/core/Hidden";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import CancelIcon from "@material-ui/icons/Cancel";
import CloudUploadOutlinedIcon from "@material-ui/icons/CloudUploadOutlined";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  ...theme.account,
}));

// doctor account verification
function DocAccountVerification(props) {
  const classes = useStyles();
  const { userInfo } = props;

  // submit success success message alert
  const [open, setOpen] = React.useState(false);

  const [currentInfo, setState] = React.useState({
    medicalRegistrationNumber: "",
    identityCardSrc: "",
    identityCardName: "",
    medicalDegreeSrc: "",
    medicalDegreeName: "",

    hasEmpty: "",
  });

  useEffect(() => {
    if (userInfo && userInfo.verification) {
      let verifyInfo = userInfo.verification;
      let stored = {};
      Object.keys(verifyInfo).map((eachProp) => {
        stored[eachProp] = verifyInfo[eachProp];
      });
      stored.hasEmpty = Object.keys(verifyInfo).length !== 5;
      setState(stored);
    }
  }, [userInfo]);

  const editMedicalNumber = (event) => {
    setState({
      ...currentInfo,
      medicalRegistrationNumber: event.target.value,
    });
  };

  const uploadIdentityCard = (event) => {
    let reader = new FileReader();
    let uploaded = event.target.files[0];
    if (uploaded) {
      reader.readAsDataURL(uploaded);
    }
    reader.onload = () => {
      setState({
        ...currentInfo,
        identityCardSrc: reader.result,
        identityCardName: uploaded.name,
      });
    };
  };

  const uploadMedicalDegree = (event) => {
    let reader = new FileReader();
    let uploaded = event.target.files[0];
    if (uploaded) {
      reader.readAsDataURL(uploaded);
    }
    reader.onload = () => {
      setState({
        ...currentInfo,
        medicalDegreeSrc: reader.result,
        medicalDegreeName: uploaded.name,
      });
    };
  };

  // initiate push to firebase when submit button is clicked
  const submitVerification = () => {
    let newVerification = {};
    Object.keys(currentInfo).map((eachProp) => {
      if (eachProp !== "hasEmpty" && currentInfo[eachProp] !== undefined) {
        newVerification[eachProp] = currentInfo[eachProp];
      }
    });
    props.updateVerification(newVerification);

    // open submit success message
    setOpen(true);

    // if all fields are not empty (including " "), set hasEmpty = true
    if (
      newVerification.medicalRegistrationNumber &&
      newVerification.identityCardSrc !== " " &&
      newVerification.medicalDegreeSrc !== " "
    ) {
      setState({
        ...currentInfo,
        hasEmpty: false,
      });
      props.setVerifyWarning(false);
    }
  };

  if (!currentInfo.medicalRegistrationNumber) {
    return (
      <div>
        <CircularProgress
          color="secondary"
          style={{ marginLeft: "45%", marginTop: "10%" }}
        />
      </div>
    );
  } else {
    return (
      <a id="accountverification" className={classes.anchor}>
        <Grid container spacing={0}>
          <Grid item xs={1}></Grid>
          <Grid item xs={10} md={8}>
            <Box flexDirection="row" mb={1} mt={4} alignItems="center">
              <Typography variant="h5" color="primary">
                {/* Back button 手机屏幕才会出玄 */}
                <Hidden mdUp>
                  <Link to="account">
                    <ArrowBackIosIcon
                      className={classes.backIcon}
                      fontSize="small"
                    />
                  </Link>
                </Hidden>
                <strong>Account Verification</strong>
              </Typography>
            </Box>

            <br></br>

            {open ? (
              <Alert style={{ marginBottom: "1rem" }}>
                Successfully submitted!
              </Alert>
            ) : (
              ""
            )}

            {currentInfo.hasEmpty ? (
              <Box display="flex" flexDirection="row">
                <CancelIcon style={{ color: "red", marginRight: 10 }} />
                <Typography variant="body1">
                  Account not verified<br></br>
                </Typography>
              </Box>
            ) : (
              ""
            )}

            <br></br>
            <br></br>
            {/* Meidcal reg number */}
            <TextField
              fullWidth
              required
              label="Medical Registration Number"
              defaultValue={currentInfo.medicalRegistrationNumber}
              variant="outlined"
              onChange={editMedicalNumber}
            />
            {/* Upload malaysian identity card */}
            <Box display="flex" mt={5} mb={3}>
              <Box flexGrow={1}>
                <Typography variant="body1" color="textSecondary">
                  Malaysian Identity Card
                </Typography>
              </Box>
              <Box flexGrow={1}>
                <input
                  accept="image/*"
                  style={{ display: "none" }}
                  id="contained-button-identity"
                  multiple
                  type="file"
                  onChange={uploadIdentityCard}
                />
                <label htmlFor="contained-button-identity">
                  <Button
                    startIcon={<CloudUploadOutlinedIcon />}
                    variant="outlined"
                    component="span"
                    color="primary"
                    style={{ textTransform: "none", float: "right" }}
                    size="medium"
                  >
                    Upload
                  </Button>
                </label>
              </Box>
            </Box>
            <Typography variant="body2">
              {currentInfo.identityCardName}
            </Typography>

            {/* Upload medical degree */}
            <Box display="flex" mt={5} mb={5}>
              <Box flexGrow={1}>
                <Typography variant="body1" color="textSecondary">
                  Certified copy of Medical Degree
                </Typography>
              </Box>
              <Box>
                <input
                  accept="image/*"
                  style={{ display: "none" }}
                  id="contained-button-medical"
                  multiple
                  type="file"
                  onChange={uploadMedicalDegree}
                />
                <label htmlFor="contained-button-medical">
                  <Button
                    startIcon={<CloudUploadOutlinedIcon />}
                    variant="outlined"
                    component="span"
                    color="primary"
                    style={{ textTransform: "none", float: "right" }}
                    size="medium"
                  >
                    Upload
                  </Button>
                </label>
              </Box>
            </Box>
            <Typography variant="body2">
              {currentInfo.medicalDegreeName}
            </Typography>

            <Button
              variant="contained"
              color="primary"
              style={{ textTransform: "none", float: "right" }}
              size="large"
              onClick={submitVerification}
            >
              Submit
            </Button>
            <br></br>
            <br></br>
          </Grid>
          <Grid item xs={1} md={3}></Grid>
        </Grid>
      </a>
    );
  }
}

DocAccountVerification.propTypes = {
  updateVerification: PropTypes.func.isRequired,
};

const mapActionsToProps = {
  updateVerification,
};

export default connect(mapStateToProps)(DocAccountVerification);
