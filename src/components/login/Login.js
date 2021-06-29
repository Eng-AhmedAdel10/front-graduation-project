import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../navbar/Navbar'
import { useGlopalContext } from '../../context'
import './login.css'

const Login = () => {
  const { loginRequest, handleRegistration, error, renderError } =
    useGlopalContext()

  return (
    <>
      <div
        className='login-container show'
        style={{ backgroundImage: "url('images/background-index.png')" }}
      >
        <Navbar />
        <div className='container login-center'>
          <div className='login'>
            <div className='header'>LOGIN</div>
            <form>
              <input
                type='email'
                className='input-form'
                placeholder='Your Email'
                name='username'
                onChange={handleRegistration}
              />
              <input
                type='password'
                className='input-form'
                placeholder='Password'
                name='password'
                onChange={handleRegistration}
              />
              {error.isError ? (
                renderError(error.msg)
              ) : (
                <button
                  className='Submit-btn'
                  onClick={(e) => {
                    e.preventDefault()
                    loginRequest()
                  }}
                >
                  Submit
                </button>
              )}
              <div className='links'>
                <Link to='/signup'>Register</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
