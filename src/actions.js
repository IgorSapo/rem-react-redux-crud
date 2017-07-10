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

export const setGames = games => ({
  type: SET_GAMES,
  games
});

export const fetchGames = () => dispatch =>
  fetch('/api/games')
    .then(res => res.json())
    .then(data => dispatch(setGames(data.games)));

export const saveGame = data => dispatch =>
  fetch(
    '/api/games',
    {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }
  ).then(handleResponse)