import { useState } from 'react'
import './App.css'


const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiODBlMWQ1ZGE2OThmZjU3YTlhNTlhNzQ1MGM3NGM1OSIsIm5iZiI6MTYzMjI3MDQ2My4yMDYsInN1YiI6IjYxNGE3ODdmYTZkZGNiMDA4YzAzZWY2MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Uc71P0peFrj9h7CBKUNqCQahQ3hNx3MmPFcTP1MXOjY';
const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_OPTIONS = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_KEY}`
    }
  };
  


function App() {
    const [movieList, setMovieList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');
    const [horrorMovieList, setHorrorMovieList] = useState([]);
    const fetchData = async (query = '') => {
        try {
            // const endpoint = `${API_BASE_URL}/discover/movie`;
            const endpoint = `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`;

            const response = await fetch(endpoint, API_OPTIONS);
            if(!response.ok) {
                throw new Error('Failed to fetch movies')
              }
            const data = await response.json();
            if(data.response === 'False'){
                setError(data.Error || 'Failed to fetch movies');
                setMovieList([]);
                return;
              }
            setMovieList(data.results || [])
            // console.log(data.results[0].genre_ids)
            console.log("!!!!",data.results)
        }catch(error) {
            console.log("!!!!!!!!!",error)
        }finally {
            setIsLoading(false);
          }
          
        
}

const filterMovies = (movieList) => {
    let list = []
    console.log("MOVIE LIST", movieList)
    console.log("MOVIE LIST LENGTH", movieList.length)
    for(let i = 0; i < movieList.length; i++){
        let curMovie = movieList[i]
        let genreList = curMovie.genre_ids
        for(let j = 0; j < genreList.length; j++){
            let curId = genreList[j]
            if(curId === 27) list.push(curMovie)
        }
    }
    setHorrorMovieList(list)
}

const displayMovie = () => {
    console.log("clicked")
}


    const onChangeHandler = (e) => {
        setSearch(e.target.value)
        console.log("onChangeHandler ")
        fetchData(search);
    };

    const handleClick = () => {

        filterMovies(movieList)
        
    }

  
    return (
      <div>
         <input 
        type="text" 
        value={search} 
        onChange={onChangeHandler}
        />
        <button onClick={handleClick}  >
          {/* {loading ? 'Loading...' : 'Fetch Data'} */}
        </button>
        {/*
        {error && <p>Error: {error.message}</p>}
        {loading && <p>Loading data...</p>}*/}
        <ul>{horrorMovieList.map((horrorMovie) => (
            <li key={horrorMovie.id}onClick={displayMovie}>{horrorMovie.title}</li> 
        ))}</ul>

        {/* {movieList.map((movie) => (
            movie.genre_ids === 27 ? <h1>{movie.title}</h1> : <h1>Not a horror movie, idiot</h1>
        ))} */}
      </div>
    );
}

export default App
