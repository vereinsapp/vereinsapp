<?php

namespace App\Controllers;
use App\Models\Termine\Termin_Model;
use App\Models\Termine\Rueckmeldung_Model;
use App\Models\Termine\Anwesenheit_Model;

use App\Models\Mitglieder\Mitglied_Model;

use CodeIgniter\I18n\Time;

class Termine extends BaseController {

    public function termine() {

        $this->viewdata['liste']['bevorstehende_termine'] = HAUPTINSTANZEN['termine'];
        $this->viewdata['liste']['bevorstehende_termine']['group-flush'] = TRUE;
        $this->viewdata['liste']['bevorstehende_termine']['link'] = TRUE;
        $this->viewdata['liste']['bevorstehende_termine']['vorschau'] = array( 'start', 'ort' );
        $this->viewdata['liste']['bevorstehende_termine']['verknuepfungen'] = array( 'typ' => 'auswahlmoeglichkeiten', 'verknuepfungen' => 'termine_rueckmeldungen', 'auswahlmoeglichkeiten' => VERKNUEPFUNGEN['termine_rueckmeldungen']['auswahlmoeglichkeiten'], );
        $this->viewdata['liste']['bevorstehende_termine']['gegen_liste'] = "mitglieder";
        $this->viewdata['liste']['bevorstehende_termine']['gegen_element_id'] = ICH['id'];

        $this->viewdata['liste']['termine_anwesenheiten_dokumentieren'] = HAUPTINSTANZEN['mitglieder'];
        unset($this->viewdata['liste']['termine_anwesenheiten_dokumentieren']['filtern']);

        $this->viewdata['werkzeugkasten']['termine_anwesenheiten_dokumentieren'] = array(
            'klasse_id' => 'btn_termine_anwesenheiten_dokumentieren',
            // 'title' => 'Anwesenheiten dokumentieren',
        );

        if( array_key_exists( 'termine.anwesenheiten', VERFUEGBARE_RECHTE ) AND auth()->user()->can( 'termine.anwesenheiten' ) ) {

            $this->viewdata['liste']['termine_anwesenheiten_dokumentieren']['verknuepfungen'] = array( 'typ' => 'check', 'verknuepfungen' => 'termine_anwesenheiten', );
            $this->viewdata['liste']['termine_anwesenheiten_dokumentieren']['zusatzsymbol'][] = 'termine_rueckmeldungen';

            $this->viewdata['werkzeugkasten']['termine_anwesenheiten_dokumentieren']['title'] = 'Anwesenheiten dokumentieren';

        } else {

            $this->viewdata['liste']['termine_anwesenheiten_dokumentieren']['zusatzsymbol'][] = 'termine_anwesenheiten';

            $this->viewdata['werkzeugkasten']['termine_anwesenheiten_dokumentieren']['title'] = 'Anwesenheiten';

        }

        // if( array_key_exists( LISTEN['aufgaben']['controller'], CONTROLLERS ) ) {

        //     $this->viewdata['liste']['bevorstehende_termine']['werkzeugkasten']['aufgaben'] = array(
        //         'klasse_id' => array('btn_zugeordnete_aufgaben_anzeigen'),
        //         'title' => 'Zugeordnete Aufgaben',
        //     );

        //     $this->viewdata['liste']['bevorstehende_termine_zugeordnete_aufgaben'] = HAUPTINSTANZEN['aufgaben'];
        //     unset( $this->viewdata['liste']['bevorstehende_termine_zugeordnete_aufgaben']['filtern'] );
        //     $this->viewdata['liste']['bevorstehende_termine_zugeordnete_aufgaben']['beschriftung'] = '<i class="bi bi-'.SYMBOLE['aufgaben']['bootstrap'].'"></i> '.HAUPTINSTANZEN['aufgaben']['beschriftung'];
        //     $this->viewdata['liste']['bevorstehende_termine_zugeordnete_aufgaben']['vorschau'] = array('zugeordnetes_element');
        //     $this->viewdata['liste']['bevorstehende_termine_zugeordnete_aufgaben']['verknuepfungen'] = array(
        //         'typ' => 'auswahlmoeglichkeiten',
        //         'verknuepfungen' => 'termine_rueckmeldungen',
        //         'liste' => 'mitglieder',
        //         'element_id' => ICH['id'],
        //         'auswahlmoeglichkeiten' => VERKNUEPFUNGEN['termine_rueckmeldungen']['auswahlmoeglichkeiten'],
        //     );

        //     $this->viewdata['liste']['bevorstehende_termine_zugeordnete_aufgaben']['werkzeugkasten']['statistiken'] = array(
        //         'klasse_id' => array('btn_mitglieder_aufgaben_erledigt_anzeigen'),
        //         'title' => 'Eingeplante und erledigte Aufgaben',
        //     );

        //     if( array_key_exists( 'aufgaben.verwaltung', VERFUEGBARE_RECHTE ) AND auth()->user()->can( 'aufgaben.verwaltung' ) ) {
        //         $this->viewdata['liste']['bevorstehende_termine_zugeordnete_aufgaben']['werkzeugkasten']['erstellen'] = array(
        //             'klasse_id' => array('btn_aufgabe_erstellen', 'formular_oeffnen'),
        //             'title' => 'Aufgabe erstellen',
        //         );
        //         $this->viewdata['liste']['bevorstehende_termine_zugeordnete_aufgaben']['zusatzsymbol'] = array( 'aendern', 'duplizieren', 'loeschen', );
        //     }

        //     $this->viewdata['liste']['mitglieder_aufgaben_erledigt'] = HAUPTINSTANZEN['mitglieder'];
        //     $this->viewdata['liste']['mitglieder_aufgaben_erledigt']['filtern'] = array( 'real_janein' => array( 'inklusiv' => [ TRUE ] ), );
        //     $this->viewdata['liste']['mitglieder_aufgaben_erledigt']['beschriftung'] = '<i class="bi bi-'.SYMBOLE['mitglieder']['bootstrap'].'"></i> '.HAUPTINSTANZEN['mitglieder']['beschriftung'];
        //     $this->viewdata['liste']['mitglieder_aufgaben_erledigt']['zusatzinfo'] = array( 'mitglied_zugeordnete_aufgaben_erledigt', 'mitglied_zugeordnete_aufgaben_eingeplant');

        // }

        if( array_key_exists( 'mitglieder.verwaltung', VERFUEGBARE_RECHTE ) AND auth()->user()->can( 'mitglieder.verwaltung' ) AND auth()->user()->can( 'termine.verwaltung' ) ) {

            $this->viewdata['liste']['termine_rueckmeldungen_verwalten'] = HAUPTINSTANZEN['mitglieder'];
            unset($this->viewdata['liste']['termine_rueckmeldungen_verwalten']['filtern']);
            $this->viewdata['liste']['termine_rueckmeldungen_verwalten']['verknuepfungen'] = array( 'typ' => 'auswahlmoeglichkeiten', 'verknuepfungen' => 'termine_rueckmeldungen', 'auswahlmoeglichkeiten' => VERKNUEPFUNGEN['termine_rueckmeldungen']['auswahlmoeglichkeiten'], );

            $this->viewdata['werkzeugkasten']['termine_rueckmeldungen_verwalten'] = array(
                'klasse_id' => 'btn_termine_rueckmeldungen_verwalten',
                'title' => 'Rückmeldungen verwalten',
            );

        }

        if( auth()->user()->can( 'termine.verwaltung' ) ) {

            $this->viewdata['liste']['bevorstehende_termine']['werkzeugkasten_handle'] = TRUE;

            $this->viewdata['werkzeugkasten']['aendern'] = array(
                'klasse_id' => array('btn_termin_aendern', 'formular_oeffnen'),
                'title' => 'Termin ändern',
            );
            $this->viewdata['werkzeugkasten']['duplizieren'] = array(
                'klasse_id' => array('btn_termin_duplizieren', 'formular_oeffnen'),
                'title' => 'Termin duplizieren',
            );
            $this->viewdata['werkzeugkasten']['loeschen'] = array(
                'klasse_id' => array('btn_element_loeschen', 'bestaetigung_einfordern'),
                'title' => 'Termin löschen',
                'farbe' => 'danger',
            );

            $this->viewdata['liste']['bevorstehende_termine']['werkzeugkasten']['erstellen'] = array(
                'klasse_id' => array('btn_termin_erstellen', 'formular_oeffnen'),
                'title' => 'Termin erstellen',
            );

        }

        if( array_key_exists( 'liste', $this->viewdata ) ) foreach( $this->viewdata['liste'] as $id => $liste ) $this->viewdata['liste'][ $id ]['id'] = $id;
        echo view( 'Termine/termine', $this->viewdata );
    }

