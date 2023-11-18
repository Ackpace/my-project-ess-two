import { useContext } from "react"
import Avatar from './Avatar'
import { UserContext } from '../Layout/Layout'
import { avatarSrc } from '../../assets/avatarSrc'
import { doc, setDoc, getDoc } from "firebase/firestore"
import { db } from '../../firebase.config'
import { getStorage, ref, deleteObject } from "firebase/storage"
import eventBus from "../../assets/utilities/EventBus"
import {
    User as FirebaseUser,
} from 'firebase/auth'
import './avatars.scss'

interface AvatarsProp {
    userName?: string | null
    sendAvatarIdx: (idx: number) => void
}

function Avatars(props: AvatarsProp) {
    const contextUser: FirebaseUser | null = useContext(UserContext)
    const fullName = props.userName
    const firstName = fullName && fullName.split(' ')[0]
    const imgSrc = avatarSrc

    const getAvatarIdx = (idx: number) => {
        props.sendAvatarIdx(idx)
    }

    const updateAvatar = async (idx: number) => {
        if (contextUser) {
            const userRef = doc(db, 'users', contextUser.uid)
            const userSnap = await getDoc(userRef)

            // delete UID image
            const storage = getStorage()

            const imageToDeleteRef = ref(storage, `images/${contextUser.uid}`)

            // TODO: check if it exists. Exucutes the following only when it exists
            deleteObject(imageToDeleteRef).then(() => {
                console.log('successfully deleted..')
            }).catch((err) => {
                console.log('err: ', err);
            })

            // update Avatar
            if (userSnap.exists()) {
                if (userSnap.data().avatar === imgSrc[idx].img) {
                    console.log('same avatar selected!')
                    return
                }
            }

            await setDoc(userRef, {
                name: contextUser.displayName,
                email: contextUser.email,
                avatar: imgSrc[idx].img
            })

            eventBus.dispatch('updateAvatar', imgSrc[idx].img)
        }
    }
 
    return (
        <div className='avatars'>
            {props.userName && <h1>Hi, {firstName}</h1>}
            <h2>Choose your avatar or upload your own.</h2>
            <div className='avatar-selection'>
                {
                    imgSrc.map((obj, idx) => (
                        <div
                            className='avatar-container'
                            onMouseEnter={() => getAvatarIdx(idx)}
                            onMouseLeave={() => props.sendAvatarIdx(-1)}
                            onClick={() => updateAvatar(idx)}
                            key={idx}
                        >
                            <Avatar img={obj.img} idx={idx} />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Avatars