import React from "react";
import axios from "axios";
import {
  AppBar,
  Container,
  Grid,
  IconButton,
  Paper,
  Toolbar,
  Typography,
  TextField,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { createMuiTheme, makeStyles, styled } from "@material-ui/core/styles";

import countries from "./assets/countryCodes";

const countryToFlag = (isoCode) => {
  return typeof String.fromCodePoint !== "undefined"
    ? isoCode
        .toUpperCase()
        .replace(/./g, (char) =>
          String.fromCodePoint(char.charCodeAt(0) + 127397)
        )
    : isoCode;
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  navBar: {
    background: "#898989",
  },

  main: {
    background: "#636363",
  },

  countrySelect: {
    fontSize: 15,
    "& > span": {
      marginRight: 10,
      fontSize: 18,
    },
  },
}));

const NavBar = styled(Toolbar)({
  flexDirection: "row",
  justifyContent: "space-between"
})

const App = (props) => {
  const classes = useStyles();

  return (
    <>
      <div className="App">
        <AppBar position="static" className={classes.navBar}>
          <NavBar>
            <Typography variant="h4" align="center">
              Covid-19 stats
            </Typography>
            <Autocomplete
              id="country-select"
              className={classes.countrySelect}
              options={countries}
              style={{ width: 300 }}
              autoHighlight
              getOptionLabel={(option) => option.label}
              renderOption={(option) => (
                <React.Fragment>
                  <span>{countryToFlag(option.code)}</span>
                  {option.label} {option.code}
                </React.Fragment>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Choose a country"
                  variant="outlined"
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: "new-password",
                  }}
                />
              )}
            ></Autocomplete>
          </NavBar>
        </AppBar>
      </div>

      <main>
        <Paper className={classes.main}>
          <Container>
            <Grid container>
              <Grid item md={6}>
                <div>aaaa</div>
              </Grid>
            </Grid>
          </Container>
        </Paper>
      </main>
    </>
  );
};

export default App;
