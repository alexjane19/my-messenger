import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
  FormHelperText,
  Hidden,
  CardMedia,
} from "@material-ui/core";
import { register } from "../../store/utils/thunkCreators";
import { formStyles } from "./StyleForm";

const Login = (props) => {
  const history = useHistory();
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
        <Grid item xs={12} sm={7}>
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="flex-end"
            px={5}
            py={4}
          >
            <Typography color="textSecondary">
              Already have an account?
            </Typography>
            <Button
              onClick={() => history.push("/login")}
              color="primary"
              size="large"
              className={classes.linkButton}
            >
              Login
            </Button>
          </Box>
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
