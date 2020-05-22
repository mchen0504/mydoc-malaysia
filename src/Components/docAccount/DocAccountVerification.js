import React, { useEffect } from "react";
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
import CircularProgress from '@material-ui/core/CircularProgress';

// michelle 5/16: 加了这句
import Alert from "@material-ui/lab/Alert";


import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { updateVerification } from "../../redux/actions/userActions";



const useStyles = makeStyles((theme) => ({
  ...theme.account,
}));


// doctor account verification
function DocAccountVerification(props) {
  const classes = useStyles();

  // determine if useEffect will be called: don't call if renderCount = 1
  const [renderCount, setRenderCount] = React.useState(0);
  // submit success success message alert
  const [open, setOpen] = React.useState(false);

  const [currentInfo, setState] = React.useState({
    medicalRegistrationNumber: "",
    identityCardSrc: "",
    identityCardName: "",
    medicalDegreeSrc: "",
    medicalDegreeName: "",

    hasEmpty: ""
  })

  // only call useEffect if renderCount = 0 (will be updated to 1 if stored data
  // in firebase is successfully set to state)
  useEffect(() => {
    if (renderCount == 0) {
      return displayStoredData();
    }
  });

  const displayStoredData = () => {
    // call function to get data from returned props from firebase
    getStoredData()
      .then((res) => {
        // set state
        setState({
          medicalRegistrationNumber: res.medicalRegistrationNumber,
          identityCardSrc: res.identityCardSrc,
          identityCardName: res.identityCardName,
          medicalDegreeSrc: res.medicalDegreeSrc,
          medicalDegreeName: res.medicalDegreeName,

          hasEmpty: (Object.keys(res).length === 5) ? false : true
        })
        // update renderCount to 1 to stop react from making any more useEffect call
        setRenderCount(1);
      }).catch((error) => {
        console.error(error);
      })
  }

  // wait for returned props from firebase to be ready
  let getStoredData = async () => {
    let storedVerificationInfo = await props.storedVerificationInfo;
    return storedVerificationInfo;
  }


  const editMedicalNumber = (event) => {
    setState({
      ...currentInfo,
      medicalRegistrationNumber: event.target.value
    });
  }

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
        identityCardName: uploaded.name
      })
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
        medicalDegreeName: uploaded.name
      })
    };
  };


  // initiate push to firebase when submit button is clicked
  const submitVerification = () => {
    const newVerification = {
      medicalRegistrationNumber: currentInfo["medicalRegistrationNumber"],
      identityCardSrc: currentInfo["identityCardSrc"] ? currentInfo["identityCardSrc"] : " ",
      identityCardName: currentInfo["identityCardName"] ? currentInfo["identityCardName"] : " ",
      medicalDegreeSrc: currentInfo["medicalDegreeSrc"] ? currentInfo["medicalDegreeSrc"] : " ",
      medicalDegreeName: currentInfo["medicalDegreeName"] ? currentInfo["medicalDegreeName"] : " "
    };
    props.updateVerification(newVerification);
  

    // michelle 5/16: 这里本来是openSuccessMsg  现在用setOpen(true)替换掉
    // open submit success message
    setOpen(true);
  };


  if (!currentInfo.medicalRegistrationNumber) {
    // loading spinner if prop data is not yet available
    return (
      <div>
        <CircularProgress color="secondary" style={{ marginLeft: '45%', marginTop: '10%' }} />
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
                  <Link to='docaccount'>
                    <ArrowBackIosIcon className={classes.backIcon} fontSize="small"/>
                  </Link>
                </Hidden>
                <strong>Account Verification</strong>
              </Typography>
            </Box>

            <br></br>

            {/* michelle  5/16: 加了这句。 上面的box里面本来有snackbar  你把它删掉 用这个就行了*/}
            {/* 本来有openSuccessMsg和closeSuccessMsg两个function  现在不用了 可以删掉*/}
            {open ? <Alert style={{marginBottom: '1rem'}}>Successfully submitted!</Alert> : ""}


            {currentInfo.hasEmpty ? (
            <Box display="flex" flexDirection="row">
              {/* 现在是ACCOUNT NOT VERIFIED, 需要换icon 如果account pending/verified */}
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
              // defaultValue={storedMedicalNum}
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
            {/* <Typography variant="body2">{(identityCard.name == "") ? storedIdentityCard : identityCard.name}</Typography> */}
            <Typography variant="body2">{currentInfo.identityCardName}</Typography>




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
            <Typography variant="body2">{currentInfo.medicalDegreeName}</Typography>

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

const mapStateToProps = (state) => ({
  storedVerificationInfo: state.user.credentials.verification
});

const mapActionsToProps = {
  updateVerification,
};

export default connect(mapStateToProps, mapActionsToProps)(DocAccountVerification);