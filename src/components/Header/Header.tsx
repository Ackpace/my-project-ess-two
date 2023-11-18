import { useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import Logo from '../../assets/images/tmdb-logo.svg'
import MobileLogo from '../../assets/images/tmdb-mobile-logo.svg'
import Button, { ButtonTypes } from "../Button/Button"
import { UserContext, ResponsivenessContext } from '../Layout/Layout'
import { doc, getDoc } from "firebase/firestore"
import { db } from '../../firebase.config'
import eventBus from "../../assets/utilities/EventBus"
import {
  User as FirebaseUser,
} from 'firebase/auth'
import Tooltip, { ToolTipPosition } from '../Tooltip/Tooltip'
import Snippet from '../Snippet/Snippet'
import classNames from 'classnames'
import SliderMenu from '../SliderMenu/SliderMenu'
import "./header.scss"

function Header() {
  const [avatar, setAvatar] = useState('')
  const [initial, setInitial] = useState('')
  const contextUser: FirebaseUser | null = useContext(UserContext)
  const contextIsMobile: boolean = useContext(ResponsivenessContext)

  useEffect(() => {
    // handle Avatar
    const getAvatar = async () => {
      if (contextUser) {
        const userRef = doc(db, 'users', contextUser.uid)
        try {
          const userSnap = await getDoc(userRef)

          if (userSnap.exists()) {
            const avatar: string = userSnap.data().avatar
            setAvatar(avatar)
          }
          else { console.log('user avatar not exist') }
        } catch (error) {
          console.log(error)
        }
      }
    }

    if (contextUser) {
      getAvatar()
    }
    eventBus.on('updateAvatar', (imgSrc: string) => {
      setAvatar(imgSrc)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contextUser])

  useEffect(() => {
    if (avatar === '' && contextUser && contextUser.displayName) {
      setInitial(contextUser.displayName[0])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [avatar])

  const tooltipContent = () => (<><h2>My favorites</h2><Snippet /></>)

  const innerContainerClasses = classNames(
    'header-inner-container',
    'max-x-7xl',
    { 'mobile': contextIsMobile }
  )

  return (
    <div className="header-container">
      <div className={innerContainerClasses}>
        <div className={`${contextIsMobile ? '' : 'ml-4'} logo-container`}>
          <NavLink to='/' className='w-full'><img src={contextIsMobile ? MobileLogo : Logo} alt="logo" className={contextIsMobile ? 'mobile-logo-img' : ''} /></NavLink>
        </div>
        {contextIsMobile ?
          <div className='absolute left-4 top-0 bottom-0 flex'>
            <SliderMenu />
          </div>
          :
          <ul className="header-list">
            <li><NavLink to="/">Movies</NavLink></li>
            <li><NavLink to="tv-shows">TV Shows</NavLink></li>
            <li><NavLink to="about">About</NavLink></li>
          </ul>
        }
        <div className={'profile-action-link'}>
          {
            contextUser ? (
              <Tooltip content={tooltipContent()} position={ToolTipPosition.bottomRight}>
                <Button
                  linkTo="profile"
                  type={ButtonTypes.avatar}>
                  {
                    avatar ? <img src={avatar} alt='avatar' className='avatar-img' /> :
                      <div className='initial-container'>{initial}</div>
                  }
                </Button>
              </Tooltip>
            )
              :
              <Button linkTo="profile">Sign in</Button>
          }
        </div>
      </div>
    </div>
  );
} 

export default Header;
