<?php
require 'config.php';

$apiKey = $_SERVER['HTTP_X_API_KEY'] ?? '';

if ($apiKey !== $API_KEY) {
    http_response_code(403);
    exit;
}

$filename = basename($_POST['filename'] ?? '');
$file = $QUEUE_DIR . "/" . $filename;

if (str_ends_with($file, ".processing") && file_exists($file)) {
    unlink($file);
    http_response_code(200);
} else {
    http_response_code(400);
}