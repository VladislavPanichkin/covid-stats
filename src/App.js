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
  Box,
  CircularProgress,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { createMuiTheme, makeStyles, styled, ThemeProvider } from "@material-ui/core/styles";

const countryToFlag = (isoCode) => {
  return typeof String.fromCodePoint !== "undefined"
    ? isoCode
        .toUpperCase()
        .replace(/./g, (char) =>
          String.fromCodePoint(char.charCodeAt(0) + 127397)
        )
    : isoCode;
};

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#fff",
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  navBar: {
    background: "#898989",
  },

  main: {
    background: "#636363",
    height: "80vw",
    "&:first-child": {
      padding: "1%",
    },
  },

  gridContainer: {
    border: "1px solid #898989",
    padding: "0 1%",
  },

  countrySelect: {
    fontSize: 15,
    "& > span": {
      marginRight: 10,
      fontSize: 18,
    },
  },

  flagContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },

  flag: {
    fontSize: "4rem",
    marginRight: "0.5rem",
  },

  countryName: {
    color: "white",
    display: "inline-block",
  },
}));

const NavBar = styled(Toolbar)({
  flexDirection: "row",
  justifyContent: "space-between",
});

const baseUrl = "https://api.covid19api.com/";

const App = (props) => {
  const classes = useStyles();
  const [countries, setCountries] = React.useState(null);
  const [countryInputAvailable, setCountryInputAvailable] = React.useState(
    false
  );
  const [globalCases, setGlobalCases] = React.useState(null)

  const [value, setValue] = React.useState(null);

  // DOESN'T WORK
  React.useEffect(() => {
    setCountryInputAvailable(false);
    axios
      .get(baseUrl + "countries")
      .then(({ data }) => {
        setCountries(data);
      })
      .then(() => {
        setCountryInputAvailable(true);
      });
  }, []);

  React.useEffect(() => {
    axios
      .get(baseUrl + "summary")
      .then(({ data }) => {
        console.log(data);
        setGlobalCases(data.Global.TotalConfirmed);
      })
  }, [globalCases])

  return (
    <>
      <ThemeProvider theme={theme}>
        <div className="App">
          <AppBar position="static" className={classes.navBar}>
            <NavBar>
              <Typography variant="h4" align="center">
                Covid-19 stats
              </Typography>
              <Autocomplete
                id="country-select"
                className={classes.countrySelect}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
                options={countries}
                style={{ width: 300 }}
                autoHighlight
                disabled={!countryInputAvailable}
                getOptionLabel={(option) => option.Country}
                renderOption={(option) => (
                  <React.Fragment>
                    <span>
                      {option.ISO2 ? countryToFlag(option.ISO2) : null}
                    </span>
                    {option.Country}
                  </React.Fragment>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={
                      countryInputAvailable ? (
                        "Choose a country"
                      ) : (
                        <CircularProgress color="inherit" size={20} />
                      )
                    }
                    variant="outlined"
                    InputProps={{
                      ...params.InputProps,
                      autoComplete: "new-password",
                    }}
                  />
                )}
              ></Autocomplete>
            </NavBar>
          </AppBar>

          <main>
            <Paper className={classes.main}>
              <Container>
                <Grid container className={classes.gridContainer}>
                  <Grid item lg={12}>
                    {value != null ? (
                      <>
                        <Box className={classes.flagContainer}>
                          <span className={classes.flag}>
                            {countryToFlag(value.ISO2)}
                          </span>
                          <div>
                            <Typography
                              variant="h5"
                              className={classes.countryName}
                            >
                              {value.Country}
                            </Typography>
                            <Box color="white">country population</Box>
                          </div>
                        </Box>
                        <Box>last updated:</Box>
                      </>
                    ) : (
                      <>
                        <Box>
                          <Typography variant="h5" color="primary">
                            Global cases
                          </Typography>
                          <Box>
                            {globalCases !== null ? globalCases : 'loading...'}
                          </Box>
                        </Box>
                      </>
                    )}
                  </Grid>
                </Grid>
              </Container>
            </Paper>
          </main>
        </div>
      </ThemeProvider>
    </>
  );
};

export default App;
