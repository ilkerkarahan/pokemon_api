const bg_color = {
    grass: '#77CC55',
    fire: '#ff693f',
    water: '#3399ff',
    bug: '#aabb22',
    normal: '#aaaa99',
    flying: '#9aa8fa',
    poison: '#876ea4',
    electric: '#ffd34e',
    ground: '#e2c56a',
    fairy: '#f1a8ec',
    psyhic: '#ff6e5c',
    fighting: '#c56e5c',
    rock: '#c5b679',
    dragon: '#7766ee',
    ice: '#66ccff'
}

const pokeball = document.getElementById('pokeball')
const pokedexContainer = document.querySelector('.pokedex_container')

const count = 151

const card_pokemon_container = document.getElementById('card_pokemon_container')
const card_pokemon_container_list = document.getElementById('card_pokemon_container_list')


pokeball.addEventListener('click', () => {

   pokedexContainer.classList.add('ballAnimation')

    pokeball.disabled = true

    let randomPoke = Math.floor(Math.random() * count)
    let pokeId = randomPoke.toString().padStart(3, '0')


    fetch(`https://pokeapi.co/api/v2/pokemon/${randomPoke}`)
        .then(resp => resp.json())
        .then(data => {

            const openPoke = document.createElement('img')

            openPoke.src = `https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/${pokeId}.png`

            openPoke.classList.add('openPoke')


            pokedexContainer.appendChild(openPoke)

            function clickPokebal() {
                pokedexContainer.classList.add('open')

                const pokecard = document.createElement('div')

                pokecard.classList.add('card_pokemon')


                pokecard.style.backgroundColor = bg_color[data.types[0].type.name]

                pokecard.innerHTML = `
                        <div class="pokemon_img"">
                        <img src="https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/${pokeId}.png"
                            alt="${data.name}" width="100px">
                    </div>
                    <div class="pokemon_features">
                        <h3 class="pokemon_name">${data.name}</h3>
                        <div class="pokemon_property">
                            <span><i class="fa-solid fa-hand-fist"></i> Weight ${data.weight}</span>
                            <span><i class="fa-solid fa-flask"></i> Exp ${data.base_experience
                    }</span>
                        </div>
                        <span class="type"><i class="fa-solid fa-circle-nodes"></i> Type : ${data.types[0].type.name}</span>
                    </div>
                `
                card_pokemon_container.appendChild(pokecard)
            }

            setTimeout(clickPokebal, 2000)

            function showPokeball() {
                pokedexContainer.classList.remove('open')
                pokedexContainer.removeChild(pokedexContainer.lastChild)

                if (card_pokemon_container.children.length < 3) {
                    pokeball.disabled = false
                    pokedexContainer.classList.remove('ballAnimation')
                }
            }

            setTimeout(showPokeball, 4000)

        })

})

document.getElementById('listBtn').addEventListener('click', () => {
    document.querySelector('.pokemon_list').classList.toggle('openList')
})

let k = 0
for (let i = 1; i < count; i++) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
        .then(resp => resp.json())
        .then(data => {

            k++
            const pokecard = document.createElement('div')

            pokecard.classList.add('card_pokemon')


            pokecard.style.backgroundColor = bg_color[data.types[0].type.name]

            pokecard.innerHTML = `
                    <div class="pokemon_img"">
                    <img src="https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${k}.svg"
                        alt="${data.name}" width="100px">
                </div>
                <div class="pokemon_features">
                    <h3 class="pokemon_name">${data.name}</h3>
                    <div class="pokemon_property">
                        <span><i class="fa-solid fa-hand-fist"></i> Weight ${data.weight}</span>
                        <span><i class="fa-solid fa-flask"></i> Exp ${data.base_experience
                }</span>
                    </div>
                    <span class="type"><i class="fa-solid fa-circle-nodes"></i> Type : ${data.types[0].type.name}</span>
                </div>
            `
            card_pokemon_container_list.appendChild(pokecard)
 
        })

}










