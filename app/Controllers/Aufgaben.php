<?php

namespace App\Controllers;
use App\Models\Aufgaben\Aufgabe_Model;
use App\Models\Aufgaben\Rueckmeldung_Model;
use App\Models\Aufgaben\Zuordnung_Termine_Model;

use App\Models\Mitglieder\Mitglied_Model;

// use CodeIgniter\I18n\Time;

class Aufgaben extends BaseController {

    public function ajax_aufgabe_speichern() { $ajax_antwort[CSRF_NAME] = csrf_hash();
        $validation_rules = array(
            'ajax_id' => 'required|is_natural',
            'aufgabe_id' => [ 'label' => EIGENSCHAFTEN['aufgaben']['id']['beschriftung'], 'rules' => [ 'if_exist', 'is_natural_no_zero' ] ],
            'titel' => [ 'label' => EIGENSCHAFTEN['aufgaben']['titel']['beschriftung'], 'rules' => [ 'required' ] ],
            'max_anzahl_mitglieder' => [ 'label' => EIGENSCHAFTEN['aufgaben']['max_anzahl_mitglieder']['beschriftung'], 'rules' => [ 'field_exists' ] ],
            'bemerkung' => [ 'label' => EIGENSCHAFTEN['aufgaben']['bemerkung']['beschriftung'], 'rules' => [ 'field_exists' ] ],
        );
        if( !$this->validate( $validation_rules ) ) $ajax_antwort['validation'] = $this->validation->getErrors();
        else if( !auth()->user()->can( 'aufgaben.verwaltung' ) ) $ajax_antwort['validation'] = 'Keine Berechtigung!';
        else {
            $aufgabe_Model = model(Aufgabe_Model::class);
            $aufgabe = array(
                'titel' => $this->request->getpost()['titel'],
            );
            if( array_key_exists( 'max_anzahl_mitglieder', $this->request->getpost() ) AND !empty( $this->request->getpost()['max_anzahl_mitglieder'] ) ) $aufgabe['max_anzahl_mitglieder'] = $this->request->getpost()['max_anzahl_mitglieder']; else $aufgabe['max_anzahl_mitglieder'] = NULL;
            if( array_key_exists( 'bemerkung', $this->request->getpost() ) AND !empty( $this->request->getpost()['bemerkung'] ) ) $aufgabe['bemerkung'] = $this->request->getpost()['bemerkung']; else $aufgabe['bemerkung'] = NULL;

            if( array_key_exists( 'aufgabe_id', $this->request->getPost() ) AND !empty( $this->request->getPost()['aufgabe_id'] ) ) $aufgabe_Model->update( $this->request->getpost()['aufgabe_id'], $aufgabe );
            else {
                $aufgabe_Model->save( $aufgabe );
                $ajax_antwort['aufgabe_id'] = (int)$aufgabe_Model->getInsertID();
            }
        }

        $ajax_antwort['ajax_id'] = (int) $this->request->getPost()['ajax_id'];
        echo json_encode( $ajax_antwort, JSON_UNESCAPED_UNICODE );
    }

    public function ajax_aufgabe_loeschen() { $ajax_antwort[CSRF_NAME] = csrf_hash();
        $validation_rules = array(
            'ajax_id' => 'required|is_natural',
            'aufgabe_id' => [ 'label' => EIGENSCHAFTEN['aufgaben']['id']['beschriftung'], 'rules' => [ 'required', 'is_natural_no_zero' ] ],
        ); if( !$this->validate( $validation_rules ) ) $ajax_antwort['validation'] = $this->validation->getErrors();
        else if( !auth()->user()->can( 'aufgaben.verwaltung' ) ) $ajax_antwort['validation'] = 'Keine Berechtigung!';
        else model(Aufgabe_Model::class)->delete( $this->request->getPost()['aufgabe_id'] );
        
        $ajax_antwort['ajax_id'] = (int) $this->request->getPost()['ajax_id'];
        echo json_encode( $ajax_antwort, JSON_UNESCAPED_UNICODE );
    }

