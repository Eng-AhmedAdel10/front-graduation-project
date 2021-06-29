import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import Navbar from '../navbar/Navbar'
import './signup.css'
import '../login/login.css'
import { useGlopalContext } from '../../context'

const Signup = () => {
  const { handleRegistration, signupRequest, error, renderError } =
    useGlopalContext()

  return (
    <>
      <Navbar />
      <div
        className='login-container show'
        style={{ backgroundImage: "url('images/background-index.png')" }}
      >
        <div className='container login-center'>
          <div className='login'>
            <div className='header'>SIGNUP</div>
            <form>
              <input
                type='text'
                className='input-form'
                placeholder='Your name'
                name='username'
                onChange={handleRegistration}
              />
              <input
                type='email'
                className='input-form'
                placeholder='Your Email'
                name='email'
                onChange={handleRegistration}
              />
              <input
                type='password'
                className='input-form'
                placeholder='Password'
                name='password'
                onChange={handleRegistration}
              />
              <input
                type='password'
                className='input-form'
                placeholder='Repeat Password'
                name='password2'
                onChange={handleRegistration}
              />
              {error.isError ? (
                renderError(error.msg)
              ) : (
                <input
                  type='submit'
                  className='Submit-btn'
                  value='Submit'
                  onClick={(e) => {
                    e.preventDefault()
                    signupRequest()
                  }}
                />
              )}

              <div className='links'>
                <Link to='/login'>I'am already have account</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Signup
