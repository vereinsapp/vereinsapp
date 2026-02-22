<?php

namespace App\Controllers;

class Status extends BaseController {

    public function wartungsarbeiten() {
        $this->viewdata_bereinigen(); echo view( 'Status/wartungsarbeiten', $this->viewdata );
    }

}