    //------------------------------------------------------------------------------------------------------------------
    public function termin( $termin_id ) {
        if( empty( model(Termin_Model::class)->find( $termin_id ) ) ) throw \CodeIgniter\Exceptions\PageNotFoundException::forPageNotFound();

        $this->viewdata['element_id'] = $termin_id;

        $this->viewdata['auswertungen']['rueckmeldungen_termin'] = array(
            'auswertungen' => 'termine_rueckmeldungen',
            'auswahlmoeglichkeiten' => array_keys( VERKNUEPFUNGEN['termine_rueckmeldungen']['auswahlmoeglichkeiten'] ),
            'gruppieren' => 'register',
            'liste' => 'mitglieder',
            'filtern' => $this->filtern_mitglieder_kombiniert( $termin_id ),
            'gegen_liste' => 'termine',
            'gegen_element_id' => $termin_id,
        );

        $this->viewdata['auswertungen']['rueckmeldungen_termin']['werkzeugkasten']['gruppieren'] = array(
            'klasse_id' => array('btn_gruppieren_modal_oeffnen', 'gruppieren_localstorage_speichern'),
            'title' => 'Auswertung gruppieren',
        );

        $this->viewdata['auswertungen']['rueckmeldungen_termin']['werkzeugkasten']['filtern'] = array(
            'klasse_id' => array('btn_filtern_modal_oeffnen', 'filtern_localstorage_speichern'),
            'title' => 'Auswertung filtern',
        );

        $this->viewdata['auswertungen']['anwesenheiten_termin'] = array(
            'auswertungen' => 'termine_anwesenheiten',
            'auswahlmoeglichkeiten' => array_keys( VERKNUEPFUNGEN['termine_anwesenheiten']['auswahlmoeglichkeiten'] ),
            'gruppieren' => 'register',
            'liste' => 'mitglieder',
            'filtern' => $this->filtern_mitglieder_kombiniert( $termin_id ),
            'gegen_liste' => 'termine',
            'gegen_element_id' => $termin_id,
        );

        $this->viewdata['auswertungen']['anwesenheiten_termin']['werkzeugkasten']['gruppieren'] = array(
            'klasse_id' => array('btn_gruppieren_modal_oeffnen', 'gruppieren_localstorage_speichern'),
            'title' => 'Auswertung gruppieren',
        );

        $this->viewdata['auswertungen']['anwesenheiten_termin']['werkzeugkasten']['filtern'] = array(
            'klasse_id' => array('btn_filtern_modal_oeffnen', 'filtern_localstorage_speichern'),
            'title' => 'Auswertung filtern',
        );

        $this->viewdata['liste']['termine_anwesenheiten_dokumentieren'] = HAUPTINSTANZEN['mitglieder'];
        $this->viewdata['liste']['termine_anwesenheiten_dokumentieren']['filtern'] = $this->filtern_mitglieder_kombiniert( $termin_id );

        $this->viewdata['werkzeugkasten']['termine_anwesenheiten_dokumentieren'] = array(
            'klasse_id' => 'btn_termine_anwesenheiten_dokumentieren',
            // 'title' => 'Anwesenheiten dokumentieren',
        );

        if( array_key_exists( 'termine.anwesenheiten', VERFUEGBARE_RECHTE ) AND auth()->user()->can( 'termine.anwesenheiten' ) ) {

            $this->viewdata['liste']['termine_anwesenheiten_dokumentieren']['verknuepfungen'] = array( 'typ' => 'check', 'verknuepfungen' => 'termine_anwesenheiten', );
            $this->viewdata['liste']['termine_anwesenheiten_dokumentieren']['zusatzsymbol'][] = 'termine_rueckmeldungen';

            $this->viewdata['werkzeugkasten']['termine_anwesenheiten_dokumentieren']['title'] = 'Anwesenheiten dokumentieren';

        } else {

            $this->viewdata['liste']['termine_anwesenheiten_dokumentieren']['zusatzsymbol'][] = 'termine_anwesenheiten';

            $this->viewdata['werkzeugkasten']['termine_anwesenheiten_dokumentieren']['title'] = 'Anwesenheiten';

        }

        // if( array_key_exists( LISTEN['aufgaben']['controller'], CONTROLLERS ) ) {
        //     $this->viewdata['liste']['termin_zugeordnete_aufgaben'] = HAUPTINSTANZEN['aufgaben'];
        //     unset($this->viewdata['liste']['termin_zugeordnete_aufgaben']['werkzeugkasten']);
        //     $this->viewdata['liste']['termin_zugeordnete_aufgaben']['filtern'] = array( 'zugeordnete_liste' => array( 'termine' => array( 'notenbank' ), ), 'zugeordnete_element_id' => array( 'inklusiv' => array( $termin_id ), ), );
        //     $this->viewdata['liste']['termin_zugeordnete_aufgaben']['beschriftung'] = '<i class="bi bi-'.SYMBOLE['aufgaben']['bootstrap'].'"></i> '.HAUPTINSTANZEN['aufgaben']['beschriftung'];
        //     $this->viewdata['liste']['termin_zugeordnete_aufgaben']['verknuepfungen'] = array(
        //         'typ' => 'auswahlmoeglichkeiten',
        //         'verknuepfungen' => 'termine_rueckmeldungen',
        //         'liste' => 'mitglieder',
        //         'element_id' => ICH['id'],
        //         'auswahlmoeglichkeiten' => VERKNUEPFUNGEN['termine_rueckmeldungen']['auswahlmoeglichkeiten'],
        //     );
        //     if( array_key_exists( 'aufgaben.verwaltung', VERFUEGBARE_RECHTE ) AND auth()->user()->can( 'aufgaben.verwaltung' ) )
        //         $this->viewdata['liste']['termin_zugeordnete_aufgaben']['zusatzsymbol'] = array( 'aendern', 'duplizieren', 'loeschen', );
        // }

        if( auth()->user()->can( 'termine.verwaltung' ) ) {
            
            $this->viewdata['liste']['termine_rueckmeldungen_verwalten'] = HAUPTINSTANZEN['mitglieder'];
            $this->viewdata['liste']['termine_rueckmeldungen_verwalten']['filtern'] = $this->filtern_mitglieder_kombiniert( $termin_id );
            $this->viewdata['liste']['termine_rueckmeldungen_verwalten']['verknuepfungen'] = array( 'typ' => 'auswahlmoeglichkeiten', 'verknuepfungen' => 'termine_rueckmeldungen', 'auswahlmoeglichkeiten' => VERKNUEPFUNGEN['termine_rueckmeldungen']['auswahlmoeglichkeiten'], );

            $this->viewdata['werkzeugkasten']['termine_rueckmeldungen_verwalten'] = array(
                'klasse_id' => 'btn_termine_rueckmeldungen_verwalten',
                'title' => 'Rückmeldungen verwalten',
            );

            $this->viewdata['werkzeugkasten']['aendern'] = array(
                'klasse_id' => array('btn_termin_aendern', 'formular_oeffnen'),
                'title' => 'Termin ändern',
            );
            $this->viewdata['werkzeugkasten']['duplizieren'] = array(
                'klasse_id' => array('btn_termin_duplizieren', 'formular_oeffnen'),
                'title' => 'Termin duplizieren',
            );
            $this->viewdata['werkzeugkasten']['loeschen'] = array(
                'klasse_id' => array('btn_element_loeschen', 'bestaetigung_einfordern'),
                'title' => 'Termin löschen',
                'farbe' => 'danger',
                'weiterleiten' => 'termine',
            );

        }

        $this->viewdata['element_navigation'] = array(
            'instanz' => 'bevorstehende_termine',
            'filtern' => HAUPTINSTANZEN['termine']['filtern'],
            'sortieren' => HAUPTINSTANZEN['termine']['sortieren'],
        );

        if( array_key_exists( 'liste', $this->viewdata ) ) foreach( $this->viewdata['liste'] as $id => $liste ) $this->viewdata['liste'][ $id ]['id'] = $id;
        if( array_key_exists( 'auswertungen', $this->viewdata ) ) foreach( $this->viewdata['auswertungen'] as $id => $auswertungen ) $this->viewdata['auswertungen'][ $id ]['id'] = $id;
        echo view( 'Termine/termin_details', $this->viewdata );
    }

