import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  Box,
  Button,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import { forget } from "../../store/utils/thunkCreators";
import { formStyles } from "./StyleForm";
import BackgroundImage from "./BackgroundImage";
import TopActionBar from "./TopActionBar";

const Forget = (props) => {
  const { user, forget } = props;
  const classes = formStyles();
  const handleForget = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    await forget({ email });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }
  return (
    <Box height="100vh" display="flex" flexDirection="column">
      <Grid container justify="center" className={classes.root}>
        <BackgroundImage />
        <Grid item xs={12} sm={7}>
          <TopActionBar
            leftTitle="Already have an account?"
            rightButtonTitle="Login"
            rightButtonLink="/login"
          />
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            className={classes.formContainer}
          >
            <form onSubmit={handleForget} className={classes.innerForm}>
              <Grid item xs={8} className={classes.gridItemForm}>
                <Typography align="left" variant="h6">
                  <b>Forgotten your password!</b>
                </Typography>
              </Grid>
              <Grid item xs={8} className={classes.gridItemForm}>
                <FormControl margin="normal" required fullWidth>
                  <TextField
                    aria-label="email"
                    label="Email"
                    name="email"
                    type="email"
                    required
                  />
                </FormControl>
              </Grid>
              <Grid item xs={8} className={classes.gridItemForm}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  color="primary"
                  className={classes.formButton}
                >
                  Forget
                </Button>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    forget: (credentials) => {
      dispatch(forget(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Forget);
