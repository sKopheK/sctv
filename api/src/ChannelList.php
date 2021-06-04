<?php
class ChannelList
***REMOVED***
  private static $list = NULL;

  public function __construct()
  ***REMOVED***
    throw new Exception("Static class");
***REMOVED***

  /**
   * Get list of channels - id and title
   * @return ***REMOVED***array***REMOVED***
   */
  public static function get()
  ***REMOVED***
    if (self::$list === NULL)
    ***REMOVED***
      $channels = [];

      $dp = dir(CHANNEL_DIR);
      while (FALSE !== ($file = $dp->read()))
      ***REMOVED***
        if ($file != '.' && $file != '..')
        ***REMOVED***
          $channel_id = (int)$file;
          $channel_def_fn = sprintf(CHANNEL_FILE, $channel_id);
          $fp = fopen($channel_def_fn, 'r');
          if ($fp !== FALSE)
          ***REMOVED***
            $title = trim(fgets($fp));
            $channels[] = [
              'id'    => $channel_id,
              'title' => $title,
        ***REMOVED***;
            fclose($fp);
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***
      $dp->close();

      self::$list = $channels;
  ***REMOVED***

    return self::$list;
***REMOVED***
***REMOVED***