import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, CardMedia, Grid, Hidden, Typography } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  imageBackground: {
    background: "linear-gradient(180deg, #3a8dff 0%, #86b9ff 100%);",
    opacity: "85%",
    height: "100%",
  },
  image: {
    backgroundImage: "url(/assets/images/bg-img.png)",
    backgroundSize: "cover",
  },
  chatImage: {
    width: 67,
    height: 66,
  },
  textBackground: {
    fontSize: 26,
    color: "#ffffff",
    fontWeight: 400,
    fontFamily: "Open Sans",
    textAlign: "center",
  },
}));

const BackgroundImage = (props) => {
  const classes = useStyles();
  return (
    <Hidden xsDown>
      <Grid item sm={5} className={classes.image}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          className={classes.imageBackground}
        >
          <CardMedia
            image="./assets/images/bubble.svg"
            className={classes.chatImage}
          />
          <Box p={1} />
          <Typography className={classes.textBackground}>
            Converse with anyone
          </Typography>
          <Typography className={classes.textBackground}>
            with any language
          </Typography>
        </Box>
      </Grid>
    </Hidden>
  );
};

export default BackgroundImage;
