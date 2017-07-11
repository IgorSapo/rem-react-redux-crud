const handleResponse = response => {
  if (response.ok) {
    return response.json();
  } else {
    let error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

export const SET_GAMES = 'SET_GAMES';
export const ADD_GAME = 'ADD_GAME';
export const GAME_FETCHED = 'GAME_FETCHED';
export const GAME_UPDATED = 'GAME_UPDATED';
export const GAME_DELETED = 'GAME_DELETED';

export const setGames = games => ({
  type: SET_GAMES,
  games
});

export const addGame = game => ({
  type: ADD_GAME,
  game
});

export const gameFetched = game => ({
  type: GAME_FETCHED,
  game
});

export const gameUpdated = game => ({
  type: GAME_UPDATED,
  game
});

export const gameDeleted = id => ({
  type: GAME_DELETED,
  id
});

export const fetchGames = () => dispatch =>
  fetch('/api/games')
    .then(res => res.json())
    .then(data => dispatch(setGames(data.games)));

export const saveGame = data => dispatch =>
  fetch('/api/games', {
    method: 'post',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(handleResponse)
    .then(data => dispatch(addGame(data.game)));

export const fetchGame = id => dispatch =>
  fetch(`/api/games/${id}`)
    .then(res => res.json())
    .then(data => dispatch(gameFetched(data.game)));

export const updateGame = data => dispatch =>
  fetch(`/api/games/${data._id}`, {
    method: 'put',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(handleResponse)
    .then(data => dispatch(gameUpdated(data.game)));

export const deleteGame = id => dispatch => {
  fetch(`/api/games/${id}`, {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(handleResponse)
    .then(data => dispatch(gameDeleted(id)))
}