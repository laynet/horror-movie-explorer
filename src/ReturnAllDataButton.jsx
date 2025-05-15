import { useState } from 'react'
import './App.css'

const API_KEY = 'bb37f6d9';


function App() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');

    const onChangeHandler = e => {
        setSearch(e.target.value)
        console.log("onChangeHandler ", search)
      };
  
    const handleClick = async (searchValue) => {
      setLoading(true);
      setError(null);
  
      try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchValue}`);
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const data = await response.json();
        setData(data);
        console.log(data.Search[0].imdbID)
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
      
    };
  
    return (
      <div>
        <input 
        type="text" 
        value={search} 
        onChange={onChangeHandler}/>
        <button onClick={handleClick} disabled={loading}>
          {loading ? 'Loading...' : 'Fetch Data'}
        </button>
  
        {error && <p>Error: {error.message}</p>}
        {loading && <p>Loading data...</p>}
        <h1>Search = {search}</h1>
        {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
        
      </div>
    );
}

export default App
