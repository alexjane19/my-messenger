import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  Box,
  Button,
  FormControl,
  Grid,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
  Typography,
} from "@material-ui/core";
import { login } from "../../store/utils/thunkCreators";
import { formStyles } from "./StyleForm";
import BackgroundImage from "./BackgroundImage";
import TopActionBar from "./TopActionBar";

const Login = (props) => {
  const { user, login } = props;
  const classes = formStyles();
  const handleLogin = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    await login({ email, password });
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
            leftTitle="Don’t have an account?"
            rightButtonTitle="Create account"
            rightButtonLink="/register"
          />
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            className={classes.formContainer}
          >
            <form onSubmit={handleLogin} className={classes.innerForm}>
              <Grid item xs={8} className={classes.gridItemForm}>
                <Typography align="left" variant="h6">
                  <b>Welcome back!</b>
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
                <FormControl margin="normal" required fullWidth>
                  <InputLabel>Password</InputLabel>
                  <Input
                    label="Password"
                    aria-label="password"
                    type="password"
                    name="password"
                    endAdornment={
                      <InputAdornment position="end">
                        <Button color="primary">Forgot?</Button>
                      </InputAdornment>
                    }
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
                  Login
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
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
