import React from 'react';
import axios from 'axios';
import {
    XAxis, YAxis, CartesianGrid, AreaChart, Area, ResponsiveContainer, Tooltip,
} from 'recharts';
import { ThemeProvider } from '@material-ui/core';

export default function Charts({ value, theme, classes }) {

    const [countryData, setCountryData] = React.useState(null);

    React.useEffect(() => {
        if (value) {
            axios
                .get("https://corona-api.com/countries/" + value.ISO2)
                .then((data) => {
                    setCountryData(data.data.data.timeline);
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
                <div className={classes.rechartsContainer}>
                    <ResponsiveContainer width='100%' height='100%'>
                        <AreaChart
                            data={countryData}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5
                            }}
                        >
                            <XAxis stroke="#898989" dataKey="date" />
                            <YAxis stroke="#898989" scale={'sqrt'} interval={'preserveStart'} />
                            <CartesianGrid strokeDasharray="3 3" />
                            <Area
                                type="monotone" dataKey="new_confirmed"
                                stroke="red" fill="red" />
                            <Area
                                type="monotone" dataKey="new_deaths"
                                stroke="yellow" fill="yellow"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            : ''}
        </ThemeProvider>
    )
}
