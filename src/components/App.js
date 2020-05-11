import React, { useState, useEffect } from 'react';
import "../App.css";
import Movie from "./Movie"
import Header from './Header';
import Search from "./Search"

const MOVIE_API_URL = "https://www.omdbapi.com/?s=man&apikey=4a3b711b";

function App() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    fetch(MOVIE_API_URL)
      //fetch takes a source and returns a response. you receive the response as soon as all headers have arrived.
      .then(response => response.json())
      //Calling .json() gets you another promise for the body of the http response that is yet to be loaded.
      .then(jsonResponse => {
        // take the response, and call a function to
        setMovies(jsonResponse.Search);
        //within the JSON package, find Search heading
        //s={searchquery}, returns an array of 10 movies
        setLoading(false);
      })
  }, []);
  //passing an empty array causes use effect to run only after the initial render


  const search = searchValue => {
    setLoading(true);
    setErrorMessage(null);

    fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`)
      .then(response => response.json())
      .then(jsonResponse => {
        if (jsonResponse.Response === "True") {
          setMovies(jsonResponse.Search);
          setLoading(false);
        } else {
          setErrorMessage(jsonResponse.Error);
          setLoading(false);
        }
      });
  };


  return (
    <div className="App">
      <Header text="Movie Finder" />
      <Search search={search} />
      <p className="App-intro">Sharing a few of our favourite movies</p>
      <div className="movies">
        {loading && !errorMessage ? (
          <span>loading...</span>) : errorMessage ? (<div className="errorMessage">{errorMessage}</div>) : (movies.map((movie, index) =>
            (<Movie key={`${index}-${movie.Title}`} movie={movie} />
            ))
          )}
      </div>
    </div>
  )
}

export default App;
