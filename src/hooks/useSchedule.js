import axios from 'axios';
import ***REMOVED*** DateTime, Duration ***REMOVED*** from 'luxon';
import ***REMOVED*** useMemo ***REMOVED*** from 'react';

const useSchedule = () => ***REMOVED***
  const fetch = async () => ***REMOVED***
    try ***REMOVED***
      const response = await axios.get('/api/schedule');
      return response;
  ***REMOVED*** catch (error) ***REMOVED***
      console.error(error);
  ***REMOVED***
    return ***REMOVED******REMOVED***;
***REMOVED***;

  const payload = useMemo(async () => fetch(), []);

  const getChannelTitle = async () => ***REMOVED***
    const ***REMOVED*** data ***REMOVED*** = await payload;
    return data?.title;
***REMOVED***;

  const getCurrentVideo = async () => ***REMOVED***
    const ***REMOVED*** data ***REMOVED*** = await payload;
    if (data?.duration && data?.items?.length) ***REMOVED***
      const scheduleStart = new Date(data.items[0].start).getTime();
      const currentTimeOffset = ((new Date()).getTime() - scheduleStart)
                                  % Duration.fromISO(data.duration).toMillis();
      const now = scheduleStart + currentTimeOffset;
      const currentVideo = data.items.reduce((carry, programme) => ***REMOVED***
        const start = (new Date(programme.start)).getTime();
        const end = DateTime.fromMillis(start)
          .plus(Duration.fromISO(programme.duration))
          .toMillis();
        return start <= now && now <= end ? ***REMOVED***
          id: programme.id,
          title: programme.title,
          start,
          end,
          offset: now - start,
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
