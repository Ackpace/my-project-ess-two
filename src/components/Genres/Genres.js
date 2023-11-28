import { useEffect, useState, useCallback } from 'react'
import Chip from '@mui/material/Chip';
import axios from "axios"
 

const Genres = ({genres, setGenres, selectedGenres,setSelectedGenres }) =>{
    
    const fetchGenres = async () =>{
    const {data} = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=1160cac5ff26e1cc795d5733856ce01c&language=en-US`);
        setGenres(data?.genres)
    }

    useEffect(() =>{
        fetchGenres()
    }, [])

    const handleNowAddGenres = genre =>{
        setSelectedGenres([...selectedGenres, genre])
        setGenres(genres?.filter(g => g.id !== genre?.id))
    }

    const handleRemoveGenres = genre =>{
        setSelectedGenres(selectedGenres?.filter(selected => selected?.id !== genre?.id));
        setGenres([...genres,genre]);
    } 

    return(
        <div style={{padding:"10px 0"}}>
            {selectedGenres?.map(genre =>(
                 <Chip onDelete={() => handleRemoveGenres(genre)} style={{backgroundColor: "gray"}} clickable label={genre?.name}/>
            ))}
           {genres?.map(genre => (
             <Chip onClick={() => handleNowAddGenres(genre)} clickable style={{fontSize: "1.2em", margin: "3px", background:"steelblue"}} 
             label={genre?.name}/>
           ))}
        </div>
    )

}


export default Genres































