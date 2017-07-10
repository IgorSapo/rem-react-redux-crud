import { SET_GAMES, ADD_GAME } from '../actions';

const games = (state = [], action = {}) => {
  switch(action.type) {
    case SET_GAMES:
      return action.games;
    case ADD_GAME:
      return state.concat(action.game);
    default:
      return state;
  }
}

export default games;
