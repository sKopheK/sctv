import PropTypes from 'prop-types';
import React, ***REMOVED*** useContext ***REMOVED*** from 'react';
import AppCtx from '../../state/AppCtx';
import VolumeCtx from '../../state/VolumeCtx';
import Button from '../Button/Button';
import './SoundToggle.scss';

function SoundToggle(***REMOVED*** className ***REMOVED***) ***REMOVED***
  const ***REMOVED*** screenOn ***REMOVED*** = useContext(AppCtx);
  const ***REMOVED*** toggleMute ***REMOVED*** = useContext(VolumeCtx);

  return (
    <Button className=***REMOVED***`ico-sound $***REMOVED***className***REMOVED***`***REMOVED*** onClick=***REMOVED***() => screenOn && toggleMute()***REMOVED***>
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
