import React from 'react'
import { Link } from 'react-router-dom'
import { FaBars } from 'react-icons/fa'
import './navbar.css'
import { useGlopalContext } from '../../context'

const Navbar = () => {
  const { info: token, logout } = useGlopalContext()
  return (
    <nav className='navbar navbar-expand-lg navbar-light'>
      <Link to='/' className='navbar-brand'>
        <img src='./images/icon.png' alt='logo' />
      </Link>
      <button
        className='navbar-toggler text-white'
        type='button'
        data-toggle='collapse'
        data-target='#navbarSupportedContent'
        aria-controls='navbarSupportedContent'
        aria-expanded='false'
        aria-label='Toggle navigation'
      >
        <FaBars />
      </button>

      <div className='collapse navbar-collapse' id='navbarSupportedContent'>
        <ul className='navbar-nav mr-auto'>
          <li className='nav-item '>
            <Link to='/' className='nav-link'>
              Home
            </Link>
          </li>
          {token ? (
            <>
              <li className='nav-item'>
                <Link to='/profile' className='nav-link'>
                  Profile
                </Link>
              </li>
              <input
                type='button'
                value='Log Out'
                className='btn btn-danger my-2 my-lg-0 logout-btn'
                onClick={logout}
              />
            </>
          ) : (
            <>
              <li className='nav-item'>
                <Link to='/Signup' className='nav-link'>
                  Sign Up
                </Link>
              </li>
              <li className='nav-item'>
                <Link to='/Login' className='nav-link'>
                  Log In
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
