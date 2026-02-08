<?php

namespace App\Controllers;

use App\Models\Strafkatalog\Strafe_Model;
use App\Models\Strafkatalog\Kassenbucheintrag_Model;

class Strafkatalog extends BaseController {

    public function strafkatalog() {

        $this->viewdata['liste']['aktueller_strafkatalog'] = HAUPTINSTANZEN['strafkatalog'];
        $this->viewdata['liste']['aktueller_strafkatalog']['group-flush'] = TRUE;
        $this->viewdata['liste']['aktueller_strafkatalog']['vorschau'] = array( 'wert', 'kategorie' );

        if( auth()->user()->can( 'strafkatalog.verwaltung' ) ) {

            $this->viewdata['liste']['aktueller_strafkatalog']['werkzeugkasten_handle'] = TRUE;
            $this->viewdata['liste']['aktueller_strafkatalog']['werkzeugkasten'][] = 'strafe_erstellen';

            $this->viewdata['liste']['strafe_zuweisen'] = HAUPTINSTANZEN['mitglieder'];
            // unset($this->viewdata['liste']['strafe_zuweisen']['filtern']);
            $this->viewdata['liste']['strafe_zuweisen']['werkzeugkasten'][] = 'strafe_erstellen';
            $this->viewdata['liste']['strafe_zuweisen']['klasse_id'] = array( 'btn_strafe_zuweisen', 'bestaetigung_einfordern' );

            $this->viewdata['werkzeugkasten'][] = 'strafe_zuweisen';
            $this->viewdata['werkzeugkasten'][] = 'strafe_aendern';
            $this->viewdata['werkzeugkasten'][] = 'strafe_duplizieren';
            $this->viewdata['werkzeugkasten'][] = 'strafe_loeschen';

        }

        $this->viewdata_bereinigen(); echo view( 'Strafkatalog/strafkatalog', $this->viewdata );
    }

    //------------------------------------------------------------------------------------------------------------------
    public function kassenbuch() {

        $this->viewdata['liste']['aktuelles_kassenbuch'] = HAUPTINSTANZEN['kassenbuch'];
        $this->viewdata['liste']['aktuelles_kassenbuch']['group-flush'] = TRUE;
        $this->viewdata['liste']['aktuelles_kassenbuch']['vorschau'] = array( 'erstellung', 'wert', 'mitglied' );

        if( auth()->user()->can( 'strafkatalog.verwaltung' ) ) {

            $this->viewdata['liste']['aktuelles_kassenbuch']['werkzeugkasten_handle'] = TRUE;
            $this->viewdata['liste']['aktuelles_kassenbuch']['werkzeugkasten'][] = 'kassenbucheintrag_erstellen';

            $this->viewdata['werkzeugkasten'][] = 'kassenbucheintrag_offen_erledigt_markieren';
            $this->viewdata['werkzeugkasten'][] = 'kassenbucheintrag_aendern';
            $this->viewdata['werkzeugkasten'][] = 'kassenbucheintrag_duplizieren';
            $this->viewdata['werkzeugkasten'][] = 'kassenbucheintrag_loeschen';

        }

        $this->viewdata_bereinigen(); echo view( 'Strafkatalog/kassenbuch', $this->viewdata );
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

    //------------------------------------------------------------------------------------------------------------------
    public function ajax_kassenbucheintrag_speichern() { $ajax_antwort[CSRF_NAME] = csrf_hash();
        $validation_rules = array(
            'ajax_id' => 'required|is_natural',
            'kassenbucheintrag_id' => [ 'label' => EIGENSCHAFTEN['kassenbuch']['id']['beschriftung'], 'rules' => [ 'if_exist', 'is_natural_no_zero' ] ],
            'titel' => [ 'label' => EIGENSCHAFTEN['kassenbuch']['titel']['beschriftung'], 'rules' => [ 'required' ] ],
            'wert' => [ 'label' => EIGENSCHAFTEN['kassenbuch']['wert']['beschriftung'], 'rules' => [ 'required', 'decimal' ] ],
            'mitglied_id' => [ 'label' => EIGENSCHAFTEN['kassenbuch']['mitglied_id']['beschriftung'], 'rules' => [ 'required', 'is_natural_no_zero' ] ],
            'erledigt' => [ 'label' => EIGENSCHAFTEN['kassenbuch']['erledigt']['beschriftung'], 'rules' => [ 'field_exists', 'valid_date', 'permit_empty' ] ],
            'bemerkung' => [ 'label' => EIGENSCHAFTEN['kassenbuch']['bemerkung']['beschriftung'], 'rules' => [ 'field_exists' ] ],
        );
        if( !$this->validate( $validation_rules ) ) $ajax_antwort['validation'] = $this->validation->getErrors();
        else if( !auth()->user()->can( 'strafkatalog.verwaltung' ) ) $ajax_antwort['validation'] = 'Keine Berechtigung!';
        else {
            $kassenbuch_Model = model(Kassenbucheintrag_Model::class);
            $kassenbucheintrag = array(
                'titel' => $this->request->getpost()['titel'],
                'wert' => $this->request->getPost()['wert'],
                'mitglied_id' => $this->request->getPost()['mitglied_id'],
            );
            if( array_key_exists( 'erledigt', $this->request->getpost() ) AND !empty( $this->request->getpost()['erledigt'] ) ) $kassenbucheintrag['erledigt'] = $this->request->getpost()['erledigt']; else $kassenbucheintrag['erledigt'] = NULL;
            if( array_key_exists( 'bemerkung', $this->request->getpost() ) AND !empty( $this->request->getpost()['bemerkung'] ) ) $kassenbucheintrag['bemerkung'] = $this->request->getpost()['bemerkung']; else $kassenbucheintrag['bemerkung'] = NULL;

            if( array_key_exists( 'kassenbucheintrag_id', $this->request->getPost() ) AND !empty( $this->request->getPost()['kassenbucheintrag_id'] ) ) $kassenbuch_Model->update( $this->request->getpost()['kassenbucheintrag_id'], $kassenbucheintrag );
            else {
                $kassenbuch_Model->save( $kassenbucheintrag );
                $ajax_antwort['kassenbucheintrag_id'] = (int)$kassenbuch_Model->getInsertID();
            }
        }

        $ajax_antwort['ajax_id'] = (int) $this->request->getPost()['ajax_id'];
        echo json_encode( $ajax_antwort, JSON_UNESCAPED_UNICODE );
    }

    public function ajax_kassenbucheintrag_loeschen() { $ajax_antwort[CSRF_NAME] = csrf_hash();
        $validation_rules = array(
            'ajax_id' => 'required|is_natural',
            'kassenbucheintrag_id' => [ 'label' => EIGENSCHAFTEN['kassenbuch']['id']['beschriftung'], 'rules' => [ 'required', 'is_natural_no_zero' ] ],
        ); if( !$this->validate( $validation_rules ) ) $ajax_antwort['validation'] = $this->validation->getErrors();
        else if( !auth()->user()->can( 'strafkatalog.verwaltung' ) ) $ajax_antwort['validation'] = 'Keine Berechtigung!';
        else model(Kassenbucheintrag_Model::class)->delete( $this->request->getPost()['kassenbucheintrag_id'] );
        
        $ajax_antwort['ajax_id'] = (int) $this->request->getPost()['ajax_id'];
        echo json_encode( $ajax_antwort, JSON_UNESCAPED_UNICODE );
    }

}
