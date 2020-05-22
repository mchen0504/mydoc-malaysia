import React, { Fragment, useEffect,useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import axios from "axios";

// import DocCard from "../../Components/results/DocCard";
// import HospCard from "../../Components/results/HospitalCard";


import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Chip from "@material-ui/core/Chip";
import FavoriteIcon from "@material-ui/icons/Favorite";
import docImg from "../../img/results/docAlex.png";
import hospImg from "../../img/results/pantaihospital.png";


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// for small cards display, might delete later if naming conventions unify


const useStyles = makeStyles((theme) => ({
  ...theme.account,

  root: {
    display: "flex",
    margin: 30,
  },

  img: {
    width: "60%",
    [theme.breakpoints.only("md")]: {
      width: "80%",
    },
    [theme.breakpoints.down("xs")]: {
      width: "40%",
    },
  },

  imageGrid: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("xs")]: {
      marginTop: 30,
      marginBottom: 10,
    },
  },
  likeBox: {
    marginTop: 16,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("xs")]: {
      marginTop: 0,
      alignItems: "flex-start",
      marginLeft: 20,
      marginRight: 20,
      marginBottom: 20,
    },
  },
}));

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function LikeHistorySaved(props) {
  const classes = useStyles();

  // decide if the page should render Like History or Saved
  const displayType = props.saveLike;

  const [display, setDisplay] = React.useState("doctor"); //display by doctor as default
  const [doctorCards, setDoctorCards] = React.useState([]); //display by doctor as default
  const [hospitalCards, setHospitalCards] = React.useState([]); //display by doctor as default
  const handleDisplay = (event, newDisplay) => {
    if (newDisplay != null) {
      setDisplay(newDisplay);
    }
  };

  const [renderCount, setRenderCount] = React.useState(0);

  const [saveLike, setSaveLike] = React.useState({
    doctors: [],
    hospitals: []
  })

  const [databaseInfo, setDatabase] = React.useState({})

  const indicator = "";

  useEffect(() => {
    // if (!indicator) {
    displayStoredCredentials();
    // }
  }, []);


  const displayStoredCredentials = () => {
    getStoredCredentials()
      .then((res) => {
        // michelle 5/16: 从storedCredentials改成用axios了 所以现在uncomment这句 把原来的let stored = res[displayType]删掉
        
        let stored = res[0].data.credentials[displayType];
        console.log('stored');
        console.log(stored);
        // console.log('stored content')
        // console.log(res.data.credentials)
        // console.log('displayType')
        // console.log(displayType)
        let likedDoctors;
        let likedHospitals;

        // if the user has not never liked any doctors or hospitals
        if (!stored) {
          likedDoctors = [];
          likedHospitals = [];
        } else {
          likedDoctors = stored.doctors ? stored.doctors : [];
          likedHospitals = stored.hospitals ? stored.hospitals : [];
        }
        console.log('user list:')
        console.log(likedDoctors);
        console.log(likedHospitals);
        let docCardsList = likedDoctors.map(doctor => {
          // console.log('loading doc cards')
          let specialty = doctor.specialty;
          let hospital = doctor.hospital.replace(/\s+/g, "");
          let username = doctor.username.replace(/\s+/g, "");
          // console.log('doctor');
          // console.log(doctor);
          // console.log(res[1].data);
          // console.log(specialty);
          let targetDoc = res[1].data[specialty]['hospitals'][hospital]['doctors'][username];
          // console.log('target doc');
          // console.log(targetDoc);
          return (
            <DocCard {...props} key={doctor.username} targetDoc={targetDoc} targetDocUserName={username}/>
          )
        })


        // list of liked hospitals cards on hospital tab
        let hosCardsList = likedHospitals.map(hospital => {
          console.log('loading hos cards');
          let specialty = hospital.relatedSpecialty;
          let hospitalUserName = hospital.name.replace(/\s+/g, "");
          console.log(specialty);
          console.log(res[1].data);
          let targetHos = res[1].data[specialty]['hospitals'][hospitalUserName];
          return (
            <HospitalCard {...props} key={hospital.name} targetHos={targetHos} targetHosUserName={hospitalUserName} hospitalInfo={hospital} getSpecialtyData={getSpecialtyData} database = {databaseInfo} />
          )
        })
        setDoctorCards(docCardsList);
        setHospitalCards(hosCardsList);
        setSaveLike({
          doctors: likedDoctors,
          hospitals: likedHospitals
        });

        // setDatabase(res[1].data);
        // setRenderCount(1);
      })
      .catch((error) => {
        console.error(error);
      })
  }

  let getStoredCredentials = async () => {
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    let userStoredCredentials = await axios.get( axios.defaults.baseURL + "user");
    let databaseInfo = await axios.get(proxyurl+'https://us-central1-mydoc-f3cd9.cloudfunctions.net/apiForSearch/getDatabase')
    // console.log(userStoredCredentials)
    return [userStoredCredentials,databaseInfo];
  }


  let getSpecialtyData = async (searchSpecialty) => {
    let data =
      await axios.get(axios.defaults.baseURL + "getallsearchdata",
        {
          params: {
            specialty: searchSpecialty
          }
        })
    return data;
  }

  // // list of liked doctor cards on doctor tab
  // let doctorCards = saveLike.doctors.map(doctor => {
  //   let specialty = doctor.specialty;
  //   let hospital = doctor.hospital.replace(/\s+/g, "");
  //   let username = doctor.username.replace(/\s+/g, "");
  //   console.log('databaseinf');
  //   console.log(databaseInfo);
  //   let targetDoc = databaseInfo[specialty]['hospitals'][hospital]['doctors'][username];
  //   return (
  //     <DocCard {...props} key={doctor.username} targetDoc={targetDoc} targetDocUserName={username}/>
  //   )
  // })

  // // list of liked hospitals cards on hospital tab
  // let hospitalCards = saveLike.hospitals.map(hospital => {
  //   console.log('hi');
  //   let specialty = hospital.specialty;
  //   let hospitalUserName = hospital.name.replace(/\s+/g, "");
  //   let targetHos = databaseInfo[specialty]['hospitals'][hospitalUserName];
  //   return (
  //     <HospitalCard {...props} key={hospital.name} targetHos={targetHos} targetHosUserName={hospitalUserName} hospitalInfo={hospital} getSpecialtyData={getSpecialtyData} database = {databaseInfo} />
  //   )
  // })

    return (
      <a id="likehistory" className={classes.anchor}>
        <Grid container spacing={0}>
          <Grid item xs={1}></Grid>
          <Grid item xs={10} md={8}>
            <Box display="flex" mt={4} mb={3} flexWrap="wrap" alignItems="center">
              <Box flexGrow={1} flexDirection="row" mb={1}>
                <Typography variant="h5" color="primary">
                  {/* Back button, 手机屏幕才会出现 */}
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
                  <strong>
                    {displayType === "likeHistory" ? "Like History" : "Saved"}
                  </strong>
                </Typography>
              </Box>
              {/* Display by Doctor/Hospital buttons */}
              <Box>
                <ToggleButtonGroup
                  value={display}
                  exclusive
                  onChange={handleDisplay}
                >
                  <ToggleButton value="doctor" color="primary">
                    <Typography color="primary" style={{ textTransform: "none" }}>
                      Doctor
                  </Typography>
                  </ToggleButton>
                  <ToggleButton value="hospital">
                    <Typography color="primary" style={{ textTransform: "none" }}>
                      Hospital
                  </Typography>
                  </ToggleButton>
                </ToggleButtonGroup>
              </Box>{" "}
            </Box>

            <br></br>
            <br></br>

            {/* if user clicks on display by 'doctor', then render doctor cards */}
            {display === "doctor" ? (
              <Fragment>{doctorCards}</Fragment>
            ) : (
                <Fragment>{hospitalCards}</Fragment>
              )}
          </Grid>
          <Grid item xs={1} md={3}></Grid>
        </Grid>
      </a>
    );
  }