    //------------------------------------------------------------------------------------------------------------------
    public function ajax_termin_speichern() { $ajax_antwort[CSRF_NAME] = csrf_hash();
        $validation_rules = array(
            'ajax_id' => 'required|is_natural',
            'id' => [ 'label' => EIGENSCHAFTEN['termine']['id']['beschriftung'], 'rules' => [ 'if_exist', 'is_natural_no_zero' ] ],
            'titel' => [ 'label' => EIGENSCHAFTEN['termine']['titel']['beschriftung'], 'rules' => [ 'required' ] ],
            'start' => [ 'label' => EIGENSCHAFTEN['termine']['start']['beschriftung'], 'rules' => [ 'required', 'valid_date' ] ],
            'ort' => [ 'label' => EIGENSCHAFTEN['termine']['ort']['beschriftung'], 'rules' => [ 'required' ] ],
            'kategorie' => [ 'label' => EIGENSCHAFTEN['termine']['kategorie']['beschriftung'], 'rules' => [ 'required', 'in_list['.implode( ', ', array_keys( VORGEGEBENE_WERTE['termine']['kategorie'] ) ).']', ] ],
            'filtern_mitglieder' => [ 'label' => EIGENSCHAFTEN['termine']['filtern_mitglieder']['beschriftung'], 'rules' => [ 'required', 'valid_json' ] ],
            'oeffentlich_janein' => [ 'label' => EIGENSCHAFTEN['termine']['oeffentlich_janein']['beschriftung'], 'rules' => [ 'required', 'in_list['.implode( ', ', array_keys( JANEIN ) ).']', ] ],
            'bemerkung' => [ 'label' => EIGENSCHAFTEN['termine']['bemerkung']['beschriftung'], 'rules' => [ 'field_exists' ] ],
        );
        if( array_key_exists( 'ende', EIGENSCHAFTEN['termine'] ) ) $validation_rules['ende'] = [ 'label' => EIGENSCHAFTEN['termine']['ende']['beschriftung'], 'rules' => [ 'if_exist', 'permit_empty' ] ];
        if( !$this->validate( $validation_rules ) ) $ajax_antwort['validation'] = $this->validation->getErrors();
        else if( Time::parse( $this->request->getpost()['start'], 'Europe/Berlin' )->isBefore( Time::now('Europe/Berlin') ) ) $ajax_antwort['validation'] = array( 'start' => 'Der Termin darf nicht in der Vergangenheit liegen.' );
        else if( array_key_exists( 'ende', $this->request->getpost() ) AND !empty( $this->request->getpost()['ende'] ) AND Time::parse( $this->request->getpost()['ende'], 'Europe/Berlin' )->isBefore( Time::parse( $this->request->getpost()['start'], 'Europe/Berlin' ) ) ) $ajax_antwort['validation'] = array( 'ende' => 'Der Termin darf nicht enden bevor er beginnt.' );
        else if( !auth()->user()->can( 'termine.verwaltung' ) ) $ajax_antwort['validation'] = 'Keine Berechtigung!';
        else {
            $termin_Model = model(Termin_Model::class);
            $termin = array(
                'titel' => $this->request->getpost()['titel'],
                'start' => $this->request->getPost()['start'],
                'ende' => $this->request->getPost()['ende'],
                'ort' => $this->request->getpost()['ort'],
                'kategorie' => $this->request->getpost()['kategorie'],
                'filtern_mitglieder' => $this->request->getpost()['filtern_mitglieder'],
                'oeffentlich_janein' => $this->request->getpost()['oeffentlich_janein'],
            );
            if( array_key_exists( 'ende', $this->request->getpost() ) AND !empty( $this->request->getpost()['ende'] ) ) $termin['ende'] = $this->request->getPost()['ende']; else $termin['ende'] = $termin['start'];
            if( array_key_exists( 'bemerkung', $this->request->getpost() ) AND !empty( $this->request->getpost()['bemerkung'] ) ) $termin['bemerkung'] = $this->request->getpost()['bemerkung']; else $termin['bemerkung'] = NULL;

            if( array_key_exists( 'id', $this->request->getPost() ) AND !empty( $this->request->getPost()['id'] ) ) $termin_Model->update( $this->request->getpost()['id'], $termin );
            else {
                $termin_Model->save( $termin );
                $ajax_antwort['termin_id'] = (int)$termin_Model->getInsertID();
            }
        }

        $termine_json_export = array();
        foreach( model(Termin_Model::class)->where( array( 'oeffentlich_janein' => TRUE ) )->orderBy('start', 'ASC')->findAll() as $id => $termin )
            if( !Time::parse( $termin['start'], 'Europe/Berlin' )->isBefore( Time::today('Europe/Berlin') ) ) $termine_json_export[] = $termin;
        if( !$this->json_export( $termine_json_export ) ) $ajax_antwort['validation'] = 'JSON-Export fehlgeschlagen!';

        $termine_ics_export = array();
        foreach( model(Termin_Model::class)->orderBy('start', 'ASC')->findAll() as $id => $termin )
            if( !Time::parse( $termin['start'], 'Europe/Berlin' )->isBefore( Time::today('Europe/Berlin') ) ) $termine_ics_export[] = $termin;
        $this->ics_export( $termine_ics_export );

        $ajax_antwort['ajax_id'] = (int) $this->request->getPost()['ajax_id'];
        echo json_encode( $ajax_antwort, JSON_UNESCAPED_UNICODE );
    }

