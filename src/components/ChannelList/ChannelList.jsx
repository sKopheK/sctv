import PropTypes from 'prop-types';
import React from 'react';
import './ChannelList.scss';

function ChannelList(***REMOVED*** list ***REMOVED***) ***REMOVED***
  return (
    <ul className="ChannelList">
      ***REMOVED***list.map((channel) => (
        <li key=***REMOVED***channel.id***REMOVED*** className=***REMOVED***channel.active ? 'is-active' : ''***REMOVED***>
          ***REMOVED***channel.id***REMOVED***
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
***REMOVED***;

ChannelList.defaultProps = ***REMOVED***
  list: [],
***REMOVED***;

export default ChannelList;
