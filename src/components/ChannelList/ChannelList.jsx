import PropTypes from 'prop-types';
import React from 'react';
import './ChannelList.scss';

function ChannelList(***REMOVED*** list, activeChannel ***REMOVED***) ***REMOVED***
  return (
    <ul className="ChannelList">
      ***REMOVED***list.map((channel) => (
        <li key=***REMOVED***channel.id***REMOVED*** className=***REMOVED***channel.id === activeChannel ? 'is-active' : ''***REMOVED***>
          <span className="channel-id">***REMOVED***channel.id***REMOVED***</span>
          ***REMOVED***' '***REMOVED***
          ***REMOVED***channel.title***REMOVED***
        </li>
      ))***REMOVED***
    </ul>
  );
***REMOVED***

ChannelList.propTypes = ***REMOVED***
  list: PropTypes.arrayOf(PropTypes.shape(***REMOVED***
    id: PropTypes.number,
    title: PropTypes.string,
    active: PropTypes.bool,
***REMOVED***)),
  activeChannel: PropTypes.number,
***REMOVED***;

ChannelList.defaultProps = ***REMOVED***
  list: [],
  activeChannel: null,
***REMOVED***;

export default ChannelList;
