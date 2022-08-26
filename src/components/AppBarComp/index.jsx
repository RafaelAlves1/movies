import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { Link } from 'react-router-dom';

export default function AppBarComp() {
  const links = [
    { value: '/', label: 'Inicio' },
    { value: '/popular', label: 'Populares' },
    { value: '/toprated', label: 'Mais Assistidos' },
  ];

  return (
    <AppBar position="fixed">
      <Container maxWidth="lg">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Yarn Movies
          </Typography>

          {links.map((item) => (
            <Link
              to={item.value}
              style={{
                color: '#fff',
                textDecoration: 'none',
                marginLeft: '10px',
                textTransform: 'uppercase',
              }}
            >
              {item.label}
            </Link>
          ))}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
