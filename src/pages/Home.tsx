import { useContext, useEffect, useState } from "react"
import axios from "axios"
import Card from "../components/Card/Card"
import CardSlider from '../components/CardSlider/CardSlider'
import Tabs from '../components/Tabs/Tabs'
import Hero from '../components/Hero/Hero'
import Accordion from "../components/Accordion/Accordion"
import HomeAccordionData from "../assets/HomeAccordionData"
import { useAppDispatch, useAppSelector } from '../hooks'
import { UserContext, ResponsivenessContext } from '../components/Layout/Layout'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase.config'
import {
  User as FirebaseUser,
} from 'firebase/auth'
import { INITIALIZE } from "../reducers/myMovies/favoritesSlice"
import classNames from 'classnames'
import { VideoType, DataType } from '../types'

function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const [onTVData, setonTVData] = useState<DataType>()
  const [popularData, setPopularData] = useState<VideoType[]>()
  const [popularDataForTrailer, setPopularDataForTrailer] = useState<VideoType[]>()
  const [upcomingData, setUpcomingData] = useState<VideoType[]>()
  const [upcomingDataForTrailer, setUpcomingDataForTrailer] = useState<VideoType[]>()
  const [forRentData, setForRentData] = useState<VideoType[]>()
  const [tabBackgroundImage, setTabBackgroundImage] = useState('')
  const contextUser: FirebaseUser | null = useContext(UserContext)
  const contextIsMobile: boolean = useContext(ResponsivenessContext)

  const favorites: VideoType[] = useAppSelector((state) => state.favorites.movies)

  const dispatch = useAppDispatch()

  // fetch API and check for user
  useEffect(() => {
    setIsLoading(true)

    const fetchFavorites = async () => {
      if (contextUser) {
        const userRef = doc(db, 'users', contextUser.uid)
        const userSnap = await getDoc(userRef)

        if (userSnap.exists()) {
          dispatch(INITIALIZE(userSnap.data().favorites))
        }
      }
    }

    fetchFavorites()

    const api_key = process.env.REACT_APP_TMDB_API_KEY

    const onTVUrl = `https://api.themoviedb.org/3/tv/on_the_air?api_key=${api_key}&language=en-US&page=1`

    const popularUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=en-US&page=1`

    const upcomingUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=${api_key}&language=en-US&page=1`

    const forRentUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&watch_region=US&with_watch_monetization_types=rent`

    const popularTrailerUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=en-US&page=2`

    const upcomingTrailerUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=${api_key}&language=en-US&page=2`

    axios.all([
      axios.get(onTVUrl),
      axios.get(popularUrl),
      axios.get(upcomingUrl),
      axios.get(forRentUrl),
      axios.get(popularTrailerUrl),
      axios.get(upcomingTrailerUrl)
    ]).then(axios.spread((tv, pop, upcoming, rent, popTrailer, upcomingTrailer) => {
      setonTVData(tv.data)
      setPopularData(pop.data.results)
      setUpcomingData(upcoming.data.results)
      setForRentData(rent.data.results)
      setPopularDataForTrailer(popTrailer.data.results)
      setUpcomingDataForTrailer(upcomingTrailer.data.results)
    }))

  }, [dispatch, contextUser]);

  useEffect(() => {
    if (onTVData && popularData && upcomingData && forRentData) {
      setIsLoading(false)
    }
  }, [onTVData, popularData, upcomingData, forRentData])
 
  const titles = ['Popular', 'Upcoming', 'For Rent']

  const handleIsSelected = (id: number): boolean => {
    if (favorites) {
      return favorites.filter((fav) => fav.id === id).length > 0
    }
    return false
  }

  const popularList = () => (
    <CardSlider isLoading={isLoading}>
      {popularData?.map((d: VideoType, idx: number) => <Card data={d} key={idx} alreadyFav={handleIsSelected(d.id)} />)}
    </CardSlider>
  )
  const upcomingList = () => (
    <CardSlider isLoading={isLoading}>
      {upcomingData?.map((d: VideoType, idx: number) => <Card data={d} key={idx} alreadyFav={handleIsSelected(d.id)} />)}
    </CardSlider>
  )

  const forRentList = () => (
    <CardSlider isLoading={isLoading}>
      {forRentData?.map((d: VideoType, idx: number) => <Card data={d} key={idx} alreadyFav={handleIsSelected(d.id)} />)}
    </CardSlider>
  )

  const popularTrailers = () => {
    if (popularDataForTrailer) {
      return <CardSlider isLoading={isLoading}>
        {popularDataForTrailer && popularDataForTrailer.map((movie: VideoType, idx) => <Card data={movie} landscape index={idx} key={idx} onChangeBackgroundImage={(newImage) => {
          setTabBackgroundImage(newImage)
        }} />)}
      </CardSlider>
    } else return <></>
  }

  const upcomingTrailers = () => {
    if (upcomingDataForTrailer) {
      return <CardSlider isLoading={isLoading}>
        {upcomingDataForTrailer && upcomingDataForTrailer.map((movie: VideoType, idx) => <Card data={movie} landscape index={idx} key={idx} onChangeBackgroundImage={(newImage) => {
          setTabBackgroundImage(newImage)
        }} />)}
      </CardSlider>
    } else return <></>
  }

  const HomeContainerClasses = classNames(
    'space-y-8',
    { 'pl-2 pr-2': contextIsMobile }
  )
  return (
    <div className={HomeContainerClasses}>
      <section>
        <Hero />
      </section>
      <section>
        <div data-testid="tabs"  className='space-y-8'>
          <Tabs  tabTitles={titles} title='Trending'>
            {popularList()}
            {upcomingList()}
            {forRentList()}
          </Tabs>
          <Tabs tabTitles={['popular', 'Upcoming']} title='Latest Trailers' backgroundImg={tabBackgroundImage}>
            {popularTrailers()}
            {upcomingTrailers()}
          </Tabs>
        </div>
      </section>
      <section>
        {
          HomeAccordionData.map(({ title, content }, idx) => (
            <Accordion title={title} key={idx} open={idx === 0 ? true : false}>
              <Accordion.Content><p>{content}</p></Accordion.Content>
            </Accordion>
          ))
        }
      </section>
      <br />
    </div>
  );
}

export default Home;
