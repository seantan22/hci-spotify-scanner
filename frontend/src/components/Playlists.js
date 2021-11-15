import React, { Component } from 'react';
import styled from 'styled-components/macro';
import Main from '../styles/Main';
import Playlist from '../styles/Playlist';
import Loading from '../styles/Loading';
import theme from '../styles/theme';
import media from '../styles/media';
import { getPlaylists, logout } from '../spotify';
import { catchErrors } from '../utils';
const { colors } = theme;

const Brand = styled.header`
    display: block;
    justify-content: center;
    align-items: flex-end;
    h1 {
        font-size: 80px;
        color: ${colors.white};
        ${media.phone`
            display: flex;
            justify-content: center;
            font-size: 30px;
        `};
    }
    h2 {
        color: ${colors.lightGrey};
        margin-bottom: 25px;
        ${media.phone`
            display: flex;
            justify-content: center;
            font-size: 14px;
        `};
    }
    
`;

const LogoutButton = styled.a`
  background-color: transparent;
  color: ${colors.white};
  border: 1px solid ${colors.white};
  border-radius: 30px;
  margin-bottom: 10px;
  padding: 6px 15px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  text-align: center;
  &:hover,
  &:focus {
    background-color: ${colors.white};
    color: ${colors.black};
  }
`;

export default class Playlists extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playlists: '',
        };
    }
    
    componentDidMount() {
        catchErrors(this.getData());
    }

    async getData() {
        const playlists = await getPlaylists();
        this.setState({
            playlists,
        });
    }


  render() {
    const { playlists } = this.state;
    return (
      <Main>
            <LogoutButton onClick={logout}>Logout</LogoutButton>
            <Brand>
                <h1>Spotify Scanner</h1>
                <h2>Select a playlist</h2>
            </Brand>
            <ul>
                    {playlists ? playlists.data.items.map((playlist, i) => <Playlist playlist={playlist} key={i} />) : <Loading />}
            </ul>
      </Main> 
    )
  }
}