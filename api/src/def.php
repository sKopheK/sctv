<?php
define('DS', DIRECTORY_SEPARATOR);
define('SRC_DIR', __DIR__ . DS);
define('ROOT_DIR', SRC_DIR . '..' . DS . '..' . DS);
define('CACHE_DIR', ROOT_DIR . 'cache' . DS);
define('CHANNEL_DIR', ROOT_DIR . 'api' . DS . 'channel' . DS);
define('CHANNEL_FILE', CHANNEL_DIR . '%d');
define('SCHEDULE_FILE', 'channel_%d.json');
define('GOOGLE_API_DEVELOPER_KEY', '***REMOVED***');
define('GOOGLE_API_ID_MAX_COUNT', 50);