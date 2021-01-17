import axios from 'axios';
import React from 'react';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer} from 'recharts';
import ChartLegend from './ChartLegend';

function GlobalChart({ classes }) {

    const [globalData, setGlobalData] = React.useState(null);

    React.useEffect(() => {
        axios
            .get("https://corona-api.com/timeline")
            .then((response) => {
                const responseArray = [].concat.apply([], response.data.data)
                setGlobalData(responseArray);
                console.log(responseArray)
            })
    }, []);

    return (
        <div className={classes.rechartsContainer}>
            <ChartLegend classes={classes} />
            <ResponsiveContainer width='100%' height='85%'>
                <LineChart width={600} height={300} data={globalData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <XAxis stroke="#898989" dataKey="date" />
                    <YAxis stroke="#898989" scale={'sqrt'} interval={'preserveStart'}/>
                    <CartesianGrid strokeDasharray="3 3" />
                    <Line type="monotone" dataKey="new_confirmed" stroke="red" dot={false}/>
                    <Line type="monotone" dataKey="new_deaths" stroke="yellow" dot={false}/>
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default GlobalChart