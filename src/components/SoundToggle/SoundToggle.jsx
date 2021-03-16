import PropTypes from 'prop-types';
import React from 'react';
import Button from '../Button/Button';
import './SoundToggle.scss';

function SoundToggle(***REMOVED*** className ***REMOVED***) ***REMOVED***
  return (
    <Button className=***REMOVED***`ico-sound $***REMOVED***className***REMOVED***`***REMOVED***>
      <span className="ico-cross" />
    </Button>
  );
***REMOVED***

SoundToggle.propTypes = ***REMOVED***
  className: PropTypes.string,
***REMOVED***;

SoundToggle.defaultProps = ***REMOVED***
  className: '',
***REMOVED***;

export default SoundToggle;
