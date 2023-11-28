import { useEffect, useState } from 'react'
import classNames from 'classnames'
import './accordion.scss'
 
interface AccordionProp {
    children: JSX.Element
    title: string
    open?: boolean
}

const Accordion = ({ children, title, open }: AccordionProp) => {
    const [isActive, setIsActive] = useState(false)
    const contentClasses = classNames(
        { 'activated mt-4': isActive || open },
        { 'deactivated': !isActive }
    )

    useEffect(() => {
        if (open) setIsActive(true)
    }, [open])

    return ( 
        <div className='accordion-container'>
            <div className="accordion-title" onClick={() => setIsActive(!isActive)}>
                <h2 className='mb-1'>{title}</h2>
                <div>{isActive ? <span>&#9650;</span> : <span>&#9660;</span>}</div>
            </div>
            <div className={contentClasses}>{children}</div>
        </div>
    )
}


interface ContentProp {
    children: JSX.Element
}

const Content = ({ children }: ContentProp) =>
    <div>{children}</div>


Accordion.Content = Content

export default Accordion

Accordion.defaultProps = {
    open: false
}