    //------------------------------------------------------------------------------------------------------------------
    public function ajax_rueckmeldung_speichern() { $ajax_antwort[CSRF_NAME] = csrf_hash();
        $validation_rules = array(
            'ajax_id' => 'required|is_natural',
            'aufgabe_id' => [ 'label' => EIGENSCHAFTEN['aufgaben_rueckmeldungen']['aufgabe_id']['beschriftung'], 'rules' => [ 'required', 'is_natural_no_zero' ] ],
            'mitglied_id' => [ 'label' => EIGENSCHAFTEN['aufgaben_rueckmeldungen']['mitglied_id']['beschriftung'], 'rules' => [ 'required', 'is_natural_no_zero' ] ],
            'status' => [ 'label' => EIGENSCHAFTEN['aufgaben_rueckmeldungen']['status']['beschriftung'], 'rules' => [ 'required', 'is_natural' ] ],
            'bemerkung' => [ 'label' => EIGENSCHAFTEN['aufgaben_rueckmeldungen']['bemerkung']['beschriftung'], 'rules' => [ 'field_exists' ] ],
        ); if( !$this->validate( $validation_rules ) ) $ajax_antwort['validation'] = $this->validation->getErrors();
        else if( $this->request->getPost()['mitglied_id'] != ICH_ID AND !( auth()->user()->can( 'mitglieder.verwaltung' ) AND auth()->user()->can( 'aufgaben.verwaltung' ) ) ) $ajax_antwort['validation'] = 'Keine Berechtigung!';
        else if( $this->request->getPost()['status'] == 0 AND !( auth()->user()->can( 'mitglieder.verwaltung' ) AND auth()->user()->can( 'aufgaben.verwaltung' ) ) ) $ajax_antwort['validation'] = 'Ein Löschen der Rückmeldung ist nicht möglich!';
        // else if( Time::parse( model(Termin_Model::class)->find(
        //             $this->request->getPost()['termin_id']
        //          )[ VERKNUEPFUNGEN['termine_rueckmeldungen']['verknuepfung_moeglich_frist']['eigenschaft'] ], 'Europe/Berlin' )->isBefore( Time::now('Europe/Berlin')->addSeconds( VERKNUEPFUNGEN['termine_rueckmeldungen']['verknuepfung_moeglich_frist']['frist'] ) ) )
        //             $ajax_antwort['validation'] = 'Keine Rückmeldung mehr möglich!';
        else {
            $rueckmeldung_Model = model(Rueckmeldung_Model::class);
            $rueckmeldung = array(
                'aufgabe_id' => $this->request->getpost()['aufgabe_id'],
                'mitglied_id' => $this->request->getpost()['mitglied_id'],
                'status' => $this->request->getpost()['status'],
            );
            if( array_key_exists( 'bemerkung', $this->request->getpost() ) AND !empty( $this->request->getpost()['bemerkung'] ) ) $rueckmeldung['bemerkung'] = $this->request->getpost()['bemerkung']; else $rueckmeldung['bemerkung'] = NULL;

            if ( VERKNUEPFUNGEN['aufgaben_rueckmeldungen']['nur_eins_erlaubt_janein'] )
                $rueckmeldung_Model->where( array( 'aufgabe_id' => $rueckmeldung['aufgabe_id'], 'mitglied_id' => $rueckmeldung['mitglied_id'] ) )->delete();

            if( (int)$rueckmeldung['status'] > 0 ) {
                $rueckmeldung_Model->save( $rueckmeldung );
                $ajax_antwort['aufgaben_rueckmeldung_id'] = (int)$rueckmeldung_Model->getInsertID();
                $ajax_antwort['dbdata'] = array( array( 'id' => $ajax_antwort['aufgaben_rueckmeldung_id'], 'status' => $rueckmeldung['status'] ) );
            } else $ajax_antwort['dbdata'] = array();
        }

        $ajax_antwort['ajax_id'] = (int) $this->request->getPost()['ajax_id'];
        echo json_encode( $ajax_antwort, JSON_UNESCAPED_UNICODE );
    }

