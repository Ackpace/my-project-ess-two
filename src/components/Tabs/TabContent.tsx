interface TabContentPropTypes {
    id?: string,
    activeTab?: string,
    children: JSX.Element
}
 
const TabContent = ({ id, activeTab, children }: TabContentPropTypes) => {
    return (
        activeTab === id ?
            <>
                {children}
            </>
            : null
    )
}



export default TabContent