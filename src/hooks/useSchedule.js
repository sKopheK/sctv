import axios from 'axios';
import ***REMOVED*** DateTime, Duration ***REMOVED*** from 'luxon';
import ***REMOVED*** useCallback, useMemo ***REMOVED*** from 'react';

const useSchedule = () => ***REMOVED***
  const fetch = async () => ***REMOVED***
    try ***REMOVED***
      const response = await axios.get('/schedule.json');
      return response;
  ***REMOVED*** catch (error) ***REMOVED***
      console.error(error);
  ***REMOVED***
    return null;
***REMOVED***;

  const payload = useMemo(async () => fetch(), []);

  const getChannelTitle = useCallback(async () => ***REMOVED***
    const ***REMOVED*** data ***REMOVED*** = await payload;
    return data?.title;
***REMOVED***, [payload]);

  const getCurrentVideo = async () => ***REMOVED***
    const ***REMOVED*** data ***REMOVED*** = await payload;
    if (data?.items?.length) ***REMOVED***
      const now = (new Date()).getTime();
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
