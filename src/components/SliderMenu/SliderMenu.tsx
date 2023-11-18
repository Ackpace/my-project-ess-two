import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Button, { ButtonTypes } from '../Button/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons'
import './slider-menu.scss'

const SliderMenu = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const closeSliderMenu = () => { setIsMenuOpen(false) }

    return (
        <div role="slidermenubutton" className='slider-menu'>
            <Button  type={ButtonTypes.noBorder} onClick={() => { setIsMenuOpen(true) }}>
                <FontAwesomeIcon icon={faBars} />
            </Button>
            <div role="contentinfo" className={isMenuOpen ? 'menu-list open' : 'menu-list'}>
                <div className='absolute top-1 right-1'>
                    <Button type={ButtonTypes.circle} onClick={closeSliderMenu}>
                        <FontAwesomeIcon icon={faXmark} />
                    </Button>
                </div>
                <ul>
                    <li><NavLink to="/" onClick={closeSliderMenu}>Movies</NavLink></li>
                    <li><NavLink to="tv-shows" onClick={closeSliderMenu}>TV Shows</NavLink></li>
                    <li><NavLink to="about" onClick={closeSliderMenu}>About</NavLink></li>
                </ul>
            </div>
        </div>
    )
} 

export default SliderMenu