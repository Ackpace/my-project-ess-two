import { useContext, useEffect, useState } from "react"
import axios from "axios"
import Card from "../components/Card/Card"
import CardSlider from '../components/CardSlider/CardSlider'
import Tabs from '../components/Tabs/Tabs'
import Hero from '../components/Hero/Hero'
import Accordion from "../components/Accordion/Accordion"
import HomeAccordionData from "../assets/HomeAccordionData"
import { useAppDispatch, useAppSelector } from '../hooks'
import { Context } from '../components/Layout/Layout'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase.config'
import {
  User as FirebaseUser,
} from 'firebase/auth'
import { INITIALIZE } from "../reducers/myMovies/favoritesSlice"
import { VideoType, DataType } from '../types'

function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const [onTVData, setonTVData] = useState<DataType>()
  const [popularData, setPopularData] = useState<VideoType[]>()
  const [upcomingData, setUpcomingData] = useState<VideoType[]>()
  const [forRentData, setForRentData] = useState<VideoType[]>()
  const [tabBackgroundImage, setTabBackgroundImage] = useState('')
  const contextUser: FirebaseUser | null = useContext(Context)

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

    const api_key = process.env.REACT_APP_TMDB_API_KEY;

    const onTVUrl = `https://api.themoviedb.org/3/tv/on_the_air?api_key=${api_key}&language=en-US&page=1`

    const popularUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=en-US&page=1`

    const upcomingUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=${api_key}&language=en-US&page=1`

    const forRentUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&watch_region=US&with_watch_monetization_types=rent`

    axios.get(onTVUrl).then((res) => {
      setonTVData(res.data)
    })

    axios.get(popularUrl).then((res) => {
      setPopularData(res.data.results)
    })

    axios.get(upcomingUrl).then((res) => {
      setUpcomingData(res.data.results)
    })

    axios.get(forRentUrl).then((res) => {
      setForRentData(res.data.results)
    })

  }, [dispatch, contextUser]);

  useEffect(() => {
    if (onTVData && popularData && upcomingData && forRentData) {
      setIsLoading(false)
    }
  }, [onTVData, popularData, upcomingData, forRentData])

  // useEffect(() => {
  //   console.log('popularData: ', popularData)
  // }, [popularData])

  const titles = ['Popular', 'Upcoming', 'For Rent']

  const handleIsSelected = (id: number): boolean => {
    return favorites.filter((fav) => fav.id === id).length > 0
  }

  const popularList = () => (
    <CardSlider isLoading={isLoading}>
      {popularData?.map((d: VideoType, idx: number) => <Card data={d} key={idx} alreadyFav={handleIsSelected(d.id)} />)}
    </CardSlider>
  )

  const popularTrailers = () => {
    if (popularData) {
      return <CardSlider isLoading={isLoading}>
        {popularData && popularData.map((movie: VideoType, idx) => <Card data={movie} landscape index={idx} key={idx} onChangeBackgroundImage={(newImage) => {
          setTabBackgroundImage(newImage)
        }} />)}
      </CardSlider>
    } else return <></>
  }


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

  return (
    <div className='space-y-8'>
      <section>
        <Hero />
      </section>
      <section>
        <Tabs tabTitles={titles} title='Trending'>
          {popularList()}
          {upcomingList()}
          {forRentList()}
        </Tabs>
        <Tabs tabTitles={['popular', 'Upcoming']} title='Latest Trailers' backgroundImg={tabBackgroundImage}>
          {popularTrailers()}
          {upcomingList()}
        </Tabs>
      </section>
      <section>
        {
          HomeAccordionData.map(({ title, content }, idx) => (
            <Accordion title={title} content={content} key={idx} />
          ))
        }
      </section>
      <br />
    </div>
  );
}

export default Home;
