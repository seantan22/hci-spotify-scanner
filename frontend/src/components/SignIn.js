import React, { Component } from 'react';
import styled from 'styled-components/macro';
import Main from '../styles/Main';
import theme from '../styles/theme';
import media from '../styles/media';
import mixins from '../styles/mixins';
const { colors } = theme;

const LOGIN_URI =
  process.env.NODE_ENV !== 'production'
    ? 'http://localhost:8888/login'
    : 'https://hci-spotify-scanner.herokuapp.com//login';


const Login = styled(Main)`
  ${mixins.flexCenter};
  flex-direction: column;
  min-height: 100vh;
  h1 {
    font-size: 140px;
    text-align: center;
    ${media.phone`
      font-size: 40px;
    `};
  }
  h4 {
    font-size: 30px;
    text-align: center;
    ${media.phone`
      font-size: 14px;
    `};
  }
`;
const LoginButton = styled.a`
  display: inline-block;
  background-color: ${colors.green};
  color: ${colors.white};
  border-radius: 30px;
  padding: 17px 35px;
  margin: 20px 0 70px;
  min-width: 160px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  text-align: center;
  &:hover,
  &:focus {
    background-color: ${colors.brightGreen};
  }
`;

export default class SignIn extends Component {
    render() {
      return (
        <Login>
          <h1> Spotify Scanner </h1>
          <h4> An Eyes-Free Solution to Music Browsing </h4>
          <LoginButton href={LOGIN_URI}> Login to Spotify </LoginButton>
        </Login>
      )
    }
  }