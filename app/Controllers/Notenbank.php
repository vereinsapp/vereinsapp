<?php

namespace App\Controllers;
use App\Models\Notenbank\Titel_Model;
use App\Models\Notenbank\Setlisteneintrag_Model;


class Notenbank extends BaseController {

    public function notenbank() {

        $this->viewdata['liste']['aktuelles_verzeichnis'] = VIEWDATA['notenbank'];
        $this->viewdata['liste']['aktuelles_verzeichnis']['element']['link'] = array( 'liste' => 'notenbank', 'eigenschaften' => array( 'id', ), );
        $this->viewdata['liste']['aktuelles_verzeichnis']['element']['vorschau'] = array( 'kategorie', 'anzahl_noten', 'anzahl_audio', 'anzahl_verzeichnis' );

        if( auth()->user()->can( 'notenbank.verwaltung' ) ) {

            $this->viewdata['liste']['aktuelles_verzeichnis']['werkzeuge'][] = 'element_erstellen';
            $this->viewdata['liste']['aktuelles_verzeichnis']['element']['werkzeuge'][] = 'element_aendern';
            $this->viewdata['liste']['aktuelles_verzeichnis']['element']['werkzeuge'][] = 'element_duplizieren';
            $this->viewdata['liste']['aktuelles_verzeichnis']['element']['werkzeuge'][] = 'element_loeschen';

        }

        $this->viewdata_bereinigen(); echo view( 'Notenbank/notenbank', $this->viewdata );
    }

    //------------------------------------------------------------------------------------------------------------------
    public function titel( $titel_id ) { $titel_id = (int)$titel_id;
        if( empty( model(Titel_Model::class)->find( $titel_id ) ) ) throw \CodeIgniter\Exceptions\PageNotFoundException::forPageNotFound();

        $this->viewdata['liste']['aktuelles_verzeichnis'] = VIEWDATA['notenbank'];
        $this->viewdata['liste']['aktuelles_verzeichnis']['titel_id'] = $titel_id;
        $this->viewdata['liste']['aktuelles_verzeichnis']['element']['werkzeuge'] = array();

        $this->viewdata['verzeichnis']['aktuelles_verzeichnis'] = array( 'liste' => 'notenbank', 'link' => TRUE, 'titel_id' => $titel_id, );

        if( auth()->user()->can( 'notenbank.verwaltung' ) ) {

            $this->viewdata['liste']['aktuelles_verzeichnis']['element']['werkzeuge'][] = 'element_aendern';
            $this->viewdata['liste']['aktuelles_verzeichnis']['element']['werkzeuge'][] = 'element_duplizieren';
            $this->viewdata['liste']['aktuelles_verzeichnis']['element']['werkzeuge'][] = 'element_loeschen_weiterleiten';

        }

        $this->viewdata_bereinigen(); echo view( 'Notenbank/titel_details', $this->viewdata );
    }

