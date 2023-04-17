import './Home.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';


function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <div className={`container ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className="navbar">
        <div className="logo">
          <a href="https://examplewebsite.com">  
            <img src="https://raw.githubusercontent.com/AbhiAlest/Fusion/main/Fusion.png" alt="Fusion Logo" />
          </a>
        </div>
        <div className="menu">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/upload">Upload</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
          </ul>
        </div>
        <div className="toggle" onClick={toggleDarkMode}>
          {isDarkMode ? (
            <i className="fas fa-sun"></i>
          ) : (
            <i className="fas fa-moon"></i>
          )}
        </div>
      </div>
      <div className="divider"></div>
      <div className="content">
        {/* Add existing stuff here */}
      </div>
    </div>
  );
}

export default Home;
