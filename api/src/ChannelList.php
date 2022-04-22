<?php
class ChannelList
{
  private static $list = NULL;

  public function __construct()
  {
    throw new Exception("Static class");
  }

  /**
   * Get list of channels - id and title
   * @return {array}
   */
  public static function get()
  {
    if (self::$list === NULL)
    {
      $channels = [];

      $dp = dir(CHANNEL_DIR);
      while (FALSE !== ($file = $dp->read()))
      {
        if ($file != '.' && $file != '..')
        {
          $channel_id = (int)$file;
          $channel_def_fn = sprintf(CHANNEL_FILE, $channel_id);
          $fp = fopen($channel_def_fn, 'r');
          if ($fp !== FALSE)
          {
            $title = trim(fgets($fp));
            $channels[] = [
              'id'    => $channel_id,
              'title' => $title,
            ];
            fclose($fp);
          }
        }
      }
      $dp->close();

      self::$list = $channels;
    }

    return self::$list;
  }
}