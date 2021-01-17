import React from 'react';
import { Box } from '@material-ui/core';

function ChartLegend({ classes }) {
    return (
        <Box className={classes.legendContainer}>
            <Box display="flex" alignItems="center">
                <div className={classes.chartLegend + " " + classes.chartLegend_red}></div>
                <div display="inlineBlock">Daily new cases</div>
            </Box>
            <Box display="flex" alignItems="center">
                <div className={classes.chartLegend + " " + classes.chartLegend_yellow}></div>
                <div display="inlineBlock">Daily new deaths</div>
            </Box>
        </Box>
    )
}

export default ChartLegend
