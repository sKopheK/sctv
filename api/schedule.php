<?php
require_once 'src/def.php';
require_once SRC_DIR . 'fn.php';
require_once ROOT_DIR . 'vendor/autoload.php';

header('Content-type: application/json');

function getCurrentUrl()
***REMOVED***
  return $_SERVER['REQUEST_SCHEME'] . '://' . $_SERVER['SERVER_NAME'] . $_SERVER['REQUEST_URI'];
***REMOVED***

function getYoutubeService()
***REMOVED***
    // if ($youtube_service === NULL)
    // ***REMOVED***
        // overcoming guzzle's outdated version warning
        error_reporting(E_ALL ^ E_WARNING);

        $client = new Google_Client();
        $client->setScopes([
            'https://www.googleapis.com/auth/youtube.readonly',
    ***REMOVED***);

        // TODO: For this request to work, you must replace
        //       "YOUR_CLIENT_SECRET_FILE.json" with a pointer to your
        //       client_secret.json file. For more information, see
        //       https://cloud.google.com/iam/docs/creating-managing-service-account-keys
        $client->setAuthConfig('gapi.json');
        $client->setAccessType('offline');
        $client->setRedirectUri(getCurrentUrl());

        $client->setDeveloperKey(GOOGLE_API_DEVELOPER_KEY);

        // Request authorization from the user.
        // $authUrl = $client->createAuthUrl();
        // printf("Open this link in your browser:\n%s\n", $authUrl);
        // print('Enter verification code: ');
        // $authCode = trim(fgets(STDIN));

        // // Exchange authorization code for an access token.
        // $accessToken = $client->fetchAccessTokenWithAuthCode($authCode);
        // $client->setAccessToken($accessToken);

        // Define service object for making API requests.
        $youtube_service = new Google_Service_YouTube($client);            
    // ***REMOVED***

    return $youtube_service;
***REMOVED***

// @author https://stackoverflow.com/a/61088115
function date_interval_iso(DateInterval $interval, string $default = 'PT0F') ***REMOVED***
  static $f = ['S0F', 'M0S', 'H0M', 'DT0H', 'M0D', 'P0Y', 'Y0M', 'P0M'];
  static $r = ['S', 'M', 'H', 'DT', 'M', 'P', 'Y', 'P'];

  return rtrim(str_replace($f, $r, $interval->format('P%yY%mM%dDT%hH%iM%sS%fF')), 'PT') ?: $default;
***REMOVED***

if (!isset($_GET['id']) || !is_numeric($_GET['id']))
***REMOVED***
  outputError(); 
***REMOVED***

$channel_id = (int)$_GET['id'];

$schedule_file = sprintf(SCHEDULE_FILE, $channel_id);
$schedule_file_path = CACHE_DIR . $schedule_file;

if (file_exists($schedule_file_path))
***REMOVED***
  echo file_get_contents($schedule_file_path);
  exit();
***REMOVED***

$channel_data_file = sprintf(CHANNEL_FILE, $channel_id);

if (!file_exists($channel_data_file))
***REMOVED***
  outputError(404, '404 Not Found');
***REMOVED***

$channel_data = file($channel_data_file);
$channel_title = trim(array_shift($channel_data));

$result = [];

$service = getYoutubeService();

$channel_video_ids = array_map(function($id) ***REMOVED***
  return trim($id);
***REMOVED***, array_filter($channel_data, function($id) ***REMOVED***
  return $id && !preg_match('#//#', $id);
***REMOVED***));

$channel_video_count = count($channel_video_ids);
$steps = ceil($channel_video_count / GOOGLE_API_ID_MAX_COUNT);
for ($i = 0; $i < $steps; $i++)
***REMOVED***
  $queryParams = [
    'id' => join(',', array_slice($channel_video_ids, $i * GOOGLE_API_ID_MAX_COUNT, GOOGLE_API_ID_MAX_COUNT)),
  ];
  $response = $service->videos->listVideos('snippet,contentDetails', $queryParams);

  if ($response && $response->items)
  ***REMOVED***
    $result = array_merge($result, array_map(function($item) ***REMOVED***
      return [
        'id' => $item->id,
        'title' => $item->snippet->title,
        'duration' => $item->contentDetails->duration,
  ***REMOVED***;
  ***REMOVED***, $response->items));
***REMOVED***
***REMOVED***

$schedule_start = new DateTime(date('Y-m-d'));

foreach($result as $i => $item)
***REMOVED***
  if ($i === 0)
  ***REMOVED***
    $start = $schedule_start;
***REMOVED***
  else
  ***REMOVED***
    $previous = $result[$i - 1];
    $start = clone $previous['start'];
    $start->add(new DateInterval($previous['duration']));
***REMOVED***

  $result[$i]['start'] = $start;
  $result[$i]['nice'] = $start->format('d/n H:i:s');
***REMOVED***

$total_duration = array_reduce($result, function($sum, $video) ***REMOVED***
  return $sum->add(new DateInterval($video['duration']));
***REMOVED***, clone $schedule_start)->diff($schedule_start);

$output = json_encode([
  'id' => $channel_id,
  'title' => $channel_title,
  'duration' => date_interval_iso($total_duration),
  'items' => array_map(function($item) ***REMOVED***
    return [
      'id' => $item['id'],
      'title' => $item['title'],
      'start' => $item['start']->format('c'),
      'duration' => $item['duration'],
***REMOVED***;
***REMOVED***, $result),
]);

$fp = fopen($schedule_file_path, 'w');
if ($fp)
***REMOVED***
  fwrite($fp, $output);
  fclose($fp);
***REMOVED***

echo $output;