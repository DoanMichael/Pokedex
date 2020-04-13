const pokedex = document.getElementById("pokedex");
console.log(pokedex);

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

getPokemon();