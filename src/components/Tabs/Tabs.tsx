import { useState, useEffect } from 'react'
import TabContent from './TabContent'
import TabNavItem from './TabNavItem'
import './tabs.scss'

type TabsPropTypes = {
    children: JSX.Element[] | JSX.Element // can take multiple or single
    tabTitles: string[]
    title?: string,
    backgroundImg?: string
}

const Tabs = ({ children, tabTitles, title, backgroundImg }: TabsPropTypes) => {
    const [activeTab, setActiveTab] = useState('tab1')
    const [isSingleTab, setIsSingleTab] = useState(false)

    useEffect(() => {
        if (children instanceof Array) {
            setIsSingleTab(false)
        } else {
            setIsSingleTab(true)
        }
    }, [children])

    return (
        <div className='tabs-container'>
            {backgroundImg && <img src={`https://image.tmdb.org/t/p/original/${backgroundImg}`} alt='tabs-background' className='tabs-container-bg' />}
            <div className='flex leading-none'>
                {title ? <h2 className='title'>{title}</h2> : ''}
                <ul className='menu-nav'>
                    {
                        tabTitles.map((title, index) => {
                            return (
                                <TabNavItem
                                    id={`tab${index + 1}`}
                                    title={title}
                                    activeTab={activeTab}
                                    isSingleTab={isSingleTab}
                                    setActiveTab={setActiveTab}
                                    key={index}
                                />
                            )
                        })
                    }
                </ul>
            </div>
            <div className='outlet'>
                {
                    <>
                        {
                            children instanceof Array ?
                                children.map((content, index) => {
                                    return <TabContent id={`tab${index + 1}`} activeTab={activeTab} key={index}>
                                        {children[index]}
                                    </TabContent>
                                })
                                : <TabContent>{children}</TabContent>
                        }
                    </>
                }
            </div>
        </div >
    ) 
}

export default Tabs