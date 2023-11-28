import { useState, useEffect } from 'react'
import Rate, { SizeType } from '../Rate/Rate'
import Button from '../Button/Button'
import './content-hero.scss'
import Modal from '../Modal/Modal'
import noPoster from '../../assets/images/noPoster.png'
import { MovieWithRateType, PlatformTypes, TVWithRateType } from '../../types'
 
interface MovieProp {
    type: PlatformTypes.movie
    content: MovieWithRateType
}

interface TVProp {
    type: PlatformTypes.tv
    content: TVWithRateType
}

type ContentHeroPropType = MovieProp | TVProp

const ContentHero = (props: ContentHeroPropType) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [trailerKey, setTrailerKey] = useState<string>('')

    useEffect(() => {
        const key = process.env.REACT_APP_TMDB_API_KEY
        const fetchTrailer = async () => {
            if (props.type === PlatformTypes.movie && props.content.contentData) {
                try {
                    let res = await fetch(`https://api.themoviedb.org/3/movie/${props.content.contentData.id}/videos?api_key=${key}&language=en-US`)
                    const jsonData = await res.json()
                    setTrailerKey(jsonData.results[0].key)
                } catch (error) {
                    console.error(error)
                }
            }
        }

        if (props.type === PlatformTypes.movie) {
            fetchTrailer()
        }
    }, [props.type, props.content])

    const getReleaseDate = () => {
        if (props.type === PlatformTypes.movie) {
            let date = props.content.contentData.release_date.split('-').join('/')
            return date
        }
    }

    const convertToHour = (mins: number = 0) => {
        const hourNum = Math.floor(mins / 60)
        const minNum = mins % 60
        const hourText = hourNum > 0 ? `${hourNum}h` : ''
        const minText = minNum > 0 ? ` ${minNum}m` : ''

        return hourText + minText
    }

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen)
    }

    const movieHero = () => {
        return <>
            {props.type === PlatformTypes.movie && props.content.contentData && <>
                <div className='image-background'
                    style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${props.content.contentData.backdrop_path})` }}></div>
                <section className='content-container'>
                    <div className='poster-container'>
                        <img src={`https://image.tmdb.org/t/p/original${props.content.contentData.poster_path}`}
                            onError={({ currentTarget }) => {
                                currentTarget.onerror = null
                                currentTarget.src = `${noPoster}`
                            }}
                            alt='post' />
                    </div>
                    <div className={`content-info ${isModalOpen ? 'space-y-4' : ''}`}>
                        <h2>{props.content.contentData.title}</h2>
                        <div className='facts'>
                            {
                                props.content.rating ? <span className='rating'>{props.content?.rating}</span> : ''
                            }
                            <span className={props.content.rating && 'pl-2'}>{getReleaseDate()}</span>
                            <span className='genres'>
                                {
                                    props.content.contentData.genres.map(genre => genre.name).join(', ')
                                }
                            </span>
                            <span className='runtime'>{convertToHour(props.content.contentData.runtime)}</span>
                        </div>
                        <p className='tagline'>{props.content.contentData.tagline}</p>
                        <h3>Overview</h3>
                        <p>{props.content.contentData.overview}</p>
                        <Rate rate={Math.floor(props.content.contentData.vote_average || 0)} size={SizeType.medium} />
                        <br />
                        <Button onClick={toggleModal}>Play Trailer</Button>
                        {
                            isModalOpen ?
                                <>
                                    <Modal modalHeader='Play Trailer' toggleModal={toggleModal}>
                                        <iframe
                                            title='trailer'
                                            src={`https://www.youtube.com/embed/${trailerKey}`}></iframe>
                                    </Modal>
                                </>
                                : ''
                        }
                    </div>
                </section>
            </>
            }
        </>
    }

    const tvHero = () => {
        return <>{
            props.type === PlatformTypes.tv && props.content.contentData && <>
                <div className='image-background'
                    style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${props.content.contentData.backdrop_path})` }}></div>
                <section className='content-container'>
                    <div className='poster-container'>
                        <img src={`https://image.tmdb.org/t/p/original${props.content.contentData.poster_path}`}
                            onError={({ currentTarget }) => {
                                currentTarget.onerror = null
                                currentTarget.src = `${noPoster}`
                            }}
                            alt='post' />
                    </div>
                    <div className={`content-info ${isModalOpen ? 'space-y-4' : ''}`}>
                        <h2>{props.content.contentData.name}</h2>
                        <div className='facts'>
                            {
                                props.content.rating ? <span className='rating'>{props.content?.rating}</span> : ''
                            }
                            <span className={props.content.rating && 'pl-2'}>{getReleaseDate()}</span>
                            <span className='genres'>
                                {
                                    props.content.contentData.genres && props.content.contentData.genres.map(genre => genre.name).join(', ')
                                }
                            </span>
                            {/* <span className='runtime'>{convertToHour(props.content.contentData.runtime)}</span> */}
                        </div>
                        <p className='tagline'>{props.content.contentData.tagline}</p>
                        <h3>Overview</h3>
                        <p>{props.content.contentData.overview}</p>
                        <Rate rate={Math.floor(props.content.contentData.vote_average || 0)} size={SizeType.medium} />
                        <br />
                        <Button data-testid="contentbutton" onClick={toggleModal}>Play Trailer</Button>
                        {
                            isModalOpen ?
                                <>
                                    <Modal modalHeader='Play Trailer' toggleModal={toggleModal}>
                                        <iframe
                                            title='trailer'
                                            src={`https://www.youtube.com/embed/${trailerKey}`}></iframe>
                                    </Modal>
                                </>
                                : ''
                        }
                    </div>
                </section>
            </>
        }</>
    }
 
    return (
        <div className='content-hero-container'>
            {
                props.type === PlatformTypes.movie ? movieHero() : tvHero()
            }
        </div>
    )
}

export default ContentHero