import React, { useEffect, useState } from 'react';
import API from '../api';
import MoviesList from '../components/MoviesList';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await API.get('/movies', {
        params: { search, page }
      });
      setMovies(res.data);
    };
    fetchMovies();
  }, [search, page]);

  return (
    <div>
      <h1>Films à l'affiche</h1>
      <input
        type="text"
        placeholder="Rechercher..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <MoviesList movies={movies} />
      <button onClick={() => setPage(p => p - 1)} disabled={page === 1}>Précédent</button>
      <button onClick={() => setPage(p => p + 1)}>Suivant</button>
    </div>
  );
};

export default Home;
