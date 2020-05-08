import React from "react";
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

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import {
  updateVerification,
  getUserData,
} from "../../redux/actions/userActions";

const useStyles = makeStyles((theme) => ({
  ...theme.account,
}));

// doctor account verification
function DocAccountVerification(props) {
  const classes = useStyles();
  // const { index } = props

  const [medicalNumber, setMedicalNumber] = React.useState();
  const [identityCard, setIdentityCard] = React.useState({
    src: "",
    name: "",
  });
  const [medicalDegree, setMedicalDegree] = React.useState({
    src: "",
    name: "",
  });

  const editMedicalNumber = (event) => {
    setMedicalNumber(event.target.value);
  };

  const uploadIdentityCard = (event) => {
    let reader = new FileReader();
    let uploaded = event.target.files[0];
    if (uploaded) {
      reader.readAsDataURL(uploaded);
    }
    reader.onload = () => {
      setIdentityCard({
        src: reader.result,
        name: uploaded.name,
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
      setMedicalDegree({
        src: reader.result,
        name: uploaded.name,
      });
    };
  };

  // initiate push to firebase when submit button is clicked
  const submitVerification = () => {
    const newVerification = {
      medicalNumber: medicalNumber,
      identityCardSrc: identityCard["src"],
      medicalDegreeSrc: medicalDegree["src"],
    };
    props.updateVerification(newVerification);
  };

  const storedMedicalNum =
    props.storedVerificationInfo &&
    props.storedVerificationInfo.medicalRegistrationNumber;

  if (!storedMedicalNum) {
    // loading spinner if prop data is not yet available
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
            <Box
              flexGrow={1}
              flexDirection="row"
              mt={4}
              mb={1}
              alignItems="center"
            >
              <Typography variant="h5" color="primary">
                {/* Back button 手机屏幕才会出玄 */}
                <Hidden mdUp>
                  {/* <IconButton> */}
                  <Link to="docaccount">
                    <ArrowBackIosIcon
                      className={classes.backIcon}
                      fontSize="small"
                    />
                  </Link>
                  {/* </IconButton> */}
                </Hidden>
                <strong>Account Verification</strong>
              </Typography>
            </Box>

            <br></br>
            <Box display="flex" flexDirection="row">
              {/* 现在是ACCOUNT NOT VERIFIED, 需要换icon 如果account pending/verified */}
              <CancelIcon style={{ color: "red", marginRight: 10 }} />
              <Typography variant="body1">
                Account not verified<br></br>
              </Typography>
            </Box>
            <br></br>
            <br></br>
            {/* Meidcal reg number */}
            <TextField
              fullWidth
              required
              label="Medical Registration Number"
              defaultValue={storedMedicalNum}
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
            <Typography variant="body2">{identityCard.name}</Typography>
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
            <Typography variant="body2">{medicalDegree.name}</Typography>

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
  user: PropTypes.object.isRequired,
  updateVerification: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  storedVerificationInfo: state.user.credentials.verification,
});

const mapActionsToProps = {
  updateVerification,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(DocAccountVerification);
