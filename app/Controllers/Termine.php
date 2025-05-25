<?php

namespace App\Controllers;
use App\Models\Termine\Termin_Model;
use App\Models\Termine\Rueckmeldung_Model;
use App\Models\Termine\Anwesenheit_Model;

use CodeIgniter\I18n\Time;

class Termine extends BaseController {

    public function termine() {

        $this->viewdata['liste']['bevorstehende_termine'] = HAUPTINSTANZEN['termine'];
        $this->viewdata['liste']['bevorstehende_termine']['group-flush'] = TRUE;
        $this->viewdata['liste']['bevorstehende_termine']['link'] = TRUE;
        $this->viewdata['liste']['bevorstehende_termine']['vorschau'] = array( 'start', 'ort' );
        $this->viewdata['liste']['bevorstehende_termine']['views'] = array( array( 'view' => 'Termine/rueckmeldung_basiseigenschaften', 'data' => array( 'mitglied_id' => ICH['id'] ) ) );

        $this->viewdata['liste']['anwesenheiten_dokumentieren'] = HAUPTINSTANZEN['mitglieder'];
        unset( $this->viewdata['liste']['anwesenheiten_dokumentieren']['filtern'] );
        $this->viewdata['liste']['anwesenheiten_dokumentieren']['checkliste'] = 'anwesenheiten';
        $this->viewdata['liste']['anwesenheiten_dokumentieren']['bedingte_formatierung'] = array( 'liste' => 'rueckmeldungen', 'klasse' => array(
            'text-success' => array( 'status' => array( 'start' => array( 1 ), 'ende' => array( 1 ), ), ),
            'text-danger' => array( 'status' => array( 'start' => array( 2 ), 'ende' => array( 2 ), ), ),
        ), );

        $disabled_ids = array();
        if( !( array_key_exists( 'termine.anwesenheiten', VERFUEGBARE_RECHTE ) AND auth()->user()->can( 'termine.anwesenheiten' ) ) )
            foreach( model(Termin_Model::class)->findAll() as $termin )$disabled_ids[] = $termin['id'];
        $this->viewdata['liste']['anwesenheiten_dokumentieren']['disabled'] = array( 'liste' => 'termine','filtern' => array( 'id' => array( 'inklusiv' => $disabled_ids, ), ), );

        if( auth()->user()->can( 'termine.anwesenheiten' ) ) {
            $this->viewdata['liste']['anwesenheiten_dokumentieren']['werkzeugkasten']['alle_checks_abwaehlen'] = array(
                'klasse_id' => array('btn_alle_checks_abwaehlen', 'bestaetigung_einfordern'),
                'title' => 'Alle abwählen',
            );
            $this->viewdata['liste']['anwesenheiten_dokumentieren']['werkzeugkasten']['alle_checks_anwaehlen'] = array(
                'klasse_id' => array('btn_alle_checks_anwaehlen', 'bestaetigung_einfordern'),
                'title' => 'Alle anwählen',
            );
        }

        $this->viewdata['werkzeugkasten']['anwesenheiten_dokumentieren'] = array(
            'klasse_id' => 'btn_anwesenheiten_dokumentieren',
            'title' => 'Anwesenheiten dokumentieren',
        );

        if( array_key_exists( LISTEN['aufgaben']['controller'], CONTROLLERS ) ) {

            $this->viewdata['liste']['bevorstehende_termine']['werkzeugkasten']['aufgaben'] = array(
                'klasse_id' => array('btn_zugeordnete_aufgaben_anzeigen'),
                'title' => 'Zugeordnete Aufgaben',
            );

            $this->viewdata['liste']['bevorstehende_termine_zugeordnete_aufgaben'] = HAUPTINSTANZEN['aufgaben'];
            unset( $this->viewdata['liste']['bevorstehende_termine_zugeordnete_aufgaben']['filtern'] );
            $this->viewdata['liste']['bevorstehende_termine_zugeordnete_aufgaben']['beschriftung'] = '<i class="bi bi-'.SYMBOLE['aufgaben']['bootstrap'].'"></i> '.HAUPTINSTANZEN['aufgaben']['beschriftung'];
            $this->viewdata['liste']['bevorstehende_termine_zugeordnete_aufgaben']['vorschau'] = array('zugeordnetes_element');
            $this->viewdata['liste']['bevorstehende_termine_zugeordnete_aufgaben']['views'] = array( array( 'view' => 'Aufgaben/eingeplantes_mitglied' ), );
            $this->viewdata['liste']['bevorstehende_termine_zugeordnete_aufgaben']['zugeordnet_zu_instanz'] = 'bevorstehende_termine';

            $this->viewdata['liste']['bevorstehende_termine_zugeordnete_aufgaben']['werkzeugkasten']['statistiken'] = array(
                'klasse_id' => array('btn_mitglieder_aufgaben_erledigt_anzeigen'),
                'title' => 'Eingeplante und erledigte Aufgaben',
            );

            if( array_key_exists( 'aufgaben.verwaltung', VERFUEGBARE_RECHTE ) AND auth()->user()->can( 'aufgaben.verwaltung' ) ) {
                $this->viewdata['liste']['bevorstehende_termine_zugeordnete_aufgaben']['werkzeugkasten']['erstellen'] = array(
                    'klasse_id' => array('btn_aufgabe_erstellen', 'formular_oeffnen'),
                    'title' => 'Aufgabe erstellen',
                );
                $this->viewdata['liste']['bevorstehende_termine_zugeordnete_aufgaben']['zusatzsymbol'] = array( 'aendern', 'duplizieren', 'loeschen', );
            }

            $this->viewdata['liste']['mitglieder_aufgaben_erledigt'] = HAUPTINSTANZEN['mitglieder'];
            unset( $this->viewdata['liste']['mitglieder_aufgaben_erledigt']['filtern'] );
            $this->viewdata['liste']['mitglieder_aufgaben_erledigt']['beschriftung'] = '<i class="bi bi-'.SYMBOLE['mitglieder']['bootstrap'].'"></i> '.HAUPTINSTANZEN['mitglieder']['beschriftung'];
            $this->viewdata['liste']['mitglieder_aufgaben_erledigt']['zusatzinfo'] = array( 'mitglied_zugeordnete_aufgaben_erledigt', 'mitglied_zugeordnete_aufgaben_eingeplant');

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
                'klasse_id' => array('btn_termin_loeschen', 'bestaetigung_einfordern'),
                'title' => 'Termin löschen',
                'farbe' => 'danger',
            );

            $this->viewdata['liste']['bevorstehende_termine']['werkzeugkasten']['json_download'] = array(
                'klasse_id' => array('btn_termine_json_download', 'bestaetigung_einfordern'),
                'title' => 'Termine als JSON-Datei downloaden',
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
    public function details( $termin_id ) {
        if( empty( model(Termin_Model::class)->find( $termin_id ) ) ) throw \CodeIgniter\Exceptions\PageNotFoundException::forPageNotFound();

        $this->viewdata['element_id'] = $termin_id;

        $this->viewdata['auswertungen'][ 'rueckmeldungen_termin' ] = array(
            'auswertungen' => 'rueckmeldungen',
            'status_auswahl' => array( 1 => 'ZUSAGEN', 2 => 'ABSAGEN' ),
            'liste' => array( 'liste' => 'mitglieder', 'gruppieren' => 'register', 'filtern' => $this->filtern_mitglieder_kombiniert( $termin_id ), ),
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

        $this->viewdata['auswertungen'][ 'anwesenheiten_termin' ] = array(
            'auswertungen' => 'anwesenheiten',
            'status_auswahl' => array( 1 => 'ANWESEND' ),
            'liste' => array( 'liste' => 'mitglieder', 'gruppieren' => 'register', 'filtern' => $this->filtern_mitglieder_kombiniert( $termin_id ), ),
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

        $this->viewdata['liste']['anwesenheiten_dokumentieren'] = HAUPTINSTANZEN['mitglieder'];
        $this->viewdata['liste']['anwesenheiten_dokumentieren']['filtern'] = $this->filtern_mitglieder_kombiniert( $termin_id );
        $this->viewdata['liste']['anwesenheiten_dokumentieren']['checkliste'] = 'anwesenheiten';
        $this->viewdata['liste']['anwesenheiten_dokumentieren']['bedingte_formatierung'] = array( 'liste' => 'rueckmeldungen', 'klasse' => array(
            'text-success' => array( 'status' => array( 'start' => array( 1 ), 'ende' => array( 1 ), ), ),
            'text-danger' => array( 'status' => array( 'start' => array( 2 ), 'ende' => array( 2 ), ), ),
        ), );

        $disabled_ids = array();
        if( !( array_key_exists( 'termine.anwesenheiten', VERFUEGBARE_RECHTE ) AND auth()->user()->can( 'termine.anwesenheiten' ) ) )
            foreach( model(Termin_Model::class)->findAll() as $termin )$disabled_ids[] = $termin['id'];
        $this->viewdata['liste']['anwesenheiten_dokumentieren']['disabled'] = array( 'liste' => 'termine','filtern' => array( 'id' => array( 'inklusiv' => $disabled_ids, ), ), );

        if( auth()->user()->can( 'termine.anwesenheiten' ) ) {
            $this->viewdata['liste']['anwesenheiten_dokumentieren']['werkzeugkasten']['alle_checks_abwaehlen'] = array(
                'klasse_id' => array('btn_alle_checks_abwaehlen', 'bestaetigung_einfordern'),
                'title' => 'Alle abwählen',
            );
            $this->viewdata['liste']['anwesenheiten_dokumentieren']['werkzeugkasten']['alle_checks_anwaehlen'] = array(
                'klasse_id' => array('btn_alle_checks_anwaehlen', 'bestaetigung_einfordern'),
                'title' => 'Alle anwählen',
            );
        }

        $this->viewdata['werkzeugkasten']['anwesenheiten_dokumentieren'] = array(
            'klasse_id' => 'btn_anwesenheiten_dokumentieren',
            'title' => 'Anwesenheiten dokumentieren',
        );

        if( array_key_exists( LISTEN['aufgaben']['controller'], CONTROLLERS ) ) {
            $this->viewdata['liste']['termin_zugeordnete_aufgaben'] = HAUPTINSTANZEN['aufgaben'];
            unset($this->viewdata['liste']['termin_zugeordnete_aufgaben']['werkzeugkasten']);
            $this->viewdata['liste']['termin_zugeordnete_aufgaben']['filtern'] = array( 'zugeordnete_liste' => array( 'termine' => array( 'notenbank' ), ), 'zugeordnete_element_id' => array( 'inklusiv' => array( $termin_id ), ), );
            $this->viewdata['liste']['termin_zugeordnete_aufgaben']['beschriftung'] = '<i class="bi bi-'.SYMBOLE['aufgaben']['bootstrap'].'"></i> '.HAUPTINSTANZEN['aufgaben']['beschriftung'];
            $this->viewdata['liste']['termin_zugeordnete_aufgaben']['views'] = array( array( 'view' => 'Aufgaben/eingeplantes_mitglied' ), );
            if( array_key_exists( 'aufgaben.verwaltung', VERFUEGBARE_RECHTE ) AND auth()->user()->can( 'aufgaben.verwaltung' ) )
                $this->viewdata['liste']['termin_zugeordnete_aufgaben']['zusatzsymbol'] = array( 'aendern', 'duplizieren', 'loeschen', );
        }

        if( auth()->user()->can( 'termine.verwaltung' ) ) {
            $this->viewdata['werkzeugkasten']['aendern'] = array(
                'klasse_id' => array('btn_termin_aendern', 'formular_oeffnen'),
                'title' => 'Termin ändern',
            );
            $this->viewdata['werkzeugkasten']['duplizieren'] = array(
                'klasse_id' => array('btn_termin_duplizieren', 'formular_oeffnen'),
                'title' => 'Termin duplizieren',
            );
            $this->viewdata['werkzeugkasten']['loeschen'] = array(
                'klasse_id' => array('btn_termin_loeschen', 'bestaetigung_einfordern'),
                'title' => 'Termin löschen',
                'farbe' => 'danger',
                'weiterleiten' => 'termine',
            );
        }

        $this->viewdata['element_navigation'] = array(
            'instanz' => 'bevorstehende_termine',
        );

        if( array_key_exists( 'liste', $this->viewdata ) ) foreach( $this->viewdata['liste'] as $id => $liste ) $this->viewdata['liste'][ $id ]['id'] = $id;
        if( array_key_exists( 'auswertungen', $this->viewdata ) ) foreach( $this->viewdata['auswertungen'] as $id => $auswertungen ) $this->viewdata['auswertungen'][ $id ]['id'] = $id;
        echo view( 'Termine/termin_details', $this->viewdata );
    }

    //------------------------------------------------------------------------------------------------------------------
    public function ajax_termin_speichern() { $ajax_antwort[CSRF_NAME] = csrf_hash();
        $validation_rules = array(
            'ajax_id' => 'required|is_natural',
            'id' => [ 'label' => 'ID', 'rules' => [ 'if_exist', 'is_natural_no_zero' ] ],
            'titel' => [ 'label' => EIGENSCHAFTEN['termine']['titel']['beschriftung'], 'rules' => [ 'required' ] ],
            'start' => [ 'label' => EIGENSCHAFTEN['termine']['start']['beschriftung'], 'rules' => [ 'required', 'valid_date' ] ],
            'ende' => [ 'label' => EIGENSCHAFTEN['termine']['ende']['beschriftung'], 'rules' => [ 'required', 'valid_date' ] ],
            'ort' => [ 'label' => EIGENSCHAFTEN['termine']['ort']['beschriftung'], 'rules' => [ 'required' ] ],
            'kategorie' => [ 'label' => EIGENSCHAFTEN['termine']['kategorie']['beschriftung'], 'rules' => [ 'required', 'in_list['.implode( ', ', array_keys( VORGEGEBENE_WERTE['termine']['kategorie'] ) ).']', ] ],
            'filtern_mitglieder' => [ 'label' => EIGENSCHAFTEN['termine']['filtern_mitglieder']['beschriftung'], 'rules' => [ 'required', 'valid_json' ] ],
            'oeffentlich_janein' => [ 'label' => EIGENSCHAFTEN['termine']['oeffentlich_janein']['beschriftung'], 'rules' => [ 'required', 'in_list['.implode( ', ', array_keys( JANEIN ) ).']', ] ],
            'bemerkung' => [ 'label' => EIGENSCHAFTEN['termine']['bemerkung']['beschriftung'], 'rules' => [ 'field_exists' ] ],
        );
        if( !$this->validate( $validation_rules ) ) $ajax_antwort['validation'] = $this->validation->getErrors();
        else if( Time::parse( $this->request->getpost()['start'], 'Europe/Berlin' )->isBefore( Time::now('Europe/Berlin') ) ) $ajax_antwort['validation'] = array( 'start' => 'Der Termin darf nicht in der Vergangenheit liegen.' );
        else if( Time::parse( $this->request->getpost()['ende'], 'Europe/Berlin' )->isBefore( Time::parse( $this->request->getpost()['start'], 'Europe/Berlin' ) ) ) $ajax_antwort['validation'] = array( 'ende' => 'Der Termin darf nicht enden bevor er beginnt.' );
        else if( !auth()->user()->can( 'termine.verwaltung' ) ) $ajax_antwort['validation'] = 'Keine Berechtigung!';
        else {
            $termine_Model = model(Termin_Model::class);
            $termin = array(
                'titel' => $this->request->getpost()['titel'],
                'start' => $this->request->getPost()['start'],
                'ende' => $this->request->getPost()['ende'],
                'ort' => $this->request->getpost()['ort'],
                'kategorie' => $this->request->getpost()['kategorie'],
                'filtern_mitglieder' => $this->request->getpost()['filtern_mitglieder'],
                'oeffentlich_janein' => $this->request->getpost()['oeffentlich_janein'],
            );
            if( array_key_exists( 'bemerkung', $this->request->getpost() ) ) $termin['bemerkung'] = $this->request->getpost()['bemerkung']; else $termin['bemerkung'] = '';

            if( array_key_exists( 'id', $this->request->getPost() ) AND !empty( $this->request->getPost()['id'] ) ) $termine_Model->update( $this->request->getpost()['id'], $termin );
            else {
                $termine_Model->save( $termin );
                $ajax_antwort['termin_id'] = (int)$termine_Model->getInsertID();
            }
        }

        $termine_json_export = array();
        foreach( model(Termin_Model::class)->where( array( 'oeffentlich_janein' => TRUE ) )->findAll() as $id => $termin )
            if( !Time::parse( $termin['start'], 'Europe/Berlin' )->isBefore( Time::today('Europe/Berlin') ) ) {
                $termin_export = array();
                foreach( TERMINE_JSON_EXPORT_EIGENSCHAFTEN as $eigenschaft ) $termin_export[$eigenschaft] = $termin[$eigenschaft];
                $termine_json_export[] = $termin_export;
            }
        $this->json_export( $termine_json_export );

        $termine_ics_export = array();
        foreach( model(Termin_Model::class)->findAll() as $id => $termin )
            if( !Time::parse( $termin['start'], 'Europe/Berlin' )->isBefore( Time::today('Europe/Berlin') ) ) {
                $termin['link'] = site_url().'termine/'.$termin['id'];
                $termine_ics_export[] = $termin;
            }
        $this->ics_export( $termine_ics_export );

        $ajax_antwort['ajax_id'] = (int) $this->request->getPost()['ajax_id'];
        echo json_encode( $ajax_antwort, JSON_UNESCAPED_UNICODE );
    }

    public function ajax_termin_loeschen() { $ajax_antwort[CSRF_NAME] = csrf_hash();
        $validation_rules = array(
            'ajax_id' => 'required|is_natural',
            'id' => [ 'label' => 'ID', 'rules' => [ 'required', 'is_natural_no_zero' ] ],
        ); if( !$this->validate( $validation_rules ) ) $ajax_antwort['validation'] = $this->validation->getErrors();
        else if( !auth()->user()->can( 'termine.verwaltung' ) ) $ajax_antwort['validation'] = 'Keine Berechtigung!';
        else model(Termin_Model::class)->delete( $this->request->getPost()['id'] );

        $termine_json_export = array();
        foreach( model(Termin_Model::class)->where( array( 'oeffentlich_janein' => TRUE ) )->findAll() as $id => $termin )
            if( !Time::parse( $termin['start'], 'Europe/Berlin' )->isBefore( Time::today('Europe/Berlin') ) ) {
                $termin_export = array();
                foreach( TERMINE_JSON_EXPORT_EIGENSCHAFTEN as $eigenschaft ) $termin_export[$eigenschaft] = $termin[$eigenschaft];
                $termine_json_export[] = $termin_export;
            }
        $this->json_export( $termine_json_export );

        $termine_ics_export = array();
        foreach( model(Termin_Model::class)->findAll() as $id => $termin )
            if( !Time::parse( $termin['start'], 'Europe/Berlin' )->isBefore( Time::today('Europe/Berlin') ) ) {
                $termin['link'] = site_url().'termine/'.$termin['id'];
                $termine_ics_export[] = $termin;
            }
        $this->ics_export( $termine_ics_export );

        $ajax_antwort['ajax_id'] = (int) $this->request->getPost()['ajax_id'];
        echo json_encode( $ajax_antwort, JSON_UNESCAPED_UNICODE );
    }

    public function ajax_termine_json_download() { $ajax_antwort[CSRF_NAME] = csrf_hash();
        $validation_rules = array(
            'ajax_id' => 'required|is_natural',
            'element_ids' => [ 'label' => 'Element-IDs', 'rules' => [ 'permit_empty' ] ],
            'element_ids.*' => [ 'label' => 'Element-ID', 'rules' => [ 'if_exist', 'is_natural_no_zero' ] ],
        ); if( !$this->validate( $validation_rules ) ) $ajax_antwort['validation'] = $this->validation->getErrors();
        else {
            if( array_key_exists( 'element_ids', $this->request->getPost() ) AND !empty( $this->request->getPost()['element_ids'] ) )
                $termine = model(Termin_Model::class)->find( $this->request->getPost()['element_ids'] );
            else $termine = array();

            $termine_json_export = array();
            foreach( $termine as $id => $termin )
                if( $termin['oeffentlich_janein'] == TRUE ) {
                $termin_export = array();
                foreach( TERMINE_JSON_EXPORT_EIGENSCHAFTEN as $eigenschaft ) $termin_export[$eigenschaft] = $termin[$eigenschaft];
                $termine_json_export[] = $termin_export;
            }            
            $this->json_export( $termine_json_export );
            /* todo:
            Wahrscheinlich ist es einfacher, wenn die Datei in einem temp-Verzeichnis gespeichert wird.
            Dann muss eine URL zurückgegeben werden, die temp-Dateien aus dem writable-Verzeichnis bereitstellt.
            Danach muss ein zweiter AJAX-Request erfolgen, um die Datei wieder zu löschen.

            Folgendes funktioniert nicht richtig:
            $ajax_antwort['datei'] = $this->response->download(
                TERMINE_JSON_EXPORT_DATEINAME,
                json_encode( $termine_export, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE ),
                TRUE
            );
            $ajax_antwort['dateiname'] = TERMINE_JSON_EXPORT_DATEINAME;
            */
        }

        $ajax_antwort['ajax_id'] = (int) $this->request->getPost()['ajax_id'];
        echo json_encode( $ajax_antwort, JSON_UNESCAPED_UNICODE );
    }

    public function termine_json() {
        if( !is_file( WRITEPATH.JSON_EXPORT_VERZEICHNIS.TERMINE_JSON_EXPORT_DATEINAME ) )
            return $this->response->download( TERMINE_JSON_EXPORT_DATEINAME, json_encode( array(), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE ), TRUE );
        else return $this->response->download( WRITEPATH.JSON_EXPORT_VERZEICHNIS.TERMINE_JSON_EXPORT_DATEINAME, NULL, TRUE );
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
            'termin_id' => [ 'label' => EIGENSCHAFTEN['rueckmeldungen']['termin_id']['beschriftung'], 'rules' => [ 'required', 'is_natural_no_zero' ] ],
            'mitglied_id' => [ 'label' => EIGENSCHAFTEN['rueckmeldungen']['mitglied_id']['beschriftung'], 'rules' => [ 'required', 'is_natural_no_zero' ] ],
            'status' => [ 'label' => EIGENSCHAFTEN['rueckmeldungen']['status']['beschriftung'], 'rules' => [ 'required', 'is_natural_no_zero' ] ],
            'bemerkung' => [ 'label' => EIGENSCHAFTEN['rueckmeldungen']['bemerkung']['beschriftung'], 'rules' => [ 'field_exists' ] ],
        ); if( !$this->validate( $validation_rules ) ) $ajax_antwort['validation'] = $this->validation->getErrors();
        else if( $this->request->getPost()['mitglied_id'] != ICH['id'] AND !(array_key_exists( 'mitglieder.verwaltung', VERFUEGBARE_RECHTE ) AND auth()->user()->can( 'mitglieder.verwaltung' ) ) ) $ajax_antwort['validation'] = 'Keine Berechtigung!';
        else if( Time::parse( model(Termin_Model::class)->find(
                    $this->request->getPost()['termin_id']
                 )['start'], 'Europe/Berlin' )->isBefore( Time::now('Europe/Berlin')->addSeconds(TERMINE_RUECKMELDUNG_FRIST) ) )
                    $ajax_antwort['validation'] = 'Keine Rückmeldung mehr möglich!';
        else {
            $rueckmeldungen_Model = model(Rueckmeldung_Model::class);
            $rueckmeldung = array(
                'termin_id' => $this->request->getpost()['termin_id'],
                'mitglied_id' => $this->request->getpost()['mitglied_id'],
                'status' => $this->request->getpost()['status'],
            );
            if( array_key_exists( 'bemerkung', $this->request->getpost() ) ) $rueckmeldung['bemerkung'] = $this->request->getpost()['bemerkung']; else $rueckmeldung['bemerkung'] = '';

            if( array_key_exists( 'id', $this->request->getPost() ) AND !empty( $this->request->getPost()['id'] ) ) {
                $rueckmeldungen_Model->where( array( 'termin_id' => $rueckmeldung['termin_id'], 'mitglied_id' => $rueckmeldung['termin_id'], 'id !=' => $this->request->getpost()['id'] ) )->delete();
                $rueckmeldungen_Model->update( $this->request->getpost()['id'], $rueckmeldung );
            } else {
                $rueckmeldungen_Model->save( $rueckmeldung );
                $ajax_antwort['rueckmeldung_id'] = (int)$rueckmeldungen_Model->getInsertID();
            }
        }

        $ajax_antwort['ajax_id'] = (int) $this->request->getPost()['ajax_id'];
        echo json_encode( $ajax_antwort, JSON_UNESCAPED_UNICODE );
    }

    //------------------------------------------------------------------------------------------------------------------
    public function ajax_anwesenheit_speichern() { $ajax_antwort[CSRF_NAME] = csrf_hash();
        $validation_rules = array(
            'ajax_id' => 'required|is_natural',
            'termin_id' => [ 'label' => EIGENSCHAFTEN['anwesenheiten']['termin_id']['beschriftung'], 'rules' => [ 'required', 'is_natural_no_zero' ] ],
            'mitglied_id' => [ 'label' => EIGENSCHAFTEN['anwesenheiten']['mitglied_id']['beschriftung'], 'rules' => [ 'required', 'is_natural_no_zero' ] ],
            'status' => [ 'label' => EIGENSCHAFTEN['anwesenheiten']['status']['beschriftung'], 'rules' => [ 'required', 'is_natural' ] ],
        ); if( !$this->validate( $validation_rules ) ) $ajax_antwort['validation'] = $this->validation->getErrors();
        else if( !auth()->user()->can( 'termine.anwesenheiten' ) ) $ajax_antwort['validation'] = 'Keine Berechtigung!';
        else {
            $anwesenheiten_Model = model(Anwesenheit_Model::class);
            $anwesenheit = array(
                'termin_id' => $this->request->getpost()['termin_id'],
                'mitglied_id' => $this->request->getpost()['mitglied_id'],
            );
            $anwesenheiten_Model->where( $anwesenheit )->delete();
            if( filter_var( $this->request->getpost()['status'], FILTER_VALIDATE_BOOLEAN) ) {
                $anwesenheit['status'] = $this->request->getpost()['status'];
                $anwesenheiten_Model->save( $anwesenheit );
                $ajax_antwort['anwesenheit_id'] = (int)$anwesenheiten_Model->getInsertID();
            }
        }
        
        $ajax_antwort['ajax_id'] = (int) $this->request->getPost()['ajax_id'];
        echo json_encode( $ajax_antwort, JSON_UNESCAPED_UNICODE );
    }

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

    protected function json_export( $termine_export ) {

        if( !is_dir( WRITEPATH.JSON_EXPORT_VERZEICHNIS ) ) mkdir( WRITEPATH.JSON_EXPORT_VERZEICHNIS, 0777, TRUE );
        if( !is_file( WRITEPATH.JSON_EXPORT_VERZEICHNIS.'/index.html' ) AND is_file( WRITEPATH.'index.html' ) ) copy( WRITEPATH.'index.html', WRITEPATH.JSON_EXPORT_VERZEICHNIS.'/index.html' );
        
        $json_export_datei = fopen( WRITEPATH.JSON_EXPORT_VERZEICHNIS.TERMINE_JSON_EXPORT_DATEINAME, 'w' );
        if( !$json_export_datei ) $ajax_antwort['validation'] = 'Fehler beim JSON-Export!';
        else {
            fwrite( $json_export_datei, json_encode( $termine_export, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE ) );
            fclose( $json_export_datei );
        }

    }

    protected function ics_export( $termine_export ) {
        /* todo: muss sichergestellt sein, dass der Termin mindestens 24 Stunden in der Zukunft liegt? */

        if( !is_dir( WRITEPATH.TERMINE_ICS_EXPORT_VERZEICHNIS ) ) mkdir( WRITEPATH.TERMINE_ICS_EXPORT_VERZEICHNIS, 0777, TRUE );
        if( !is_file( WRITEPATH.TERMINE_ICS_EXPORT_VERZEICHNIS.'/index.html' ) AND is_file( WRITEPATH.'index.html' ) ) copy( WRITEPATH.'index.html', WRITEPATH.TERMINE_ICS_EXPORT_VERZEICHNIS.'/index.html' );
        
        $ics_termine = "BEGIN:VCALENDAR\n";
        $ics_termine .= "VERSION:2.0\n";
        $ics_termine .= "PRODID:-//".VEREIN_NAME."//NONSGML v1.0//DE\n";
        foreach ($termine_export as $termin) {
            $ics_termine .= "BEGIN:VEVENT\n";
            $ics_termine .= "DTSTART:".Time::parse( $termin["start"], "Europe/Berlin" )->setTimezone("UTC")->format("Ymd\THis\Z")."\n";
            $ics_termine .= "DTEND:".Time::parse( $termin["ende"], "Europe/Berlin" )->setTimezone("UTC")->format("Ymd\THis\Z")."\n";
            $ics_termine .= "SUMMARY:".$termin["titel"]."s\n";
            $ics_termine .= "LOCATION:".$termin["ort"]."\n";
            $ics_termine .= "DESCRIPTION:".$termin["link"]."\n";
            $ics_termine .= "URL:".$termin["link"]."\n";
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
