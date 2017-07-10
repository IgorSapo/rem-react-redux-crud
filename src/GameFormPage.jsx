import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveGame, fetchGame, updateGame } from './actions';
import { withRouter } from 'react-router-dom';
import GameForm from './GameForm';

class GameFormPage extends React.Component {
  state = {
    redirect: false
  }

  componentDidMount = () => {
    if (this.props.match.params._id) {
      this.props.fetchGame(this.props.match.params._id);
    }
  };

  saveGame = ({ _id, title, cover }) => {
    if (_id) {
      return this.props.updateGame({ _id, title, cover })
        .then(() => {
          this.setState({ redirect: true });
          this.props.history.push('/games');
        })
        // .catch((err) => 
        //   err.response.json().then(({ errors }) =>
        //     this.setState({ errors, loading: false})));
    } else {
      return this.props.saveGame({ title, cover })
        .then(() => {
          this.setState({ redirect: true });
          this.props.history.push('/games');
        })
        // .catch((err) => 
        //   err.response.json().then(({ errors }) =>
        //     this.setState({ errors, loading: false})));
    }
  }

  render() {
    // if (this.state.redirect) {
    //   this.props.history.push('/games');
    // } else {
      return <GameForm game={this.props.game} saveGame={this.saveGame} />
    // }
  }
}

const mapStateToProps = (state, ownProps) => {
  if (ownProps.match.params._id) {
    return {
      game: state.games.find(item => item._id === ownProps.match.params._id)
    }
  } else {
    return {
      game : null
    }
  }
}

export default withRouter(connect(mapStateToProps, { saveGame, fetchGame, updateGame })(GameFormPage));
