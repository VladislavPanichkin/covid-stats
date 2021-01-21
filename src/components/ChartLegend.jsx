import React from 'react';
import { Box, Typography } from '@material-ui/core';

function ChartLegend({ classes }) {
    return (
        <Box className={classes.legendContainer}>
            <Box display="flex" alignItems="center">
                <div className={classes.chartLegend + " " + classes.chartLegend_red}></div>
                <Typography>Daily new cases</Typography>
            </Box>
            <Box display="flex" alignItems="center">
                <div className={classes.chartLegend + " " + classes.chartLegend_yellow}></div>
                <Typography>Daily new deaths</Typography>
            </Box>
        </Box>
    )
}

export default ChartLegend
