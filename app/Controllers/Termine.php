<?php

namespace App\Controllers;
use App\Models\Termine\Termin_Model;
use App\Models\Mitglieder\Mitglied_Model;
use App\Models\Termine\Termine_Rueckmeldung_Model as Rueckmeldung_Model;
use App\Models\Termine\Termine_Anwesenheit_Model as Anwesenheit_Model;

use CodeIgniter\I18n\Time;

class Termine extends BaseController {

    public function termine() {

        $this->viewdata['liste']['bevorstehende_termine'] = array(
            'liste' => 'termine',
            'filtern' => array(
                array( 'operator' => '>=', 'eigenschaft' => 'start', 'wert' => Time::today( 'Europe/Berlin' )->toDateTimeString() ),
            ),
            'sortieren' => array(
                array( 'eigenschaft'=> 'start', 'richtung'=> SORT_ASC, ),
            ),
            'beschriftung' => array(
                'beschriftung' => '<span class="eigenschaft" data-eigenschaft="titel"></span>',
                'h5' => TRUE,
            ),
            'link' => TRUE,
            'vorschau' => array(
                'beschriftung' => '<div class="row g-0 my-1">
                    <div class="col nowrap"><i class="bi bi-calendar-event"></i> <span class="eigenschaft" data-eigenschaft="start"></span></div>
                    <div class="col nowrap"><i class="bi bi-geo-alt-fill"></i> <span class="eigenschaft" data-eigenschaft="ort"></span></div>
                    </div>'.view( 'Termine/rueckmeldung_basiseigenschaften', array( 'mitglied_id' => ICH['id'] ) ),
                'klein' => TRUE,
                'zentriert' => TRUE,
            ),
            'zusatzsymbole' => '<span class="zusatzsymbol" data-zusatzsymbol="kategorie"></span>',
            'listenstatistik' => array(),
        );

        $disabled_filtern = array();
        if( !( array_key_exists( 'termine.anwesenheiten', VERFUEGBARE_RECHTE ) AND auth()->user()->can( 'termine.anwesenheiten' ) ) ) foreach( model(Termin_Model::class)->findAll() as $termin ) $disabled_filtern[] = array( 'operator' => '==', 'eigenschaft' => 'id', 'wert' => $termin['id'] );
        $this->viewdata['liste']['anwesenheiten_dokumentieren'] = array(
            'liste' => 'mitglieder',
            // 'filtern' => $this->termin_filtern_mitglieder_kombiniert( $termin_id ),
            'sortieren' => array(
                array( 'eigenschaft' => 'nachname', 'richtung' => SORT_ASC, ),
                array( 'eigenschaft' => 'vorname', 'richtung' => SORT_ASC, ),                
                array( 'eigenschaft' => 'register', 'richtung' => SORT_ASC, ),                
            ),
            'beschriftung' => array(
                'beschriftung' => '<span class="eigenschaft" data-eigenschaft="vorname"></span> <span class="eigenschaft" data-eigenschaft="nachname"></span>',
            ),
            'zusatzsymbole' => '<span class="zusatzsymbol" data-zusatzsymbol="abwesend"></span>',
            'checkliste' => 'anwesenheiten',
            'disabled' => array(
                'liste' => 'mitglieder',
                'filtern' => array( array(
                    'verknuepfung' => '||',
                    'filtern' => $disabled_filtern,
                ), ),
            ),
            'bedingte_formatierung' => array(
                'liste' => 'rueckmeldungen',
                'klasse' => array(
                    'text-success' => array( 'operator' => '==', 'eigenschaft' => 'status', 'wert' => '1' ),
                    'text-danger' => array( 'operator' => '==', 'eigenschaft' => 'status', 'wert' => '2' ),
                ),
            ),
            'listenstatistik' => array(),
        );

        if( auth()->user()->can( 'termine.anwesenheiten' ) )
            $this->viewdata['liste']['anwesenheiten_dokumentieren']['werkzeugkasten']['alle_checks_abwaehlen'] = array(
                'klasse_id' => 'btn_alle_checks_abwaehlen',
                'title' => 'Alle abwählen',
            );

        if( auth()->user()->can( 'termine.anwesenheiten' ) )
            $this->viewdata['liste']['anwesenheiten_dokumentieren']['werkzeugkasten']['alle_checks_anwaehlen'] = array(
                'klasse_id' => 'btn_alle_checks_anwaehlen',
                'title' => 'Alle anwählen',
            );

        $this->viewdata['liste']['anwesenheiten_dokumentieren']['werkzeugkasten']['filtern'] = array(
            'klasse_id' => 'btn_filtern_modal_oeffnen',
            'title' => 'Mitglieder filtern',
        );

        $this->viewdata['liste']['anwesenheiten_dokumentieren']['werkzeugkasten']['sortieren'] = array(
            'klasse_id' => 'btn_sortieren_modal_oeffnen',
            'title' => 'Mitglieder sortieren',
        );

        $this->viewdata['werkzeugkasten']['anwesenheiten_dokumentieren'] = array(
            'klasse_id' => 'btn_anwesenheiten_dokumentieren',
            'title' => 'Anwesenheiten dokumentieren',
        );

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

            $this->viewdata['liste']['bevorstehende_termine']['werkzeugkasten']['erstellen'] = array(
                'klasse_id' => array('btn_termin_erstellen', 'formular_oeffnen'),
                'title' => 'Termin erstellen',
            );
        }

