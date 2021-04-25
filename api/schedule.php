<?php
define('ROOT_DIR', __DIR__ . '/../');
define('CACHE_DIR', ROOT_DIR . 'cache/');
define('SCHEDULE_FILE', 'channel_%d.json');
define('GOOGLE_API_DEVELOPER_KEY', 'AIzaSyCejxOr9AhjVezb1E7tqoese3plIEszcOc');

require_once ROOT_DIR . 'vendor/autoload.php';

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

function outputError($code = 500, $msg = '500 Internal Server Error')
***REMOVED***
  $protocol = $_SERVER['SERVER_PROTOCOL'];
  header($protocol . ' ' . $msg, TRUE, $code);
  exit();
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

switch ($channel_id)
***REMOVED***
  case 67:
    $channel_title = 'AfreecaTV StarLeague Finals';
    $queryParams = [
        'id' => join(',', [
          '5CeSxPAJgFY',
          'MuhjA_Fv0VI',
          'TBzuhofHH10',
          '8UOqk79UHPE',
          'rvqr_aYs-ns',
          '3sb47YGI7l8',
          'wEhkSaa4wUU',
          '0uDAPoICEBg',
          'EnoV2c_LYnU',
          '9qENyb8fkOY',
    ***REMOVED***),
***REMOVED***;
    break;
    
  case 68:
    $channel_title = 'Artosis\' Rage';
    $queryParams = [
      'id' => join(',', [
        'bBevrkgI5uc',
        'RKrmDJqDadg',
        'MlymxQg_wzI',
        '7gBcG7ttSuA',        
  ***REMOVED***),
***REMOVED***;
    break;

  default:
    outputError(404, '404 Not Found');
    break;
***REMOVED***


$service = getYoutubeService();
$response = $service->videos->listVideos('snippet,contentDetails', $queryParams);

$result = [];
$total_duration = 0;
if ($response && $response->items)
***REMOVED***
  $schedule_start = new DateTime(date('Y-m-d'));

  $result = array_map(function($item) ***REMOVED***
    return [
      'id' => $item->id,
      'title' => $item->snippet->title,
      'duration' => $item->contentDetails->duration,
***REMOVED***;
***REMOVED***, $response->items);

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
***REMOVED***

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

header('Content-type: application/json');
echo $output;