import PropTypes from 'prop-types';
import React, ***REMOVED*** useCallback, useContext, useMemo ***REMOVED*** from 'react';
import useTimeout from '../../hooks/useTimeout';
import ***REMOVED*** VOLUME_DIALOG_TIMEOUT ***REMOVED*** from '../../settings';
import VolumeCtx from '../../state/VolumeCtx';
import './VolumeBar.scss';

function VolumeBar(***REMOVED*** value ***REMOVED***) ***REMOVED***
  const ***REMOVED*** toggleBar ***REMOVED*** = useContext(VolumeCtx);

  const hideVolumeBar = useCallback(
    () => toggleBar(false),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [toggleBar, value],
  );
  useTimeout(hideVolumeBar, VOLUME_DIALOG_TIMEOUT);

  const styles = useMemo(() => (***REMOVED***
    width: `$***REMOVED***value***REMOVED***%`,
***REMOVED***), [value]);

  return useMemo(() => (
    <div className="VolumeBar">
      <span className="bar">
        <span className="value" style=***REMOVED***styles***REMOVED*** />
      </span>
      ***REMOVED***value***REMOVED***
    </div>
  ), [value, styles]);
***REMOVED***

VolumeBar.propTypes = ***REMOVED***
  value: PropTypes.number.isRequired,
***REMOVED***;

export default VolumeBar;
