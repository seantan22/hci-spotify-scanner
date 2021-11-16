import React, { Component } from 'react';
import { Link } from '@reach/router';
import PropTypes from 'prop-types';
import { catchErrors } from '../utils';
import styled from 'styled-components/macro';
import Main from '../styles/Main';
import Loading from '../styles/Loading';
import theme from '../styles/theme';
import mixins from '../styles/mixins';
import media from '../styles/media';
import { getPlaylist, getTracksOfPlaylist, playTrack } from '../spotify';
import { randomIntFromInterval } from '../utils';
const { colors } = theme;

const Header = styled.header`
  ${mixins.flexBetween};
  color: ${colors.white};
  display: block;
  h2 {
    font-size: 12px;
    justify-content: center;
    align-items: flex-end;
    margin: 0;
  }
`;

const Overview = styled.section`
  display: grid;
  grid-template-columns: 3fr 5fr;
  grid-gap: 10px;
  width: 100%;
  ${media.phone`
    grid-template-columns: 1fr;
  `};
`;

const Container = styled.div`
    text-align: center !important;
    align-items: center;
    margin-top: 10px;
`;

const Section = styled.div`
  margin: 0px;
`;

const SongName = styled.h1`
  font-size: 20px;
  margin: 0 0 5px;
  &:hover {
    text-decoration: underline;
  }
`;

const ArtistName = styled.h2`
font-size: 14px;
  color: ${colors.lightestGrey};
  font-weight: 700;
`;

const Artwork = styled.div`
  ${mixins.coverShadow};
  max-width: 200px;
  margin-top: 30px;
  display: block;
  margin-left: auto;
  margin-right: auto;
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

const ScanButtonInactive = styled.div`
    display: block;
    color: ${colors.black};
    background-color: transparent;
    text-align: center;
    height: 200px;
    line-height: 200px;
    color: ${colors.white};
    border: 5px solid ${colors.white};
    border-radius: 30px;
    margin-top: 20px;
    font-size: 30px;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
`;

const ScanButtonActive = styled.div`
    display: block;
    background-color: ${colors.white};
    text-align: center;
    height: 200px;
    line-height: 200px;
    color: ${colors.black};
    border: 5px solid ${colors.white};
    border-radius: 30px;
    margin-top: 20px;
    font-size: 30px;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
`;

export default class Scan extends Component {

    constructor(props) {
        super(props);
        this.state = {
            scanInactive: true,
            playlist: '',
            track: '',
        };

        this.toggleScan = this.toggleScan.bind(this);
    }

    static propTypes = {
        playlistId: PropTypes.string,
    }

    toggleScan() {
        this.setState({scanInactive: !this.state.scanInactive});
        // while(!this.state.scanInactive) {
        //     console.log("scanning...");
        // }
    }

    componentDidMount() {
        catchErrors(this.getData());
    }

    async getData() {
        const { playlistId } = this.props;
        const playlistData = await getPlaylist(playlistId);
        const playlistIdData = await getTracksOfPlaylist(playlistId);

        const playlist = playlistData.data;
        const numOfTracks = playlistIdData.data.total;
        const playlistTracks = playlistIdData.data.items;

        const trackIndex = randomIntFromInterval(0, numOfTracks);
        const trackData = playlistTracks[trackIndex];
        const track = trackData.track;
        await playTrack(track.album.uri, track.track_number);

        this.setState({
            playlist,
            track,
        });
    }

    render() {

        const { playlist, track } = this.state;

        return (
            <Main>
                <BackButton to={`/`}>Back</BackButton>
                <Overview>
                    <Section>
                        <Header>
                            <h2>{playlist.name}</h2>
                        </Header>
                        {track ? (
                            <Container>
                                <Artwork>
                                    <img src={track.album.images[0].url} alt="Album Artwork"/> 
                                </Artwork>
                                <br/>
                                <br/>
                                <SongName>{track.name}</SongName> 
                                <ArtistName>
                                    {track.artists &&
                                        track.artists.map(({ name }, i) => (
                                        <span key={i}>
                                            {name}
                                            {track.artists.length > 0 && i === track.artists.length - 1 ? '' : ','}
                                            &nbsp;
                                        </span>
                                    ))}
                                </ArtistName>
                            </Container>
                        ) : <Loading /> }
                    </Section>
                </Overview>
                {this.state.scanInactive ? <ScanButtonInactive onClick={this.toggleScan}>Click to Scan</ScanButtonInactive> 
                                        : <ScanButtonActive onClick={this.toggleScan}>Scanning</ScanButtonActive>}
            </Main>
        )
    }
}



