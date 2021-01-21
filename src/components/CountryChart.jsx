import React from 'react';
import axios from 'axios';
import { XAxis, YAxis, CartesianGrid, AreaChart, Area, ResponsiveContainer } from 'recharts';
import { Box, ThemeProvider } from '@material-ui/core';
import ChartLegend from './ChartLegend';
import Summary from './Summary';

export default function CountryChart({ value, theme, classes }) {

    const [countryData, setCountryData] = React.useState(null);

    React.useEffect(() => {
        if (value) {
            axios
                .get("https://corona-api.com/countries/" + value)
                .then((data) => {
                    setCountryData(data.data.data);
                    //log in data.data.timeline - contains an array of such objects: 
                    //active: 1720
                    // confirmed: 5910
                    // date: "2020-12-25"
                    // deaths: 60
                    // is_in_progress: true
                    // new_confirmed: 194
                    // new_deaths: 0
                    // new_recovered: 52
                    // recovered: 4130
                    // updated_at: "2020-12-25T22:12:39.285Z"
                })
        }
    }, [value]);

    return (
        <ThemeProvider theme={theme}>
            {countryData ?
            <>
                <div className={classes.rechartsContainer}>
                    <ChartLegend classes={classes} />
                    <ResponsiveContainer width='100%' height='85%'>
                        <AreaChart
                            data={countryData.timeline}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5
                            }}
                        >
                            <XAxis stroke="#898989" dataKey="date" />
                            <YAxis stroke="#898989" scale={'sqrt'} tickCount={50} interval={'preserveEnd'} />
                            <CartesianGrid strokeDasharray="3 3" />
                            <Area
                                type="monotone" dataKey="new_confirmed"
                                stroke="#DEDB28" fill="#DEDB28" />
                            <Area
                                type="monotone" dataKey="new_deaths"
                                stroke="#DE1212" fill="#DE1212"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
                <Summary classes={classes} countryData={countryData}/>
                </>
                : <div>No data</div>}
        </ThemeProvider>
    )
}