    public function ajax_termin_loeschen() { $ajax_antwort[CSRF_NAME] = csrf_hash();
        $validation_rules = array(
            'ajax_id' => 'required|is_natural',
            'id' => [ 'label' => EIGENSCHAFTEN['termine']['id']['beschriftung'], 'rules' => [ 'required', 'is_natural_no_zero' ] ],
        ); if( !$this->validate( $validation_rules ) ) $ajax_antwort['validation'] = $this->validation->getErrors();
        else if( !auth()->user()->can( 'termine.verwaltung' ) ) $ajax_antwort['validation'] = 'Keine Berechtigung!';
        else model(Termin_Model::class)->delete( $this->request->getPost()['id'] );

        $termine_json_export = array();
        foreach( model(Termin_Model::class)->where( array( 'oeffentlich_janein' => TRUE ) )->orderBy('start', 'ASC')->findAll() as $id => $termin )
            if( !Time::parse( $termin['start'], 'Europe/Berlin' )->isBefore( Time::today('Europe/Berlin') ) ) $termine_json_export[] = $termin;
        if( !$this->json_export( $termine_json_export ) ) $ajax_antwort['validation'] = 'JSON-Export fehlgeschlagen!';

        $termine_ics_export = array();
        foreach( model(Termin_Model::class)->orderBy('start', 'ASC')->findAll() as $id => $termin )
            if( !Time::parse( $termin['start'], 'Europe/Berlin' )->isBefore( Time::today('Europe/Berlin') ) ) {
                $termin['link'] = site_url().'termine/'.$termin['id'];
                $termine_ics_export[] = $termin;
            }
        $this->ics_export( $termine_ics_export );

        $ajax_antwort['ajax_id'] = (int) $this->request->getPost()['ajax_id'];
        echo json_encode( $ajax_antwort, JSON_UNESCAPED_UNICODE );
    }

