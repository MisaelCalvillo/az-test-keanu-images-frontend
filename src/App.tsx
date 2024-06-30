import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline, Container, AppBar, Toolbar, Typography, Button } from '@mui/material';
import KeanuImageForm from './components/KeanuImageForm';
import TransactionsPage from './components/TransactionsPage';

const theme = createTheme();

const App: React.FC = () => {
  return (
    <div className='app'>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Keanu Reeves Image Retrieval
            </Typography>
            <Button color="inherit" component={Link} to="/">Home</Button>
            <Button color="inherit" component={Link} to="/transactions">Transactions</Button>
          </Toolbar>
        </AppBar>
        <Container maxWidth="lg" sx={{ mt: 4 }}>
          <Routes>
            <Route path="/" element={<KeanuImageForm />} />
            <Route path="/transactions" element={<TransactionsPage />} />
          </Routes>
        </Container>
    </div>
  );
};

export default App;