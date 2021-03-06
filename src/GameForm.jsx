import React from 'react';

class GameForm extends React.Component {
  state = {
    _id: this.props.game ? this.props.game._id : null,
    title: this.props.game ? this.props.game.title : '',
    cover: this.props.game ? this.props.game.cover : '',
    errors: {},
    loading: false
  };

  componentWillReceiveProps = nextProps => {
    this.setState({
      _id: nextProps.game._id,
      title: nextProps.game.title,
      cover: nextProps.game.cover,
    });
  }

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
      const { _id, title, cover } = this.state;
      this.setState({ loading: true });
      console.log(_id);
      console.log(title);
      this.props.saveGame({ _id, title, cover })
        .catch((err) => {
            console.log('Error!');
            console.log(err);
            err.response.json().then(({ errors }) =>
              this.setState({ errors, loading: false}))
          }
        );
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

export default GameForm;
