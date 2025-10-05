<?php

namespace Config;

use CodeIgniter\Config\BaseConfig;

class Vereinsapp_css extends BaseConfig
{
    /**
     * --------------------------------------------------------------------------
     * Lies Mich!
     * --------------------------------------------------------------------------
     *
     * Diese Datei definiert alles rund um css
     */

    /**
     * --------------------------------------------------------------------------
     * Pfade css-Dateien
     * --------------------------------------------------------------------------
     *
     * Pfade zu den css-Dateien, die im View layout eingebunden werden.
     */
    public $pfad = array(
        'css/bootstrap.min.css', // https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css
        'css/bootstrap-icons.css', // https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css

        'css/vereinsapp.css?v='.VERSION,
    );

}
