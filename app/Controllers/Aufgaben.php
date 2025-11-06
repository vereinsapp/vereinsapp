<?php

namespace App\Controllers;
use App\Models\Aufgaben\Aufgabe_Model;

class Aufgaben extends BaseController {

    public function ajax_aufgabe_speichern() { $ajax_antwort[CSRF_NAME] = csrf_hash();
        $validation_rules = array(
            'ajax_id' => 'required|is_natural',
            'id' => [ 'label' => 'ID', 'rules' => [ 'if_exist', 'is_natural_no_zero' ] ],
            'zugeordnete_liste' => [ 'label' => EIGENSCHAFTEN['aufgaben']['zugeordnete_liste']['beschriftung'], 'rules' => [ 'required_with[zugeordnete_element_id]', 'if_exist', 'in_list['.implode( ', ', array_keys( VORGEGEBENE_WERTE['aufgaben']['zugeordnete_liste'] ) ).']', 'permit_empty' ] ],
            'zugeordnete_element_id' => [ 'label' => EIGENSCHAFTEN['aufgaben']['zugeordnete_element_id']['beschriftung'], 'rules' => [ 'required_with[zugeordnete_liste]', 'if_exist', 'is_natural_no_zero', 'permit_empty' ] ],
            'titel' => [ 'label' => EIGENSCHAFTEN['aufgaben']['titel']['beschriftung'], 'rules' => [ 'required' ] ],
            'mitglied_id' => [ 'label' => EIGENSCHAFTEN['aufgaben']['mitglied_id']['beschriftung'], 'rules' => [ 'if_exist', 'is_natural_no_zero', 'permit_empty' ] ],
            'erledigt' => [ 'label' => EIGENSCHAFTEN['aufgaben']['erledigt']['beschriftung'], 'rules' => [ 'if_exist', 'valid_date', 'permit_empty' ] ],
            'bemerkung' => [ 'label' => EIGENSCHAFTEN['aufgaben']['bemerkung']['beschriftung'], 'rules' => [ 'field_exists' ] ],
        );
        if( !$this->validate( $validation_rules ) ) $ajax_antwort['validation'] = $this->validation->getErrors();
        // Die Aufgabe darf nicht erstellt oder geändert werden, wenn das Recht zur Verwaltung der Aufgaben nicht vergeben ist
        else if( !auth()->user()->can( 'aufgaben.verwaltung' )
        // und man die Aufgabe sich nicht zuweisen will bzw. sich nicht mehr zuweisen will
            AND  !( array_key_exists( 'id', $this->request->getpost() ) AND array_key_exists( 'mitglied_id', $this->request->getpost() )
                AND (  ( $this->request->getpost()['mitglied_id'] == ICH['id']  AND model(Aufgabe_Model::class)->find( $this->request->getpost()['id'] )['mitglied_id'] === NULL )
                    OR ( $this->request->getpost()['mitglied_id'] == ''         AND model(Aufgabe_Model::class)->find( $this->request->getpost()['id'] )['mitglied_id'] == ICH['id'] ) ) )
        // und man die Aufgabe nicht als erledigt markieren will
            AND  !( array_key_exists( 'id', $this->request->getpost() ) AND array_key_exists( 'erledigt', $this->request->getpost() )
                AND model(Aufgabe_Model::class)->find( $this->request->getpost()['id'] )['mitglied_id'] == ICH['id'] )
            ) $ajax_antwort['validation'] = 'Keine Berechtigung!';
        // Das zugewiesene Mitglied darf nicht verändert werden, wenn die Aufgabe als erledigt markiert ist
        else if( array_key_exists( 'id', $this->request->getpost() ) AND array_key_exists( 'mitglied_id', $this->request->getpost() )
        AND model(Aufgabe_Model::class)->find( $this->request->getpost()['id'] )['mitglied_id'] !== $this->request->getpost()['mitglied_id']
        AND model(Aufgabe_Model::class)->find( $this->request->getpost()['id'] )['erledigt'] !== NULL ) $ajax_antwort['validation'] = 'Das eingeplante Mitglied darf nicht verändert werden, wenn die Aufgabe als erledigt markiert ist';
        // Die Aufgabe darf nicht als offen oder erledigt markiert werden, wenn der Aufgabe kein Mitglied zugeordnet ist
        else if( array_key_exists( 'id', $this->request->getpost() ) AND array_key_exists( 'erledigt', $this->request->getpost() )
        AND model(Aufgabe_Model::class)->find( $this->request->getpost()['id'] )['erledigt'] !== $this->request->getpost()['erledigt']
        AND model(Aufgabe_Model::class)->find( $this->request->getpost()['id'] )['mitglied_id'] === NULL ) $ajax_antwort['validation'] = 'Die Aufgabe darf nicht als offen oder erledigt markiert werden, wenn für die Aufgabe kein Mitglied eingeplant ist!';
        else {
            $aufgaben_Model = model(Aufgabe_Model::class);
            $aufgabe = array(
                'titel' => $this->request->getpost()['titel'],
            );
            if( array_key_exists( 'zugeordnete_liste', $this->request->getpost() ) ) { if( !empty( $this->request->getpost()['zugeordnete_liste'] ) ) $aufgabe['zugeordnete_liste'] = $this->request->getpost()['zugeordnete_liste']; else $aufgabe['zugeordnete_liste'] = NULL; }
            if( array_key_exists( 'zugeordnete_element_id', $this->request->getpost() ) ) { if( !empty( $this->request->getpost()['zugeordnete_element_id'] ) ) $aufgabe['zugeordnete_element_id'] = $this->request->getpost()['zugeordnete_element_id']; else $aufgabe['zugeordnete_element_id'] = NULL; }
            if( array_key_exists( 'mitglied_id', $this->request->getpost() ) ) { if( !empty( $this->request->getpost()['mitglied_id'] ) ) $aufgabe['mitglied_id'] = $this->request->getpost()['mitglied_id']; else $aufgabe['mitglied_id'] = NULL; }
            if( array_key_exists( 'erledigt', $this->request->getpost() ) ) { if( !empty( $this->request->getpost()['erledigt'] ) ) $aufgabe['erledigt'] = $this->request->getpost()['erledigt']; else $aufgabe['erledigt'] = NULL; }
            if( array_key_exists( 'bemerkung', $this->request->getpost() ) AND !empty( $this->request->getpost()['bemerkung'] ) ) $aufgabe['bemerkung'] = $this->request->getpost()['bemerkung']; else $aufgabe['bemerkung'] = NULL;

            if( array_key_exists( 'id', $this->request->getPost() ) AND !empty( $this->request->getPost()['id'] ) ) $aufgaben_Model->update( $this->request->getpost()['id'], $aufgabe );
            else {
                $aufgaben_Model->save( $aufgabe );
                $ajax_antwort['aufgabe_id'] = (int)$aufgaben_Model->getInsertID();
            }
        }

        $ajax_antwort['ajax_id'] = (int) $this->request->getPost()['ajax_id'];
        echo json_encode( $ajax_antwort, JSON_UNESCAPED_UNICODE );
    }

    public function ajax_aufgabe_loeschen() { $ajax_antwort[CSRF_NAME] = csrf_hash();
        $validation_rules = array(
            'ajax_id' => 'required|is_natural',
            'id' => [ 'label' => 'ID', 'rules' => [ 'required', 'is_natural_no_zero' ] ],
        ); if( !$this->validate( $validation_rules ) ) $ajax_antwort['validation'] = $this->validation->getErrors();
        else if( !auth()->user()->can( 'aufgaben.verwaltung' ) ) $ajax_antwort['validation'] = 'Keine Berechtigung!';
        else model(Aufgabe_Model::class)->delete( $this->request->getPost()['id'] );
        
        $ajax_antwort['ajax_id'] = (int) $this->request->getPost()['ajax_id'];
        echo json_encode( $ajax_antwort, JSON_UNESCAPED_UNICODE );
    }

}
