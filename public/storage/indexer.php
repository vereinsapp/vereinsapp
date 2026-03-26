<?php

//ini_set('display_errors', 1);
//error_reporting(E_ALL);

$baseDir = __DIR__;

/* archiv optional scannen
$directories = [
    $baseDir . '/notenbank',
    $baseDir . '/notenarchiv'
];
*/

$directories = [
    $baseDir . '/notenbank'
];

$outputFile = $baseDir . '/index.txt';

$pdfPaths = [];

foreach ($directories as $dir) {

    if (!is_dir($dir) || !is_readable($dir)) {
        echo "Überspringe nicht zugreifbares Verzeichnis: $dir<br>";
        continue;
    }

    try {
        $directory = new RecursiveDirectoryIterator(
            $dir,
            FilesystemIterator::SKIP_DOTS
        );

        $iterator = new RecursiveIteratorIterator($directory);

        foreach ($iterator as $file) {

            if ($file->isFile() && strtolower($file->getExtension()) === 'pdf') {

                $fullPath = $file->getPathname();

                $relativePath = substr($fullPath, strlen($baseDir) + 1);

                $relativePath = str_replace('\\', '/', $relativePath);

                $pdfPaths[] = $relativePath;
            }
        }

    } catch (Exception $e) {
        echo "Fehler in $dir: " . $e->getMessage() . "<br>";
    }
}

$pdfPaths = array_unique($pdfPaths);

natcasesort($pdfPaths);

$pdfPaths = array_values($pdfPaths);

if (file_put_contents($outputFile, implode(PHP_EOL, $pdfPaths)) === false) {
    die("Konnte Indexdatei nicht schreiben.");
}

echo "Index erstellt. Gefundene PDFs: " . count($pdfPaths);

?>
