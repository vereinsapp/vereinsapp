<?php

namespace App\Controllers;

class Status extends BaseController {

    public function wartungsarbeiten() {
        $this->viewdata_bereinigen(); echo view( 'Status/wartungsarbeiten', $this->viewdata );
    }

    public function ajax_datenschutz_richtlinie() { $ajax_antwort[CSRF_NAME] = csrf_hash();
        $validation_rules = array(
            'ajax_id' => 'required|is_natural',
        ); if( !$this->validate( $validation_rules ) ) $ajax_antwort['validation'] = $this->validation->getErrors();
        else $ajax_antwort['html'] = view( 'Status/datenschutz_richtlinie', $this->viewdata );
        
        $ajax_antwort['ajax_id'] = (int) $this->request->getPost()['ajax_id'];
        echo json_encode( $ajax_antwort, JSON_UNESCAPED_UNICODE );
    }

}
