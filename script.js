// URL de la Api
const API_URL = "https://pokeapi.co/api/v2/pokemon/";

// Referencias a elementos del DOM
const searchInput = document.getElementById('search');
const pokemonImage = document.querySelector('.pokemonimg-im');
const pokemonName = document.querySelector('.pokemon-name a');
const pokemonIdElement = document.getElementById('pokemon-id');
const pokemonLevelElement = document.getElementById('pokemon-level');
const pokemonTypeElement = document.getElementById('pokemon-type');
const pokemonAbilityElement = document.getElementById('pokemon-ability');
const pokemonHeightElement = document.getElementById('pokemon-height');
const pokemonWeightElement = document.getElementById('pokemon-weight');
// Función para actualizar la interfaz con los datos del Pokémon
function updatePokemonInfo(pokemon) {
    // Actualiza la imagen del Pokémon
    pokemonImage.src = pokemon.sprites.other['official-artwork'].front_default;

    // Actualiza el Nombre del Pokemon
    pokemonName.innerHTML = `${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)} `

    // Actualiza la lista de información del Pokémon
    pokemonIdElement.innerHTML = pokemon.id;
    pokemonLevelElement.innerHTML = '100';  // El nivel e asume
    pokemonTypeElement.innerHTML = pokemon.types.map(typeInfo => typeInfo.type.name).join(', ');
    pokemonAbilityElement.innerHTML = pokemon.abilities[0].ability.name;
    pokemonHeightElement.innerHTML = `${(pokemon.height / 10).toFixed(1)}m`;
    pokemonWeightElement.innerHTML = `${(pokemon.weight / 10).toFixed(1)}kg`;
}

// Función para buscar un Pokémon por nombre o ID
function searchPokemon(query) {
    const url = `${API_URL}${query.toLowerCase()}`;
    
    // Fetch de los datos del Pokémon
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Pokémon no encontrado');
            }
            return response.json();
        })
        .then(data => {
            updatePokemonInfo(data);
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Pokémon no encontrado. Por favor, intenta con otro nombre o ID.');
        });
}

// Evento al escribir en el campo de búsqueda
searchInput.addEventListener('input', function(e) {
    const query = e.target.value.trim();

    if (query) {
        searchPokemon(query);
    }
});
