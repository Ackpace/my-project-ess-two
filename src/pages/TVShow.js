import { useEffect, useState, useCallback } from 'react'
import Card from '../components/Card/Card'
import Accordion from '../components/Accordion/Accordion'
import Pill from '../components/Pill/Pill'
import { GenreType } from '../types'
import '../styles/tvshows.scss'
import Tooltip, { ToolTipPosition } from '../components/Tooltip/Tooltip'

import axios from "axios"

import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import ContentDetails from '../components/ContentDetails/ContentDetails'
import AppPagination from '../components/Pagination/AppPagination'
import Genres from '../components/Genres/Genres'
import genresIDs from '../components/Utils/genresIDs'




function Shows() {
    // const [tvShows, setTVShows] = useState([])
    // const [genresMap, setGenresMap] = useState(new Map())
    // const [activeGenres, setActiveGenres] = useState<string[]>([])

    // useEffect(() => {
    //     const TMDB_AUTHORIZATION = process.env.REACT_APP_TMDB_AUTHORIZATION

    //     const options = {
    //         method: 'GET',
    //         headers: {
    //             accept: 'application/json',
    //             Authorization: `Bearer ${TMDB_AUTHORIZATION}`
    //         }
    //     };

    //     const TV_URL = 'https://api.themoviedb.org/3/trending/tv/day?language=en-US'
    //     const GENRE_URL = 'https://api.themoviedb.org/3/genre/tv/list?language=en'

    //     Promise.all([
    //         fetch(TV_URL, options),
    //         fetch(GENRE_URL, options)
    //     ])
    //         .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
    //         .then(([data1, data2]) => {
    //             setTVShows(data1.results)
    //             data2.genres.forEach((genre: GenreType) => {
    //                 setGenresMap(new Map(genresMap.set(genre.id, genre.name)))
    //             })
    //         })
    // }, [])// eslint-disable-line

    // useEffect(() => {
    //     console.log('genres in map: ', genresMap);
    // }, [genresMap])

    // useEffect(() => {
    //     console.log('activeGenres: ', activeGenres);
    // }, [activeGenres])

    // const handlePillClick = (genre: string) => {
    //     setActiveGenres((prev) => {
    //         if (prev.includes(genre)) return prev.filter(item => item !== genre)
    //         else return [...prev, genre]
    //     })
    // }

    // const getPill = () => {
    //     let pillContainer: Array<JSX.Element> = []

    //     genresMap.forEach((value: string) => {
    //         pillContainer.push(<Pill selectable onClickHandler={handlePillClick}>{value}</Pill>)
    //     })
    //     return pillContainer.map((pill, idx) => <span key={idx}>{pill}</span>)
    // }

    // return (
    //     <div className='max-w-7xl flex flex-col justify-center md:flex-row'>
    //         <div className='sort-menu'>
    //             <Tooltip content={<>Filter genres feature is coming soon ^.^</>} position={ToolTipPosition.top}>
    //                 <Accordion title='filter' open>
    //                     <Accordion.Content>
    //                         <>{getPill()}</>
    //                     </Accordion.Content>
    //                 </Accordion>
    //             </Tooltip>
    //         </div>
    //         <div className='tv-card-container'>
    //             {
    //                 tvShows.map((show, idx) => <div key={idx} className='ml-auto mr-auto'><Card data={show} /></div>)
    //             }
    //         </div>
    //     </div>
    // )
// }


//////////typescript
/////////////////////////////////////////////////////////////////
// export default Shows
//     interface Genre {
//         id: number;
//         name: string;
//      }
  
//     const [movies, setMovies] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [issErr, setIsErr] = useState(false);
//     const [page, setPage] = useState(1);
//     const totalPages = 15;
//     const handlePages = (updatePage: number) => setPage(updatePage);
//     const [genres, setGenres] = useState<Genre[]>([]);
//     const [selectedGenres, setSelectedGenres] = useState<number[]>([]);

    

//    //console.log(genres);

//     const fetchMovies = async () =>{
//         try{
//             const {data} = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=1160cac5ff26e1cc795d5733856ce01c&language=en-US&sort_
//             by=popularity.desc&include_adult=false&include_video=true&page=${page}&with_genres=28`)
//             setMovies(data?.results)
//             setLoading(false)     
//         }catch (error){
//             console.error(error);
//             setIsErr(true);
//         }
//     }
// 

//     useEffect(() =>{
//         fetchMovies()
//     }, [page])
   

//     const fetchGenre = async () =>{
//         const {data} = await axios.get(
//                 `https://api.themoviedb.org/3/genre/movie/list?api_key=1160cac5ff26e1cc795d5733856ce01c&language=en-US`
//             )
//             setGenres(data?.genres)
//         }
//         useEffect(()=>{
//             fetchGenre();
//         }, [])

       
        
        

          

//     return (
//         <div className='max-w-7xl flex flex-col justify-center md:flex-row'>
//             <div>
//                 {/* {genres?.map(genre=>(
//                <Chip onClick={() => handleAddGenres() } clickable label={genre?.['name']} style={{backgroundColor:"lightsalmon", margin: "3px"}} />
//                 ))} */}
//                 <Genres genres={genres} setGenres={setGenres} selectedGenres={selectedGenres} setSelectedGenres={setSelectedGenres}/>

//                 {movies?.map(movie => (
                    
//                     <ContentDetails movie={movie}/>
                   
//                 ))}
//             </div>
//             <AppPagination page={page} totalPages={totalPages} handlePagination={handlePages}/>
//          </div>
//          )

/////////////////////////////////////////////////////////////////
/////////////typescript




    const [movies, setMovies] = useState([]);   
    const [page, setPage] = useState(5);   
    const [numberOfPages, setNumberOfPages] = useState(5);   
    const [loading, setLoading] = useState(true);
    const [issErr, setIsErr] = useState(false);
    const [genres, setGenres] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);

    const genreIds = genresIDs(selectedGenres)

     
    const fetchMovies = async () =>{
                try{
                    const {data} = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=1160cac5ff26e1cc795d5733856ce01c&language=en-US&sort_
                    by=popularity.desc&include_adult=false&include_video=true&page=${page}&with_genres=${genreIds}`
                    );   
                    setMovies(data?.results);
                    setLoading(false);
                    setNumberOfPages(data?.total_pages)
                }catch (error){
                    console.error(error);
                    setIsErr(true);
                }
            }
            useEffect(() =>{
                        fetchMovies()
                    }, [page, selectedGenres])
                        
              return(
                <>
                <Genres genres={genres} setGenres={setGenres} selectedGenres={selectedGenres} setSelectedGenres={setSelectedGenres}/>
                <Grid container direction="row" justify="center" alignItems="center">   
                        {movies?.map(movie =>(
                             <Grid item md={6}> 
                            <ContentDetails movie={movie}/>
                            </Grid>  
                        ))}
                </Grid>
                    <AppPagination setPage={setPage} pageNumber={numberOfPages}/>
                </>
           )



}
export default Shows








