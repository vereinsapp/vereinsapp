<?php
// pdf2png.php - erste Seite des PDF als PNG zurückliefern

$file = $_GET['file'] ?? '';

if (!$file || !file_exists($file)) {
    header("HTTP/1.0 404 Not Found");
    exit;
}

// Cache-Key
$cacheDir = __DIR__ . '/cache/';
$cacheKey = md5($file . filemtime($file)) . "_p1.jpg"; 
$cachePath = $cacheDir . $cacheKey;

if (file_exists($cachePath)) {
    header("Content-Type: image/jpeg");
    readfile($cachePath);
    exit;
}

try {
    $imagick = new Imagick();
    $imagick->setResolution(100, 100);
    
    // DER TRICK: [0] erzwingt, dass nur die erste Seite geladen wird.
    $imagick->readImage($file . '[0]'); 

    $imagick->setImageType(Imagick::IMGTYPE_GRAYSCALE);
    $imagick->setImageFormat('jpeg');
    $imagick->setImageCompressionQuality(75);

    if ($imagick->getImageWidth() > 1000) {
        $imagick->scaleImage(1000, 0);
    }

    $imagick->writeImage($cachePath);

    header("Content-Type: image/jpeg");
    echo $imagick->getImageBlob();

} catch (Exception $e) {
    header("HTTP/1.0 500 Internal Server Error");
    echo "Fehler: " . $e->getMessage();
}
