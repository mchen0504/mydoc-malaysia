import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Autocomplete from "@material-ui/lab/Autocomplete";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Chip from "@material-ui/core/Chip";
import Hidden from "@material-ui/core/Hidden";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  ...theme.account,
}));

// only doctor edit profile (no account tabs on the side)
// michelle改的/加的
export default function DocEditProfile() {
  const classes = useStyles();

  //publish switch
  const [publish, setPublish] = React.useState({
    checked: false,
  });
  const handlePublishChange = (event) => {
    setPublish({ ...publish, [event.target.name]: event.target.checked });
  };

  //gender
  const [gender, setGender] = React.useState("");
  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };
  const { male, female } = gender;

  //hospital type
  const [hospType, setHospType] = React.useState("");
  const handleHospTypeChange = (event) => {
    setHospType(event.target.value);
  };

  //appointment
  const [appointment, setAppointment] = React.useState({
    call: false,
    online: false,
    email: false,
    onsite: true,
  });
  const handleAppointmentChange = (event) => {
    setAppointment({
      ...appointment,
      [event.target.name]: event.target.checked,
    });
  };
  const { call, online, email, onsite } = appointment;

  //procedures
  const [procedure, setProcedure] = React.useState([]);

  //condition
  const [condition, setCondition] = React.useState([]);

  return (
    <a id="profile" className={classes.anchor}>
      <Grid container spacing={0}>
        <Grid item xs={1}></Grid>
        <Grid item xs={10} md={8}>
          <Box display="flex" mt={4} mb={3} flexWrap="wrap" alignItems="center">
            <Box flexGrow={1}>
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
                <strong>Profile</strong>
              </Typography>
            </Box>
            {/* Publish/not publish switch */}
            <Box>
              <Switch
                checked={publish.check}
                onChange={handlePublishChange}
                name="checked"
              />
              <span>Publish your profile</span>
            </Box>
          </Box>
          <br></br>
          <Typography variant="body1">
            Please fill out the profile to the best of your ability. The more
            complete your profile is, the more easily users will be able to find
            you.<br></br>
            <br></br> * Required
          </Typography>
          <br></br>
          <br></br>
          <Box display="flex" mt={2} mb={3}>
            <Typography variant="h6" color="primary">
              Personal Information
            </Typography>
          </Box>
          {/* First name */}
          <TextField fullWidth required label="First Name" variant="outlined" />
          <br></br>
          <br></br>
          {/* Last name */}
          <TextField fullWidth required label="Last Name" variant="outlined" />
          <br></br>
          <br></br>
          {/* Gender */}
          <FormControl variant="outlined" fullWidth>
            <InputLabel>Gender</InputLabel>
            <Select value={gender} onChange={handleGenderChange} label="Gender">
              <MenuItem value={male}>Male</MenuItem>
              <MenuItem value={female}>Female</MenuItem>
            </Select>
          </FormControl>
          <br></br>
          <br></br>
          {/* Years of prac */}
          <TextField
            fullWidth
            required
            label="Years of Practice"
            variant="outlined"
          />
          <br></br>
          <br></br>
          {/* Save button */}
          <Button
            variant="contained"
            color="primary"
            style={{ textTransform: "none", float: "right" }}
            size="large"
          >
            Save
          </Button>
          <br></br>
          <br></br>
          <br></br>
          <Box display="flex" mb={3}>
            <Typography variant="h6" color="primary">
              Work Information
            </Typography>
          </Box>
          {/* Hospital name */}
          <Autocomplete
            options={hospitals}
            getOptionLabel={(option) => option.hospName}
            fullWidth
            required
            renderInput={(params) => (
              <TextField
                required
                {...params}
                label="Hospital Name"
                variant="outlined"
              />
            )}
          />
          <br></br>
          <br></br>
          {/* Hospital type */}
          <FormControl component="fieldset" required>
            <FormLabel component="legend">Hospital Type</FormLabel>
            <RadioGroup
              name="hospType"
              value={hospType}
              onChange={handleHospTypeChange}
            >
              <Box>
                <FormControlLabel
                  value="public"
                  control={<Radio required />}
                  label="Public"
                  style={{ marginRight: 100 }}
                />
                <FormControlLabel
                  value="private"
                  control={<Radio required />}
                  label="Private"
                />
              </Box>
            </RadioGroup>
          </FormControl>
          <br></br>
          <br></br>
          {/* Work phone number */}
          <FormControl
            component="fieldset"
            fullWidth
            style={{ marginBottom: 30 }}
          >
            <FormLabel component="legend" style={{ marginBottom: 20 }}>
              Work Phone Number
            </FormLabel>
            <TextField
              required
              fullWidth
              label="Phone Number"
              variant="outlined"
            />
          </FormControl>
          <br></br>
          {/* Work address */}
          <FormControl component="fieldset" fullWidth>
            <FormLabel component="legend" style={{ marginBottom: 20 }}>
              Work Address
            </FormLabel>
            <TextField
              fullWidth
              label="Buildling Unit/ Floor/ Block"
              variant="outlined"
            />
          </FormControl>
          <br></br>
          <br></br>
          <TextField
            required
            fullWidth
            label="Street Name"
            variant="outlined"
          />
          <br></br>
          <br></br>
          <TextField required fullWidth label="City" variant="outlined" />
          <br></br>
          <br></br>
          <Autocomplete
            fullWidth
            options={states}
            getOptionLabel={(option) => option.state}
            renderInput={(params) => (
              <TextField
                required
                {...params}
                label="State"
                variant="outlined"
              />
            )}
          />
          <br></br>
          <TextField required fullWidth label="Postcode" variant="outlined" />
          <br></br>
          <br></br>
          <Button
            variant="contained"
            color="primary"
            style={{ textTransform: "none", float: "right" }}
            size="large"
          >
            Save
          </Button>
          <br></br>
          <br></br>
          <br></br>
          {/* Ways to make appointment */}
          <Box display="flex" mt={2} mb={3}>
            <Typography variant="h6" color="primary">
              Ways to Make Appointment
            </Typography>
          </Box>
          <FormControl component="fieldset" fullWidth>
            <Box display="flex" alignItems="center">
              {/* Call */}
              <Box mr={2} mt={1}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={call}
                      onChange={handleAppointmentChange}
                      name="call"
                    />
                  }
                  label="Call"
                />
              </Box>
              <Box flexGrow={1}>
                <TextField
                  disabled={call === false ? true : false}
                  fullWidth
                  required
                  size="small"
                  label="Phone Number"
                  variant="outlined"
                />
              </Box>
            </Box>
            {/* Online */}
            <Box display="flex" alignItems="center">
              <Box mt={2}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={online}
                      onChange={handleAppointmentChange}
                      name="online"
                    />
                  }
                  label="Online"
                />
              </Box>
              <Box flexGrow={1} mt={2}>
                <TextField
                  disabled={online === false ? true : false}
                  fullWidth
                  required
                  size="small"
                  label="Link"
                  variant="outlined"
                />
              </Box>
            </Box>
            {/* Email */}
            <Box display="flex" alignItems="center">
              <Box mr={1} mt={2}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={email}
                      onChange={handleAppointmentChange}
                      name="email"
                    />
                  }
                  label="Email"
                />{" "}
              </Box>
              <Box flexGrow={1} mt={2}>
                <TextField
                  disabled={email === false ? true : false}
                  fullWidth
                  required
                  size="small"
                  label="Email Address"
                  variant="outlined"
                />
              </Box>
            </Box>
            {/* On site */}
            <Box mt={2}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={onsite}
                    onChange={handleAppointmentChange}
                    name="onsite"
                  />
                }
                label="On site"
              />
            </Box>
          </FormControl>
          <br></br>
          <br></br>
          <Button
            variant="contained"
            color="primary"
            style={{ textTransform: "none", float: "right" }}
            size="large"
          >
            Save
          </Button>
          <br></br>
          <br></br>
          <br></br>
          <Box display="flex" mt={2} mb={3}>
            <Typography variant="h6" color="primary">
              Expertise
            </Typography>
          </Box>
          {/* Specialty */}
          <Autocomplete
            fullWidth
            required
            options={specialties}
            getOptionLabel={(option) => option.specialty}
            renderInput={(params) => (
              <TextField
                required
                {...params}
                label="Specialty"
                variant="outlined"
              />
            )}
          />
          <br></br>
          {/* Qualifications */}
          <TextField
            fullWidth
            required
            label="Qualifications"
            variant="outlined"
          />
          <br></br>
          <br></br>
          {/* Add procedure */}
          <Autocomplete
            multiple
            options={procedure}
            freeSolo
            renderTags={(value, getTagProps) =>
              value.map((proc, index) => (
                <Chip
                  variant="outlined"
                  label={proc}
                  {...getTagProps({ index })}
                />
              ))
            }
            renderInput={(params) => (
              <TextField
                required
                {...params}
                variant="outlined"
                label="Procedures"
                helperText="Type and press 'enter' key to add a procedure"
              />
            )}
          />
          <br></br>
          {/* Add condition */}
          <Autocomplete
            multiple
            options={condition}
            freeSolo
            renderTags={(value, getTagProps) =>
              value.map((cond, index) => (
                <Chip
                  variant="outlined"
                  label={cond}
                  {...getTagProps({ index })}
                />
              ))
            }
            renderInput={(params) => (
              <TextField
                required
                {...params}
                variant="outlined"
                label="Conditions"
                helperText="Type and press 'enter' key to add a condition"
              />
            )}
          />
          <br></br>
          {/* Languages */}
          <Autocomplete
            multiple
            options={languages.map((option) => option.language)}
            freeSolo
            renderTags={(value, getTagProps) =>
              value.map((language, index) => (
                <Chip
                  variant="outlined"
                  label={language}
                  {...getTagProps({ index })}
                />
              ))
            }
            renderInput={(params) => (
              <TextField
                required
                {...params}
                variant="outlined"
                label="Languages"
                helperText="Add a language"
              />
            )}
          />
          <br></br>
          <br></br>
          <Button
            variant="contained"
            color="primary"
            style={{ textTransform: "none", float: "right" }}
            size="large"
          >
            Save
          </Button>
          <br></br>
          <br></br>
          <br></br>
        </Grid>
        <Grid item xs={1} md={3}></Grid>
      </Grid>
    </a>
  );
}

const hospitals = [
  { hospName: "Pantai Hospital Kuala Lumpur" },
  { hospName: "Sunway Medical Centre" },
];

const states = [
  { state: "Kuala Lumpur" },
  { state: "Selangor" },
  { state: "Johor" },
  { state: "Melaka" },
  { state: "Negeri Sembilan" },
  { state: "Pahang" },
  { state: "Perak" },
  { state: "Kelantan" },
  { state: "Terengganu" },
  { state: "Kedah" },
  { state: "Pulau Pinang" },
  { state: "Perlis" },
  { state: "Sabah" },
  { state: "Sarawak" },
  { state: "Labuan" },
  { state: "Putrajaya" },
];

const specialties = [
  { specialty: "Allergy and Immunology" },
  { specialty: "Anesthesiology" },
  { specialty: "Arthroplasty" },
  { specialty: "Allergy and Immunology" },
  { specialty: "Gastroenterology" },
];

const languages = [
  { language: "English" },
  { language: "Malay" },
  { language: "Mandarin" },
  { language: "Tamil" },
];
