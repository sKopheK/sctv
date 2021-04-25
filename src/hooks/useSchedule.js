import axios from 'axios';
import ***REMOVED*** DateTime, Duration ***REMOVED*** from 'luxon';
import ***REMOVED*** useMemo, useRef ***REMOVED*** from 'react';

const useSchedule = (channelId) => ***REMOVED***
  const request = useRef(null);
  const fetch = async (id) => ***REMOVED***
    if (request.current) ***REMOVED***
      request.current.cancel();
  ***REMOVED***
    request.current = axios.CancelToken.source();
    try ***REMOVED***
      const response = await axios.get('/api/schedule', ***REMOVED***
        cancelToken: request.current.token,
        params: ***REMOVED***
          id,
      ***REMOVED***,
    ***REMOVED***);
      return response;
  ***REMOVED*** catch (error) ***REMOVED***
      console.error(error);
  ***REMOVED***
    return ***REMOVED******REMOVED***;
***REMOVED***;

  const payload = useMemo(
    async () => fetch(channelId),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [channelId],
  );

  const getChannelTitle = async () => ***REMOVED***
    const ***REMOVED*** data ***REMOVED*** = await payload;
    return data?.title;
***REMOVED***;

  const getCurrentVideo = async () => ***REMOVED***
    const ***REMOVED*** data ***REMOVED*** = await payload;
    if (data?.duration && data?.items?.length) ***REMOVED***
      const scheduleStart = new Date(data.items[0].start).getTime();
      const scheduleDuration = Duration.fromISO(data.duration).toMillis();
      const now = (new Date()).getTime();
      const currentTimeOffset = (now - scheduleStart) % scheduleDuration;
      const nowInSchedule = scheduleStart + currentTimeOffset;
      const currentVideo = data.items.reduce((carry, programme) => ***REMOVED***
        const start = (new Date(programme.start)).getTime();
        const programmeDuration = Duration.fromISO(programme.duration);
        const end = DateTime.fromMillis(start)
          .plus(programmeDuration)
          .toMillis();
        const offset = nowInSchedule - start;
        return start <= nowInSchedule && nowInSchedule <= end ? ***REMOVED***
          id: programme.id,
          title: programme.title,
          start: now - offset,
          end: DateTime.fromMillis(now - offset).plus(programmeDuration).toMillis(),
          offset,
      ***REMOVED*** : carry;
    ***REMOVED***, null);
      return currentVideo;
  ***REMOVED***
    return null;
***REMOVED***;

  return ***REMOVED***
    getChannelTitle,
    getCurrentVideo,
***REMOVED***;
***REMOVED***;

export default useSchedule;
