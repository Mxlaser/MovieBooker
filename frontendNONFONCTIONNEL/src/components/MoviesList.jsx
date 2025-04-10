import React from 'react';

const MoviesList = ({ movies }) => (
  <div>
    {movies.map((movie) => (
      <div key={movie.id}>
        <h3>{movie.title}</h3>
        <p>{movie.overview}</p>
      </div>
    ))}
  </div>
);

export default MoviesList;