// }

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// might be deleted later if naming conventions unify



// Each indiivdual doctor card
function DocCard(props) {
  const classes = useStyles();

  // const handleClick = () => {
  //   props.updateTargetDoc(props.resultData);
  //   if (props.history != null) {
  //     props.history.push("/docprofile");
  //   }
  // };

  const clickDoctorCard = () => {
    console.log(props.targetDoc);
    let newestTargetDoc = props.targetDoc;
    newestTargetDoc["Address"] = newestTargetDoc.address;
    newestTargetDoc["Language"] = newestTargetDoc.languages;
    newestTargetDoc['Phone'] = newestTargetDoc.phone;
    newestTargetDoc['Hospital'] = newestTargetDoc.hospital;
    newestTargetDoc['Conditions'] = newestTargetDoc.conditions;
    newestTargetDoc['DocName'] = newestTargetDoc.name;
    newestTargetDoc['Specialty'] = newestTargetDoc.specialty;
    newestTargetDoc['YearsofPractice'] = newestTargetDoc.yearsOfPractice;
    newestTargetDoc['Procedures'] = newestTargetDoc.procedures;
    newestTargetDoc['NumberOfLikes'] = newestTargetDoc.likes;
    newestTargetDoc['Qualifications'] = newestTargetDoc.qualifications;
    newestTargetDoc['Type'] = newestTargetDoc.type;
    newestTargetDoc['userName'] = props.targetDocUserName;
    console.log('doc likes')
    // console.log(newestTargetDoc['NumberOfLikes'])
    console.log(newestTargetDoc);
    props.updateTargetDoc(newestTargetDoc);
    props.setProfileBackToDestination("likehistory");
    if (props.history != null) {
      props.history.push("/docprofile");
    }
  }


  // const handleClick = () => {
  //   props.updateTargetDoc(props.resultData);
  //   if (props.history != null) {
  //     props.history.push("/docprofile");
  //   }
  // };


  return (
         <Card className={classes.root} onClick={clickDoctorCard}>
          <Grid container spacing={0}>
            <Grid item xs={12} sm={3}  className={classes.imageGrid}>
              {/* doctor image */}
              <CardMedia
                component="img"
                className={classes.img}
                // image={docImg}
                src = {props.targetDoc.imgSrc}
              ></CardMedia>
            </Grid>
            <Grid item xs={12} sm={7}>
              <CardContent>
                {/* doctor details */}
                <Typography variant="h6" color="primary">
                  {"Dr." + props.targetDoc.name}
                </Typography>
                <br></br>
                <Typography variant="subtitle1" color="textSecondary">
                  <strong>Specialty: </strong>{" "}
                  <span>{props.targetDoc.hospital}</span>
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  <strong>Hospital: </strong>
                  <span>{props.targetDoc["hospital"]}</span>
                </Typography>
                <br></br>
                {/* private tag */}
                <Chip color="secondary" size="small" label={props.targetDoc.type}></Chip>
              </CardContent>
            </Grid>
            <Grid item xs={12} sm={2}>
              {/* Like icon + number of likes */}
              <Box className={classes.likeBox}>
                <FavoriteIcon style={{ color: "red" }} />
                <Typography variant="body2" color="primary">
                  {props.targetDoc["likes"]}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Card>
  );
 
}


