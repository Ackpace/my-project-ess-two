import './tabs.scss'

interface TabNavItemPropTypes {
    id: string,
    activeTab: string,
    title: string,
    isSingleTab?: boolean
    setActiveTab(id: string): void
}

const TabNavItem = ({ id, activeTab, title, isSingleTab, setActiveTab }: TabNavItemPropTypes) => {
    const handleClick = () => {
        setActiveTab(id)
    } 

    return (
        isSingleTab ? <h3 className='single-tab-title'>{title}</h3> :
            <li onClick={handleClick} className={activeTab === id ? 'active' : ''}>
                {title}
            </li>
    )
}

export default TabNavItem