    //------------------------------------------------------------------------------------------------------------------
    public function ajax_titel_speichern() { $ajax_antwort[CSRF_NAME] = csrf_hash();
        $validation_rules = array(
            'ajax_id' => 'required|is_natural',
            'titel_id' => [ 'label' => EIGENSCHAFTEN['notenbank']['id']['beschriftung'], 'rules' => [ 'if_exist', 'is_natural_no_zero' ] ],
            'titel' => [ 'label' => EIGENSCHAFTEN['notenbank']['titel']['beschriftung'], 'rules' => [ 'required' ] ],
            'titel_nr' => [ 'label' => EIGENSCHAFTEN['notenbank']['titel_nr']['beschriftung'], 'rules' => [ 'required', 'is_natural_no_zero' ] ],
            'kategorie' => [ 'label' => EIGENSCHAFTEN['notenbank']['kategorie']['beschriftung'], 'rules' => [ 'required', 'in_list['.implode( ', ', array_keys( VORGEGEBENE_WERTE['notenbank']['kategorie'] ) ).']' ] ],
            'komponist' => [ 'label' => EIGENSCHAFTEN['notenbank']['komponist']['beschriftung'], 'rules' => [ 'field_exists' ] ],
            'bemerkung' => [ 'label' => EIGENSCHAFTEN['notenbank']['bemerkung']['beschriftung'], 'rules' => [ 'field_exists' ] ],
        );
        $validation_titel_nr = model(Titel_Model::class)->where( [ 'titel_nr' => $this->request->getPost()['titel_nr'] ] )->findAll();
        $validation_titel_nr_id = model(Titel_Model::class)->where( [ 'titel_nr' => $this->request->getPost()['titel_nr'] ] )->findColumn('id');
        if( !$this->validate( $validation_rules ) ) $ajax_antwort['validation'] = $this->validation->getErrors();
        else if( !auth()->user()->can( 'notenbank.verwaltung' ) ) $ajax_antwort['validation'] = 'Keine Berechtigung!';
        else if( ( !array_key_exists( 'titel_id', $this->request->getPost() ) AND !is_null( $validation_titel_nr ) AND count( $validation_titel_nr ) > 0 )
             OR ( array_key_exists( 'titel_id', $this->request->getPost() ) AND !empty( $this->request->getPost()['titel_id'] ) AND !is_null( $validation_titel_nr_id ) AND !in_array( $this->request->getPost()['titel_id'], $validation_titel_nr_id ) ) )
                $ajax_antwort['validation']['titel_nr'] = EIGENSCHAFTEN['notenbank']['titel_nr']['beschriftung'].' wird bereits verwendet.';
        else {
            $titel_Model = model(Titel_Model::class);
            $titel = array(
                'titel' => $this->request->getpost()['titel'],
                'titel_nr' => $this->request->getPost()['titel_nr'],
                'kategorie' => $this->request->getPost()['kategorie'],
            );
            if( array_key_exists( 'komponist', $this->request->getpost() ) AND !empty( $this->request->getpost()['komponist'] ) ) $titel['komponist'] = $this->request->getpost()['komponist']; else $titel['komponist'] = NULL;
            if( array_key_exists( 'bemerkung', $this->request->getpost() ) AND !empty( $this->request->getpost()['bemerkung'] ) ) $titel['bemerkung'] = $this->request->getpost()['bemerkung']; else $titel['bemerkung'] = NULL;

            if( array_key_exists( 'titel_id', $this->request->getPost() ) AND !empty( $this->request->getPost()['titel_id'] ) ) $titel_Model->update( $this->request->getpost()['titel_id'], $titel );
            else {
                $titel_Model->save( $titel );
                $ajax_antwort['titel_id'] = (int)$titel_Model->getInsertID();
            }
        }

        $ajax_antwort['ajax_id'] = (int) $this->request->getPost()['ajax_id'];
        echo json_encode( $ajax_antwort, JSON_UNESCAPED_UNICODE );
    }

    public function ajax_titel_loeschen() { $ajax_antwort[CSRF_NAME] = csrf_hash();
        $validation_rules = array(
            'ajax_id' => 'required|is_natural',
            'titel_id' => [ 'label' => EIGENSCHAFTEN['notenbank']['id']['beschriftung'], 'rules' => [ 'required', 'is_natural_no_zero' ] ],
        ); if( !$this->validate( $validation_rules ) ) $ajax_antwort['validation'] = $this->validation->getErrors();
        else if( !auth()->user()->can( 'notenbank.verwaltung' ) ) $ajax_antwort['validation'] = 'Keine Berechtigung!';
        else model(Titel_Model::class)->delete( $this->request->getPost()['titel_id'] );

        $ajax_antwort['ajax_id'] = (int) $this->request->getPost()['ajax_id'];
        echo json_encode( $ajax_antwort, JSON_UNESCAPED_UNICODE );
    }