    public function termine_json() {
        if ( !is_file( WRITEPATH . JSON_EXPORT_VERZEICHNIS . TERMINE_JSON_EXPORT_DATEINAME ) )
            $json = json_encode( array(), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE );
        else
            $json = file_get_contents( WRITEPATH . JSON_EXPORT_VERZEICHNIS . TERMINE_JSON_EXPORT_DATEINAME );

        return $this->response
            ->setHeader('Content-Type', 'application/json; charset=utf-8')
            ->setBody( $json );
    }

    public function termine_ics() {
        if( $this->request->getMethod() === 'PUT' || $this->request->getMethod() === 'PROPPATCH') {
            header('HTTP/1.1 204 No Content');
        } else {
            if( !is_file( WRITEPATH.TERMINE_ICS_EXPORT_VERZEICHNIS.TERMINE_ICS_EXPORT_DATEINAME ) )
                echo 'BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//'.VEREIN_NAME.'//DE\nEND:VCALENDAR';
            else return $this->response->download( WRITEPATH.TERMINE_ICS_EXPORT_VERZEICHNIS.TERMINE_ICS_EXPORT_DATEINAME, NULL, TRUE );
        }
    }

    //------------------------------------------------------------------------------------------------------------------
    public function ajax_rueckmeldung_speichern() { $ajax_antwort[CSRF_NAME] = csrf_hash();
        $validation_rules = array(
            'ajax_id' => 'required|is_natural',
            'termin_id' => [ 'label' => EIGENSCHAFTEN['termine_rueckmeldungen']['termin_id']['beschriftung'], 'rules' => [ 'required', 'is_natural_no_zero' ] ],
            'mitglied_id' => [ 'label' => EIGENSCHAFTEN['termine_rueckmeldungen']['mitglied_id']['beschriftung'], 'rules' => [ 'required', 'is_natural_no_zero' ] ],
            'status' => [ 'label' => EIGENSCHAFTEN['termine_rueckmeldungen']['status']['beschriftung'], 'rules' => [ 'required', 'is_natural' ] ],
            'bemerkung' => [ 'label' => EIGENSCHAFTEN['termine_rueckmeldungen']['bemerkung']['beschriftung'], 'rules' => [ 'field_exists' ] ],
        ); if( !$this->validate( $validation_rules ) ) $ajax_antwort['validation'] = $this->validation->getErrors();
        else if( $this->request->getPost()['mitglied_id'] != ICH['id'] AND !( array_key_exists( 'mitglieder.verwaltung', VERFUEGBARE_RECHTE ) AND auth()->user()->can( 'mitglieder.verwaltung' ) AND auth()->user()->can( 'termine.verwaltung' ) ) ) $ajax_antwort['validation'] = 'Keine Berechtigung!';
        else if( $this->request->getPost()['status'] == 0 AND !( array_key_exists( 'mitglieder.verwaltung', VERFUEGBARE_RECHTE ) AND auth()->user()->can( 'mitglieder.verwaltung' ) AND auth()->user()->can( 'termine.verwaltung' ) ) ) $ajax_antwort['validation'] = 'Ein Löschen der Rückmeldung ist nicht möglich!';
        else if( Time::parse( model(Termin_Model::class)->find(
                    $this->request->getPost()['termin_id']
                 )[ VERKNUEPFUNGEN['termine_rueckmeldungen']['verknuepfung_moeglich_frist']['eigenschaft'] ], 'Europe/Berlin' )->isBefore( Time::now('Europe/Berlin')->addSeconds( VERKNUEPFUNGEN['termine_rueckmeldungen']['verknuepfung_moeglich_frist']['frist'] ) ) )
                    $ajax_antwort['validation'] = 'Keine Rückmeldung mehr möglich!';
        else {
            $rueckmeldung_Model = model(Rueckmeldung_Model::class);
            $rueckmeldung = array(
                'termin_id' => $this->request->getpost()['termin_id'],
                'mitglied_id' => $this->request->getpost()['mitglied_id'],
                'status' => $this->request->getpost()['status'],
            );
            if( array_key_exists( 'bemerkung', $this->request->getpost() ) AND !empty( $this->request->getpost()['bemerkung'] ) ) $rueckmeldung['bemerkung'] = $this->request->getpost()['bemerkung']; else $rueckmeldung['bemerkung'] = NULL;

            $rueckmeldung_Model->where( array( 'termin_id' => $rueckmeldung['termin_id'], 'mitglied_id' => $rueckmeldung['mitglied_id'] ) )->delete();
            if( (int)$rueckmeldung['status'] > 0 ) {
                $rueckmeldung_Model->save( $rueckmeldung );
                $ajax_antwort['rueckmeldung_id'] = (int)$rueckmeldung_Model->getInsertID();
            }
        }

        $ajax_antwort['ajax_id'] = (int) $this->request->getPost()['ajax_id'];
        echo json_encode( $ajax_antwort, JSON_UNESCAPED_UNICODE );
    }

