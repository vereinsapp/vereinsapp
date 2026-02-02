<?php

namespace App\Controllers;

use App\Models\Mitglieder\Mitglied_Model;
use App\Models\Aufgaben\Aufgabe_Model;
use App\Models\Aufgaben\Rueckmeldung_Model as Aufgaben_Rueckmeldung_Model;
use App\Models\Aufgaben\Zuordnung_Termine_Model;
use App\Models\Termine\Termin_Model;
use App\Models\Termine\Rueckmeldung_Model as Termine_Rueckmeldung_Model;
use App\Models\Termine\Anwesenheit_Model;
use App\Models\Strafkatalog\Strafe_Model;
use App\Models\Strafkatalog\Kassenbucheintrag_Model;
use App\Models\Notenbank\Titel_Model;
use App\Models\Notenbank\Setlisteneintrag_Model;

class Einstellungen extends BaseController {

    public function einstellungen() {

        $this->viewdata['liste']['rechte_vergeben'] = HAUPTINSTANZEN['verfuegbare_rechte'];

        if( auth()->user()->can( 'global.einstellungen' ) OR auth()->user()->can( 'mitglieder.rechte' ) ) {

            $this->viewdata['liste']['rechte_vergeben']['verknuepfungen'] = array( 'typ' => 'check', 'verknuepfungen' => 'vergebene_rechte', 'mitglied_id' => ICH_ID, );
            $this->viewdata['liste']['rechte_vergeben']['disabled_ids'] = array( VERFUEGBARE_RECHTE['global.einstellungen']['id'] );

        } else {

            // eigentlich braucht es hier noch ein Symbol vor der Beschriftung
            $this->viewdata['liste']['rechte_vergeben']['zusatzsymbol'] = array( 'vergebene_rechte' );
            $this->viewdata['liste']['rechte_vergeben']['mitglied_id'] = ICH_ID;

        }

        $this->viewdata_bereinigen(); echo view( 'Einstellungen/einstellungen', $this->viewdata );
    }

    public function ajax_tabellen() { $ajax_antwort[CSRF_NAME] = csrf_hash();
        $validation_rules = array(
            'ajax_id' => 'required|is_natural',
        ); if( !$this->validate( $validation_rules ) ) $ajax_antwort['validation'] = $this->validation->getErrors();
        else {
            $ajax_antwort['tabellen'] = array();
            $ajax_antwort['tabellen']['mitglieder'] = model(Mitglied_Model::class)->mitglieder_tabelle();
            $ajax_antwort['tabellen']['verfuegbare_rechte'] = model(Mitglied_Model::class)->verfuegbare_rechte_tabelle();
            $ajax_antwort['tabellen']['vergebene_rechte'] = model(Mitglied_Model::class)->vergebene_rechte_tabelle();
            if( array_key_exists( LISTEN['aufgaben']['controller'], CONTROLLERS ) ) $ajax_antwort['tabellen']['aufgaben'] = model(Aufgabe_Model::class)->aufgaben_tabelle();
            if( array_key_exists( LISTEN['aufgaben_rueckmeldungen']['controller'], CONTROLLERS ) ) $ajax_antwort['tabellen']['aufgaben_rueckmeldungen'] = model(Aufgaben_Rueckmeldung_Model::class)->rueckmeldungen_tabelle();
            if( array_key_exists( LISTEN['aufgaben_zuordnungen_termine']['controller'], CONTROLLERS ) ) $ajax_antwort['tabellen']['aufgaben_zuordnungen_termine'] = model(Zuordnung_Termine_Model::class)->zuordnungen_termine_tabelle();
            if( array_key_exists( LISTEN['termine']['controller'], CONTROLLERS ) ) $ajax_antwort['tabellen']['termine'] = model(Termin_Model::class)->termine_tabelle();
            if( array_key_exists( LISTEN['termine_rueckmeldungen']['controller'], CONTROLLERS ) ) $ajax_antwort['tabellen']['termine_rueckmeldungen'] = model(Termine_Rueckmeldung_Model::class)->rueckmeldungen_tabelle();
            if( array_key_exists( LISTEN['termine_anwesenheiten']['controller'], CONTROLLERS ) ) $ajax_antwort['tabellen']['termine_anwesenheiten'] = model(Anwesenheit_Model::class)->anwesenheiten_tabelle();
            if( array_key_exists( LISTEN['strafkatalog']['controller'], CONTROLLERS ) ) $ajax_antwort['tabellen']['strafkatalog'] = model(Strafe_Model::class)->strafkatalog_tabelle();
            if( array_key_exists( LISTEN['kassenbuch']['controller'], CONTROLLERS ) ) $ajax_antwort['tabellen']['kassenbuch'] = model(Kassenbucheintrag_Model::class)->kassenbuch_tabelle();
            if( array_key_exists( LISTEN['notenbank']['controller'], CONTROLLERS ) ) $ajax_antwort['tabellen']['notenbank'] = model(Titel_Model::class)->notenbank_tabelle();
            if( array_key_exists( LISTEN['notenbank_setliste']['controller'], CONTROLLERS ) ) $ajax_antwort['tabellen']['notenbank_setliste'] = model(Setlisteneintrag_Model::class)->setliste_tabelle();
        }
        
        $ajax_antwort['ajax_id'] = (int) $this->request->getPost()['ajax_id'];
        echo json_encode( $ajax_antwort, JSON_UNESCAPED_UNICODE );
    }

}
