import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  let offset;
  const [pokemon, setPokemon] = useState([]);
  const loadmorePokemon = () => {
    axios
      .get('https://pokeapi.co/api/v2/pokemon?limit=20.')
      .then(({ data }) => {
        const newPokemon = [];
        data.results.forEach((p) => newPokemon.push(p.name));
        setPokemon((oldPokemon) => [...oldPokemon, ...newPokemon]);
      });
    offset += 10;
  };
  const handleScroll = (e) => {
    if (
      e.target.documentElement.scrollTop + window.innerHeight + 1 >=
      e.target.documentElement.scrollHeight
    ) {
      loadmorePokemon();
    }
  };
  useEffect(() => {
    loadmorePokemon();
    window.addEventListener('scroll', handleScroll);
  }, []);
  return (
    <div className="App">
      {pokemon.map((p, i) => {
        return (
          <div className="pokemon" key={i}>
            {i + 1}.{p}
          </div>
        );
      })}
    </div>
  );
}

export default App;
