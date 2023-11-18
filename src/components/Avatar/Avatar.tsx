
interface AvatarProp {
    img: string,
    idx: number
}
 
function Avatar(props: AvatarProp) {
    return (
        <div className={`avatar-img-container avatar-${props.idx}`}>
            <img src={props.img} alt='avatar' />
        </div>
    )
}

export default Avatar