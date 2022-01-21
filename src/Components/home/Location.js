import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import parse from "autosuggest-highlight/parse";
import throttle from "lodash/throttle";

function loadScript(src, position, id) {
  if (!position) {
    return;
  }

  const script = document.createElement("script");
  script.setAttribute("async", "");
  script.setAttribute("id", id);
  script.src = src;
  position.appendChild(script);
}

const autocompleteService = { current: null };

const useStyles = makeStyles((theme) => ({
  icon: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(2),
  },
  inputRoot: {
    "& .MuiFilledInput-root": {
      backgroundColor: "rgba(255,255,255)",
      borderRadius: 4,
    },
    flex: 1,
  },
  autocompelte: {},

  search: {},
}));

// Autocomplete + Google MAP Api for Location search box
export default function Location(props) {
  const classes = useStyles();
  const [inputValue, setInputValue] = React.useState(props.currentLocation);
  const [options, setOptions] = React.useState([]);
  const loaded = React.useRef(false);

  if (typeof window !== "undefined" && !loaded.current) {
    if (!document.querySelector("#google-maps")) {
      loadScript(
        "https://maps.googleapis.com/maps/api/js?key=AIzaSyDIrcr-B4aW4aiYZDc2_v-egqfKPvpjD_g&libraries=places&region=MY",
        document.querySelector("head"),
        "google-maps"
      );
    }

    loaded.current = true;
  }

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleUserSelection = (targetLocation) => {
    let targetValue = "";
    if (targetLocation) {
      targetValue = targetLocation.description;
    }
    props.getLocationValue(targetValue);
  };

  const fetch = React.useMemo(
    () =>
      throttle((request, callback) => {
        autocompleteService.current.getPlacePredictions(request, callback);
      }, 200),
    []
  );

  React.useEffect(() => {
    let active = true;

    if (!autocompleteService.current && window.google) {
      autocompleteService.current =
        new window.google.maps.places.AutocompleteService();
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === "") {
      setOptions([]);
      return undefined;
    }

    fetch({ input: inputValue }, (results) => {
      if (active) {
        setOptions(results || []);
      }
    });

    return () => {
      active = false;
    };
  }, [inputValue, fetch]);

  let currentAddress = "Loading your current location...";
  if (props.currentLocation) {
    currentAddress = props.currentLocation;
  }

  return (
    <div>
      <Autocomplete
        disabled
        onChange={(event, value) => {
          handleUserSelection(value);
        }}
        className={classes.autocomplete}
        getOptionLabel={(option) => {
          return typeof option === "string" ? option : option.description;
        }}
        filterOptions={(x) => x}
        options={options}
        autoComplete
        includeInputInList
        renderInput={(params) => (
          <TextField
            {...params}
            label="Location search is not currently available"
            placeholder={currentAddress}
            onChange={handleChange}
            variant="filled"
            className={classes.inputRoot}
            InputProps={{ ...params.InputProps, disableUnderline: true }}
          />
        )}
        renderOption={(option) => {
          const matches =
            option.structured_formatting.main_text_matched_substrings;
          const parts = parse(
            option.structured_formatting.main_text,
            matches.map((match) => {
              return [match.offset, match.offset + match.length];
            })
          );
          let allOptions = parts.map((part, index) => {
            return (
              <span
                key={index}
                style={{ fontWeight: part.highlight ? 700 : 400 }}
              >
                {part.text}
              </span>
            );
          });

          return (
            <div>
              <Grid container alignItems="center">
                <Grid item>
                  <LocationOnIcon className={classes.icon} />
                </Grid>
                <Grid item xs>
                  {allOptions}
                  <Typography variant="body2" color="textSecondary">
                    {option.structured_formatting.secondary_text}
                  </Typography>
                </Grid>
              </Grid>
            </div>
          );
        }}
      ></Autocomplete>
    </div>
  );
}
