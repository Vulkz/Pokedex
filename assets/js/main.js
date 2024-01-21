const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');

const pokemonD = document.getElementsByClassName('pokemonStatus')[0];

const limit = 10;
let offset = 0;

const maxRecords = 20;

function convertPokemonToHtml(pokemon) {

    return `
        <li class="pokemon ${pokemon.type}" onclick="status(${pokemon.number})">
        
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="datail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${pokemon.type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}" 
                alt="${pokemon.name}">
            </div>

        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToHtml).join('');
        pokemonList.innerHTML += newHtml;
    })
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener('click', () => {
    offset += limit;

    const qtdRecordNewPage = offset + limit;

    if (qtdRecordNewPage >= maxRecords) {
        const newLimit = maxRecords - offset;
        loadPokemonItens(offset, newLimit);

        loadMoreButton.parentElement.removeChild(loadMoreButton);
    } else {
        loadPokemonItens(offset, limit);
    }
})

function detalhesDoPokemon(pokemonModel) {

    return `
        <div class="${pokemonModel.type} container">
            <button id="voltar" onclick="voltar()">voltar</button>

            <h2 class="pokemonName">${pokemonModel.name}</h2>

            <div class="typesNumber">

                <ol class="pokemonTypes">
                    ${pokemonModel.types.map((type) => `<li class="type ${pokemonModel.type}">${type}</li>`).join('')}
                </ol>
            
                <span class="pokemonNum">#${pokemonModel.number}</span>
            </div>

            <img class="img" src="${pokemonModel.photo}" alt="imagem do pokemon">
        </div>
    `
}

function voltar() {
    document.getElementsByClassName('content')[0].style.display = 'block';
    document.getElementsByClassName('container')[0].remove();
}

function status(id) {
    document.getElementsByClassName('content')[0].style.display = 'none';
    document.getElementsByClassName('pokemonStatus')[0].style.display = 'block';
    pokeApi.getPokemon(id).then((pokemon) => {
        pokemonD.innerHTML += detalhesDoPokemon(pokemon);
    })
}