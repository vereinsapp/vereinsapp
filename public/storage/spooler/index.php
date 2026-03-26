<?php
require 'config.php';

//echo("ok");

$apiKey = $_SERVER['HTTP_X_API_KEY'] ?? '';

if ($apiKey !== $API_KEY) {
    http_response_code(403);
    exit;
}


$files = glob($QUEUE_DIR . "/*.pdf");
if (empty($files)) {
    http_response_code(204);
    exit;
}

usort($files, function($a, $b) {
    return filemtime($a) <=> filemtime($b);
});

$original = $files[0];
$processing = $original . ".processing";

if (!rename($original, $processing)) {
    http_response_code(500);
    exit;
}

header("Content-Type: application/pdf");
header("X-Job-Filename: " . basename($processing));
readfile($processing);

