import React from "react";
import {Redirect, useHistory} from "react-router-dom";
import {connect} from "react-redux";
import {
  Box,
  Button,
  CardMedia,
  FormControl,
  Grid,
  Hidden,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
  Typography
} from "@material-ui/core";
import {login} from "../../store/utils/thunkCreators";
import {formStyles} from "./StyleForm";



const Login = (props) => {
  const history = useHistory();
  const { user, login } = props;
  const classes = formStyles();
  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    await login({ username, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
      <Box height='100vh' display='flex' flexDirection='column'>
        <Grid container justify="center" className={classes.root}>
          <Hidden xsDown>
            <Grid item sm={5} className={classes.image}>
              <Box display="flex"
                   flexDirection="column"
                   alignItems="center"
                   justifyContent="center"
                   className={classes.imageBackground}>
                <CardMedia image='./assets/images/bubble.svg' className={classes.chatImage}/>
                <Box p={1}/>
                <Typography className={classes.textBackground}>Converse with anyone</Typography>
                <Typography className={classes.textBackground}>with any language</Typography>

              </Box>

            </Grid>
          </Hidden>
          <Grid item xs={12} sm={7}>
            <Box display="flex"
                 flexDirection="row"
                 alignItems="center"
                 justifyContent="flex-end" px={5} py={4}>
              <Typography color='textSecondary'>Don’t have an account?</Typography>
              <Button onClick={() => history.push("/register")} color="primary" size="large" className={classes.linkButton}>Create account</Button>
            </Box>
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
                className={classes.formContainer}
            >

              <form onSubmit={handleLogin} className={classes.innerForm}>
                <Grid item xs={8} className={classes.gridItemForm}>
                  <Typography align='left' variant="h6"><b>Welcome back!</b></Typography>
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
                  <Button type="submit" variant="contained" size="large" color="primary" className={classes.formButton}>
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
