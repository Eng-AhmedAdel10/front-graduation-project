import React from 'react'
import './update_profile.css'
import Navbar from '../navbar/Navbar'
import { useGlopalContext } from '../../context'
import '../login/login.css'

const UpdateProfile = () => {
  const {
    error,
    renderError,
    handleRegistration,
    updateProfile,
    registration,
  } = useGlopalContext()

  return (
    <>
      <Navbar />
      <div
        className='login-container show'
        style={{ backgroundImage: "url('images/background-index.png')" }}
      >
        <div className='container login-center'>
          <div className='login'>
            <div className='header'>Update Profile</div>
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
                type='tel'
                className='input-form'
                placeholder='Your Phone'
                name='phone'
                onChange={handleRegistration}
              />
              <input
                type='number'
                className='input-form'
                placeholder='Your Age'
                name='age'
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
                    updateProfile()
                  }}
                />
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default UpdateProfile
