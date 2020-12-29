import { Box, Grid, Typography } from '@material-ui/core';
import axios from 'axios';
import React from 'react';

export default function Country({ countryToFlag, value, classes, baseUrl }) {

    const [countryPopulation, setCountryPopulation] = React.useState(0);

    React.useEffect(() => {
        
        axios
            .get("https://restcountries.eu/rest/v2/alpha/" + value.ISO2)
            .then(({ data }) => {
                setCountryPopulation(data.population);
            })
            .catch((error) => {
                console.log(error)
            });
    }, [value]);

    return (
        <Grid item lg={12}>
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
                    <Box color="white">country population: {countryPopulation || 'no data'}</Box>
                </div>
            </Box>
        </Grid>
    )
}