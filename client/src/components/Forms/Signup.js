import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import { register } from "../../store/utils/thunkCreators";
import { formStyles } from "./StyleForm";
import BackgroundImage from "./BackgroundImage";
import TopActionBar from "./TopActionBar";

const Login = (props) => {
  const { user, register } = props;
  const classes = formStyles();
  const [formErrorMessage, setFormErrorMessage] = useState({});

  const handleRegister = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setFormErrorMessage({ confirmPassword: "Passwords must match" });
      return;
    }

    await register({ username, email, password });
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
            <form onSubmit={handleRegister} className={classes.innerForm}>
              <Grid item xs={8} className={classes.gridItemForm}>
                <Typography align="left" variant="h6">
                  <b>Create an account.</b>
                </Typography>
              </Grid>
              <Grid item xs={8} className={classes.gridItemForm}>
                <FormControl margin="normal" required fullWidth>
                  <TextField
                    aria-label="username"
                    label="Username"
                    name="username"
                    type="text"
                    required
                  />
                </FormControl>
              </Grid>
              <Grid item xs={8} className={classes.gridItemForm}>
                <FormControl margin="normal" required fullWidth>
                  <TextField
                    label="E-mail address"
                    aria-label="e-mail address"
                    type="email"
                    name="email"
                    required
                  />
                </FormControl>
              </Grid>
              <Grid item xs={8} className={classes.gridItemForm}>
                <FormControl
                  margin="normal"
                  required
                  fullWidth
                  error={!!formErrorMessage.confirmPassword}
                >
                  <TextField
                    aria-label="password"
                    label="Password"
                    type="password"
                    inputProps={{ minLength: 6 }}
                    name="password"
                    required
                  />
                  <FormHelperText>
                    {formErrorMessage.confirmPassword}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={8} className={classes.gridItemForm}>
                <FormControl
                  margin="normal"
                  required
                  fullWidth
                  error={!!formErrorMessage.confirmPassword}
                >
                  <TextField
                    label="Confirm Password"
                    aria-label="confirm password"
                    type="password"
                    inputProps={{ minLength: 6 }}
                    name="confirmPassword"
                    required
                  />
                  <FormHelperText>
                    {formErrorMessage.confirmPassword}
                  </FormHelperText>
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
                  Create
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
    register: (credentials) => {
      dispatch(register(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
