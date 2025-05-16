import React from 'react'

const MovieCard = ({ currentMovie: {title, poster_path, overview, release_date}, closeDisplay, }) => {
  return (

    <div className='display-container'>
        <h1>{title}</h1>
        <h3>{release_date}</h3>
        <img className='movie-poster' src={`https://image.tmdb.org/t/p/w500/${poster_path}`} alt="" />
        <p>{overview}</p>
        <button onClick={closeDisplay}  className='btn'>
          back to list
        </button>
    </div>
    
  )
}

export default MovieCard
