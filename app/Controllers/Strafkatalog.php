<?php

namespace App\Controllers;

use App\Models\Strafkatalog\Strafe_Model;
use App\Models\Strafkatalog\Zugewiesene_Strafe_Model;

class Strafkatalog extends BaseController {

    public function strafkatalog() {

        $this->viewdata['liste']['aktueller_strafkatalog'] = VIEWDATA['strafkatalog'];
        $this->viewdata['liste']['aktueller_strafkatalog']['element']['vorschau'] = STRAFKATALOG_EIGENSCHAFTEN_VORSCHAU;

        if( auth()->user()->can( 'strafkatalog.verwaltung' ) ) {

            $this->viewdata['liste']['strafen_zuweisen'] = VIEWDATA['mitglieder'];
            unset($this->viewdata['liste']['strafen_zuweisen']['filtern']);
            $this->viewdata['liste']['strafen_zuweisen']['element']['verknuepfungen'] = 'strafkatalog_zugewiesene_strafen';

            if( auth()->user()->can( 'mitglieder.verwaltung' ) ) {

                $this->viewdata['liste']['strafen_zuweisen']['werkzeuge'][] = 'bearbeiten_modus_ein_ausschalten';
                $this->viewdata['liste']['strafen_zuweisen']['werkzeuge'][] = 'element_erstellen';
                $this->viewdata['liste']['strafen_zuweisen']['element']['werkzeuge'][] = 'element_aendern';
                $this->viewdata['liste']['strafen_zuweisen']['element']['werkzeuge'][] = 'element_duplizieren';
                $this->viewdata['liste']['strafen_zuweisen']['element']['werkzeuge'][] = 'element_loeschen';

            }

            $this->viewdata['liste']['aktueller_strafkatalog']['werkzeuge'][] = 'bearbeiten_modus_ein_ausschalten';
            $this->viewdata['liste']['aktueller_strafkatalog']['werkzeuge'][] = 'element_erstellen';
            $this->viewdata['liste']['aktueller_strafkatalog']['element']['werkzeuge'][] = 'strafen_zuweisen';
            $this->viewdata['liste']['aktueller_strafkatalog']['element']['werkzeuge'][] = 'element_aendern';
            $this->viewdata['liste']['aktueller_strafkatalog']['element']['werkzeuge'][] = 'element_duplizieren';
            $this->viewdata['liste']['aktueller_strafkatalog']['element']['werkzeuge'][] = 'element_loeschen';

        }

        $this->viewdata_bereinigen(); echo view( 'Strafkatalog/strafkatalog', $this->viewdata );
    }

    //------------------------------------------------------------------------------------------------------------------
    public function ajax_strafe_speichern() { $ajax_antwort[CSRF_NAME] = csrf_hash();
        $validation_rules = array(
            'ajax_id' => 'required|is_natural',
            'strafe_id' => [ 'label' => EIGENSCHAFTEN['strafkatalog']['id']['beschriftung'], 'rules' => [ 'if_exist', 'is_natural_no_zero' ] ],
            'titel' => [ 'label' => EIGENSCHAFTEN['strafkatalog']['titel']['beschriftung'], 'rules' => [ 'required' ] ],
            'wert' => [ 'label' => EIGENSCHAFTEN['strafkatalog']['wert']['beschriftung'], 'rules' => [ 'required', 'decimal', 'greater_than_equal_to[0]' ] ],
            'kategorie' => [ 'label' => EIGENSCHAFTEN['strafkatalog']['kategorie']['beschriftung'], 'rules' => [ 'required', 'in_list['.implode( ', ', array_keys( VORGEGEBENE_WERTE['strafkatalog']['kategorie'] ) ).']' ] ],
            'bemerkung' => [ 'label' => EIGENSCHAFTEN['strafkatalog']['bemerkung']['beschriftung'], 'rules' => [ 'field_exists' ] ],
        );
        if( !$this->validate( $validation_rules ) ) $ajax_antwort['validation'] = $this->validation->getErrors();
        else if( !auth()->user()->can( 'strafkatalog.verwaltung' ) ) $ajax_antwort['validation'] = 'Keine Berechtigung!';
        else {
            $strafe_Model = model(Strafe_Model::class);
            $strafe = array(
                'titel' => $this->request->getpost()['titel'],
                'wert' => $this->request->getPost()['wert'],
                'kategorie' => $this->request->getPost()['kategorie'],
            );
            if( array_key_exists( 'bemerkung', $this->request->getpost() ) AND !empty( $this->request->getpost()['bemerkung'] ) ) $strafe['bemerkung'] = $this->request->getpost()['bemerkung']; else $strafe['bemerkung'] = NULL;

            if( array_key_exists( 'strafe_id', $this->request->getPost() ) AND !empty( $this->request->getPost()['strafe_id'] ) ) $strafe_Model->update( $this->request->getpost()['strafe_id'], $strafe );
            else {
                $strafe_Model->save( $strafe );
                $ajax_antwort['strafe_id'] = (int)$strafe_Model->getInsertID();
            }
        }

        $ajax_antwort['ajax_id'] = (int) $this->request->getPost()['ajax_id'];
        echo json_encode( $ajax_antwort, JSON_UNESCAPED_UNICODE );
    }

