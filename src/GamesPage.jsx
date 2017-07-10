import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import GamesList from './GamesList';

const GamesPage = ({ games }) => (
  <div>
    <h2>Games List</h2>
    <GamesList games={games} />
  </div>
)

const mapStateToProps = state => ({
  games: state.games
})

GamesPage.propTypes = {
  games: PropTypes.array.isRequired
};

export default connect(mapStateToProps)(GamesPage);
