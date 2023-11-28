import { useContext, useState } from "react"
import { getAuth } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import SignIn from "../components/SignIn/SignIn"
import Avatars from "../components/Avatar/Avatars"
import { UserContext } from '../components/Layout/Layout'
import { 
  User as FirebaseUser,
} from 'firebase/auth'
import Button from "../components/Button/Button"
import DragNDrop from "../components/DragNDrop/DragNDrop"
import "../styles/profile.scss"


function Profile() {
  // User context
  const contextUser: FirebaseUser | null = useContext(UserContext)

  const [AvatarIdx, setAvatarIdx] = useState(-1)

  const auth = getAuth()
  const navigate = useNavigate()

  const logout = () => {
    try {
      auth.signOut()
    } catch (error) {
      console.log(error)
    }

    navigate("/")
  }

  const updateAvatarIdx = (idx: number) => {
    setAvatarIdx(idx)
  }

  return (
    <div className="profile-container">
      {contextUser ? (
        <>
          <Avatars userName={contextUser.displayName} sendAvatarIdx={updateAvatarIdx} />
          <div className='mt-5'>
            <DragNDrop />
          </div>
        </>
      ) : <SignIn />}

      <br />
 
      {contextUser && (
        <>
          <div className='text-right pr-4'>
            <Button data-testid="buttn"
              onClick={logout}
              children={"Log out"}
            />
          </div>
          <div className={`blurry-gradient ${AvatarIdx > -1 ? `avatar-${AvatarIdx}` : ''}`}></div>
        </>
      )}

    </div>
  );
}

export default Profile;
