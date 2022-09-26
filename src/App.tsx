import React from 'react';
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import SideBar from './components/SideBar/SideBar';
import MainContent from './components/MainContent/MainContent';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <SideBar />
        <MainContent />
      </BrowserRouter>
    </div>
  );
}

export default App;
