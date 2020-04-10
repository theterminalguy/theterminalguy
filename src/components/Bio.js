import React from 'react'

// Import typefaces
import 'typeface-montserrat'
import 'typeface-merriweather'
import InstagramIcon from 'react-icons/lib/fa/instagram'
import LinkedInIcon from 'react-icons/lib/fa/linkedin-square'
import TwitterIcon from 'react-icons/lib/fa/twitter-square'
import GithubIcon from 'react-icons/lib/fa/github-square'

import profilePic from './profile-pic.jpeg'
import { rhythm } from '../utils/typography'
import Link from './Link'

class Bio extends React.Component {
  render() {
    return (
      <div
        style={{
          display: 'flex',
          marginBottom: rhythm(2.5),
        }}
      >

        <img
          src={profilePic}
          alt={`Damian Simon Peter`}
          style={{
            marginRight: rhythm(1 / 2),
            marginBottom: 0,
            width: rhythm(2),
            height: rhythm(2),
            borderRadius: '50%',
          }}
        /> 

        <p>
        Hi, I am <strong>Damian Simon Peter</strong> a software developer based in Waterloo, Ontario. I have spent the past years working for early-stage startups, building backend and frontend applications primarily using 
        <Link url="https://www.ruby-lang.org/en/"> Ruby</Link> and 
        <Link url="https://developer.mozilla.org/en-US/docs/Web/JavaScript"> JavaScript</Link>. I own a 
        <Link url="https://system76.com/laptops/galago"> System76 Galago Pro</Link> running 
        <Link url="https://system76.com/pop"> Pop!_OS</Link> and absolutely love it.
        <br />
        <span style={{fontSize: "2em"}}>
          <Link url="https://www.linkedin.com/in/damian-simon-peter-2775a9100/">
            <LinkedInIcon />
          </Link>

          <Link url="https://www.instagram.com/theterminalguy/">
            <InstagramIcon/>
          </Link>

          <Link url="https://twitter.com/theterminalguy/">
            <TwitterIcon />
          </Link>

          <Link url="https://github.com/theterminalguy/">
            <GithubIcon />
          </Link>
        </span>
      </p>
      </div>
    )
  }
}

export default Bio
