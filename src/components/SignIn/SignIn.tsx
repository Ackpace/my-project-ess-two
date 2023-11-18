import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import Button from "../Button/Button"
import "./signIn.scss"
import TmdbInput, { InputTypes } from "../FormElements/TmdbInput"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const { email, password } = formData
  const navigate = useNavigate()

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => {
      return {
        ...prevState,
        [e.target.id]: e.target.value,
      }
    })
  }

  const getSignedIn = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (userCredential.user) {
        navigate("/");
      }
    } catch (error) {
      showToastErrMessage()
      console.log('err: ', error);
    }
  }

  const showToastErrMessage = () => {
    toast.error('Incorrect Username/Password', {
      theme: 'dark',
      position: toast.POSITION.BOTTOM_RIGHT
    })
  }
 
  return (
    <div className="sign-in-container">
      <h1 className='text-3xl' data-testid="welcome">Welcome Back! <span>&#128075;</span></h1>
      <form onSubmit={getSignedIn}>
        <TmdbInput
          label='Email'
          type={InputTypes.email}
          placeholder='ex) test1@gmail.com'
          onChange={onChange}
          id='email'
        />
        <TmdbInput
          label='password'
          type={InputTypes.password}
          placeholder='ex) 123123'
          onChange={onChange}
          id='password'
          data-testid="passwordidnew"
        />
        <div className="form-buttons-container">
          <Button data-testid="passwordidnew">Sign in</Button>
          <Button linkTo="/signup">Register Instead</Button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default SignIn;
