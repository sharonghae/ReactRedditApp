import React, { Component } from 'react';
import reddit from './reddit.png';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import AllPosts from './AllPosts';
import Post from './Post';


class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div className="App-header">
            <img src={reddit} className="App-logo" alt="logo" />
            <Link to="/"><h1>Reddit App</h1></Link>
          </div>
            <Route exact path="/" component={AllPosts} />
            <Route path="/post/:id" component={Post} />
        </div>
      </Router>
    );
  }
}

export default App;
