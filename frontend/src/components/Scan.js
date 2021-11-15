import React, { Component } from 'react';
import { Link } from '@reach/router';
import PropTypes from 'prop-types';

// import { getUserInfo, getAudioFeaturesOfTrack, getRecommendationsBpm, getAudioFeaturesOfTracksRecs } from '../spotify';
import { catchErrors } from '../utils';

import styled from 'styled-components/macro';
import Main from '../styles/Main';
// import Loading from './Loading';
import theme from '../styles/theme';
import mixins from '../styles/mixins';
import media from '../styles/media';
import { getPlaylist, getTracksOfPlaylist } from '../spotify';
import { randomIntFromInterval } from '../utils';
const { colors } = theme;

const Header = styled.header`
  ${mixins.flexBetween};
  color: ${colors.white};
  h2 {
    margin: 0;
  }
`;

const Overview = styled.section`
  display: grid;
  grid-template-columns: 3fr 5fr;
  grid-gap: 10px;
  width: 100%;
  ${media.tablet`
    grid-template-columns: 1fr;
  `};
`;

const Section = styled.div`
  margin: 0px;
`;

const BackButton = styled(Link)`
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

export default class NowPlaying extends Component {
  static propTypes = {
      playlistId: PropTypes.string,
  }

  state = {
      playlist: '',
      playlistTracks: '',
  };

  componentDidMount() {
    catchErrors(this.getData());
  }

  async getData() {
    const { playlistId } = this.props;
    const playlist = await getPlaylist(playlistId);
    const resp = await getTracksOfPlaylist(playlistId);
    const playlistTracks = resp.data;
    
    this.setState({
        playlist: '',
        playlistTracks,
    });
  }

  render() {

    const { playlist, playlistTracks } = this.state;
    console.log(playlistTracks);

    // const trackIndex = randomIntFromInterval(0, playlistTracks.length);
    
    return (
        <Main>
            <BackButton to={`/`}>Back</BackButton>
            <Overview>
                <Section>
                    <Header>
                        <h2>{playlist.name}</h2>
                        {playlistTracks ? playlistTracks.items.map((track, i) => <h1 key={i}>{track.track.name}</h1>) : ''}
                    </Header>
                    {/* {playingNow ? (
                        <Container>
                            <Artwork>
                                <img src={playingNow.item.album.images[0].url} alt="Album Artwork"/> 
                            </Artwork>
                            <br/>
                            <br/>
                            <TitleLink to={`/track/${playingNow.item.id}`}>
                              <Title>{playingNow.item.name}</Title> 
                            </TitleLink>
                            <ArtistName>
                                {playingNow.item.artists &&
                                    playingNow.item.artists.map(({ name }, i) => (
                                    <span key={i}>
                                        {name}
                                        {playingNow.item.artists.length > 0 && i === playingNow.item.artists.length - 1 ? '' : ','}
                                        &nbsp;
                                    </span>
                                ))}
                            </ArtistName>
                            <AlbumLink to={`/album/${playingNow.item.album.id}`}>
                              <Album> 
                                {playingNow.item.album.name}{' '}&middot; {getYear(playingNow.item.album.release_date)}
                              </Album>
                            </AlbumLink>
                            <BPM>{playingNowBPM} BPM</BPM> 
                        </Container>
                    ) : <Loading /> } */}
                </Section>
            </Overview>
        </Main>
    )
  }
}