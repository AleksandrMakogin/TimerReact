import React, { useEffect, useState, useRef } from 'react';
import './App.css';

function setDefualtValue() {
	const userCount = localStorage.getItem('count');
	return userCount ? +userCount : 0;
}

function App() {
	const [count, setCount] = useState(setDefualtValue());
	const [isCounting, setisCounting] = useState(false);

	const timerId = useRef(null);

	const handleStart = () => {
		setisCounting(true);
	};

	const handleReset = () => {
		setCount(0);
		setisCounting(false);
	};

	const handleStop = () => {
		setisCounting(false);
	};

	useEffect(() => {
		if (isCounting) {
			timerId.current = setInterval(() => {
				setCount((prevCount) => prevCount + 1);
			}, 1000);
		}

		return () => {
			timerId.current && clearInterval(timerId.current);
			timerId.current = null;
		};
	}, [isCounting]);

	useEffect(() => {
		localStorage.setItem('count', count);
	}, [count]);
	return (
		<div className="App container ">
			<div class="container #bdbdbd grey lighten-1" style={{ borderRadius: 25 }}>
				<div className="col s6 #424242 grey darken-3 white-text">
					<h1>Timer</h1>
				</div>
				<h3 style={{ margin: 40, background: 'white', borderRadius: 25 }}>{count}</h3>
				{!isCounting ? (
					<a
						style={{ width: 150, margin: 20 }}
						class="waves-effect waves-light btn #424242 grey darken-3"
						onClick={handleStart}
					>
						Start
					</a>
				) : (
					<a
						style={{ width: 150, margin: 20 }}
						class="waves-effect waves-light btn #424242 grey darken-3"
						onClick={handleStop}
					>
						Stop
					</a>
				)}
				<a
					style={{ width: 150, margin: 20 }}
					class="waves-effect waves-light btn #424242 grey darken-3 "
					onClick={handleReset}
				>
					Reset
				</a>
			</div>
		</div>
	);
}

export default App;
