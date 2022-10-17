import './App.css';
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
// import Spinner from './components/Spinner.js';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

export default class App extends Component {
  pageSize=5;
  apiKey = process.env.REACT_APP_NEWS_API
  render() {
    return (
      <div>
        {console.log(this.apiKey)}
        <Router>
        <Navbar/>
        <Routes>
          <Route exact path="/" element = {<News key="general0" pagesize={this.pageSize} apiKey={this.apiKey} country="in" category="general"/>} ></Route>
          <Route exact path="/entertainment" element={<News key="entertainment" pagesize={this.pageSize} apiKey={this.apiKey} country="in" category="entertainment"/>}></Route>
          <Route exact path="/business" element={<News key="business" pagesize={this.pageSize} apiKey={this.apiKey} country="in" category="business"/>}></Route>
          <Route exact path="/general" element={<News key="general" pagesize={this.pageSize} apiKey={this.apiKey} country="in" category="general"/>}></Route>
          <Route exact path="/health" element={<News key="health" pagesize={this.pageSize} apiKey={this.apiKey} country="in" category="health"/>}></Route>
          <Route exact path="/science" element={<News key="science" pagesize={this.pageSize} apiKey={this.apiKey} country="in" category="science"/>}></Route>
          <Route exact path="/sports" element={<News key="sports" pagesize={this.pageSize} apiKey={this.apiKey} country="in" category="sports"/>}></Route>
          <Route exact path="/technology" element={<News key="technology" pagesize={this.pageSize} apiKey={this.apiKey} country="in" category="technology"/>}></Route>
        </Routes>
        </Router>
      </div>
    );
  }
}
