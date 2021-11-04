const btnSearch = document.getElementById("btnSearch")

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
    const types = data.types;
    document.getElementById("pokemonName").innerHTML = `<b>Name: </b> ${data.name}`
    document.getElementById("pokeType").innerHTML = `<b>type</b> ${renderPokemonType(data)}`
    document.getElementById("hp").innerHTML = `<b>HP: </b> ${data.stats[0].base_stat}`
    document.getElementById("attack").innerHTML = `<b>Attack: </b> ${data.stats[1].base_stat}`
    document.getElementById("deffense").innerHTML = `<b>Deffense: </b> ${data.stats[2].base_stat}`
    document.getElementById("imgPokemon").src = data.sprites.front_default;
    
    console.log(renderPokemonType(data))
}

function renderPokemonType(data){
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