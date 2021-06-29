import React, { useState, useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

const CreateContext = React.createContext()
const AppProvider = ({ children }) => {
  let history = useHistory()
  const [registration, setRegistration] = useState('')
  const [info, setInfo] = useState(JSON.parse(sessionStorage.getItem('info')))
  const [error, setError] = useState({ isError: false, msg: '' })
  const [topic, setTopic] = useState('')
  const [loading, setLoading] = useState(false)
  const [tweets, setTweets] = useState(null)

  const handleRegistration = (e) => {
    console.log(registration)
    setRegistration({
      ...registration,
      [e.target.name]: e.target.value,
    })
  }

  const signupRequest = async () => {
    if (!registration) {
      handleError(['please fill all fields'])
    } else if (!registration.username) {
      handleError(['please fill username'])
    } else if (!registration.email) {
      handleError(['please fill email'])
    } else if (!registration.password) {
      handleError(['please fill password'])
    } else if (!registration.password2) {
      handleError(['please fill re-password'])
    } else if (registration.password !== registration.password2) {
      handleError(['password and re-password is not matching'])
    } else {
      try {
        const res = await axios.post(
          'http://127.0.0.1:8000/api/account/register',
          registration
        )
        if (res.data.token) {
          setRegistration('')
          history.push('/login')
          console.log(res.data.response)
        } else {
          const keys = Object.getOwnPropertyNames(res.data)
          const err = keys.map((item) => {
            return res.data[item]
          })
          handleError(err)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  const fetchProfile = async (token) => {
    const url = {
      method: 'GET',
      url: 'http://127.0.0.1:8000/api/account/account_view',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `token ${token}`,
      },
    }
    try {
      const res = await axios(url)
      setSession(token, res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const loginRequest = async () => {
    if (!registration) {
      handleError(['please fill all fields'])
    } else if (!registration.username) {
      handleError(['please fill email'])
    } else if (!registration.password) {
      handleError(['please fill password'])
    } else {
      try {
        const res = await axios.post(
          'http://127.0.0.1:8000/api/account/login',
          registration
        )
        console.log(res)
        if (res.data.token) {
          console.log(res.data.token)
          await fetchProfile(res.data.token)
          setRegistration('')
          history.push('/')
        } else {
          const keys = Object.getOwnPropertyNames(res.data)
          const err = keys.map((item) => {
            return res.data[item]
          })
          handleError(err)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  const setSession = (token, user) => {
    sessionStorage.setItem(
      'info',
      JSON.stringify({
        token,
        user,
      })
    )
    setInfo(JSON.parse(sessionStorage.getItem('info')))
  }

  const logout = () => {
    sessionStorage.removeItem('info')
    setInfo(sessionStorage.getItem('info'))
  }

  const handleError = (msg) => {
    setError({ isError: true, msg })
    const timerError = setTimeout(() => {
      setError({ isError: false, msg: '' })
    }, 3000)
    return () => clearTimeout(timerError)
  }

  const renderError = (msg) => {
    return msg.map((item, index) => {
      return (
        <h4 key={index} className='error'>
          {item}
        </h4>
      )
    })
  }

  const updateProfile = async () => {
    if (!registration) {
      handleError(['please fill all fields'])
    } else if (!registration.username) {
      handleError(['please fill username'])
    } else if (!registration.email) {
      handleError(['please fill email'])
    } else {
      const requestOptions = {
        method: 'PUT',
        url: 'http://127.0.0.1:8000/api/account/update_account_view',
        data: registration,
        headers: {
          'Content-Type': 'application/json',
          authorization: `token ${info.token}`,
        },
      }
      try {
        const res = await axios(requestOptions)
        console.log(res)
        if (res.data.response) {
          await setSession(info.token, res.data)
          await fetchProfile(info.token)
          setRegistration('')
          history.push('/profile')
        } else {
          const keys = Object.getOwnPropertyNames(res.data)
          const err = keys.map((item) => {
            return res.data[item]
          })
          handleError(err)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  const change_password = async () => {
    if (!registration) {
      handleError(['please fill all fields'])
    } else if (!registration.old_password) {
      handleError(['please fill old password'])
    } else if (!registration.new_password) {
      handleError(['please fill new password'])
    } else {
      const requestOptions = {
        method: 'PUT',
        url: 'http://localhost:8000/api/account/change-password',
        data: registration,
        headers: {
          'Content-Type': 'application/json',
          authorization: `token ${info.token}`,
        },
      }
      try {
        const res = await axios(requestOptions)
        console.log(res)
        if (res.data.code === 200) {
          setRegistration('')
          history.push('/profile')
        } else {
          const keys = Object.getOwnPropertyNames(res.data)
          const err = keys.map((item) => {
            return res.data[item]
          })
          handleError(err)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  const search = async (e) => {
    e.preventDefault()
    if (!info) {
      history.push('/login')
      return false
    }
    if (!topic) {
      handleError(['please type any thing for search'])
    } else {
      setLoading(true)
      const bodyFormData = new FormData()
      bodyFormData.append('topic', topic)
      const requestOptions = {
        method: 'POST',
        url: 'http://127.0.0.1:8000/search_tweets',
        data: bodyFormData,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          authorization: `token ${info.token}`,
        },
      }
      try {
        const res = await axios(requestOptions)
        if (res.data[0] === 'Not Fonud :(') {
          handleError(res.data)
          console.log(res)
          setLoading(false)
        } else {
          setTweets(res)
          setLoading(false)
          setTopic('')
          history.push('/search')
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handleTopic = (e) => {
    setTopic(e.target.value)
  }

  return (
    <CreateContext.Provider
      value={{
        handleRegistration,
        signupRequest,
        loginRequest,
        error,
        renderError,
        info,
        logout,
        fetchProfile,
        updateProfile,
        registration,
        change_password,
        search,
        topic,
        handleTopic,
        tweets,
        loading,
      }}
    >
      {children}
    </CreateContext.Provider>
  )
}

export const useGlopalContext = () => {
  return useContext(CreateContext)
}

export default AppProvider
