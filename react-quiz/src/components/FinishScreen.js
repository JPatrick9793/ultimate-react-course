function FinishScreen({
	points,
	numPossiblePoints,
	highScore,
}) {
	const score_pct = (points / numPossiblePoints) * 100;

	let emoji;
	if (score_pct === 100) emoji = "🥇";
	if (100 > score_pct && score_pct >= 80) emoji = "🥈";
	if (80 > score_pct && score_pct >= 60) emoji = "🥉";
	if (60 > score_pct && score_pct >= 0) emoji = "🤡";

	return (
		<div className='result'>
			<p>
				<span>{emoji}</span> You scored{" "}
				<strong>{points}</strong> out of {numPossiblePoints}{" "}
				({Math.ceil(score_pct)})%
			</p>
			<p className='highscore'>
				(Highscore: {highScore} points)
			</p>
		</div>
	);
}

export default FinishScreen;
