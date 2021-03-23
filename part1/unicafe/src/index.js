import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({ handleClick, text }) => {
    return <button onClick={handleClick}>{text}</button>;
};

const Statistics = ({ text, value }) => {
    return (
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    );
};

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    const handleClickGood = () => setGood(prev => prev + 1);
    const handleClickNeutral = () => setNeutral(prev => prev + 1);
    const handleClickBad = () => setBad(prev => prev + 1);

    const all = good + neutral + bad;
    const average = (good - bad) / all;
    const positive = (good * 100) / all;

    return (
        <div>
            <h2>give feedback</h2>
            <Button handleClick={handleClickGood} text='good' />
            <Button handleClick={handleClickNeutral} text='neutral' />
            <Button handleClick={handleClickBad} text='bad' />

            <h2>statistics</h2>
            {all === 0 ? (
                <p>No feedback given</p>
            ) : (
                <table>
                    <tbody>
                        <Statistics text='good' value={good} />
                        <Statistics text='neutral' value={neutral} />
                        <Statistics text='bad' value={bad} />
                        <Statistics text='all' value={all} />
                        <Statistics text='average' value={average ? average : 0} />
                        <Statistics
                            text='positive'
                            value={positive ? `${positive} %` : 0}
                        />
                    </tbody>
                </table>
            )}
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
