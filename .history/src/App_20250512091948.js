import { useEffect, useState } from 'react';
import './App.css';
import { getAllPokemon , getPokemon} from './utils/Pokemon';
function App() {
  const initialURL ="https://pokeapi.co/api/v2/pokemon";
  const [loading, setLoading] = useState(true);
  const [pokemonData , setPokemonData] = useState();
  useEffect(() => {
    const fetchPokemonData = async () => {
      //すべてのPokémon
      let res = await getAllPokemon(initialURL);
      //各ポケモンの詳細なデータを取得
      loadPokemon(res.results)
      // console.log(res.results)
      setLoading(false);
    };

    fetchPokemonData();
  },[])

  const loadPokemon = async (data) =>{ //asyncを書かないと　setPokemonData() に「未解決のPromise」を渡すことになる
    let _pokemonData = await Promise.all( //配列の中身すべての取得が終わるまで待つ
      data.map((pokemon) =>{
        let pokemonRecord = getPokemon(pokemon.url)
        return pokemonRecord;
      })
    );
    setPokemonData(_pokemonData);
  };

  console.log(pokemonData)
  return (
    <div className="App">
      {loading ? (
        <h1>ロード中</h1>
      ):(
        <>
          <div className='pokemonCardContainer'>
            {pokemonData.map((pokemon , i) => {
              return <>Pokemon</>
            })}
          </div>
        </>
      )
    }
    </div>
  );
}

export default App;
