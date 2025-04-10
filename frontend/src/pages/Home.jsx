import React, { useEffect, useState } from 'react';
import API from '../api';
import MoviesList from '../components/MoviesList';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchMovies = async () => {
    try {
      setIsLoading(true);
      const res = await API.get('/movies', {
        params: { search, page },
      });
      if (Array.isArray(res.data)) {
        setMovies(res.data);
        setError('');
      } else {
        setMovies([]);
        setError('Résultat inattendu de l’API');
      }
    } catch (err) {
      console.error(err);
      setError("Erreur lors du chargement des films");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [search, page]);

  return (
    <div style={{ padding: '1rem' }}>
      <h1>🎬 Films à l'affiche</h1>

      <input
        type="text"
        placeholder="Rechercher un film..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: '0.5rem', marginBottom: '1rem', width: '300px' }}
      />

      {isLoading ? (
        <p>Chargement...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <>
          <MoviesList movies={movies} />
          <div style={{ marginTop: '1rem' }}>
            <button onClick={() => setPage(p => p - 1)} disabled={page === 1}>
              ⬅️ Précédent
            </button>
            <span style={{ margin: '0 1rem' }}>Page {page}</span>
            <button onClick={() => setPage(p => p + 1)} disabled={movies.length === 0}>
              Suivant ➡️
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
