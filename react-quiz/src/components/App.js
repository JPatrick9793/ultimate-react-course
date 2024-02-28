// import DateCounter from "./DateCounter";
import Header from "./Header";
import Main from "./Main";
import Error from "./Error";
import Loader from "./Loader";
import StartScreen from "./StartScreen";
import { useEffect, useReducer } from "react";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";

// initial state
const initialState = {
	questions: [],
	// 'loading', 'error', 'ready', 'active', 'finished'
	status: "loading",
	index: 0,
	answer: null,
	points: 0,
	highScore: 0,
};

// Reducer to handle state updates
function reducer(state, action) {
	switch (action.type) {
		case "dataReceived":
			return {
				...state,
				questions: action.payload,
				status: "ready",
			};
		case "dataFailed":
			return {
				...state,
				errorMessage: action.payload,
				status: "error",
			};
		case "start":
			return { ...state, status: "active" };
		case "newAnswer":
			const question = state.questions.at(state.index);
			return {
				...state,
				answer: action.payload,
				points:
					action.payload === question.correctOption
						? state.points + question.points
						: state.points,
			};
		case "nextQuestion":
			const numQuestions = state.questions.length;
			const isFinished = state.index >= numQuestions - 1;
			return {
				...state,
				index:
					state.index < numQuestions - 1
						? state.index + 1
						: state.index,
				answer: null,
				status: isFinished ? "finished" : state.status,
				highScore: isFinished
					? state.highScore > state.points
						? state.highscore
						: state.points
					: state.highScore,
			};
		default:
			return initialState;
	}
}

export default function App() {
	const [
		{ questions, status, index, answer, points, highScore },
		dispatch,
	] = useReducer(reducer, initialState);

	const numQuestions = questions.length;
	const numPossiblePoints = questions.reduce(
		(prev, curr) => prev + curr.points,
		0
	);

	// useEffect to grab data from "fake API"
	useEffect(function () {
		setTimeout("", 5000);
		fetch("http://localhost:8000/questions")
			.then((res) => res.json())
			.then((data) =>
				dispatch({ type: "dataReceived", payload: data })
			)
			.catch((err) =>
				dispatch({ type: "dataFailed", payload: err })
			);
	}, []);

	return (
		<div className='app'>
			{/* <DateCounter></DateCounter> */}
			<Header></Header>
			<Main>
				{status === "loading" && <Loader />}
				{status === "error" && <Error />}
				{status === "ready" && (
					<StartScreen
						numQuestions={numQuestions}
						dispatch={dispatch}
					/>
				)}
				{status === "active" && (
					<>
						<Progress
							index={index}
							numQuestions={numQuestions}
							points={points}
							numPossiblePoints={numPossiblePoints}
							answer={answer}
						></Progress>
						<Question
							question={questions.at(index)}
							answer={answer}
							dispatch={dispatch}
						/>
						<NextButton
							dispatch={dispatch}
							answer={answer}
						></NextButton>
					</>
				)}
				{status === "finished" && (
					<FinishScreen
						points={points}
						numPossiblePoints={numPossiblePoints}
						highScore={highScore}
					></FinishScreen>
				)}
			</Main>
		</div>
	);
}
