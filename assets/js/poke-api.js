const pokeApi = {};

pokeApi.getPokemons = (offset = 0, limit = 10) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    return fetch(url)
        .then((response) => {return response.json()})
        .then((jsonBody) => {return jsonBody.results})
        .catch((error) => {console.error(error)})
}