function HospitalCard(props) {
  const classes = useStyles();

  // const clickHospitalCard = () => {
  //   const specialty = props.hospitalInfo.relatedSpecialty;
  //   const hospital = props.hospitalInfo.name.replace(/\s+/g, "");

  //   props.getSpecialtyData(specialty)
  //     .then((res) => {
  //       let targetHospital = res.data[specialty].hospitals[hospital];
  //     }).catch((error) => {
  //       console.error(error);
  //     })
  // }

  const clickHospitalCard = () => {
    let newestTargetHos = props.targetHos;
    // newestTargetHos["Address"] = newestTargetHos.address;
    // newestTargetHos["Language"] = newestTargetHos.languages;
    // newestTargetHos['Phone'] = newestTargetHos.phone;
    // newestTargetHos['Hospital'] = newestTargetHos.hospital;
    // newestTargetHos['Conditions'] = newestTargetHos.conditions;
    // newestTargetHos['DocName'] = newestTargetHos.name;
    // newestTargetHos['Specialty'] = newestTargetHos.specialty;
    // newestTargetHos['YearsofPractice'] = newestTargetHos.yearsOfPractice;
    // newestTargetHos['Procedures'] = newestTargetHos.procedures;
    // newestTargetHos['NumberOfLikes'] = newestTargetHos.likes;
    // newestTargetHos['Qualifications'] = newestTargetHos.qualifications;
    // newestTargetHos['Type'] = newestTargetHos.type;
    // newestTargetHos['userName'] = props.targetDocUserName;
    console.log('doc likes')


    newestTargetHos["Address"] = newestTargetHos.address;
    newestTargetHos["HospitalType"] = newestTargetHos.type;
    newestTargetHos['Insurance'] = newestTargetHos.insurance;
    newestTargetHos['Language'] = newestTargetHos.languages;
    newestTargetHos['Phone'] = newestTargetHos.phone;
    newestTargetHos['HospitalName'] = newestTargetHos.name;
    newestTargetHos['RelateSpecialty'] = newestTargetHos.relatedSpecialty;
    newestTargetHos['Tags'] = newestTargetHos.tags;
    newestTargetHos['Web'] = newestTargetHos.website;
    let conditionList = [];
    console.log(newestTargetHos['doctors'])
    for (let doctor in newestTargetHos['doctors']){
      let targetDoc = newestTargetHos['doctors'][doctor];
      console.log(doctor);
      console.log(targetDoc);
      targetDoc.conditions = targetDoc.conditions.map((item)=>{
        let newItem = item.toLowerCase();
          newItem = newItem.replace(newItem[0],newItem[0].toUpperCase())
        return newItem
      });
      targetDoc.conditions.forEach((condition) => {
        if (conditionList.indexOf(condition) == -1){
          conditionList.push(condition)
        }
      });
    }
    newestTargetHos['Conditions'] = conditionList;
    // console.log(newestTargetDoc['NumberOfLikes'])
    console.log(newestTargetHos);
    props.updateTargetDoc(newestTargetHos);
    props.setProfileBackToDestination("likehistory");
    if (props.history != null) {
      props.history.push("/hospprofile");
    }
  }

  // const handleClick = () => {
  //   props.updateTargetHos(props.resultData);
  //   if (props.history != null) {
  //     props.history.push("/hospprofile");
  //   }
  // };


console.log('target hos');
console.log(props.targetHos);
  return (
    <Card className={classes.root} onClick={clickHospitalCard}>
      <Grid container spacing={0}>
        <Grid item xs={12} sm={3} className={classes.imageGrid}>
          {/* hospital logo image */}
          <CardMedia
            component="img"
            className={classes.img}
            image={hospImg}
          ></CardMedia>
        </Grid>

        <Grid item xs={12} sm={7}>
          <CardContent>
            {/* hospital details */}
            <Typography variant="h6" color="primary">
              {props.targetHos["name"]}
            </Typography>
            <br></br>
            <Typography variant="subtitle1" color="textSecondary">
              <strong>Address: </strong>
              <span>{props.targetHos["address"]}</span>
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              <strong>Related Specialty: </strong>
              <span>{props.targetHos["relatedSpecialty"]}</span>
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              <strong>Phone: </strong>
              <span>{props.targetHos["phone"]}</span>
            </Typography>

            <br></br>
            <Chip color="secondary" size="small" label={props.targetHos.type}></Chip>
          </CardContent>
        </Grid>
        <Grid item xs={12} sm={2}>
          {/* like icon + number of likes */}
          <Box className={classes.likeBox}>
            <FavoriteIcon style={{ color: "red" }} />
            <Typography variant="body2" color="primary">
              {props.hospitalInfo["likes"]}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
}








LikeHistorySaved.propTypes = {
  // updateVerification: PropTypes.func.isRequired,
  // getAllSearchData: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  storedCredentials: state.user.credentials,
  // searchData: state.data.searchData
});

const mapActionsToProps = {
  // updateVerification,
  // getAllSearchData
};

export default connect(mapStateToProps, mapActionsToProps)(LikeHistorySaved);