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
            <button id="voltar" onclick="voltar()"><img src="./assets/img/chevron-back-outline.svg" alt="botão voltar"></button>

            <h2 class="pokemonName">${pokemonModel.name}</h2>

            <div class="typesNumber">

                <ol class="pokemonTypes">
                    ${pokemonModel.types.map((type) => `<li class="type ${pokemonModel.type}">${type}</li>`).join('')}
                </ol>
            
                <span class="pokemonNum">#${pokemonModel.number}</span>
            </div>

            <img class="img" src="${pokemonModel.photo}" alt="imagem do pokemon">

        </div>

        <div class="container">
            <div class="statusHeader">
                <button class="headerButton stats"  onclick="sts()">Status</button>
                <button class="headerButton abilities" onclick="hab()">Habilidades</button>
            </div>
            <div class="statsValue">
                <span class="statusItem"><b>HP :</b> <input type="range" value="${pokemonModel.hp}" disabled></span>
                <span class="statusItem"><b>VEL:</b> <input type="range" value="${pokemonModel.vel}" disabled></span>
                <span class="statusItem"><b>ATC:</b> <input type="range" value="${pokemonModel.atc}" disabled></span>
                <span class="statusItem"><b>DEF:</b> <input type="range" value="${pokemonModel.def}" disabled></span>
                <span class="titleStatus"><b>SPECIAL</b></span>
                <span class="statusItem"><b>ATC:</b> <input type="range" value="${pokemonModel.sAtc}" disabled></span>
                <span class="statusItem"><b>DEF:</b> <input type="range" value="${pokemonModel.sDef}" disabled></span>
            </div>

            <div class="statsHab">
                <span class="statusIte"><b>PESO:</b> ${pokemonModel.peso} Kg</span>
                <span class="statusIte"><b>ALTURA:</b> ${pokemonModel.altura} m</span>
                <span class="titleStatus"><b>ATAQUES</b></span>
                <span class="statusIte ${pokemonModel.type} sla"><b>${pokemonModel.ataques[0].toUpperCase()}</b></span>
                <span class="statusIte ${pokemonModel.type} sla"><b>${pokemonModel.ataques[1].toUpperCase()}</b></span>
            </div>
        </div>
 
    `
}

function sts() {
    document.getElementsByClassName('statsHab')[0].style.display = 'none';

    // habilidades
    document.getElementsByClassName('stats')[0].style.fontWeight = 'bold';
    document.getElementsByClassName('stats')[0].style.textDecoration = 'underline';
    document.getElementsByClassName('statsValue')[0].style.display = 'grid';

    //status
    document.getElementsByClassName('abilities')[0].style.fontWeight = 'normal';
    document.getElementsByClassName('abilities')[0].style.textDecoration = 'none';
}

function hab() {
    document.getElementsByClassName('statsValue')[0].style.display = 'none';

    // habilidades
    document.getElementsByClassName('abilities')[0].style.fontWeight = 'bold';
    document.getElementsByClassName('abilities')[0].style.textDecoration = 'underline';
    document.getElementsByClassName('statsHab')[0].style.display = 'grid';

    //status
    document.getElementsByClassName('stats')[0].style.fontWeight = 'normal';
    document.getElementsByClassName('stats')[0].style.textDecoration = 'none';

}

function voltar() {
    document.getElementsByClassName('pokemonStatus')[0].style.display = 'none';

    document.getElementsByClassName('content')[0].style.display = 'block';
    document.getElementsByClassName('container')[0].remove();
    document.getElementsByClassName('container')[0].remove();
}

function status(id) {
    document.getElementsByClassName('content')[0].style.display = 'none';
    document.getElementsByClassName('pokemonStatus')[0].style.display = 'flex';
    pokeApi.getPokemon(id).then((pokemon) => {
        pokemonD.innerHTML += detalhesDoPokemon(pokemon);
    })
}