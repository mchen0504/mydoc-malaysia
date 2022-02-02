import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import searchNotFoundImg from "../../img/results/searchnotfound.png";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  img: {
    objectFit: "cover",
    width: "100%",
    height: "100%",
  },
}));

export default function SearchNotFound() {
  const classes = useStyles();

  return (
    <Box display="flex" justifyContent="center">
      <div style={{ maxWidth: 600 }}>
        <img
          className={classes.img}
          src={searchNotFoundImg}
          alt="searchNotFoundImg"
        />
      </div>
    </Box>
  );
}
