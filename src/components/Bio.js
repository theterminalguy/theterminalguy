import React from 'react'

// Import typefaces
import 'typeface-montserrat'
import 'typeface-merriweather'

import profilePic from './profile-pic.jpeg'
import { rhythm } from '../utils/typography'

import InstagramIcon from 'react-icons/lib/fa/instagram'
import LinkedInIcon from 'react-icons/lib/fa/linkedin-square'
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
          <strong>Damian Simon Peter</strong> is a programmer based in Kitchener, Ontario.
          He currently works for <a href="https://smile.io" target="_blank" rel="noopener">Smile.io</a> as a Backend Developer focused on 
          <a href="https://www.ruby-lang.org/en/" target="_blank" rel="noopener"> Ruby</a> and 
          <a href="https://elixir-lang.org/" target="_blank" rel="noopener"> Elixir</a>
        <br />
        <span style={{fontSize: "2em"}}>
          <a href="https://www.linkedin.com/in/damian-simon-peter-2775a9100/"><LinkedInIcon /></a>
          <a href="https://www.instagram.com/theterminalguy/"><InstagramIcon/></a>
          <a href="https://twitter.com/theterminalguy/"><TwitterIcon /></a>
          <a href="https://github.com/theterminalguy/"><GithubIcon /></a>
        </span>
      </p>

      <a href="mailto:damiansimonpeter@gmail.com?subject=Pair%20program%20with%20me" title="Pair program with me!">
      <img src="https://pairprogramwith.me/badge.png"
      alt="Pair program with me!" />
      </a>
      </div>
    )
  }
}

export default Bio