    public function ajax_rueckmeldung_bemerkung_aendern() { $ajax_antwort[CSRF_NAME] = csrf_hash();
        $validation_rules = array(
            'ajax_id' => 'required|is_natural',
            'id' => [ 'label' => EIGENSCHAFTEN['termine_rueckmeldungen']['id']['beschriftung'], 'rules' => [ 'required', 'is_natural_no_zero' ] ],
            'bemerkung' => [ 'label' => EIGENSCHAFTEN['termine_rueckmeldungen']['bemerkung']['beschriftung'], 'rules' => [ 'field_exists' ] ],
        ); if( !$this->validate( $validation_rules ) ) $ajax_antwort['validation'] = $this->validation->getErrors();
        else {
            $rueckmeldung_Model = model(Rueckmeldung_Model::class);
            $rueckmeldung = array();
            if( array_key_exists( 'bemerkung', $this->request->getpost() ) AND !empty( $this->request->getpost()['bemerkung'] ) ) $rueckmeldung['bemerkung'] = $this->request->getpost()['bemerkung']; else $rueckmeldung['bemerkung'] = NULL;

            $rueckmeldung_Model->update( $this->request->getpost()['id'], $rueckmeldung );
        }

        $ajax_antwort['ajax_id'] = (int) $this->request->getPost()['ajax_id'];
        echo json_encode( $ajax_antwort, JSON_UNESCAPED_UNICODE );
    }

