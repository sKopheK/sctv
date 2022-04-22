import PropTypes from 'prop-types';
import React, { useContext, useMemo } from 'react';
import AppCtx from '../../state/AppCtx';
import VolumeCtx from '../../state/VolumeCtx';
import Button from '../Button/Button';
import './SoundToggle.scss';

function SoundToggle({ className }) {
  const { screenOn } = useContext(AppCtx);
  const { toggleMute } = useContext(VolumeCtx);

  return useMemo(() => (
    <Button className={`ico-sound ${className}`} onClick={() => screenOn && toggleMute()}>
      <span className="ico-cross" />
    </Button>
  ), [className, screenOn, toggleMute]);
}

SoundToggle.propTypes = {
  className: PropTypes.string,
};

SoundToggle.defaultProps = {
  className: '',
};

export default SoundToggle;
