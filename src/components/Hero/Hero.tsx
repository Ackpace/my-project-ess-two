import { useEffect, useState } from "react"
import Button, { ButtonTypes } from "../Button/Button"
import eventBus from '../../assets/utilities/EventBus'
import axios from "axios"
import "./hero.scss"

const DesktopHero = () => (
  <div className="hero-container">
    <img
      src="https://www.peacocktv.com/dam/commerce/assets/221005-hero-1440x753-04.jpg?downsize=1200:*&output-quality=70"
      alt="hero"
    />
    <div className="hero-content-container">
      <div className="hero-content">
        <h1 className="text-5xl">
          Bingeworthy TV, Hit Movies, Live Sports & So Much More
        </h1>
        <p className='mb-2'>Stream it all for only $4.99/month. Cancel anytime.</p>
        <Button type={ButtonTypes.gradientFill} linkTo='/aboutme'>
          See Resume &#128514;
        </Button>
      </div>
    </div>
  </div>
)

const mobileHeroRow = (data: Array<Object>, idx: number) => {
  return (
    <div className='mobile-hero-container'>
      <div className={`row row-${idx}`}>
        {
          data.map((d: any) => (
            <div className='img-container'>
              <img src={`https://image.tmdb.org/t/p/original${d.backdrop_path}`} alt='backdrop-img' />
            </div>
          ))}
      </div>
    </div>
  )
}

const Hero = () => {
  const [isMobile, setIsMobile] = useState(false)
  const [popularData, setPopularData] = useState<any>([])

  useEffect(() => {
    eventBus.on('adjustWidth', (d: number) => {
      setIsMobile(d < 760)
    })

    const api_key = process.env.REACT_APP_TMDB_API_KEY;

    for (let i = 1; i < 5; i++) {
      const popularUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=en-US&page=${i}`
      axios.get(popularUrl).then((res) => {
        setPopularData((oldArray: any) => [...oldArray, res.data.results])
      })
    }
  }, [])

  // popu = [[],[],[],[]]
  const MobileHero = () => (
    <div className="mobile-hero-container">
      <div className='mobile-resume-button-container'>
        <Button type={ButtonTypes.gradientFill} linkTo='/aboutme'>
          See Resume &#128514;
        </Button>
      </div>
      {
        popularData.map((d: any, idx: number) => {
          return mobileHeroRow(d, idx)
        })
      }
    </div>
  )
  return (
    isMobile ? <MobileHero /> : <DesktopHero />
  )
}

export default Hero;
