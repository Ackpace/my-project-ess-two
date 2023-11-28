import { useState, useEffect, useRef } from 'react'
import classNames from 'classnames'
import './tooltip.scss'

export enum ToolTipPosition {
    bottom,
    bottomRight,
    bottomLeft,
    top,
    left,
    right
}

interface TooltipType {
    children: JSX.Element
    content: JSX.Element
    position?: ToolTipPosition
    delay?: number
}


const Tooltip = ({ children, content, position, delay }: TooltipType) => {
    let timeout: ReturnType<typeof setTimeout>
    const [isActive, setIsActive] = useState(false)
    const [childWidth, setChildWidth] = useState(0)
    const tooltipChildRef = useRef<HTMLDivElement>(null)

    const tooltipClasses = classNames('tooltip-tip',
        { 'top': position === ToolTipPosition.top },
        { 'bottom': position === ToolTipPosition.bottom },
        { 'bottom-right': position === ToolTipPosition.bottomRight },
        { 'bottom-left': position === ToolTipPosition.bottomLeft },
        { 'left': position === ToolTipPosition.left },
        { 'right': position === ToolTipPosition.right },
    )

    const handleMouseEnter = () => {
        timeout = setTimeout(() => {
            setIsActive(true)
        }, delay || 400)
    }

    const handleMouseLeave = () => {
        clearInterval(timeout)
        setIsActive(false)
    } 
  
    console.profile();
    useEffect(() => {/*
        if (tooltipChildRef.current) {
            setChildWidth(tooltipChildRef.current.offsetWidth)
        }*/
        tooltipChildRef.current? setChildWidth(tooltipChildRef.current.offsetWidth) : console.log("")
    }, [])
    console.profileEnd();

    return (
        <div className='new-tooltip-container' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <div ref={tooltipChildRef}>{children}</div>
            {isActive && <div className={tooltipClasses} style={position === ToolTipPosition.bottomRight ? { left: `${-250 + childWidth}px` } : {}}>{content}</div>}
        </div>
    )
}

export default Tooltip

Tooltip.defaultProps = {
    position: ToolTipPosition.bottom
}