    //------------------------------------------------------------------------------------------------------------------
    public function ajax_setlisteneintrag_speichern() { $ajax_antwort[CSRF_NAME] = csrf_hash();
        $validation_rules = array(
            'ajax_id' => 'required|is_natural',
            'titel_id' => [ 'label' => EIGENSCHAFTEN['notenbank_setliste']['titel_id']['beschriftung'], 'rules' => [ 'required', 'is_natural_no_zero' ] ],
            'termin_id' => [ 'label' => EIGENSCHAFTEN['notenbank_setliste']['termin_id']['beschriftung'], 'rules' => [ 'required', 'is_natural_no_zero' ] ],
            'status' => [ 'label' => EIGENSCHAFTEN['notenbank_setliste']['status']['beschriftung'], 'rules' => [ 'required', 'is_natural' ] ],
            'bemerkung' => [ 'label' => EIGENSCHAFTEN['notenbank_setliste']['bemerkung']['beschriftung'], 'rules' => [ 'field_exists' ] ],
        ); if( !$this->validate( $validation_rules ) ) $ajax_antwort['validation'] = $this->validation->getErrors();
        else if( !auth()->user()->can( 'notenbank.verwaltung' ) ) $ajax_antwort['validation'] = 'Keine Berechtigung!';
        else {
            $setlisteneintrag_Model = model(Setlisteneintrag_Model::class);
            $setlisteneintrag = array(
                'titel_id' => $this->request->getpost()['titel_id'],
                'termin_id' => $this->request->getpost()['termin_id'],
                'status' => $this->request->getpost()['status'],
            );
            if( array_key_exists( 'bemerkung', $this->request->getpost() ) AND !empty( $this->request->getpost()['bemerkung'] ) ) $setlisteneintrag['bemerkung'] = $this->request->getpost()['bemerkung']; else $setlisteneintrag['bemerkung'] = NULL;

            if ( VERKNUEPFUNGEN['notenbank_setliste']['nur_eins_erlaubt_janein'] )
                $setlisteneintrag_Model->where( array( 'titel_id' => $setlisteneintrag['titel_id'], 'termin_id' => $setlisteneintrag['termin_id'] ) )->delete();

            if( (int)$setlisteneintrag['status'] > 0 ) {
                $andere_setlisteneintraege = $setlisteneintrag_Model->where( array( 'termin_id' => $setlisteneintrag['termin_id'] ) )->orderBy('status', 'DESC')->findAll();
                if( count( $andere_setlisteneintraege ) > 0 ) $setlisteneintrag['status'] = (int)($andere_setlisteneintraege[0]['status']) + 1;
                else $setlisteneintrag['status'] = 1;

                $setlisteneintrag_Model->save( $setlisteneintrag );
                $ajax_antwort['notenbank_setlisteneintrag_id'] = (int)$setlisteneintrag_Model->getInsertID();
                $ajax_antwort['dbdata'] = array( array( 'id' => $ajax_antwort['notenbank_setlisteneintrag_id'], 'status' => $setlisteneintrag['status'] ) );
            } else {
                $ajax_antwort['dbdata'] = array();
                $neuer_status = 0;
                foreach( $setlisteneintrag_Model->where( array( 'termin_id' => $setlisteneintrag['termin_id'] ) )->orderBy('status', 'ASC')->findAll() as $anderer_setlisteneintrag ) {
                    $anderer_setlisteneintrag['status'] = ++$neuer_status;
                    $setlisteneintrag_Model->update( $anderer_setlisteneintrag['id'], $anderer_setlisteneintrag );
                    $ajax_antwort['dbdata'][] = array( 'id' => $anderer_setlisteneintrag['id'], 'status' => $anderer_setlisteneintrag['status'] );
                }
            }
        }

        $ajax_antwort['ajax_id'] = (int) $this->request->getPost()['ajax_id'];
        echo json_encode( $ajax_antwort, JSON_UNESCAPED_UNICODE );
    }

