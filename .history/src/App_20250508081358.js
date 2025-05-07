import { useEffect } from 'react';
import './App.css';
import { getAllPokemon } from './utils/Pokemon';
function App() {
  const initialURL ="https://pokeapi.co/api/v2/pokemon";

  useEffect(() => {
    const fetchPokemonData = async () => {
      //すべてのPokémon
      let res = await getAllPokemon(initialURL);
      console.log(res)
    };
    fetchPokemonData();
  },[])

  return (
    <div className="App">
    </div>
  );
}

export default App;
