import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import './App.css';
import Cards from './Components/Container/Container'
import Home from './Components/Home/Home'

function App() {
  return (
      <div className="App">
        <Router>
          <nav className="navbar navbar-inverse">
            <div className="container-fluid">
              <div className="navbar-header">
                <Link to="/">Artivatic</Link>
              </div>
            </div>
          </nav>
          
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/users" component={Cards} />
            </Switch>
          </Router>

      </div>
  );
}

export default App;
