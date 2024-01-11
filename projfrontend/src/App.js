import React from 'react';
import logo from './logo.svg';
import './index.css';

function App() {
  return (
    <div>
      <div className='text text-cyan-500'>Hello</div>
      <div className="bg-red-300">
        <header className="App-header">
          <img src={logo} className="" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          
        </header>
      </div>
    </div>
  );
}

export default App;
