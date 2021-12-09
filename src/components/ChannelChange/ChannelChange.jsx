import React, ***REMOVED***
  forwardRef, useCallback, useContext,
***REMOVED*** from 'react';
import useTimeout from '../../hooks/useTimeout';
import ***REMOVED*** CHANNEL_CHANGE_TIMEOUT ***REMOVED*** from '../../settings';
import ChannelChangeCtx from '../../state/ChannelChangeCtx';
import ChannelCtx from '../../state/ChannelCtx';
import '../ProgrammeInfo/ProgrammeInfo.scss';

function ChannelChange() ***REMOVED***
  const ***REMOVED***
    toggleBar,
    textInput,
***REMOVED*** = useContext(ChannelChangeCtx);
  const ***REMOVED***
    setId: setChannelId,
    toggleBar: toggleProgrammeInfo,
***REMOVED*** = useContext(ChannelCtx);
  const hideChannelChange = useCallback(
    () => ***REMOVED***
      setChannelId(Number(textInput));
      toggleBar(false);
      toggleProgrammeInfo(true);
  ***REMOVED***,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [textInput],
  );
  useTimeout(hideChannelChange, CHANNEL_CHANGE_TIMEOUT);

  return (
    <dl className="ProgrammeInfo">
      <dt className="hidden">Channel id</dt>
      <dd className="channel-id small">***REMOVED***textInput***REMOVED***</dd>
    </dl>
  );
***REMOVED***

export default forwardRef(ChannelChange);
