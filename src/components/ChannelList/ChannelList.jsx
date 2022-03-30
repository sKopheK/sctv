import PropTypes from 'prop-types';
import React, ***REMOVED***
  useCallback, useContext, useEffect, useRef, useState,
***REMOVED*** from 'react';
import useTimeout from '../../hooks/useTimeout';
import ***REMOVED*** CHANNEL_LIST_TIMEOUT ***REMOVED*** from '../../settings';
import ChannelListCtx from '../../state/ChannelListCtx';
import './ChannelList.scss';

const RESIZE_EVENT = 'resize';

function ChannelList(***REMOVED*** list, activeChannel ***REMOVED***) ***REMOVED***
  const activeChannelIndex = list.findIndex((channel) => channel.id === activeChannel);
  const listElRef = useRef(null);
  const [listItemDimensions, setListItemDimensions] = useState(null);
  const itemCount = list.length;

  const ***REMOVED*** toggleBar ***REMOVED*** = useContext(ChannelListCtx);

  const hideProgrammeInfo = useCallback(
    () => toggleBar(false),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [toggleBar, activeChannelIndex],
  );
  useTimeout(hideProgrammeInfo, CHANNEL_LIST_TIMEOUT);

  function getListItemHeight() ***REMOVED***
    const listElement = listElRef.current;
    const items = listElement.children;
    const firstItem = items[0];
    const itemSpacing = parseFloat(window.getComputedStyle(firstItem).marginBottom);
    setListItemDimensions([firstItem.offsetHeight, itemSpacing]);
***REMOVED***

  function resetListItemHeight() ***REMOVED***
    setListItemDimensions(null);
    getListItemHeight();
***REMOVED***

  function getListItems() ***REMOVED***
    if (listItemDimensions === null) ***REMOVED***
      return list;
  ***REMOVED***
    const [itemHeight, itemSpacing] = listItemDimensions;
    const listElement = listElRef.current;
    const wrapperElement = listElement.parentElement;
    const wrapperStyle = window.getComputedStyle(wrapperElement);
    const contentHeightAvailable = wrapperElement.offsetHeight
                                      - parseFloat(wrapperStyle.paddingTop)
                                      - parseFloat(wrapperStyle.paddingBottom);
    const visibleItemCount = Math.max(1, Math.floor((contentHeightAvailable + itemSpacing)
                                          / (itemHeight + itemSpacing)));
    const middleIndex = Math.floor(visibleItemCount / 2);
    const offset = Math.min(
      itemCount - visibleItemCount,
      Math.max(0, activeChannelIndex - middleIndex),
    );
    return list.filter((_, itemIndex) => ***REMOVED***
      const isVisible = itemIndex >= offset && itemIndex < visibleItemCount + offset;
      return isVisible;
  ***REMOVED***);
***REMOVED***

  useEffect(() => ***REMOVED***
    window.addEventListener(RESIZE_EVENT, resetListItemHeight);
    return () => ***REMOVED***
      window.removeEventListener(RESIZE_EVENT, resetListItemHeight);
  ***REMOVED***;
  // eslint-disable-next-line react-hooks/exhaustive-deps
***REMOVED***, []);

  useEffect(() => ***REMOVED***
    getListItemHeight();
    return () => ***REMOVED******REMOVED***;
***REMOVED***, []);

  const listItems = getListItems();

  return (
    <div className="ChannelList">
      <ul className="channel-list" ref=***REMOVED***listElRef***REMOVED***>
        ***REMOVED***listItems.map((channel) => (
          <li key=***REMOVED***channel.id***REMOVED*** className=***REMOVED***channel.id === activeChannel ? 'is-active' : ''***REMOVED***>
            <span className="channel-id">***REMOVED***channel.id***REMOVED***</span>
            ***REMOVED***' '***REMOVED***
            <span className=***REMOVED***`channel-title$***REMOVED***channel.title ? '' : ' channel-title--empty'***REMOVED***`***REMOVED***>***REMOVED***channel.title ?? 'Empty'***REMOVED***</span>
          </li>
        ))***REMOVED***
      </ul>
    </div>
  );
***REMOVED***

ChannelList.propTypes = ***REMOVED***
  list: PropTypes.arrayOf(PropTypes.shape(***REMOVED***
    id: PropTypes.number,
    title: PropTypes.string,
    active: PropTypes.bool,
***REMOVED***)),
  activeChannel: PropTypes.number,
***REMOVED***;

ChannelList.defaultProps = ***REMOVED***
  list: [],
  activeChannel: null,
***REMOVED***;

export default ChannelList;