        $this->viewdata['liste']['bevorstehende_termine']['werkzeugkasten']['filtern'] = array(
            'klasse_id' => 'btn_filtern_modal_oeffnen',
            'title' => 'Termine filtern',
        );

        $this->viewdata['liste']['bevorstehende_termine']['werkzeugkasten']['sortieren'] = array(
            'klasse_id' => 'btn_sortieren_modal_oeffnen',
            'title' => 'Termine sortieren',
        );

        if( array_key_exists( 'liste', $this->viewdata ) ) foreach( $this->viewdata['liste'] as $id => $liste ) $this->viewdata['liste'][ $id ]['id'] = $id;
        echo view( 'Termine/termine', $this->viewdata );
    }

    //------------------------------------------------------------------------------------------------------------------
    public function details( $termin_id ) {
      if( empty( model(Termin_Model::class)->find( $termin_id ) ) ) throw \CodeIgniter\Exceptions\PageNotFoundException::forPageNotFound();

        $this->viewdata['element_id'] = $termin_id;

        $this->viewdata['auswertungen'][ 'rueckmeldungen_termin' ] = array(
            'auswertungen' => 'rueckmeldungen',
            'status_auswahl' => array( 1 => "ZUSAGEN", 2 => "ABSAGEN" ),
            'liste' => array(
                'liste' => 'mitglieder',
                'gruppieren' => 'register',
                'filtern' => $this->termin_filtern_mitglieder_kombiniert( $termin_id ),
            ),
            'gegen_liste' => 'termine',
            'gegen_element_id' => $termin_id,
        );

        $this->viewdata['auswertungen']['rueckmeldungen_termin']['werkzeugkasten']['gruppieren'] = array(
            'klasse_id' => 'btn_gruppieren_modal_oeffnen',
            'title' => 'Auswertung gruppieren',
        );

        $this->viewdata['auswertungen']['rueckmeldungen_termin']['werkzeugkasten']['filtern'] = array(
            'klasse_id' => 'btn_filtern_modal_oeffnen',
            'title' => 'Auswertung filtern',
        );

        $this->viewdata['auswertungen'][ 'anwesenheiten_termin' ] = array(
            'auswertungen' => 'anwesenheiten',
            'status_auswahl' => array( 1 => "ANWESEND" ),
            'liste' => array(
                'liste' => 'mitglieder',
                'gruppieren' => 'register',
                'filtern' => $this->termin_filtern_mitglieder_kombiniert( $termin_id ),
            ),
            'gegen_liste' => 'termine',
            'gegen_element_id' => $termin_id,
        );

        $this->viewdata['auswertungen']['anwesenheiten_termin']['werkzeugkasten']['gruppieren'] = array(
            'klasse_id' => 'btn_gruppieren_modal_oeffnen',
            'title' => 'Auswertung gruppieren',
        );

        $this->viewdata['auswertungen']['anwesenheiten_termin']['werkzeugkasten']['filtern'] = array(
            'klasse_id' => 'btn_filtern_modal_oeffnen',
            'title' => 'Auswertung filtern',
        );

        $disabled_filtern = array();
        if( !( array_key_exists( 'termine.anwesenheiten', VERFUEGBARE_RECHTE ) AND auth()->user()->can( 'termine.anwesenheiten' ) ) ) foreach( model(Termin_Model::class)->findAll() as $termin ) $disabled_filtern[] = array( 'operator' => '==', 'eigenschaft' => 'id', 'wert' => $termin['id'] );
        $this->viewdata['liste']['anwesenheiten_dokumentieren'] = array(
            'liste' => 'mitglieder',
            'filtern' => $this->termin_filtern_mitglieder_kombiniert( $termin_id ),
            'sortieren' => array(
                array( 'eigenschaft' => 'nachname', 'richtung' => SORT_ASC, ),
                array( 'eigenschaft' => 'vorname', 'richtung' => SORT_ASC, ),                
                array( 'eigenschaft' => 'register', 'richtung' => SORT_ASC, ),                
            ),
            'beschriftung' => array(
                'beschriftung' => '<span class="eigenschaft" data-eigenschaft="vorname"></span> <span class="eigenschaft" data-eigenschaft="nachname"></span>',
            ),
            'zusatzsymbole' => '<span class="zusatzsymbol" data-zusatzsymbol="abwesend"></span>',
            'checkliste' => 'anwesenheiten',
            'disabled' => array(
                'liste' => 'mitglieder',
                'filtern' => array( array(
                    'verknuepfung' => '||',
                    'filtern' => $disabled_filtern,
                ), ),
            ),
            'bedingte_formatierung' => array(
                'liste' => 'rueckmeldungen',
                'klasse' => array(
                    'text-success' => array( 'operator' => '==', 'eigenschaft' => 'status', 'wert' => '1' ),
                    'text-danger' => array( 'operator' => '==', 'eigenschaft' => 'status', 'wert' => '2' ),
                ),
            ),
            'listenstatistik' => array(),
        );

        if( auth()->user()->can( 'termine.anwesenheiten' ) )
            $this->viewdata['liste']['anwesenheiten_dokumentieren']['werkzeugkasten']['alle_checks_abwaehlen'] = array(
                'klasse_id' => 'btn_alle_checks_abwaehlen',
                'title' => 'Alle abwählen',
            );

        if( auth()->user()->can( 'termine.anwesenheiten' ) )
            $this->viewdata['liste']['anwesenheiten_dokumentieren']['werkzeugkasten']['alle_checks_anwaehlen'] = array(
                'klasse_id' => 'btn_alle_checks_anwaehlen',
                'title' => 'Alle anwählen',
            );

        $this->viewdata['liste']['anwesenheiten_dokumentieren']['werkzeugkasten']['filtern'] = array(
            'klasse_id' => 'btn_filtern_modal_oeffnen',
            'title' => 'Mitglieder filtern',
        );

        $this->viewdata['liste']['anwesenheiten_dokumentieren']['werkzeugkasten']['sortieren'] = array(
            'klasse_id' => 'btn_sortieren_modal_oeffnen',
            'title' => 'Mitglieder sortieren',
        );

        $this->viewdata['werkzeugkasten']['anwesenheiten_dokumentieren'] = array(
            'klasse_id' => 'btn_anwesenheiten_dokumentieren',
            'title' => 'Anwesenheiten dokumentieren',
        );

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
            'filtern' => array(
                array( 'operator' => '>=', 'eigenschaft' => 'start', 'wert' => Time::today( 'Europe/Berlin' )->toDateTimeString() ),
            ),
            'sortieren' => array(
                array( 'eigenschaft'=> 'start', 'richtung'=> SORT_ASC, ),
            ),
        );

        if( array_key_exists( 'liste', $this->viewdata ) ) foreach( $this->viewdata['liste'] as $id => $liste ) $this->viewdata['liste'][ $id ]['id'] = $id;
        if( array_key_exists( 'auswertungen', $this->viewdata ) ) foreach( $this->viewdata['auswertungen'] as $id => $auswertungen ) $this->viewdata['auswertungen'][ $id ]['id'] = $id;
        echo view( 'Termine/termin_details', $this->viewdata );
    }

    //------------------------------------------------------------------------------------------------------------------
    public function ajax_termine() { $ajax_antwort[CSRF_NAME] = csrf_hash();
        $validation_rules = array(
            'ajax_id' => 'required|is_natural',
        ); if( !$this->validate( $validation_rules ) ) $ajax_antwort['validation'] = $this->validation->getErrors();
        else {
            $ajax_antwort['tabelle'] = model(Termin_Model::class)->findAll();
            foreach( $ajax_antwort['tabelle'] as $id => $termin ) {
                $ajax_antwort['tabelle'][ $id ] = json_decode( json_encode( $termin ), TRUE );
                foreach( $ajax_antwort['tabelle'][ $id ] as $eigenschaft => $wert )
                if( !array_key_exists( $eigenschaft, EIGENSCHAFTEN['termine'] ) ) unset( $ajax_antwort['tabelle'][ $id ][$eigenschaft] );
                elseif( is_numeric( $wert ) ) {
                    if( (int) $wert == $wert ) $ajax_antwort['tabelle'][ $id ][ $eigenschaft ] = (int)$wert;
                    elseif( (float) $wert == $wert ) $ajax_antwort['tabelle'][ $id ][ $eigenschaft ] = (float)$wert;
                }
            }
        }

        $ajax_antwort['ajax_id'] = (int) $this->request->getPost()['ajax_id'];
        echo json_encode( $ajax_antwort, JSON_UNESCAPED_UNICODE );
    }

    public function ajax_termin_speichern() { $ajax_antwort[CSRF_NAME] = csrf_hash();
        $validation_rules = array(
            'ajax_id' => 'required|is_natural',
            'id' => [ 'label' => 'ID', 'rules' => [ 'if_exist', 'is_natural_no_zero' ] ],
            'titel' => [ 'label' => EIGENSCHAFTEN['termine']['titel']['beschriftung'], 'rules' => [ 'required' ] ],
            'start' => [ 'label' => EIGENSCHAFTEN['termine']['start']['beschriftung'], 'rules' => [ 'required', 'valid_date' ] ],
            'ort' => [ 'label' => EIGENSCHAFTEN['termine']['ort']['beschriftung'], 'rules' => [ 'required' ] ],
            'kategorie' => [ 'label' => EIGENSCHAFTEN['termine']['kategorie']['beschriftung'], 'rules' => [ 'required', 'in_list['.implode( ', ', array_keys( VORGEGEBENE_WERTE['termine']['kategorie'] ) ).']', ] ],
            'filtern_mitglieder' => [ 'label' => EIGENSCHAFTEN['termine']['filtern_mitglieder']['beschriftung'], 'rules' => [ 'required', 'valid_json' ] ],
            'bemerkung' => [ 'label' => EIGENSCHAFTEN['termine']['bemerkung']['beschriftung'], 'rules' => [ 'if_exist', 'permit_empty' ] ],
        );
        if( !$this->validate( $validation_rules ) ) $ajax_antwort['validation'] = $this->validation->getErrors();
        else if( Time::parse( $this->request->getpost()['start'], 'Europe/Berlin' )->isBefore( JETZT ) ) $ajax_antwort['validation'] = array(
            'start' => 'Der Termin darf nicht in der Vergangenheit liegen.',
        );
        else if( !auth()->user()->can( 'termine.verwaltung' ) ) $ajax_antwort['validation'] = 'Keine Berechtigung!';
        else {
            $termine_Model = model(Termin_Model::class);
            $termin = array(
                'titel' => $this->request->getpost()['titel'],
                'start' => $this->request->getPost()['start'],
                'ort' => $this->request->getpost()['ort'],
                'kategorie' => $this->request->getpost()['kategorie'],
                'filtern_mitglieder' => $this->request->getpost()['filtern_mitglieder'],
            );
            if( array_key_exists( 'bemerkung', $this->request->getpost() ) ) $termin['bemerkung'] = $this->request->getpost()['bemerkung']; else $termin['bemerkung'] = '';

            if( array_key_exists( 'id', $this->request->getPost() ) AND !empty( $this->request->getPost()['id'] ) ) $termine_Model->update( $this->request->getpost()['id'], $termin );
            else {
                $termine_Model->save( $termin );
                $ajax_antwort['termin_id'] = (int)$termine_Model->getInsertID();
            }
        }

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

        $ajax_antwort['ajax_id'] = (int) $this->request->getPost()['ajax_id'];
        echo json_encode( $ajax_antwort, JSON_UNESCAPED_UNICODE );
    }

    //------------------------------------------------------------------------------------------------------------------
    public function ajax_rueckmeldungen() { $ajax_antwort[CSRF_NAME] = csrf_hash();
        $validation_rules = array(
            'ajax_id' => 'required|is_natural',
        ); if( !$this->validate( $validation_rules ) ) $ajax_antwort['validation'] = $this->validation->getErrors();
        else {
            $ajax_antwort['tabelle'] = model(Rueckmeldung_Model::class)->findAll();
            foreach( $ajax_antwort['tabelle'] as $id => $rueckmeldung ) {
                $ajax_antwort['tabelle'][ $id ] = json_decode( json_encode( $rueckmeldung ), TRUE );
                foreach( $ajax_antwort['tabelle'][ $id ] as $eigenschaft => $wert )
                if( !array_key_exists( $eigenschaft, EIGENSCHAFTEN['rueckmeldungen'] ) ) unset( $ajax_antwort['tabelle'][ $id ][$eigenschaft] );
                elseif( is_numeric( $wert ) ) {
                    if( (int) $wert == $wert ) $ajax_antwort['tabelle'][ $id ][ $eigenschaft ] = (int)$wert;
                    elseif( (float) $wert == $wert ) $ajax_antwort['tabelle'][ $id ][ $eigenschaft ] = (float)$wert;
                }
            }
        }

        $ajax_antwort['ajax_id'] = (int) $this->request->getPost()['ajax_id'];
        echo json_encode( $ajax_antwort, JSON_UNESCAPED_UNICODE );
    }

    public function ajax_rueckmeldung_speichern() { $ajax_antwort[CSRF_NAME] = csrf_hash();
        $validation_rules = array(
            'ajax_id' => 'required|is_natural',
            'termin_id' => [ 'label' => EIGENSCHAFTEN['rueckmeldungen']['termin_id']['beschriftung'], 'rules' => [ 'required', 'is_natural_no_zero' ] ],
            'mitglied_id' => [ 'label' => EIGENSCHAFTEN['rueckmeldungen']['mitglied_id']['beschriftung'], 'rules' => [ 'required', 'is_natural_no_zero' ] ],
            'status' => [ 'label' => EIGENSCHAFTEN['rueckmeldungen']['status']['beschriftung'], 'rules' => [ 'required', 'is_natural_no_zero' ] ],
            'bemerkung' => [ 'label' => EIGENSCHAFTEN['rueckmeldungen']['bemerkung']['beschriftung'], 'rules' => [ 'if_exist', 'permit_empty' ] ],
        ); if( !$this->validate( $validation_rules ) ) $ajax_antwort['validation'] = $this->validation->getErrors();
        else if( $this->request->getPost()['mitglied_id'] != ICH['id'] AND !(array_key_exists( 'mitglieder.verwaltung', VERFUEGBARE_RECHTE ) AND auth()->user()->can( 'mitglieder.verwaltung' ) ) ) $ajax_antwort['validation'] = 'Keine Berechtigung!';
        else if( Time::parse( model(Termin_Model::class)->find(
                    $this->request->getPost()['termin_id']
                 )['start'], 'Europe/Berlin' )->isBefore( JETZT->addSeconds(TERMINE_RUECKMELDUNG_FRIST) ) )
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
    public function ajax_anwesenheiten() { $ajax_antwort[CSRF_NAME] = csrf_hash();
        $validation_rules = array(
            'ajax_id' => 'required|is_natural',
        ); if( !$this->validate( $validation_rules ) ) $ajax_antwort['validation'] = $this->validation->getErrors();
        else {
            $ajax_antwort['tabelle'] = model(Anwesenheit_Model::class)->findAll();
            foreach( $ajax_antwort['tabelle'] as $id => $anwesenheit ) {
                $ajax_antwort['tabelle'][ $id ] = json_decode( json_encode( $anwesenheit ), TRUE );
                foreach( $ajax_antwort['tabelle'][ $id ] as $eigenschaft => $wert )
                if( !array_key_exists( $eigenschaft, EIGENSCHAFTEN['anwesenheiten'] ) ) unset( $ajax_antwort['tabelle'][ $id ][$eigenschaft] );
                elseif( is_numeric( $wert ) ) {
                    if( (int) $wert == $wert ) $ajax_antwort['tabelle'][ $id ][ $eigenschaft ] = (int)$wert;
                    elseif( (float) $wert == $wert ) $ajax_antwort['tabelle'][ $id ][ $eigenschaft ] = (float)$wert;
                }
            }
        }

        $ajax_antwort['ajax_id'] = (int) $this->request->getPost()['ajax_id'];
        echo json_encode( $ajax_antwort, JSON_UNESCAPED_UNICODE );
    }

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

    protected function termin_filtern_mitglieder_kombiniert( $termin_id ) {
        $termin = model(Termin_Model::class)->find( $termin_id );
        $filtern_mitglieder = json_decode( $termin["filtern_mitglieder"] );
        $kategorie = $termin["kategorie"];
        if ( array_key_exists( $kategorie, TERMINE_KATEGORIE_FILTERN_MITGLIEDER ) && !empty( TERMINE_KATEGORIE_FILTERN_MITGLIEDER[ $kategorie ] ) )
            $filtern_mitglieder_kategorie = TERMINE_KATEGORIE_FILTERN_MITGLIEDER[ $kategorie ];
        else $filtern_mitglieder_kategorie = array();
        if( empty( $filtern_mitglieder ) ) return $filtern_mitglieder_kategorie;
        elseif( empty( $filtern_mitglieder_kategorie ) ) return $filtern_mitglieder;
        else return array( array ( 'verknuepfung' => "&&", 'filtern' => array_merge( $filtern_mitglieder, $filtern_mitglieder_kategorie ) ) );
    }

}
