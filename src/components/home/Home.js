import React, { useEffect } from 'react'
import Loading from '../loading/Loading'
import './home.css'
import { useGlopalContext } from '../../context'
import Navbar from '../navbar/Navbar'

const Home = () => {
  const {
    signupOpen,
    setSignupOpen,
    loginOpen,
    setLoginOpen,
    fetchProfile,
    topic,
    search,
    handleTopic,
    loading,
    error,
    renderError,
  } = useGlopalContext()

  // useEffect(() => {
  //   fetchProfile()
  // }, [])

  if (loading) {
    return <Loading />
  }

  return (
    <main
      className='home'
      style={{ backgroundImage: "url('images/background-index.png')" }}
    >
      <Navbar />
      {/* <nav className='navbar'>
        <div className='container'>
          <div className='registration'>
            <Link to='/signup' className='signup-link'>
              Signup
            </Link>
            <Link to='/login' className='login-link'>
              Login
            </Link>
          </div>
        </div>
      </nav> */}
      <div className='center'>
        <div className='container'>
          {error.isError && renderError(error.msg)}
          <div className='icon'>
            <img src='images/icon.png' alt='img' />
          </div>
          <h2 className='title'>opinion twitter</h2>
          <h3 className='info'>Free Social Media Search Engine</h3>
          <form onSubmit={search}>
            <div className='form-inupt'>
              <input
                className='search-input'
                type='search'
                placeholder='Search'
                name='topic'
                value={topic}
                onChange={handleTopic}
              />
              <button className='search-btn'>
                <i className='fa fa-search'></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}

export default Home
