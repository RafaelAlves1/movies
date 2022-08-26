import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Box, Container, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function Details() {
  const { id } = useParams();
  const [movies, setMovies] = useState([]);
  const [similar, setSimilar] = useState([]);

  const image_path = 'https://image.tmdb.org/t/p/w200/';
  const fundo_path = 'https://image.tmdb.org/t/p/w500/';

  const [pageYPosition, setPageYPosition] = useState(0);

  function getPageYAfterScroll() {
    setPageYPosition(window.scrollY);
  }

  window.addEventListener('scroll', getPageYAfterScroll);

  useEffect(() => {
    fetch(
      `
        https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=pt-BR`,
    )
      .then((response) => response.json())
      .then((data) => {
        const {
          title,
          poster_path,
          overview,
          backdrop_path,
          vote_average,
          release_date,
        } = data;
        const movie = {
          id,
          title,
          sinopse: overview,
          image: `${image_path}${poster_path}`,
          fundo: `${fundo_path}${backdrop_path}`,
          nota: vote_average,
          lancamento: release_date,
        };
        console.log(movie);
        setMovies(movie);
      });
  }, [id]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${process.env.REACT_APP_API_KEY}&language=pt-BR&page=1`,
    )
      .then((response) => response.json())
      .then((data) => {
        setSimilar(data.results);
        console.log('similar: ', data.results);
      });
  }, [id]);

  return (
    <Box
      id="container"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          marginTop: '5rem',
          top: 0,
          flexWrap: 'wrap',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box>
          <img src={movies.image} alt={movies.title} />
        </Box>
        <Box width="800px" ml="50px">
          <Typography variant="h3">{movies.title}</Typography>
          <Typography
            sx={{
              maxWidth: '7.4ch',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
            }}
          >
            Nota: {movies.nota}
          </Typography>
          <Typography mb="50px">Lançamento: {movies.lancamento}</Typography>
          <Typography>{movies.sinopse}</Typography>
        </Box>
      </Container>
      <Container
        maxWidth="lg"
        sx={{
          marginTop: '5rem',
          top: 0,
          flexWrap: 'wrap',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4">Filmes similares</Typography>
      </Container>
      <Container
        maxWidth="lg"
        sx={{
          top: 0,
          flexWrap: 'wrap',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {similar.map((item) => (
          <Box
            p={2}
            key={item.id}
            width="200px"
            height="300px"
            sx={{
              marginBottom: '10px',
            }}
          >
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
      {pageYPosition > 100 && (
        <a
          href="#container"
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            zIndex: 99999,
            color: '#fff',
            width: '50px',
            height: '50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#1976d2',
            borderRadius: '5px',
          }}
        >
          <KeyboardArrowUpIcon fontSize="large" />
        </a>
      )}
    </Box>
  );
}
