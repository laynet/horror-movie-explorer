import React from 'react'

const MovieCard = ({ currentMovie: {title, poster_path, overview}, closeDisplay}) => {
  return (
    <div>
        <h1>DISPLAY</h1>
        <p>{title}</p>
        <img src={`https://image.tmdb.org/t/p/w500/${poster_path}`} alt="" />
        <p>{overview}</p>
        <button onClick={closeDisplay}  >
          back to list
        </button>
    </div>
  )
}

export default MovieCard
