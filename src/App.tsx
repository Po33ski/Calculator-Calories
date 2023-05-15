import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {Login} from './pages/login';
import {CreatePost} from './pages/create-post/create-post';
import {Main} from './pages/main/main'
import {Navbar} from './components/navbar';
import './App.css';

// This is the main function 
// BrowserRouter has been used as 3 value for better clarity
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/createpost" element={<CreatePost />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App; 
