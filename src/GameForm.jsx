import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveGame, fetchGame } from './actions';
import { withRouter } from 'react-router-dom';

class GameForm extends React.Component {
  state = {
    _id: this.props.game ? this.props.game._id : null,
    title: this.props.game ? this.props.game.title : '',
    cover: this.props.game ? this.props.game.cover : '',
    errors: {},
    loading: false,
    done: false
  };

  componentWillReceiveProps = nextProps => {
    this.setState({
      _id: nextProps.game._id,
      title: nextProps.game.title,
      cover: nextProps.game.cover,
    });
  }

  componentDidMount = () => {
    if (this.props.match.params._id) {
      this.props.fetchGame(this.props.match.params._id);
    }
  };

  handleChange = e => {
    if(!!this.state.errors[e.target.name]) {
      let errors = Object.assign({}, this.state.errors);
      delete errors[e.target.name];
      this.setState({
        [ e.target.name ] : e.target.value,
        errors
      })      
    } else {
      this.setState({
        [ e.target.name ] : e.target.value
      });
    }

  }

  handleSubmit = (e) => {
    e.preventDefault();
    // validation
    let errors = {};
    if (this.state.title === '') errors.title = "Can't be empty";
    if (this.state.cover === '') errors.cover = "Can't be empty";
    this.setState({ errors });
    const isValid = Object.keys(errors).length === 0;

    if (isValid) {
      const { title, cover } = this.state;
      this.setState({ loading: true });
      this.props.saveGame({
        title,
        cover
      }).then(() => {
        this.setState({ done: true });
        this.props.history.push('/games');
      })
        .catch((err) => err.response.json().then(({ errors }) => this.setState({ errors, loading: false})));
    }
  }

  render() {
    return (
      <form
        className={`ui form ${ this.state.loading ? 'loading' : ''}`}
        onSubmit={this.handleSubmit}>
        <h2>Add new game</h2>
        { !!this.state.errors.global &&
          <div className="ui negative message">
            <p>{this.state.errors.global}</p>
          </div>}
        <div className={`field ${!!this.state.errors.title ? 'error' : ''}`}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name='title'
            value={this.state.title}
            onChange={this.handleChange}/>
          <span>{this.state.errors.title}</span>
        </div>
        <div className={`field ${!!this.state.errors.cover ? 'error' : ''}`}>
          <label htmlFor="cover">Cover URL</label>
          <input
            type="text"
            id="cover"
            name='cover'
            value={this.state.cover}
            onChange={this.handleChange}/>
          <span>{this.state.errors.cover}</span>
        </div>
        {
          this.state.cover !== '' &&
          <div className="field">
            <img
              src={this.state.cover}
              alt="cover"
              className="ui small bordered image"/>
          </div>
        }
        <div className="field">
          <button type='submit' className="ui primary button">Save</button>
        </div>
      </form>
    )
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

export default withRouter(connect(mapStateToProps, { saveGame, fetchGame })(GameForm));
