const pokeApi = {};

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon();

    pokemon.name = pokeDetail.name;
    pokemon.number = pokeDetail.id;

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    
    pokemon.types = types;
    pokemon.type = types[0];
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

    return pokemon;
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)

}

pokeApi.getPokemons = (offset = 0, limit = 10) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequest) => Promise.all(detailRequest))
        .then((pokemonDetails) => pokemonDetails)
        .catch((error) => console.error(error))
}

// Detalhamento de Pokemon

pokeApi.getDetailPokemon = (pokeDetail) => {
    const pokemon = new PokemonDetalhe();

    pokemon.name = pokeDetail.name;
    pokemon.number = pokeDetail.id;

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    
    pokemon.types = types;
    pokemon.type = types[0];
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

    return pokemon;
}

pokeApi.getPokemon = (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;

    return fetch(url)
    .then((response) => response.json())
    .then(pokeApi.getDetailPokemon)
    .catch((error) => console.error(error))
}