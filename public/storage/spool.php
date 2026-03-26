<?php
// spool.php
$file = $_POST['file'] ?? '';

// Pfad bereinigen: Wir suchen das letzte Vorkommen von "notenbank/" oder "notenarchiv/" 
// und schneiden alles davor ab.
$relativeFile = $file;
if (preg_match('/(notenbank\/|notenarchiv\/).*/', $file, $matches)) {
    $relativeFile = $matches[0];
}

// Jetzt prüfen wir den bereinigten Pfad
if (!$relativeFile || !file_exists($relativeFile)) {
    header("HTTP/1.1 400 Bad Request");
    exit("Ungültige Datei oder nicht gefunden: " . $relativeFile);
}

$spoolDir = __DIR__ . '/spooler/';
if (!is_dir($spoolDir)) mkdir($spoolDir, 0777, true);

$fileName = basename($relativeFile);
$destination = $spoolDir . time() . "_" . $fileName;

if (copy($relativeFile, $destination)) {
    echo "Erfolg";
} else {
    header("HTTP/1.1 500 Internal Server Error");
    exit("Fehler beim Kopieren.");
}