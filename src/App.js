import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { NavLink, Route } from 'react-router-dom';
import GamesPage from './GamesPage';
import GameForm from './GameForm';

class App extends Component {
  render() {
    return (
      <div className="ui container">
        <div className="ui three item menu">
          <NavLink
            to='/'
            className="item"
            activeClassName='active'
            exact>
            Home
          </NavLink>
          <NavLink
            to='/games'
            className="item"
            activeClassName='active'
            exact>
            Games
          </NavLink>
          <NavLink
            to='/games/new'
            className="item"
            activeClassName='active'
            exact>
            Add new game
          </NavLink>
        </div>
        <Route exact path='/games' component={GamesPage} />
        <Route exact path='/games/new' component={GameForm} />
      </div>
    );
  }
}

export default App;
