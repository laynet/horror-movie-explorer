import { useState } from 'react'
import './App.css'
import MovieCard from './components/MovieCard';


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
    const [display, setDisplay] = useState(false);
    const [currentMovie, setCurrentMovie] = useState(null)
    const fetchData = async (query = '') => {
        try {
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
        }catch(error) {
            console.log(error)
        }finally {
            setIsLoading(false);
          }
          
        
}

const filterMovies = (movieList) => {
    let list = []

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

const displayMovie = (value) => {
    setDisplay(true)
    setCurrentMovie(value)
}

const closeDisplay = () => {
    setDisplay(false)
}


const onChangeHandler = (e) => {
    setSearch(e.target.value)
    fetchData(search);
};

const handleClick = () => {

    filterMovies(movieList)
    
}

  
    return (
      <>
      <div className='main'>
        <header className='header'>
            <h1 className='header-title'>Horror Movie Explorer</h1>
        </header>
    
        <div className='search-container'>
            <input 
            type="text" 
            value={search} 
            onChange={onChangeHandler}
            className='search'
            />
            <button onClick={handleClick} className='btn' >
               <p>Search</p> 
            </button>
        </div>
        {!display &&

        <div className="movie-list-container">
        <ul className='movie-list'>{horrorMovieList.map((horrorMovie) => (
            <li key={horrorMovie.id} onClick={() => displayMovie(horrorMovie)} >{horrorMovie.title}</li> 
        ))}</ul>
        </div>}
        
        <div className='main-content'>
        
     
        {display && 
            <MovieCard currentMovie={currentMovie} closeDisplay={closeDisplay} />
        }
       
        

        </div>
        
        <footer className='footer'>
           <h3>Rhea Stokes INST630</h3> 
        </footer>

      </div>
      </>
    );
}

export default App
