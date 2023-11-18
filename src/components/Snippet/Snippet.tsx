import { useAppSelector } from '../../hooks'
import { VideoType } from '../../types'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons'
import './snippet.scss'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const Snippet = () => {
    const favs: VideoType[] = useAppSelector((state) => state.favorites.movies)

    const ImgHoverCover = () => (
        <div className='img-hover-cover'>
            <FontAwesomeIcon icon={faCirclePlay} />
        </div>
    )

    interface singleSnippetProp {
        movie: VideoType
    }

    const SingleSnippet = ({ movie }: singleSnippetProp) => {
        const [isImgHovered, setIsImgHovered] = useState(false)

        return (
            <div className='snippet' onMouseEnter={() => { setIsImgHovered(true) }} onMouseLeave={() => { setIsImgHovered(false) }}>
                <div className='snippet-img-container'>
                    <img className='snippet-img' src={`https://image.tmdb.org/t/p/w185/${movie.backdrop_path}`} alt={movie.title} />
                    {isImgHovered ? <ImgHoverCover /> : null}
                </div>
                <p className={`title ${isImgHovered ? 'hovered' : ''}`}>{movie.title}</p>
                <NavLink to={`/contents/movie/${movie.id}`} className='nav-link' />
            </div>
        )
    }
 
    return (
        <>
            {favs ? favs.map((movie, idx) => {
                return <div key={idx}><SingleSnippet movie={movie} /></div>
            }) : ''}
        </>
    )
}

export default Snippet