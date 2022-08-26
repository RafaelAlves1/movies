import { Container, Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

export default function Popular() {
  const [movies, setMovies] = useState([]);

  const image_path = 'https://image.tmdb.org/t/p/w200/';

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=pt-BR&page=5`,
    )
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.results);
        console.log(data.results);
      });
  }, []);

  return (
    <Box>
      <Container
        maxWidth="lg"
        sx={{
          marginTop: '5rem',
          flexWrap: 'wrap',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {movies.map((item) => (
          <Box p={2} key={item.id} width="200px" height="300px">
            <Link to={`/detalhes/${item.id}`}>
              <img
                src={`${image_path}${item.poster_path}`}
                alt={item.title}
                style={{ maxWidth: '100%', minHeight: '100%' }}
              />
            </Link>

            <p
              style={{
                width: '100%',
                marginTop: 0,
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
              }}
            >
              {item.title}
            </p>
          </Box>
        ))}
      </Container>
    </Box>
  );
}
