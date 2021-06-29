import React from 'react'
import { FaTwitter } from 'react-icons/fa'
import moment from 'moment'
import './search.css'
import './chart.scss'
import { useGlopalContext } from '../../context'
import Navbar from '../navbar/Navbar'

const Search = () => {
  const {
    tweets: { data },
  } = useGlopalContext()

  return (
    <>
      {/* <!-- ------------------results------------------- --> */}
      <Navbar />
      <div class='results'>
        {/* <div class='result'>
          <div class='analytics-container'>
            <div class='analytics'>analytics:</div>
            <div class='info'>
              <p>
                positive: <span>{data.result_positive}%</span>
              </p>
              <p>
                negative: <span>{data.result_negative}%</span>
              </p>
              <p>
                neutral: <span>{data.result_neutral}%</span>
              </p>
              <p>
                twittes: <span>{data.retrieve_count}</span>{' '}
              </p>
            </div>
          </div>
          <div class='graph'>
            <img src='./images/graph.png' alt='graph' />
          </div>
        </div> */}
        <div className='container'>
          {/* <dl>
            <dt>ANALYTICS</dt>
            <dd class={`percentage percentage-${data.result_positive}`}>
              <span class='text'>positive: {data.result_positive}%</span>
            </dd>
            <dd class={`percentage percentage-${data.result_negative}`}>
              <span class='text'>negative: {data.result_negative}%</span>
            </dd>
            <dd class={`percentage percentage-${data.result_neutral}`}>
              <span class='text'>neutral: {data.result_neutral}%</span>
            </dd>
          </dl>
        </div> */}
          <div className='info'>
            <span>positive: {data.result_positive}%</span>
            <span>negative: {data.result_negative}%</span>
            <span>neutral: {data.result_neutral}%</span>
          </div>
          <div className='graph'>
            <div className={`bar bar-${data.result_positive}`}></div>
            <div className={`bar bar-${data.result_negative}`}></div>
            <div className={`bar bar-${data.result_neutral}`}></div>
          </div>
        </div>
      </div>
      {/* <!-- ------------------tweets------------------- --> */}
      <section className='twittes'>
        <div class='container'>
          {data.tweets.map((item, index) => {
            const {
              created_at,
              entities: { hashtags },
              profile_image,
              sentiment,
              text,
              username,
            } = item
            console.log(hashtags)
            const now = moment().format(created_at)
            return (
              <article class='twitte' key={index}>
                <span
                  className={`sentiment ${
                    sentiment === 'negative' ? 'negative' : false
                  } ${sentiment === 'positive' ? 'positive' : false}`}
                ></span>
                <i className='twitter-icon'>
                  <FaTwitter />
                </i>
                <div className='person-info-container'>
                  <img
                    className='person-img'
                    src={profile_image}
                    alt={username}
                  />
                  <div class='person-info'>
                    <a
                      target='_blank'
                      href={`https://twitter.com/${username}`}
                      class='person-name'
                    >
                      {username}
                    </a>
                    <p className='person-date'>{now}</p>
                  </div>
                </div>
                <div className='info'>{text}</div>
                {hashtags.length > 0 && (
                  <div className='hashtags'>
                    {/* {hashtags.map((hashtag, index) => {
                      return (
                        <span className='hashtag' key={index}>
                          {hashtag}
                        </span>
                      )
                    })} */}
                    hash
                  </div>
                )}
              </article>
            )
          })}
        </div>
      </section>
    </>
  )
}

export default Search
