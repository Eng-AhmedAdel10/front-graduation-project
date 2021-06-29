import React from 'react'
import './change_password.css'
import Navbar from '../navbar/Navbar'
import { useGlopalContext } from '../../context'
import '../login/login.css'

const Change_password = () => {
  const { error, renderError, handleRegistration, change_password } =
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
            <div className='header'>Change Password</div>
            <form>
              <input
                type='password'
                className='input-form'
                placeholder='Old Password'
                name='old_password'
                onChange={handleRegistration}
              />
              <input
                type='password'
                className='input-form'
                placeholder='New Password'
                name='new_password'
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
                    change_password()
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

export default Change_password
