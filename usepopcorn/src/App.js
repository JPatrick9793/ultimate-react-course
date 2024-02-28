import { useEffect, useRef, useState } from "react";
import StarRating from "./StarRating";
import { useMovies } from "./useMovies";
import { useLocalStorageState } from "./useLocalStorageState";
import { useKey } from "./useKey";

const tempMovieData = [
	{
		imdbID: "tt1375666",
		Title: "Inception",
		Year: "2010",
		Poster:
			"https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
	},
	{
		imdbID: "tt0133093",
		Title: "The Matrix",
		Year: "1999",
		Poster:
			"https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
	},
	{
		imdbID: "tt6751668",
		Title: "Parasite",
		Year: "2019",
		Poster:
			"https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
	},
];

const tempWatchedData = [
	{
		imdbID: "tt1375666",
		Title: "Inception",
		Year: "2010",
		Poster:
			"https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
		runtime: 148,
		imdbRating: 8.8,
		userRating: 10,
	},
	{
		imdbID: "tt0088763",
		Title: "Back to the Future",
		Year: "1985",
		Poster:
			"https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
		runtime: 116,
		imdbRating: 8.5,
		userRating: 9,
	},
];
const API_KEY = "7d047b2a";
const average = (arr) =>
	arr.reduce(
		(acc, cur, i, arr) => acc + cur / arr.length,
		0
	);

	// const [movies, setMovies] = useState(tempMovieData);
	// const [watched, setWatched] = useState(tempWatchedData);

	const [query, setQuery] = useState("interstellar");
	const [selectedId, setSelectedId] = useState(null);

	const { movies, isLoading, error } = useMovies(
		query,
		handleCloseMovie
	);

	const [watched, setWatched] = useLocalStorageState(
		[],
		"watched"
	);

	function handleSelectMovie(id) {
		setSelectedId((selectedId) =>
			id === selectedId ? null : id
		);
	}

	function handleCloseMovie() {
		setSelectedId(null);
	}

	function handleAddMovie(movie) {
		// if (length(watched.filter(m=> m.imdbID != m.imdbID)))
		setWatched((watched) => [
			...watched.filter((m) => m.imdbID !== movie.imdbID),
			movie,
		]);
	}

	useEffect(
		function () {
			localStorage.setItem(
				"watched",
				JSON.stringify(watched)
			);
		},
		[watched]
	);

	return (
		<>
			{/* component composition */}
			<NavBar>
				<Search
					query={query}
					setQuery={setQuery}
				></Search>
				<NumResults movies={movies}></NumResults>
			</NavBar>
			<Main>
				{/* Or, you can define prop explicity and pass in that way */}
				<Box>
					{/* {isLoading ? (
						<Loader />
					) : (
						<MovieList movies={movies}></MovieList>
					)} */}
					{isLoading && <Loader />}
					{!isLoading && !error && (
						<MovieList
							movies={movies}
							handleSelectMovie={handleSelectMovie}
						/>
					)}
					{error && <ErrorMessage message={error} />}
				</Box>
				<Box>
					{selectedId ? (
						<MovieDetails
							selectedId={selectedId}
							onCloseMovie={handleCloseMovie}
							handleAddMovie={handleAddMovie}
							watched={watched}
							key={`movie-details-${selectedId}`}
						/>
					) : (
						<>
							<WatchedSummary
								watched={watched}
							></WatchedSummary>
							<WatchedMovieList
								watched={watched}
							></WatchedMovieList>
						</>
					)}
				</Box>
			</Main>
		</>
	);
}

function MovieDetails({
	selectedId,
	onCloseMovie,
	handleAddMovie,
	watched,
}) {
	const [movie, setMovie] = useState({});
	const [userRating, setUserRating] = useState("");
	const [defaultRating, setDefaultRating] = useState(null);

	const countRef = useRef(0);

	useEffect(
		function () {
			if (userRating) {
				countRef.current = countRef.current + 1;
			}
		},
		[userRating]
	);

	const isWatched = watched
		.map((m) => m.imdbID)
		.includes(selectedId);
	const watchedUserRating = watched.find(
		(movie) => movie.imdbID === selectedId
	)?.userRating;
	// console.log(isWatched);

	const {
		Title: title,
		Year: year,
		Poster: poster,
		Runtime: runTime,
		imdbRating,
		Plot: plot,
		Released: released,
		Actors: actors,
		Director: director,
		Genre: genre,
	} = movie;

	function handleAdd() {
		const newWatchedMovie = {
			imdbID: selectedId,
			title,
			year,
			poster,
			imdbRating: Number(imdbRating),
			runtime: runTime.split(" ").at(0),
			userRating: userRating,
			countRatingDecisions: countRef.current,
		};

		handleAddMovie(newWatchedMovie);
		onCloseMovie();
	}

	useKey("Escape", onCloseMovie);

	useEffect(
		function () {
			async function getMovieDetails() {
				const res = await fetch(
					`http://www.omdbapi.com/?apikey=${API_KEY}&i=${selectedId}`
				);
				const data = await res.json();
				// console.log(data);
				// setDefaultRating(Number(data.imdbRating));
				setMovie(data);
			}
			getMovieDetails();
		},
		[selectedId]
	);

	useEffect(
		function () {
			document.title = `Movie | ${title}`;
			return function () {
				document.title = "usePopcorn";
			};
		},
		[title]
	);

	useEffect(
		function () {
			setDefaultRating(Number(imdbRating));
		},
		[imdbRating]
	);

	return (
		<div className='details'>
			<header>
				<button
					className='btn-back'
					onClick={onCloseMovie}
				>
					&larr;
				</button>
				<img
					src={poster}
					alt={`Poster of ${title}`}
				/>
				<div className='details-overview'>
					<h2>{title}</h2>
					<p>
						{released} &bull; {runTime}
					</p>
					<p>{genre}</p>
					<p>
						<span>⭐</span>
						{imdbRating}
					</p>
				</div>
			</header>

			<section>
				<div className='rating'>
					{!isWatched ? (
						<>
							{/* <StarRating
								size={24}
								maxRating={10}
								onSetRating={setUserRating}
								key={`star-rating-${selectedId}`}
								defaultRating={defaultRating}
							></StarRating> */}
							{defaultRating > 0 && (
								<StarRating
									size={24}
									maxRating={10}
									onSetRating={setUserRating}
									key={`star-rating-${selectedId}`}
									defaultRating={defaultRating}
								></StarRating>
							)}
							{userRating > 0 && (
								<button
									className='btn-add'
									onClick={handleAdd}
								>
									+ Add to list
								</button>
							)}
						</>
					) : (
						<p>
							You rated this move {watchedUserRating}
							<span>⭐</span>
						</p>
					)}
				</div>
				<p>
					<em>{plot}</em>
				</p>
				<p>Starring {actors}</p>
				<p>Directed by {director}</p>
			</section>

			{/* {selectedId} */}
		</div>
	);
}

