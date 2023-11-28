
import { useEffect, useState, useCallback } from 'react'
import { Button } from '@mui/material'
import "./Content-details.scss";

 
 
const ContentDetails = ({movie}) =>{
    const img500x500 = "https://image.tmdb.org/t/p/w500" 
    console.log(movie)
    return(
        <div className="movie_card" id="bright">
        <div className="info_section">
            <div className="movie_header">
                <img className="locandina" src={`${img500x500}/${movie.poster_path}`}/>
                <h1>{movie.title}</h1>
                <h4>{movie.release_date}</h4>
                <span className="minutes">{movie.vote_average}</span>
                <p className="type">{movie.original_title}</p>
            </div>
            <div className="movie_desc">
                <p className="text">{movie.overview}</p>
            </div>
            <div style={{
                display: "flex",
                margin: "5px",
                justifyContent: "flex-start"}}>
                    <div style={{margin: "5px"}}>
                        <li>
                            <button className="card_btn">
                                Watch Trailer
                            </button>
                        </li>
                    </div>

            </div>
        </div>
        <div>
        <img  className="blur_back" src={`${img500x500}/${movie.backdrop_path}`}/>
        </div>
    </div>
    )
}



export default ContentDetails




































