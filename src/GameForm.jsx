import React from 'react';
import PropTypes from 'prop-types';

class GameForm extends React.Component {
  state = {
    title: '',
    cover: '',
    errors: {}
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
  }

  render() {
    return (
      <form action="" onSubmit={this.handleSubmit} className="ui form">
        <h2>Add new game</h2>
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

export default GameForm;
