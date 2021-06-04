<?php
require_once 'src/def.php';
require_once SRC_DIR . 'fn.php';
require_once SRC_DIR . 'ChannelList.php';

header('Content-type: application/json');

$list = ChannelList::get();

$output = json_encode($list);
echo $output;