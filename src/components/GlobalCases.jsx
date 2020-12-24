import { Box, Grid, Typography } from '@material-ui/core';
import React from 'react';
import axios from 'axios';

export default function GlobalCases({ baseUrl, classes }) {

    const [globalCases, setGlobalCases] = React.useState(null);
    const [lastGlobalUpdated, setLastGlobalUpdated] = React.useState(
        "loading..."
    );

    React.useEffect(() => {
        axios.get(baseUrl + "summary").then(({ data }) => {
            console.log(data);
            setGlobalCases(data.Global.TotalConfirmed);
            setLastGlobalUpdated(data.Date.substring(0, 10));
        });
    }, [globalCases]);

    return (
        <>
            <Grid item lg={6}>
                <Typography variant="h5">Global cases</Typography>
            </Grid>
            <Grid item lg={6}>
                <Box>
                    <Typography variant="h6">
                        {globalCases !== null ? globalCases : "loading..."}
                    </Typography>
                </Box>
                <Box>{`Up to date stats: ${lastGlobalUpdated}`}</Box>
            </Grid>
        </>
    )
}