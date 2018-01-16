import React, { Component } from 'react';
import './App.css';
import { Route, Link } from 'react-router-dom';
import Landing from './components/Landing';
import Library from './components/Library';
import Album from './components/Album';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
         <nav class="navbar  navbar-dark bg-dark navbar-inverse fixed-top">
         <div class="navbar-header">
          <a class="navbar-brand" href="/">Jams Music</a>
         </div>
          <div >
            <ul class="nav">
              <li class="nav-item active">
                <a class="nav-link text-white" href="/">Landing</a>
              </li>
              <li class="nav-item">
                <a class="nav-link text-white" href="/library">Library</a>
              </li>
            </ul>
          </div>
         </nav>
         <h1>Bloc Jams</h1>
        </header>
        <main>
         
         <Route exact path="/" component={Landing} />
         <Route path="/library" component={Library} />

         <Route path="/album/:slug" component={Album} />
        </main>
      </div>
    );
  }
}

export default App;