    //------------------------------------------------------------------------------------------------------------------
    public function ajax_anwesenheit_speichern() { $ajax_antwort[CSRF_NAME] = csrf_hash();
        $validation_rules = array(
            'ajax_id' => 'required|is_natural',
            'termin_id' => [ 'label' => EIGENSCHAFTEN['termine_anwesenheiten']['termin_id']['beschriftung'], 'rules' => [ 'required', 'is_natural_no_zero' ] ],
            'mitglied_id' => [ 'label' => EIGENSCHAFTEN['termine_anwesenheiten']['mitglied_id']['beschriftung'], 'rules' => [ 'required', 'is_natural_no_zero' ] ],
            'status' => [ 'label' => EIGENSCHAFTEN['termine_anwesenheiten']['status']['beschriftung'], 'rules' => [ 'required', 'is_natural' ] ],
            'bemerkung' => [ 'label' => EIGENSCHAFTEN['termine_anwesenheiten']['bemerkung']['beschriftung'], 'rules' => [ 'field_exists' ] ],
        ); if( !$this->validate( $validation_rules ) ) $ajax_antwort['validation'] = $this->validation->getErrors();
        else if( !auth()->user()->can( 'termine.anwesenheiten' ) ) $ajax_antwort['validation'] = 'Keine Berechtigung!';
        else {
            $anwesenheit_Model = model(Anwesenheit_Model::class);
            $anwesenheit = array(
                'termin_id' => $this->request->getpost()['termin_id'],
                'mitglied_id' => $this->request->getpost()['mitglied_id'],
                'status' => $this->request->getpost()['status'],
            );
            if( array_key_exists( 'bemerkung', $this->request->getpost() ) AND !empty( $this->request->getpost()['bemerkung'] ) ) $anwesenheit['bemerkung'] = $this->request->getpost()['bemerkung']; else $anwesenheit['bemerkung'] = NULL;

            $anwesenheit_Model->where( array( 'termin_id' => $anwesenheit['termin_id'], 'mitglied_id' => $anwesenheit['mitglied_id'] ) )->delete();
            if( (int)$anwesenheit['status'] > 0 ) {
                $anwesenheit_Model->save( $anwesenheit );
                $ajax_antwort['anwesenheit_id'] = (int)$anwesenheit_Model->getInsertID();
            }
        }

        $ajax_antwort['ajax_id'] = (int) $this->request->getPost()['ajax_id'];
        echo json_encode( $ajax_antwort, JSON_UNESCAPED_UNICODE );
    }

    //------------------------------------------------------------------------------------------------------------------
    protected function filtern_mitglieder_kombiniert( $termin_id ) {
        $termin = model(Termin_Model::class)->find( $termin_id );
        $filtern_mitglieder = json_decode( $termin['filtern_mitglieder'], TRUE );
        if( array_key_exists( $termin['kategorie'], TERMINE_KATEGORIE_FILTERN_MITGLIEDER ) AND !empty( TERMINE_KATEGORIE_FILTERN_MITGLIEDER[ $termin['kategorie'] ] ) )
            $filtern_mitglieder_kategorie = TERMINE_KATEGORIE_FILTERN_MITGLIEDER[ $termin['kategorie'] ];
        else $filtern_mitglieder_kategorie = array();

        return $this->filtern_mit_prio_kombiniert( $filtern_mitglieder_kategorie, $filtern_mitglieder, 'mitglieder' );
    }

    protected function filtern_mit_prio_kombiniert( $filtern_prio_niedrig, $filtern_prio_hoch, $liste )  {
        if( !is_array( $filtern_prio_niedrig ) ) $filtern_prio_niedrig = array();
        if( !is_array( $filtern_prio_hoch ) ) $filtern_prio_hoch = array();

        if( count( array_keys( $filtern_prio_niedrig ) ) === 0 AND count( array_keys( $filtern_prio_hoch ) ) > 0 ) $filtern_kombiniert = $filtern_prio_hoch;
        else if( count( array_keys( $filtern_prio_hoch ) ) === 0  AND count( array_keys( $filtern_prio_niedrig ) ) > 0 ) $filtern_kombiniert = $filtern_prio_niedrig;
        else {
            $filtern_kombiniert = array();
    
            foreach( array_merge( array_keys( $filtern_prio_niedrig ), array_keys( $filtern_prio_hoch ) ) as $eigenschaft ) {
                $filtern_kombiniert[$eigenschaft] = array();
                switch( EIGENSCHAFTEN[$liste][$eigenschaft]['typ'] ) {
                    case 'text':
                        // (noch) kein filtern möglich
                        break;
                    case 'zahl':
                    case 'zeitpunkt':
                        foreach( array( 'start', 'ende' ) as $filtern_klasse ) {
                            if( array_key_exists( $eigenschaft, $filtern_prio_hoch ) AND array_key_exists( $filtern_klasse, $filtern_prio_hoch[$eigenschaft] ) )
                                $filtern_kombiniert[$eigenschaft][$filtern_klasse] = $filtern_prio_hoch[$eigenschaft][$filtern_klasse];
                            else if( array_key_exists( $eigenschaft, $filtern_prio_niedrig ) AND array_key_exists( $filtern_klasse, $filtern_prio_niedrig[$eigenschaft] ) )
                                $filtern_kombiniert[$eigenschaft][$filtern_klasse] = $filtern_prio_niedrig[$eigenschaft][$filtern_klasse];
                        }
                        break;
                    case 'vorgegebene_werte':
                    case 'janein':
                    case 'element_id':
                        foreach( array( 'inklusiv', 'exklusiv' ) as $filtern_klasse ) {
                            if( array_key_exists( $eigenschaft, $filtern_prio_hoch ) ) {
                                if( array_key_exists( $filtern_klasse, $filtern_prio_hoch[$eigenschaft] ) )
                                    $filtern_kombiniert[$eigenschaft][$filtern_klasse] = $filtern_prio_hoch[$eigenschaft][$filtern_klasse];
                            } if( array_key_exists( $eigenschaft, $filtern_prio_niedrig ) ) {
                                if( array_key_exists( $filtern_klasse, $filtern_prio_niedrig[$eigenschaft] ) )
                                    $filtern_kombiniert[$eigenschaft][$filtern_klasse] = $filtern_prio_niedrig[$eigenschaft][$filtern_klasse];
                            }
                        }
                        break;
                }
            }
        }
    
        return $filtern_kombiniert;
    }

