import { useEffect, useState } from 'react';
import './App.css';
import { getAllPokemon , getPokemon} from './utils/Pokemon';
import Card from './components/Card/Card';
import Navbar from './components/Navbar/Navbar';
function App() {
  const initialURL ="https://pokeapi.co/api/v2/pokemon";
  const [loading, setLoading] = useState(true);
  const [pokemonData , setPokemonData] = useState([]);
  const [nextUrl , setNextUrl ] = useState("");
  const [prevUrl , setprevUrl ] = useState("");
  useEffect(() => {
    const fetchPokemonData = async () => {
      //すべてのPokémon
      let res = await getAllPokemon(initialURL);
      //各ポケモンの詳細なデータを取得
      loadPokemon(res.results)
      console.log(res)
      setNextUrl(res.next)
      setprevUrl(res.previous)
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

  // console.log(pokemonData);
  const handleNextPage = async () => {
    setLoading(true);
    let data = await getAllPokemon(nextUrl);
    await loadPokemon(data.results);
    setNextUrl(data.next)
    setLoading(false);
  };
  const handlePrevPage = async() => {
    setLoading(true);
    let data = await getAllPokemon(prevUrl);
    await loadPokemon(data.results);
    console.log(data.previous);
    setprevUrl(data.previous);
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className="App">
        {loading ? (
          <h1>ロード中</h1>
        ):(
          <>
            <div className='pokemonCardContainer'>
              {pokemonData.map((pokemon , i) => {
                return <Card key={i} pokemon={pokemon} />
              })}
            </div>
            <div className="btn">
              <button onClick={handlePrevPage}>前へ</button>
              <button onClick={handleNextPage}>次へ</button>

            </div>
          </>
        )
      }
      </div>
    </>

  );
}

export default App;
