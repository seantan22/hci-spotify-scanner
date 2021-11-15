import React, { Component } from 'react';
import { Router } from '@reach/router';
import styled from 'styled-components/macro';
import media from '../styles/media'
import theme from '../styles/theme';

import Playlists from './Playlists';

const SiteWrapper = styled.div`
  padding-left: ${theme.navWidth};
  ${media.phone`
    padding-left: 0;
    padding-bottom: 50px;
  `};
`;

export default class Overview extends Component {
    render() {
      return (
        <SiteWrapper>
          <Router primary={false}>
          <Playlists path="/" />
        </Router>
        </SiteWrapper>
      )
    }
  }