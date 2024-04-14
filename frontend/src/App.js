import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from '../src/Login';
import Registration from './components/Registration'; // Adjust the path based on your file structure
import SearchBar from './components/SearchBar';
function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li><Link to="/search">Search Products</Link></li>
          </ul>
        </nav>

        {/* A <Routes> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/search" element={<SearchBar />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