    public function ajax_strafe_loeschen() { $ajax_antwort[CSRF_NAME] = csrf_hash();
        $validation_rules = array(
            'ajax_id' => 'required|is_natural',
            'strafe_id' => [ 'label' => EIGENSCHAFTEN['strafkatalog']['id']['beschriftung'], 'rules' => [ 'required', 'is_natural_no_zero' ] ],
        ); if( !$this->validate( $validation_rules ) ) $ajax_antwort['validation'] = $this->validation->getErrors();
        else if( !auth()->user()->can( 'strafkatalog.verwaltung' ) ) $ajax_antwort['validation'] = 'Keine Berechtigung!';
        else model(Strafe_Model::class)->delete( $this->request->getPost()['strafe_id'] );
        
        $ajax_antwort['ajax_id'] = (int) $this->request->getPost()['ajax_id'];
        echo json_encode( $ajax_antwort, JSON_UNESCAPED_UNICODE );
    }

    public function ajax_zugewiesene_strafe_speichern() { $ajax_antwort[CSRF_NAME] = csrf_hash();
        $validation_rules = array(
            'ajax_id' => 'required|is_natural',
            'strafe_id' => [ 'label' => EIGENSCHAFTEN['strafkatalog_zugewiesene_strafen']['strafe_id']['beschriftung'], 'rules' => [ 'required', 'is_natural_no_zero' ] ],
            'mitglied_id' => [ 'label' => EIGENSCHAFTEN['strafkatalog_zugewiesene_strafen']['mitglied_id']['beschriftung'], 'rules' => [ 'required', 'is_natural_no_zero' ] ],
            'status' => [ 'label' => EIGENSCHAFTEN['strafkatalog_zugewiesene_strafen']['status']['beschriftung'], 'rules' => [ 'required', 'is_natural' ] ],
            'bemerkung' => [ 'label' => EIGENSCHAFTEN['strafkatalog_zugewiesene_strafen']['bemerkung']['beschriftung'], 'rules' => [ 'field_exists' ] ],
        ); if( !$this->validate( $validation_rules ) ) $ajax_antwort['validation'] = $this->validation->getErrors();
        else if( !auth()->user()->can( 'strafkatalog.verwaltung' ) ) $ajax_antwort['validation'] = 'Keine Berechtigung!';
        else {
            $zugewiesene_strafe_Model = model(Zugewiesene_Strafe_Model::class);
            $zugewiesene_strafe = array(
                'strafe_id' => $this->request->getpost()['strafe_id'],
                'mitglied_id' => $this->request->getpost()['mitglied_id'],
                'status' => $this->request->getpost()['status'],
            );
            if( array_key_exists( 'bemerkung', $this->request->getpost() ) AND !empty( $this->request->getpost()['bemerkung'] ) ) $zugewiesene_strafe['bemerkung'] = $this->request->getpost()['bemerkung']; else $zugewiesene_strafe['bemerkung'] = NULL;

            if ( VERKNUEPFUNGEN['strafkatalog_zugewiesene_strafen']['nur_eins_erlaubt_janein'] )
                $zugewiesene_strafe_Model->where( array( 'strafe_id' => $zugewiesene_strafe['strafe_id'], 'mitglied_id' => $zugewiesene_strafe['mitglied_id'] ) )->delete();

            if( (int)$zugewiesene_strafe['status'] > 0 ) {
                $zugewiesene_strafe_Model->save( $zugewiesene_strafe );
                $ajax_antwort['strafkatalog_zugewiesene_strafe_id'] = (int)$zugewiesene_strafe_Model->getInsertID();
                $ajax_antwort['dbdata'] = array( array( 'id' => $ajax_antwort['strafkatalog_zugewiesene_strafe_id'], 'status' => $zugewiesene_strafe['status'] ) );
            } else $ajax_antwort['dbdata'] = array();
        }

        $ajax_antwort['ajax_id'] = (int) $this->request->getPost()['ajax_id'];
        echo json_encode( $ajax_antwort, JSON_UNESCAPED_UNICODE );
    }

}
