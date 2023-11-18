import React, { useEffect, useState, createContext } from 'react'
import {
  getAuth,
  User as FirebaseUser,
  onAuthStateChanged,
} from 'firebase/auth'
import Header from '../Header/Header'
import { ToastContainer, toast } from 'react-toastify'
import './layout.scss'
import 'react-toastify/dist/ReactToastify.css'

type Props = {
  children: JSX.Element
}
export interface UserInfoType {
  uid: string | null | undefined
  displayName: string | null | undefined
  email: string | null | undefined
  avatar: string | null | undefined
}


let ResponsivenessContext: React.Context<boolean>

const ResponsivenessProvider = ({ children }: Props) => {

  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth)
  const [isMobile, setIsMobile] = useState(false)

  const resizeWindow = () => {
    setScreenWidth(window.innerWidth)
  }

  useEffect(() => {
    resizeWindow()
    window.addEventListener('resize', resizeWindow)

    return window.removeEventListener('resize', resizeWindow)
  }, [])

  useEffect(() => {
    setIsMobile(screenWidth < 760)
    ResponsivenessContext = createContext(isMobile)
  }, [screenWidth, isMobile])

  return (ResponsivenessContext &&
    <ResponsivenessContext.Provider value={isMobile}>
      {children}
    </ResponsivenessContext.Provider>
  )
}

let UserContext: React.Context<FirebaseUser | null>

const Layout = ({ children }: Props) => {
  const [user, setUser] = useState<FirebaseUser | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  UserContext = createContext(user)

  const auth = getAuth()

  useEffect(() => {
    // setting user
    const listener = onAuthStateChanged(auth, async (user) => {
      setIsAuthenticated(!!user);
    });

    return () => {
      listener()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setUser(auth.currentUser)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, auth.currentUser])

  useEffect(() => {
    user ? showToastMessage(true) : showToastMessage(false)
  }, [user])

  const showToastMessage = (signedIn: boolean) => {
    toast.success(`Logged ${signedIn ? 'in' : 'out'}!`, {
      theme: 'dark',
      position: toast.POSITION.BOTTOM_RIGHT
    });
  } 

  return (
    <div className="layout">
      <ResponsivenessProvider>
        <UserContext.Provider value={user}>
          <Header />
          <main className="main max-w-7xl">
            {children}
          </main>
          <ToastContainer />
        </UserContext.Provider>
      </ResponsivenessProvider>
    </div>
  );
};
export { UserContext, ResponsivenessContext }
export default Layout;
