import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Button, Typography } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  linkButton: {
    borderRadius: 5,
    filter: "drop-shadow(0px 2px 6px rgba(74,106,149,0.2));",
    backgroundColor: "#ffffff",
    paddingInline: 30,
    paddingBlock: 15,
    marginLeft: 20,
  },
}));

const TopActionBar = (props) => {
  const history = useHistory();
  const classes = useStyles();
  const { leftTitle, rightButtonLink, rightButtonTitle } = props;
  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="flex-end"
      px={5}
      py={4}
    >
      <Typography color="textSecondary">{leftTitle}</Typography>
      <Button
        onClick={() => history.push(rightButtonLink)}
        color="primary"
        size="large"
        className={classes.linkButton}
      >
        {rightButtonTitle}
      </Button>
    </Box>
  );
};

export default TopActionBar;
