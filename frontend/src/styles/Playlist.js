import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import styled from 'styled-components/macro';
import theme from '../styles/theme';
import mixins from '../styles/mixins';
const { colors, spacing } = theme;

const TrackContainer = styled(Link)`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  margin-bottom: ${spacing.sm};
  border: 2px solid ${colors.white};
  border-radius: 10px;
  padding: 5px;
  &:hover,
  &:focus {
    background-color: ${colors.white};
    color: ${colors.black};
  }
`;

const TrackArtwork = styled.div`
  display: inline-block;
  position: relative;
  width: 50px;
  min-width: 50px;
  margin-right: ${spacing.base};
`;

const TrackMeta = styled.div`
  display: grid;
  grid-template-columns: 1fr max-content;
  grid-gap: 10px;
`;

const TrackLeft = styled.span`
  ${mixins.overflowEllipsis};
`;

const TrackName = styled.span`
  margin-bottom: 5px;
  border-bottom: 1px solid transparent;
`;

const Playlist = ({ playlist }) => (
  <li>
    <TrackContainer to={`/scan/${playlist.id}`}>
        <TrackArtwork>
            {playlist.images.length && <img src={playlist.images[0].url} alt="Playlist Artwork" />}
        </TrackArtwork>
        <TrackMeta>
            <TrackLeft>
                {playlist.name && <TrackName>{playlist.name}</TrackName>}
            </TrackLeft>
        </TrackMeta>
    </TrackContainer>
  </li>
);

Playlist.propTypes = {
  playlist: PropTypes.object.isRequired,
};

export default Playlist;