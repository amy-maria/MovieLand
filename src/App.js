import React, { useEffect, useState } from 'react';
import SearchIcon from './search.svg';
import MovieCard from './MovieCard';
import './App.css';

const API_URL = ' https://www.omdbapi.com?apikey=96420f06';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    searchMovies('Bridget');
  }, []);

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  };

  return (
    <div className='app'>
      <h1>MovieLand</h1>
      <div className='search'>
        <input
          type='text'
          placeholder='Search movie title'
          value={searchTerm}
          required
          autoFocus
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img
          src={SearchIcon}
          alt='search'
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {movies?.length > 0 ? (
        <div className='container'>
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      ) : (
        <div className='empty'>
          <h2>No movies found</h2>
        </div>
      )}

      <footer>
        <div className='footer'>
          Web page coded by Amy Rowell in conjunction with{' '}
          <a
            href='https://www.youtube.com/@javascriptmastery'
            target='_blank'
            alt='link to JavaScript Mastery YouTube'>
            JavaScript Mastery
          </a>
        </div>
      </footer>
    </div>
  );
};

export default App;
