import './card.scss'

interface CardOverlayPropType { 
    children: JSX.Element
}
 
const OverlayBody = ({ children }: any) => {
    return <div className='overlay-body'>{children}</div>
}

function CardOverlay({ children }: CardOverlayPropType) {
    return (
        <div className='card-overlay'>{children}</div>
    )
}

export default CardOverlay

CardOverlay.OverlayBody = OverlayBody