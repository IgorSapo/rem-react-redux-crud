import { SET_GAMES, ADD_GAME, GAME_FETCHED, GAME_UPDATED, GAME_DELETED } from '../actions';

const games = (state = [], action = {}) => {
  switch(action.type) {
    case SET_GAMES:
      return action.games;
    case ADD_GAME:
      return state.concat(action.game);
    case GAME_FETCHED:
      const index = state.findIndex(item => item._id === action.game._id);
      if (index > -1) {
        return state.map(item => (item._id === action.game._id ? action.game : item ));
      } else {
        return state.concat(action.game);
      }
    case GAME_UPDATED:
      return state.map(item => (item._id === action.game._id ? action.game : item));
    case GAME_DELETED:
      return state.filter(item => item._id !== action.id);
    default:
      return state;
  }
}

export default games;