    protected function json_export( $termine ) {
        if( !is_dir( WRITEPATH.JSON_EXPORT_VERZEICHNIS ) ) mkdir( WRITEPATH.JSON_EXPORT_VERZEICHNIS, 0777, TRUE );
        if( !is_file( WRITEPATH.JSON_EXPORT_VERZEICHNIS.'/index.html' ) AND is_file( WRITEPATH.'index.html' ) ) copy( WRITEPATH.'index.html', WRITEPATH.JSON_EXPORT_VERZEICHNIS.'/index.html' );
        
        $json_export_datei = fopen( WRITEPATH.JSON_EXPORT_VERZEICHNIS.TERMINE_JSON_EXPORT_DATEINAME, 'w' );
        if( !$json_export_datei ) return FALSE;
        else {

            $termine_export = array();
            foreach( $termine as $id => $termin ) {
                $termin_export = array();
                foreach( TERMINE_JSON_EXPORT_EIGENSCHAFTEN as $eigenschaft ) $termin_export[ $eigenschaft ] = $termin[ $eigenschaft ];
                $termin_export['link_veranstaltung'] = '';
                $termin_export['link_anfahrt'] = '';
                $termine_export[] = $termin_export;
            }

            $json_export_inhalt = array(
                'termine' => $termine_export,
                'version' => '0.81',
                'datum' => Time::now('Europe/Berlin')->format('Y-m-d H:i:s'),
            );

            fwrite( $json_export_datei, json_encode( $json_export_inhalt, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE ) );
            fclose( $json_export_datei );

            return TRUE;
        }
    }

    protected function ics_export( $termine_export ) {
        if( !is_dir( WRITEPATH.TERMINE_ICS_EXPORT_VERZEICHNIS ) ) mkdir( WRITEPATH.TERMINE_ICS_EXPORT_VERZEICHNIS, 0777, TRUE );
        if( !is_file( WRITEPATH.TERMINE_ICS_EXPORT_VERZEICHNIS.'/index.html' ) AND is_file( WRITEPATH.'index.html' ) ) copy( WRITEPATH.'index.html', WRITEPATH.TERMINE_ICS_EXPORT_VERZEICHNIS.'/index.html' );
        
        $ics_termine = "BEGIN:VCALENDAR\n";
        $ics_termine .= "VERSION:2.0\n";
        $ics_termine .= "PRODID:-//".VEREIN_NAME."//NONSGML v1.0//DE\n";
        foreach ($termine_export as $termin) {
            $ics_termine .= "BEGIN:VEVENT\n";
            $ics_termine .= "DTSTART:".Time::parse( $termin["start"], "Europe/Berlin" )->setTimezone("UTC")->format("Ymd\THis\Z")."\n";
            $ics_termine .= "DTEND:".Time::parse( $termin["ende"], "Europe/Berlin" )->setTimezone("UTC")->format("Ymd\THis\Z")."\n";
            $ics_termine .= "SUMMARY:".$termin["titel"]."\n";
            $ics_termine .= "LOCATION:".$termin["ort"]."\n";
            $ics_termine .= "DESCRIPTION:".site_url().'termine/'.$termin['id']."\n";
            $ics_termine .= "URL:".site_url().'termine/'.$termin['id']."\n";
            $ics_termine .= "END:VEVENT\n";
        }
        $ics_termine .= "END:VCALENDAR\n";
        
        $ics_export_datei = fopen( WRITEPATH.TERMINE_ICS_EXPORT_VERZEICHNIS.TERMINE_ICS_EXPORT_DATEINAME, 'w' );
        if( !$ics_export_datei ) $ajax_antwort['validation'] = 'Fehler beim ICS-Export!';
        else {
            fwrite($ics_export_datei, $ics_termine);
            fclose($ics_export_datei);
        }
    }

}
