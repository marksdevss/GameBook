const API_KEY = '9fa7ef1b92634c39ad1f407e41de0ca3';
const BASE_URL = 'https://api.rawg.io/api/';

document.addEventListener('DOMContentLoaded', () => {
    fetchGames();
});

function fetchGames() {
    const endpoint = 'games';
    const url = `${BASE_URL}${endpoint}?key=${API_KEY}&page_size=10`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const games = data.results;
            games.forEach(game => {
                fetchGameDetails(game.id);
            });
        })
        .catch(error => console.error('Erro ao buscar jogos:', error));
}

function fetchGameDetails(gameId) {
    const url = `${BASE_URL}games/${gameId}?key=${API_KEY}`;

    fetch(url)
        .then(response => response.json())
        .then(game => displayGame(game))
        .catch(error => console.error('Erro ao buscar detalhes do jogo:', error));
}

function displayGame(game) {
    const gamesList = document.getElementById('games-list');

    const gameCard = document.createElement('div');
    gameCard.classList.add('game-card');

    gameCard.innerHTML = `
        <img src="${game.background_image}" alt="${game.name}">
        <h2>${game.name}</h2>
        <p>Lançamento: ${game.released}</p>
        <p>Rating: ${game.rating}</p>
        <br>
        <p>${game.description_raw.substring(0, 150)}...</p> <!-- Mostra os primeiros 150 caracteres da descrição -->
    `;

    gamesList.appendChild(gameCard);
}