import { useEffect, useState } from 'react';
import './App.css';
import { getAllPokemon } from './utils/Pokemon';
function App() {
  const initialURL ="https://pokeapi.co/api/v2/pokemon";
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchPokemonData = async () => {
      //すべてのPokémon
      let res = await getAllPokemon(initialURL);
      //各ポケモンの詳細なデータを取得
      loadPokemon(res.results)
      console.log(res.results)
      setLoading(false);
    };
    const loadPokemon = () =>{}
    fetchPokemonData();
  },[])

  return (
    <div className="App">
      {loading ? (
        <h1>ロード中</h1>
      ):(
        <>
          <h1>データ取得できました</h1>
        </>
      )
    }
    </div>
  );
}

export default App;
