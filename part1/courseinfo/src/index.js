import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({ course }) => {
    return <h1>{course}</h1>;
};

const Part = ({ part, exercises }) => {
    return (
        <p>
            {part} {exercises}
        </p>
    );
};

const Content = props => {
    return (
        <div>
            <Part part={props.part1} exercises={props.exercises1} />
            <Part part={props.part2} exercises={props.exercises2} />
            <Part part={props.part3} exercises={props.exercises3} />
        </div>
    );
};

const Total = ({ ex1, ex2, ex3 }) => {
    return <p>Number of exercises: {ex1 + ex2 + ex3}</p>;
};

const App = () => {
    const course = 'Half Stack application development';
    const part1 = {
        name: 'Fundamentals of React',
        exercises: 10,
    };
    const part2 = {
        name: 'Using props to pass data',
        exercises: 7,
    };
    const part3 = {
        name: 'State of a component',
        exercises: 14,
    };

    return (
        <div>
            <Header course={course} />
            <Content
                part1={part1.name}
                part2={part2.name}
                part3={part3.name}
                exercises1={part1.exercises}
                exercises2={part2.exercises}
                exercises3={part3.exercises}
            />
            <Total
                ex1={part1.exercises}
                ex2={part2.exercises}
                ex3={part3.exercises}
            />
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
