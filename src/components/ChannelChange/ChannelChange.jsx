import React, {
  forwardRef, useCallback, useContext,
} from 'react';
import useTimeout from '../../hooks/useTimeout';
import { CHANNEL_CHANGE_TIMEOUT } from '../../settings';
import ChannelChangeCtx from '../../state/ChannelChangeCtx';
import ChannelCtx from '../../state/ChannelCtx';
import '../ProgrammeInfo/ProgrammeInfo.scss';

function ChannelChange() {
  const {
    toggleBar,
    textInput,
  } = useContext(ChannelChangeCtx);
  const {
    setId: setChannelId,
    toggleBar: toggleProgrammeInfo,
  } = useContext(ChannelCtx);
  const hideChannelChange = useCallback(
    () => {
      setChannelId(Number(textInput));
      toggleBar(false);
      toggleProgrammeInfo(true);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [textInput],
  );
  useTimeout(hideChannelChange, CHANNEL_CHANGE_TIMEOUT);

  return (
    <dl className="ProgrammeInfo">
      <dt className="hidden">Channel id</dt>
      <dd className="channel-id small">{textInput}</dd>
    </dl>
  );
}

export default forwardRef(ChannelChange);
