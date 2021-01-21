import React from 'react';

const Count = props => {

    const duration = 2500;

    const [count, setCount] = React.useState("0");

    const number = props.number;

    React.useEffect(() => {
        let start = 0;
        const end = number;

        if (start === end) return;

        let totalMilSecDur = parseInt(duration);
        let incrementTime = (totalMilSecDur / end) * 1000;
        
        let timer = setInterval(() => {
            start += 1;
            setCount(String(start) + number);
            if (start === end) clearInterval(timer);
        }, incrementTime);
    }, [number, duration] );

    return (
        <div className="Count">
            {count}
        </div>
    )
}

export default Count;