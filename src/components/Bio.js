import React from 'react'

// Import typefaces
import 'typeface-montserrat'
import 'typeface-merriweather'

import profilePic from './profile-pic.jpeg'
import { rhythm } from '../utils/typography'

import InstagramIcon from 'react-icons/lib/fa/instagram'
import FacebookIcon from 'react-icons/lib/fa/facebook-official'
import TwitterIcon from 'react-icons/lib/fa/twitter-square'
import GithubIcon from 'react-icons/lib/fa/github-square'

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
          <strong>Damian Simon Peter</strong> is an independent sofware consultant based in Kitchener-Waterloo, Ontario. 
      <br />
        <span style={{fontSize: "2em"}}>
          <a href="https://www.instagram.com/theterminalguy/"><InstagramIcon/></a>
          <a href="https://www.facebook.com/theterminalguy/"><FacebookIcon /></a>
          <a href="https://twitter.com/theterminalguy/"><TwitterIcon /></a>
          <a href="https://github.com/theterminalguy/"><GithubIcon /></a>
        </span>
      </p>

      <a href="mailto:damiansimonpeter@gmail.com?subject=Pair%20program%20with%20me" title="Pair program with me!">
      <img src="http://pairprogramwith.me/badge.png"
      alt="Pair program with me!" />
      </a>
      </div>
    )
  }
}

export default Bio
