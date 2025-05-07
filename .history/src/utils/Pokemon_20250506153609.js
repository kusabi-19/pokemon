export const getAllPokemon = (url) =>{
  return new Promise((resolve , reject) => {
    fetch(url)
      .than((res) => res.json())
      .than((data) => resolve());
  })
}