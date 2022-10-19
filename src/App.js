import './App.css';
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
// import Spinner from './components/Spinner.js';
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
  
  const App= ()=> {
  const pageSize=5;
  const apiKey = process.env.REACT_APP_NEWS_API;
    return (
      <div>
        <Router>
        <Navbar/>
        <Routes>
          <Route exact path="/" element = {<News key="general0" pagesize={pageSize} apiKey={apiKey} country="in" category="general"/>} ></Route>
          <Route exact path="/entertainment" element={<News key="entertainment" pagesize={pageSize} apiKey={apiKey} country="in" category="entertainment"/>}></Route>
          <Route exact path="/business" element={<News key="business" pagesize={pageSize} apiKey={apiKey} country="in" category="business"/>}></Route>
          <Route exact path="/general" element={<News key="general" pagesize={pageSize} apiKey={apiKey} country="in" category="general"/>}></Route>
          <Route exact path="/health" element={<News key="health" pagesize={pageSize} apiKey={apiKey} country="in" category="health"/>}></Route>
          <Route exact path="/science" element={<News key="science" pagesize={pageSize} apiKey={apiKey} country="in" category="science"/>}></Route>
          <Route exact path="/sports" element={<News key="sports" pagesize={pageSize} apiKey={apiKey} country="in" category="sports"/>}></Route>
          <Route exact path="/technology" element={<News key="technology" pagesize={pageSize} apiKey={apiKey} country="in" category="technology"/>}></Route>
        </Routes>
        </Router>
      </div>
    );
}
export default App;