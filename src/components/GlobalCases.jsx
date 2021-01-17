import { Box, Grid, Typography } from '@material-ui/core';
import React from 'react';

export default function GlobalCases({ globalCases, lastGlobalUpdated, classes }) {

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