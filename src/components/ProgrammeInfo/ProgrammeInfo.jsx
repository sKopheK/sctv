import { DateTime } from 'luxon';
import PropTypes from 'prop-types';
import React, { useCallback, useContext, useMemo } from 'react';
import useTimeout from '../../hooks/useTimeout';
import { INFO_DIALOG_TIMEOUT, INFO_DIALOG_PROGRAMME_TITLE_MAX_LENGTH } from '../../settings';
import ChannelCtx from '../../state/ChannelCtx';
import './ProgrammeInfo.scss';

function ProgrammeInfo({
  channelId, channelTitle, programmeTitle, starts, ends, isLoading,
}) {
  const { toggleBar } = useContext(ChannelCtx);

  const hideProgrammeInfo = useCallback(
    () => {
      if (!isLoading) {
        toggleBar(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [toggleBar, channelId, isLoading],
  );
  useTimeout(hideProgrammeInfo, INFO_DIALOG_TIMEOUT);

  const programmeTitleCut = programmeTitle && programmeTitle.length > INFO_DIALOG_PROGRAMME_TITLE_MAX_LENGTH ? `${programmeTitle.substring(0, INFO_DIALOG_PROGRAMME_TITLE_MAX_LENGTH).trimEnd()}...` : programmeTitle;

  return useMemo(() => (
    <dl className="ProgrammeInfo">
      <dt className="hidden">Channel id</dt>
      <dd className="channel-id small">{channelId}</dd>
      <dt className="hidden">Channel title</dt>
      <dd className="channel-title small">{isLoading ? 'Loading...' : (channelTitle || 'No signal')}</dd>
      <dt className="hidden">Programme title</dt>
      <dd className="programme-title">{isLoading ? '' : programmeTitleCut}</dd>
      <dt className="starts-label smaller">{starts && !isLoading ? 'Starts' : ''}</dt>
      <dd className="starts smaller">{starts && !isLoading ? DateTime.fromMillis(starts).toFormat('HH:mm') : ''}</dd>
      <dt className="ends-label smaller">{ends && !isLoading ? 'Ends' : ''}</dt>
      <dd className="ends smaller">{ends && !isLoading ? DateTime.fromMillis(ends).toFormat('HH:mm') : ''}</dd>
    </dl>
  ), [channelId, channelTitle, programmeTitleCut, starts, ends, isLoading]);
}

ProgrammeInfo.propTypes = {
  channelId: PropTypes.number.isRequired,
  channelTitle: PropTypes.string,
  programmeTitle: PropTypes.string,
  starts: PropTypes.number,
  ends: PropTypes.number,
};

ProgrammeInfo.defaultProps = {
  channelTitle: '',
  programmeTitle: '',
  starts: 0,
  ends: 0,
};

export default ProgrammeInfo;
