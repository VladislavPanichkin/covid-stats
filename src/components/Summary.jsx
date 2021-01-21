import React from 'react';
import { Container, Grid, Table, TableCell, TableContainer, TableHead, TableRow, withStyles, Paper, TableBody } from '@material-ui/core';

const StyledTableCell = withStyles(() => ({
    head: {
        backgroundColor: "#898989",
        color: "white"
    },
    body: {
        color: "white"
    }
}))(TableCell);

const StyledTableRow = withStyles(() => ({
    root: {

        backgroundColor: "#636363",

        '&:nth-of-type(odd)': {
            backgroundColor: "#898989",
            color: "white"
        }
    }
}))(TableRow);

function createData(cellName, value) {
    return { cellName, value };
}

const Summary = ({ classes, countryData }) => {

    const latestData = countryData.latest_data;

    const tables = {
        casesRows: [
            createData('New 24h', "+" + countryData.today.confirmed),
            createData('pop/1 Million', latestData.calculated.cases_per_million_population),
            createData('Critical', latestData.critical),
            createData('Recovered', latestData.recovered),
            createData('Total', latestData.confirmed)
        ],

        deathsRows: [
            createData('New 24h', "+" + countryData.today.deaths),
            createData('Death Rate', latestData.calculated.death_rate.toFixed(2)),
            createData('Total', latestData.deaths)
        ]
    };

    const casesRows = [
        createData('New 24h', "+" + countryData.today.confirmed),
        createData('pop/1 Million', latestData.calculated.cases_per_million_population),
        createData('Critical', latestData.critical),
        createData('Recovered', latestData.recovered),
        createData('Total', latestData.confirmed)
    ];

    const deathsRows = [
        createData('New 24h', "+" + countryData.today.deaths),
        createData('Death Rate', latestData.calculated.death_rate.toFixed(2)),
        createData('Total', latestData.deaths)
    ]

    return (
        <Grid container spacing={2} className={classes.gridContainer}>
            <Grid item xl={4} xs={6}>
                <TableContainer component={Paper} >
                    <Table className={classes.summaryTable} >
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Cases</StyledTableCell>
                                <StyledTableCell></StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tables.casesRows.map((row) => (
                                <StyledTableRow key={row.cellName}>
                                    <StyledTableCell component="th" scope="row">
                                        {row.cellName}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">{row.value}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            <Grid item xl={4} xs={6}>
                <TableContainer component={Paper} >
                    <Table className={classes.summaryTable} >
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Deaths</StyledTableCell>
                                <StyledTableCell></StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tables.deathsRows.map((row) => (
                                <StyledTableRow key={row.cellName}>
                                    <StyledTableCell component="th" scope="row">
                                        {row.cellName}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">{row.value}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    )
}

export default Summary
