export const getAllPokemon = (url) =>{
  return new Promise((resolve , reject) => {
    fetch(url)//APIのエンドポイントにHTTPリクエストを送信
      .then((res) => res.json())// 返ってきたレスポンスを JSON 形式に変換
      .then((data) => resolve(data));
  });
}

export const getPokemon = (url) =>{
  return new Promise ((resolve , reject) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        resolve(data)
      });
  });
}