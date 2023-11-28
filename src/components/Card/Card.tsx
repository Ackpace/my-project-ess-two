import { useContext, useEffect, useState } from "react"
import Rate from '../Rate/Rate' 
import CardOverlay from './CardOverlay'
import Button, { ButtonTypes } from '../Button/Button'
import { MovieObjectType, VideoType } from '../../types'
import favoriteEmptySvg from '../../assets/images/favorite-empty.svg'
import favoriteFillSvg from '../../assets/images/favorite-fill.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAppDispatch } from '../../hooks'
import { ADD_A_FAV_MOVIE, DELETE_A_FAV_MOVIE } from '../../reducers/myMovies/favoritesSlice'
import { UserContext } from '../Layout/Layout'
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore'
import { db } from '../../firebase.config'
import {
  User as FirebaseUser,
} from 'firebase/auth'
import noPoster from '../../assets/images/noPoster.png'
import classNames from 'classnames'
import './card.scss'
import { faPlay } from "@fortawesome/free-solid-svg-icons"

interface CardPropType {
  data: VideoType | MovieObjectType
  alreadyFav: boolean
  landscape?: boolean
  index?: number,
  onChangeBackgroundImage?: (newImage: string) => void
}
 
const Card = ({ data, alreadyFav, landscape, index, onChangeBackgroundImage }: CardPropType) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const contextUser: FirebaseUser | null = useContext(UserContext)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (alreadyFav) {
      setIsFavorite(true)
    }
  }, [alreadyFav])

  useEffect(() => {
    if (onChangeBackgroundImage && index === 0) {
      onChangeBackgroundImage(data.backdrop_path)
    }
    else if (isHovered && onChangeBackgroundImage) {
      onChangeBackgroundImage(data.backdrop_path)
    }
  }, [isHovered, onChangeBackgroundImage, data.backdrop_path, index])

  const handleClick = async () => {
    if (!isFavorite) {
      // updates in FE states
      dispatch(ADD_A_FAV_MOVIE(data))
      setIsFavorite(true)

      // updates on Firebase
      if (contextUser) {
        const userRef = doc(db, 'users', contextUser.uid)

        // Adding the movie to Favorite Array on Firebase
        await updateDoc(userRef, {
          favorites: arrayUnion(data)
        })
      }
    } else {
      // updates in FE states
      dispatch(DELETE_A_FAV_MOVIE(data))
      setIsFavorite(false)

      // updates on Firebase
      if (contextUser) {
        const userRef = doc(db, 'users', contextUser.uid)

        // Removing the movie to Favorite Array on Firebase
        await updateDoc(userRef, {
          favorites: arrayRemove(data)
        })
      }
    }

  }

  const cardContainerClasses = classNames(
    'card-container',
    { 'landscape': landscape }
  )

  return (
    <div className={cardContainerClasses}>
      <div
        className="image-container"
        onMouseEnter={() => { setIsHovered(true) }}
        onMouseLeave={() => { setIsHovered(false) }}
      >
        <img
          src={`https://image.tmdb.org/t/p/original${landscape ? data.backdrop_path : data.poster_path}`}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null
            currentTarget.src = `${noPoster}`
          }}
          alt='poster'
        />
        {isHovered &&
          <div className='card-overlay-wrapper'>
            <CardOverlay>
              {landscape ? <Button type={ButtonTypes.noBorder} onClick={() => alert('working on trailer modal...')}>
                <FontAwesomeIcon icon={faPlay} size='2xl' />
              </Button> : <>
                <Button linkTo={`/contents/${data.title && data.release_date ? 'movie' : 'tv'}/${data.id}`}>See details</Button>
                {
                  contextUser ?
                    <div className='favorite-container'>
                      <Button type={ButtonTypes.noBorder} onClick={handleClick}>
                        <img src={isFavorite ? favoriteFillSvg : favoriteEmptySvg} alt='favoriteEmptySvg' />
                      </Button>
                    </div> : null
                }</>}

            </CardOverlay>
          </div>}
      </div>
      <div className='title-container h-14'>
        <p className='truncate'>{data.title}</p>
        {landscape ? null : <span className='text-xs'>{data.release_date}</span>}
      </div>
      {
        landscape ? null : <div className='rate-container'>
          <Rate rate={data.vote_average} />
        </div>
      }
    </div>
  );
};

export default Card;

Card.defaultProps = {
  alreadyFav: false,
  landscape: false
}
