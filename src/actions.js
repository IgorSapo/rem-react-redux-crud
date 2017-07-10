export const SET_GAMES = 'SET_GAMES';

export const setGames = games => ({
  type: SET_GAMES,
  games
});

export const fetchGames = () => dispatch =>
  fetch('/api/games')
    .then(res => res.json())
    .then(data => dispatch(setGames(data.games)));