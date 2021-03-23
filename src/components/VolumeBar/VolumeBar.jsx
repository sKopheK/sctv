import PropTypes from 'prop-types';
import React from 'react';
import './VolumeBar.scss';

function VolumeBar(***REMOVED*** value ***REMOVED***) ***REMOVED***
  const styles = ***REMOVED***
    width: `$***REMOVED***value***REMOVED***%`,
***REMOVED***;
  return (
    <div className="VolumeBar">
      <span className="bar">
        <span className="value" style=***REMOVED***styles***REMOVED*** />
      </span>
      ***REMOVED***value***REMOVED***
    </div>
  );
***REMOVED***

VolumeBar.propTypes = ***REMOVED***
  value: PropTypes.number.isRequired,
***REMOVED***;

export default VolumeBar;
