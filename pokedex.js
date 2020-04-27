const pokedex = document.getElementById("pokedex");
console.log(pokedex);

//retrieves all Pokemon up to #493 (in order)
//prototype pattern
const getPokemon = () => 
{
    const entries = [];
    for (let i = 1; i <= 493; i++)
    {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        entries.push(fetch(url).then((res) => res.json()));
    }

    Promise.all(entries).then((results) =>
    {
        const pokemon = results.map((data) => (
        {
            name: data.name,
            id: data.id,
            image: data.sprites['front_default'],
            type: data.types.map((type) => type.type.name).join(', '),
            height: data.height/10,
            weight: data.weight/10
        }));
        displayPokemon(pokemon);
    });
};

//sorts Pokemon based on the their type in alphabetical order (of type)
const typePokemon = () => {
    const promises = [];
    for (let i = 1; i <= 493; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then((res) => res.json()));
    }
    Promise.all(promises).then((results) => {
        const pokemon = results.map((data) => (
        {
            name: data.name,
            id: data.id,
            image: data.sprites['front_default'],
            type: data.types.map((type) => type.type.name).join(', '),
            height: data.height/10,
            weight: data.weight/10
        })).sort((a, b) => a.type > b.type ? 1 : -1);
        displayPokemon(pokemon);
    });
};

//sorts height of Pokemon based on their height 
const heightPokemon = () => {
    const promises = [];
    for (let i = 1; i <= 493; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then((res) => res.json()));
    }
    Promise.all(promises).then((results) => {
        const pokemon = results.map((data) => (
        {
            name: data.name,
            id: data.id,
            image: data.sprites['front_default'],
            type: data.types.map((type) => type.type.name).join(', '),
            height: data.height/10,
            weight: data.weight/10
        })).sort((a, b) => a.height > b.height ? 1 : -1);
        displayPokemon(pokemon);
    });
};

//sorts Pokemon based on their weight
const weightPokemon = () => {
    const promises = [];
    for (let i = 1; i <= 493; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then((res) => res.json()));
    }
    Promise.all(promises).then((results) => {
        const pokemon = results.map((data) => (
        {
            name: data.name,
            id: data.id,
            image: data.sprites['front_default'],
            type: data.types.map((type) => type.type.name).join(', '),
            height: data.height/10,
            weight: data.weight/10
        })).sort((a, b) => a.weight > b.weight ? 1 : -1);
        displayPokemon(pokemon);
    });
};

const displayPokemon = (pokemon) =>
{
    console.log(pokemon);
    const pokemonHTML = pokemon.map ((poke) => `
    <li class="card">
        <img class="card-image" src="${poke.image}" />
        <h2 class= "card-title">${poke.id}.${poke.name}</h2>
        <p class="card-subittle">type: ${poke.type}</p>
        <p class="card-subittle">height: ${poke.height} m</p>
        <p class="card-subittle">weight: ${poke.weight} kg</p>
    </li>
    `).join('');
    pokedex.innerHTML = pokemonHTML;
}; 

//strategy pattern (sorts Pokemon displayed depending on picked)
window.test = function(e) {
//observer pattern(s) (whenever one of the sorts is picked, it notifies the program and calls another method)
  if (e.value === 'Number') {
    getPokemon();
  } else if (e.value === 'Type') {
    typePokemon();
  } else if (e.value === 'Height') {
    heightPokemon();
  } else if (e.value === 'Weight') {
    weightPokemon();
  }
};