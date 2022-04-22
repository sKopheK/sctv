import PropTypes from 'prop-types';
import React, { useCallback, useContext, useMemo } from 'react';
import useTimeout from '../../hooks/useTimeout';
import { VOLUME_DIALOG_TIMEOUT } from '../../settings';
import VolumeCtx from '../../state/VolumeCtx';
import './VolumeBar.scss';

function VolumeBar({ value }) {
  const { toggleBar } = useContext(VolumeCtx);

  const hideVolumeBar = useCallback(
    () => toggleBar(false),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [toggleBar, value],
  );
  useTimeout(hideVolumeBar, VOLUME_DIALOG_TIMEOUT);

  const styles = useMemo(() => ({
    width: `${value}%`,
  }), [value]);

  return useMemo(() => (
    <div className="VolumeBar">
      <span className="bar">
        <span className="value" style={styles} />
      </span>
      {value}
    </div>
  ), [value, styles]);
}

VolumeBar.propTypes = {
  value: PropTypes.number.isRequired,
};

export default VolumeBar;
