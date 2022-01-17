import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import MenuBar from './components/MenuBar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'

import './App.css';

function App() {
  return (
    <Router>
      <Container>
        <MenuBar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path="login" element={<Login />} />
          <Route exact path="register" element={<Register />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
