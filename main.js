const btnSearch = document.getElementById("btnSearch")
const inputSearch = document.getElementById("inputSearch")

const pokemonColors = {
    electric: '#FFEA70',
    normal: '#B09398',
    fire: '#FF675C',
    water: '#0596C7',
    ice: '#AFEAFD',
    rock: '#999799',
    flying: '#7AE7C7',
    grass: '#4A9681',
    psychic: '#FFC6D9',
    ghost: '#561D25',
    bug: '#A2FAA3',
    poison: '#795663',
    ground: '#D2B074',
    dragon: '#DA627D',
    steel: '#1D8A99',
    fighting: '#2F2F2F',
    default: '#2A1A1F',
};

const fetchPokemonData = async (pokemon) => {
    return new Promise((resolve, reject) => {
        xhr = new XMLHttpRequest();
        xhr.open("GET", `https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        xhr.addEventListener("load", (data) => {
            if (data.target.status == 404) {
                reject("pokemon not found")
            } else {
                const pokemonData = data.target.response;
                const pokemonDataJSON = JSON.parse(pokemonData)
                resolve(pokemonDataJSON)
            }
        })
        xhr.send()
    })
}

function requestPokeAPI(searchPokemon) {
    xhr = new XMLHttpRequest();
    xhr.open("GET", `https://pokeapi.co/api/v2/pokemon/${searchPokemon}`)
    xhr.addEventListener("load", (data) => {
        if (data.target.status == 404) {
            console.log("pokemon not found")
        } else {
            const pokemonData = data.target.response;
            const pokemonDataJSON = JSON.parse(pokemonData)
            console.log(pokemonDataJSON)
        }
    })
    xhr.send()
}

function renderData(data) {
    const types = renderPokemonType(data);
    const colorOne = pokemonColors[types[0]]
    const colorTwo = types[1] ? pokemonColors[types[1]] : pokemonColors.default;
    document.getElementById("pokemonName").innerHTML = `<b>Name: </b> ${data.name}`
    document.getElementById("pokeType").innerHTML = `<b>type</b> ${renderPokemonType(data)}`
    document.getElementById("hp").innerHTML = `<b>HP: </b> ${data.stats[0].base_stat}`
    document.getElementById("attack").innerHTML = `<b>Attack: </b> ${data.stats[1].base_stat}`
    document.getElementById("deffense").innerHTML = `<b>Deffense: </b> ${data.stats[2].base_stat}`
    document.getElementById("imgPokemon").src = data.sprites.front_default;
    document.getElementById("pokemonCard").style.background = `radial-gradient(${colorTwo} 33%, ${colorOne} 33%)`;
    document.getElementById("pokemonCard").style.backgroundSize = '5px 5px'

    console.log(colorOne, colorTwo)
}

function renderPokemonType(data) {
    const pokemonTypes = [];
    const types = data.types;
    types.forEach(element => {
        pokemonTypes.push(element.type.name)
    });
    return pokemonTypes
}

function renderDataFail(err) {
    document.getElementById("pokemonName").innerHTML = `Pokemon Not Found`
    document.getElementById("pokeType").innerHTML = `<b>type</b> None`
    document.getElementById("hp").innerHTML = `<b>HP: </b> 9999`
    document.getElementById("attack").innerHTML = `<b>Attack: </b> 9999`
    document.getElementById("deffense").innerHTML = `<b>Deffense: </b> 9999`
    document.getElementById("imgPokemon").src = "/imagenes/notFound.jpg";

    console.log(err)
}

btnSearch.addEventListener("click", () => {
    const inputSearch = document.getElementById("inputSearch").value;
    fetchPokemonData(inputSearch.toLowerCase())
        .then(dataOutput => renderData(dataOutput))
        .catch(err => renderDataFail(err))
})

inputSearch.addEventListener("keyup", (event) => {
    if (event.key == "Enter") {
        const inputSearch = document.getElementById("inputSearch").value;
        fetchPokemonData(inputSearch.toLowerCase())
            .then(dataOutput => renderData(dataOutput))
            .catch(err => renderDataFail(err))
    }
},true)