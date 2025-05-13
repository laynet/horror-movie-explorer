import { useState } from 'react'
import './App.css'

const useSearchMovies = () => {
    const API_KEY = 'bb37f6d9';
  
    const searchMovies = (searchValue) => {
      const URL = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchValue}`;
      return fetch(URL)
        .then((response) => response.json())
        .then((data) => data.Search)
        .catch((error) => {
          console.error("Error", error);
          throw error;
        });
    };
  
    return { searchMovies };
  };

  const selectMovie = () => {
    console.log("aoerb;oaeirbn")
  }

function App() {
    const [search, setSearch] = useState('');
    const [movies, setMovies] = useState([]);
    const { searchMovies } = useSearchMovies();
    
    const onChangeHandler = e => {
      setSearch(e.target.value)
    };
  
    const handleInput = async () => {
      console.log('valor del input', search);
      try {
        const movies = await searchMovies(search);
        setMovies(movies);
      } catch (error) {
        console.log(error)
        // handle error/set any error state/etc...
      }
    }

  return (
    <>
    <div>
      <div className="search">
        <input type="text" value={search} onChange={onChangeHandler}/>
        <button onClick={handleInput}>search</button>
      </div>
      <ul>
        {movies.map(({ Title }) => (
          <li key={Title} onClick={selectMovie}>{Title}</li>
        ))}
      </ul>
    </div>

     

    </>
  )
}

export default App
