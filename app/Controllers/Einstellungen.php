<?php

namespace App\Controllers;

// listen
use App\Models\Mitglieder\Mitglied_Model;
use App\Models\Aufgaben\Aufgabe_Model;
use App\Models\Termine\Termin_Model;
use App\Models\Strafkatalog\Strafe_Model;
use App\Models\Notenbank\Titel_Model;

// verknuepfungen
use App\Models\Aufgaben\Rueckmeldung_Model as Aufgaben_Rueckmeldung_Model;
use App\Models\Aufgaben\Zuordnung_Termine_Model;
use App\Models\Termine\Rueckmeldung_Model as Termine_Rueckmeldung_Model;
use App\Models\Termine\Anwesenheit_Model;
use App\Models\Strafkatalog\Zugewiesene_Strafe_Model;
use App\Models\Notenbank\Setlisteneintrag_Model;

class Einstellungen extends BaseController {

    public function einstellungen() {

        $this->viewdata['liste']['rechte_vergeben'] = VIEWDATA['verfuegbare_rechte'];
        $this->viewdata['liste']['rechte_vergeben']['mitglied_id'] = ICH_ID;
        $this->viewdata['liste']['rechte_vergeben']['ueberschrift'] = 'Meine Rechte';
        $this->viewdata['liste']['rechte_vergeben']['element']['verknuepfungen'] = array( 'verknuepfungen' => 'vergebene_rechte', );
        if( auth()->user()->can( 'global.einstellungen' ) OR auth()->user()->can( 'mitglieder.rechte' ) ) {
            $this->viewdata['liste']['rechte_vergeben']['disabled_ids'] = array( VERFUEGBARE_RECHTE['global.einstellungen']['id'] );
            $this->viewdata['liste']['rechte_vergeben']['element']['verknuepfungen']['verknuepfung_erstellen'] = TRUE;
        } else $this->viewdata['liste']['rechte_vergeben']['element']['verknuepfungen']['verknuepfung_status_symbol'] = TRUE;

        $this->viewdata_bereinigen(); echo view( 'Einstellungen/einstellungen', $this->viewdata );
    }

    public function ajax_serverdata_holen() { $ajax_antwort[CSRF_NAME] = csrf_hash();
        $validation_rules = array(
            'ajax_id' => 'required|is_natural',
        ); if( !$this->validate( $validation_rules ) ) $ajax_antwort['validation'] = $this->validation->getErrors();
        else {
            // listen
            $ajax_antwort['liste']['mitglieder'] = model(Mitglied_Model::class)->mitglieder_serverdata();
            $ajax_antwort['liste']['verfuegbare_rechte'] = model(Mitglied_Model::class)->verfuegbare_rechte_serverdata();
            if( array_key_exists( 'aufgaben', CONTROLLERS ) ) $ajax_antwort['liste']['aufgaben'] = model(Aufgabe_Model::class)->aufgaben_serverdata();
            if( array_key_exists( 'termine', CONTROLLERS ) ) $ajax_antwort['liste']['termine'] = model(Termin_Model::class)->termine_serverdata();
            if( array_key_exists( 'strafkatalog', CONTROLLERS ) ) $ajax_antwort['liste']['strafkatalog'] = model(Strafe_Model::class)->strafkatalog_serverdata();
            if( array_key_exists( 'notenbank', CONTROLLERS ) ) $ajax_antwort['liste']['notenbank'] = model(Titel_Model::class)->notenbank_serverdata();

            // verknuepfungen
            $ajax_antwort['verknuepfungen']['vergebene_rechte'] = model(Mitglied_Model::class)->vergebene_rechte_serverdata();
            if( array_key_exists( VERKNUEPFUNGEN['aufgaben_rueckmeldungen']['controller'], CONTROLLERS ) ) $ajax_antwort['verknuepfungen']['aufgaben_rueckmeldungen'] = model(Aufgaben_Rueckmeldung_Model::class)->rueckmeldungen_serverdata();
            if( array_key_exists( VERKNUEPFUNGEN['aufgaben_zuordnungen_termine']['controller'], CONTROLLERS ) ) $ajax_antwort['verknuepfungen']['aufgaben_zuordnungen_termine'] = model(Zuordnung_Termine_Model::class)->zuordnungen_termine_serverdata();
            if( array_key_exists( VERKNUEPFUNGEN['termine_rueckmeldungen']['controller'], CONTROLLERS ) ) $ajax_antwort['verknuepfungen']['termine_rueckmeldungen'] = model(Termine_Rueckmeldung_Model::class)->rueckmeldungen_serverdata();
            if( array_key_exists( VERKNUEPFUNGEN['termine_anwesenheiten']['controller'], CONTROLLERS ) ) $ajax_antwort['verknuepfungen']['termine_anwesenheiten'] = model(Anwesenheit_Model::class)->anwesenheiten_serverdata();
            if( array_key_exists( VERKNUEPFUNGEN['strafkatalog_zugewiesene_strafen']['controller'], CONTROLLERS ) ) $ajax_antwort['verknuepfungen']['strafkatalog_zugewiesene_strafen'] = model(Zugewiesene_Strafe_Model::class)->zugewiesene_strafen_serverdata();
            if( array_key_exists( VERKNUEPFUNGEN['notenbank_setliste']['controller'], CONTROLLERS ) ) $ajax_antwort['verknuepfungen']['notenbank_setliste'] = model(Setlisteneintrag_Model::class)->setliste_serverdata();
        }
        
        $ajax_antwort['ajax_id'] = (int) $this->request->getPost()['ajax_id'];
        echo json_encode( $ajax_antwort, JSON_UNESCAPED_UNICODE );
    }

}
