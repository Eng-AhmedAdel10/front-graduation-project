import React, { useEffect } from 'react'
import './profile.css'
import Navbar from '../navbar/Navbar'
import { useGlopalContext } from '../../context'
import { Link } from 'react-router-dom'

const Profile = () => {
  const { info } = useGlopalContext()
  const {
    user: { username, email, phone, age, image },
  } = info
  return (
    <>
      <Navbar />
      {/* <!-- ------------------profile------------------- --> */}
      <div className='profile' style={{ backgroundImage: '' }}>
        <div className='container'>
          <div className='row'>
            <div className='col col-12 col-md-4 col-lg-3'>
              <div className='info-profile'>
                <img
                  className='profile-img'
                  src='/media/default_image/logo_1080_1080.png'
                  alt='profile-img'
                />
                <div className='btns-container'>
                  <Link
                    className='btn btn-link profile-btn'
                    to='/change_password'
                  >
                    Change Password
                  </Link>
                  <Link
                    className='btn btn-link profile-btn'
                    to='/update_profile'
                  >
                    Update Profile
                  </Link>
                </div>
              </div>
            </div>
            <div className='col col-12 col-md-8 col-lg-9 '>
              <div className='about-profile'>
                {/* <h2 className='profile-name'>{username}</h2> */}
                <p>
                  <span className='label'>username :</span> {username}
                </p>
                <p>
                  <span className='label'>e-mail :</span> {email}
                </p>
                <p>
                  <span className='label'>age :</span> {age || '--'}
                </p>
                <p>
                  <span className='label'>phone :</span> {phone || '--'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile
