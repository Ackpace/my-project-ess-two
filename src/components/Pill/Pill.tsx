import { useEffect, useState } from 'react'
import classNames from 'classnames'
import './pill.scss'

interface PillPropTypes {
    children: string,
    selectable?: boolean,
    onClickHandler: (genre: string) => void
} 

const Pill = ({ children, selectable, onClickHandler }: PillPropTypes) => {
    const [isSelected, setIsSelected] = useState(false)

    const pillContainerClasses = classNames(
        'pill-container',
        { 'selectable': selectable },
        { 'selected': selectable && isSelected }
    )

    const handleClick = () => {
        setIsSelected((prevIsSelected) => !prevIsSelected)
        onClickHandler(children)
    }

    useEffect(() => {
        console.log('isSelected: ', isSelected);
    }, [isSelected])

    return (
        <div className={pillContainerClasses} onClick={handleClick}>{children}</div>
    )
}

export default Pill
 
Pill.defaultProps = {
    selectable: false
}