function Loader() {
	return <p className='loader'>Loading...</p>;
}

function ErrorMessage({ message }) {
	return (
		<p className='error'>
			<span>⛔</span>
			{message}
		</p>
	);
}

function Search({ query, setQuery }) {
	const inputEl = useRef(null);

	useKey("Enter", () => {
		if (document.activeElement === inputEl.current) {
			return;
		}
		inputEl.current.focus();
		setQuery("");
	});

	return (
		<input
			className='search'
			type='text'
			placeholder='Search movies...'
			value={query}
			onChange={(e) => setQuery(e.target.value)}
			ref={inputEl}
		/>
	);
}

function Logo() {
	return (
		<div className='logo'>
			<span role='img'>🍿</span>
			<h1>usePopcorn</h1>
		</div>
	);
}

function NavBar({ children }) {
	return (
		<nav className='nav-bar'>
			<Logo></Logo>
			{children}
		</nav>
	);
}

function NumResults({ movies }) {
	return (
		<p className='num-results'>
			Found <strong>{movies.length}</strong> results
		</p>
	);
}

function Main({ children }) {
	return <main className='main'>{children}</main>;
}

function Box({ children }) {
	const [isOpen, setIsOpen] = useState(true);

	return (
		<div className='box'>
			<button
				className='btn-toggle'
				onClick={() => setIsOpen((open) => !open)}
			>
				{isOpen ? "–" : "+"}
			</button>
			{isOpen && children}
		</div>
	);
}

function MovieList({ movies, handleSelectMovie }) {
	return (
		<ul className='list list-movies'>
			{movies?.map((movie) => (
				<Movie
					movie={movie}
					key={movie.imdbID}
					handleSelectMovie={handleSelectMovie}
				></Movie>
			))}
		</ul>
	);
}

function Movie({ movie, handleSelectMovie }) {
	return (
		<li
			key={movie.imdbID}
			onClick={(e) => handleSelectMovie(movie.imdbID)}
		>
			<img
				src={movie.Poster}
				alt={`${movie.Title} poster`}
			/>
			<h3>{movie.Title}</h3>
			<div>
				<p>
					<span>🗓</span>
					<span>{movie.Year}</span>
				</p>
			</div>
		</li>
	);
}

function WatchedMovieList({ watched }) {
	return (
		<ul className='list'>
			{watched.map((movie) => (
				<WatchedMovie movie={movie}></WatchedMovie>
			))}
		</ul>
	);
}

function WatchedMovie({ movie }) {
	return (
		<li key={movie.imdbID}>
			<img
				src={movie.poster}
				alt={`${movie.title} poster`}
			/>
			<h3>{movie.Title}</h3>
			<div>
				<p>
					<span>⭐️</span>
					<span>{movie.imdbRating}</span>
				</p>
				<p>
					<span>🌟</span>
					<span>{movie.userRating}</span>
				</p>
				<p>
					<span>⏳</span>
					<span>{movie.runtime} min</span>
				</p>
			</div>
		</li>
	);
}

function WatchedSummary({ watched }) {
	const avgImdbRating = average(
		watched.map((movie) => movie.imdbRating)
	);
	const avgUserRating = average(
		watched.map((movie) => movie.userRating)
	);
	const avgRuntime = average(
		watched.map((movie) => movie.runtime)
	);

	return (
		<div className='summary'>
			<h2>Movies you watched</h2>
			<div>
				<p>
					<span>#️⃣</span>
					<span>{watched.length} movies</span>
				</p>
				<p>
					<span>⭐️</span>
					<span>{avgImdbRating}</span>
				</p>
				<p>
					<span>🌟</span>
					<span>{avgUserRating}</span>
				</p>
				<p>
					<span>⏳</span>
					<span>{avgRuntime} min</span>
				</p>
			</div>
		</div>
	);
}
