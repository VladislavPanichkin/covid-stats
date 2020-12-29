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
import {
  createMuiTheme,
  makeStyles,
  styled,
  ThemeProvider,
} from "@material-ui/core/styles";
import Country from "./components/Country";
import GlobalCases from "./components/GlobalCases";
import Charts from "./components/Charts";

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
      main: "#636363",
    },
    secondary: {
      main: "#898989",
    },
    textPrimary: {
      main: "#636363",
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
    color: "white",
  },

  gridContainer: {
    border: "1px solid #898989",
    padding: "0 1%",
    margin: 0,
    width: "100%",
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

  globalCasesContainer: {
    display: "flex",
    alignItems: "baseline",
  },

  rechartsContainer: {
    width: "75vw",
    height: "50vw"
  }
}));

const NavBar = styled(Toolbar)({
  flexDirection: "row",
  justifyContent: "space-between",
});

const baseUrl = "https://api.covid19api.com/";
const headers = {
  key: "5cf9dfd5-3449-485e-b5ae-70a60e997864",
};

const App = (props) => {
  const classes = useStyles();
  const [countries, setCountries] = React.useState(null);
  const [countryInputAvailable, setCountryInputAvailable] = React.useState(
    false
  );

  const [value, setValue] = React.useState(null);

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
                options={countries ? countries : []}
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
                <Grid container spacing={6} className={classes.gridContainer}>
                  {value != null ? (
                    <>
                      <Country
                        classes={classes}
                        value={value}
                        countryToFlag={countryToFlag}
                      />
                      <Charts
                        value={value}
                        theme={theme}
                        classes={classes}
                      />
                    </>
                  ) : (
                    <GlobalCases baseUrl={baseUrl} classes={classes} />
                  )}
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