    public function ajax_setlisteneintrag_position_aendern() { $ajax_antwort[CSRF_NAME] = csrf_hash();
        $validation_rules = array(
            'ajax_id' => 'required|is_natural',
            'notenbank_setlisteneintrag_id' => [ 'label' => EIGENSCHAFTEN['notenbank_setliste']['id']['beschriftung'], 'rules' => [ 'required', 'is_natural_no_zero' ] ],
            'status' => [ 'label' => EIGENSCHAFTEN['notenbank_setliste']['status']['beschriftung'], 'rules' => [ 'required', 'is_natural_no_zero' ] ],
        ); if( !$this->validate( $validation_rules ) ) $ajax_antwort['validation'] = $this->validation->getErrors();
        else if( !auth()->user()->can( 'notenbank.verwaltung' ) ) $ajax_antwort['validation'] = 'Keine Berechtigung!';
        else {
            $setlisteneintrag_Model = model(Setlisteneintrag_Model::class);
            $setlisteneintrag = $setlisteneintrag_Model->find( $this->request->getpost()['notenbank_setlisteneintrag_id'] );
            $alter_status = $setlisteneintrag['status'];
            $neuer_status = $this->request->getpost()['status'];

            $ajax_antwort['dbdata'] = array();
            if( $alter_status < $neuer_status ) {
                foreach( $setlisteneintrag_Model->where( array( 'termin_id' => $setlisteneintrag['termin_id'] ) )->orderBy('status', 'ASC')->findAll() as $anderer_setlisteneintrag )
                    if( (int)$anderer_setlisteneintrag['id'] !== (int)$setlisteneintrag['id'] AND $anderer_setlisteneintrag['status'] <= $neuer_status AND $anderer_setlisteneintrag['status'] > $alter_status ) {
                        $anderer_setlisteneintrag['status'] = (int)$anderer_setlisteneintrag['status'] - 1;
                        $setlisteneintrag_Model->update( $anderer_setlisteneintrag['id'], $anderer_setlisteneintrag );
                        $ajax_antwort['dbdata'][] = array( 'id' => $anderer_setlisteneintrag['id'], 'status' => $anderer_setlisteneintrag['status'] );
                    }
            } else if( $alter_status > $neuer_status ) {
                foreach( $setlisteneintrag_Model->where( array( 'termin_id' => $setlisteneintrag['termin_id'] ) )->orderBy('status', 'ASC')->findAll() as $anderer_setlisteneintrag )
                    if( (int)$anderer_setlisteneintrag['id'] !== (int)$setlisteneintrag['id'] AND $anderer_setlisteneintrag['status'] >= $neuer_status AND $anderer_setlisteneintrag['status'] < $alter_status ) {
                        $anderer_setlisteneintrag['status'] = (int)$anderer_setlisteneintrag['status'] + 1;
                        $setlisteneintrag_Model->update( $anderer_setlisteneintrag['id'], $anderer_setlisteneintrag );
                        $ajax_antwort['dbdata'][] = array( 'id' => $anderer_setlisteneintrag['id'], 'status' => $anderer_setlisteneintrag['status'] );
                    }
            }

            $setlisteneintrag['status'] = $neuer_status;
            $setlisteneintrag_Model->update( $setlisteneintrag['id'], $setlisteneintrag );
            $ajax_antwort['dbdata'][] = array( 'id' => $setlisteneintrag['id'], 'status' => $neuer_status );
        }

        $ajax_antwort['ajax_id'] = (int) $this->request->getPost()['ajax_id'];
        echo json_encode( $ajax_antwort, JSON_UNESCAPED_UNICODE );
    }

    public function ajax_setlisteneintrag_loeschen() { $ajax_antwort[CSRF_NAME] = csrf_hash();
        $validation_rules = array(
            'ajax_id' => 'required|is_natural',
            'notenbank_setlisteneintrag_id' => [ 'label' => EIGENSCHAFTEN['notenbank_setliste']['id']['beschriftung'], 'rules' => [ 'required', 'is_natural_no_zero' ] ],
        ); if( !$this->validate( $validation_rules ) ) $ajax_antwort['validation'] = $this->validation->getErrors();
        else if( !auth()->user()->can( 'notenbank.verwaltung' ) ) $ajax_antwort['validation'] = 'Keine Berechtigung!';
        else {
            $setlisteneintrag_Model = model(Setlisteneintrag_Model::class);
            $setlisteneintrag = $setlisteneintrag_Model->find( $this->request->getpost()['notenbank_setlisteneintrag_id'] );

            $ajax_antwort['dbdata'] = array();
            foreach( $setlisteneintrag_Model->where( array( 'termin_id' => $setlisteneintrag['termin_id'] ) )->orderBy('status', 'ASC')->findAll() as $anderer_setlisteneintrag )
                if( (int)$anderer_setlisteneintrag['status'] > $setlisteneintrag['status'] ) {
                    $anderer_setlisteneintrag['status'] = (int)$anderer_setlisteneintrag['status'] - 1;
                    $setlisteneintrag_Model->update( $anderer_setlisteneintrag['id'], $anderer_setlisteneintrag );
                    $ajax_antwort['dbdata'][] = array( 'id' => $anderer_setlisteneintrag['id'], 'status' => $anderer_setlisteneintrag['status'] );
                }

            $setlisteneintrag_Model->delete( $setlisteneintrag['id'] );
        }

        $ajax_antwort['ajax_id'] = (int) $this->request->getPost()['ajax_id'];
        echo json_encode( $ajax_antwort, JSON_UNESCAPED_UNICODE );
    }

}
