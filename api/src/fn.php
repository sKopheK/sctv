<?php
function outputError($code = 500, $msg = '500 Internal Server Error')
***REMOVED***
  $protocol = $_SERVER['SERVER_PROTOCOL'];
  header($protocol . ' ' . $msg, TRUE, $code);
  exit();
***REMOVED***