    public function ajax_rueckmeldung_bemerkung_aendern() { $ajax_antwort[CSRF_NAME] = csrf_hash();
        $validation_rules = array(
            'ajax_id' => 'required|is_natural',
            'aufgaben_rueckmeldung_id' => [ 'label' => EIGENSCHAFTEN['aufgaben_rueckmeldungen']['id']['beschriftung'], 'rules' => [ 'required', 'is_natural_no_zero' ] ],
            'bemerkung' => [ 'label' => EIGENSCHAFTEN['aufgaben_rueckmeldungen']['bemerkung']['beschriftung'], 'rules' => [ 'field_exists' ] ],
        ); if( !$this->validate( $validation_rules ) ) $ajax_antwort['validation'] = $this->validation->getErrors();
        else {
            $rueckmeldung_Model = model(Rueckmeldung_Model::class);
            $rueckmeldung = array();
            if( array_key_exists( 'bemerkung', $this->request->getpost() ) AND !empty( $this->request->getpost()['bemerkung'] ) ) $rueckmeldung['bemerkung'] = $this->request->getpost()['bemerkung']; else $rueckmeldung['bemerkung'] = NULL;

            $rueckmeldung_Model->update( $this->request->getpost()['aufgaben_rueckmeldung_id'], $rueckmeldung );
        }

        $ajax_antwort['ajax_id'] = (int) $this->request->getPost()['ajax_id'];
        echo json_encode( $ajax_antwort, JSON_UNESCAPED_UNICODE );
    }

    //------------------------------------------------------------------------------------------------------------------
    public function ajax_zuordnung_termine_speichern() { $ajax_antwort[CSRF_NAME] = csrf_hash();
        $validation_rules = array(
            'ajax_id' => 'required|is_natural',
            'aufgabe_id' => [ 'label' => EIGENSCHAFTEN['aufgaben_zuordnungen_termine']['aufgabe_id']['beschriftung'], 'rules' => [ 'required', 'is_natural_no_zero' ] ],
            'termin_id' => [ 'label' => EIGENSCHAFTEN['aufgaben_zuordnungen_termine']['termin_id']['beschriftung'], 'rules' => [ 'required', 'is_natural_no_zero' ] ],
            'status' => [ 'label' => EIGENSCHAFTEN['aufgaben_zuordnungen_termine']['status']['beschriftung'], 'rules' => [ 'required', 'is_natural' ] ],
            'bemerkung' => [ 'label' => EIGENSCHAFTEN['aufgaben_zuordnungen_termine']['bemerkung']['beschriftung'], 'rules' => [ 'field_exists' ] ],
        ); if( !$this->validate( $validation_rules ) ) $ajax_antwort['validation'] = $this->validation->getErrors();
        else if( !auth()->user()->can( 'aufgaben.verwaltung' ) ) $ajax_antwort['validation'] = 'Keine Berechtigung!';
        else {
            $zuordnung_termine_Model = model(Zuordnung_Termine_Model::class);
            $zuordnung_termine = array(
                'aufgabe_id' => $this->request->getpost()['aufgabe_id'],
                'termin_id' => $this->request->getpost()['termin_id'],
                'status' => $this->request->getpost()['status'],
            );
            if( array_key_exists( 'bemerkung', $this->request->getpost() ) AND !empty( $this->request->getpost()['bemerkung'] ) ) $zuordnung_termine['bemerkung'] = $this->request->getpost()['bemerkung']; else $zuordnung_termine['bemerkung'] = NULL;

            if ( VERKNUEPFUNGEN['aufgaben_zuordnungen_termine']['nur_eins_erlaubt_janein'] )
                $zuordnung_termine_Model->where( array( 'aufgabe_id' => $zuordnung_termine['aufgabe_id'], 'termin_id' => $zuordnung_termine['termin_id'] ) )->delete();

            if( (int)$zuordnung_termine['status'] > 0 ) {
                $zuordnung_termine_Model->save( $zuordnung_termine );
                $ajax_antwort['aufgaben_zuordnung_termine_id'] = (int)$zuordnung_termine_Model->getInsertID();
                $ajax_antwort['dbdata'] = array( array( 'id' => $ajax_antwort['aufgaben_zuordnung_termine_id'], 'status' => $zuordnung_termine['status'] ) );
            } else $ajax_antwort['dbdata'] = array();
        }

        $ajax_antwort['ajax_id'] = (int) $this->request->getPost()['ajax_id'];
        echo json_encode( $ajax_antwort, JSON_UNESCAPED_UNICODE );
    }

}
