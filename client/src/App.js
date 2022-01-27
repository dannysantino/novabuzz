import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import MenuBar from './components/MenuBar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import SinglePost from './pages/SinglePost'
import { AuthProvider } from './context/auth'
import AuthRoute from './utilities/AuthRoute'

import './App.css'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <MenuBar />
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='login' element={<AuthRoute><Login /></AuthRoute>} />
            <Route exact path='register' element={<AuthRoute><Register /></AuthRoute>} />
            <Route exact path='posts/:postId' element={<SinglePost />} />
          </Routes>
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
