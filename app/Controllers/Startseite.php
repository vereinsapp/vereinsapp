<?php

namespace App\Controllers;
use App\Models\MitgliedModel;

use CodeIgniter\I18n\Time;

class Startseite extends BaseController {

    public function startseite() {

        $this->viewdata['liste']['anstehende_geburtstage'] = HAUPTINSTANZEN['mitglieder'];
        unset( $this->viewdata['liste']['anstehende_geburtstage']['werkzeugkasten'] );
        unset( $this->viewdata['liste']['anstehende_geburtstage']['listenstatistik'] );
        unset( $this->viewdata['liste']['anstehende_geburtstage']['filtern'] );
        $this->viewdata['liste']['anstehende_geburtstage']['filtern'] = array( 'geburtstag' => array( 'start' => Time::today( 'Europe/Berlin' )->toDateTimeString(), 'ende' => Time::today( 'Europe/Berlin' )->addDays(14)->subSeconds(1)->toDateTimeString(), ), 'real_janein' => array( 'inklusiv' => [ TRUE ] ), );
        $this->viewdata['liste']['anstehende_geburtstage']['sortieren'] = array( 'eigenschaft' => 'geburtstag', 'richtung' => SORT_ASC, );
        $this->viewdata['liste']['anstehende_geburtstage']['link'] = TRUE;
        $this->viewdata['liste']['anstehende_geburtstage']['beschriftung'] = '<i class="bi bi-'.SYMBOLE['geburtstag']['bootstrap'].'"></i> '.HAUPTINSTANZEN['mitglieder']['beschriftung'];
        $this->viewdata['liste']['anstehende_geburtstage']['vorschau'] = array( 'geburtstag', 'alter_geburtstag' );

        if( array_key_exists( LISTEN['termine']['controller'], CONTROLLERS ) ) {
            $this->viewdata['liste']['bevorstehende_termine_startseite'] = HAUPTINSTANZEN['termine'];
            unset( $this->viewdata['liste']['bevorstehende_termine_startseite']['werkzeugkasten'] );
            unset( $this->viewdata['liste']['bevorstehende_termine_startseite']['listenstatistik'] );
            $this->viewdata['liste']['bevorstehende_termine_startseite']['filtern'] = array(
                'start' => array( 'start' => Time::today( 'Europe/Berlin' )->toDateTimeString(), 'ende' => Time::today( 'Europe/Berlin' )->addDays(14)->subSeconds(1)->toDateTimeString(), ),
                'ich_eingeladen_janein' => array( 'inklusiv' => array( TRUE ), ),
            );
            $this->viewdata['liste']['bevorstehende_termine_startseite']['link'] = TRUE;
            $this->viewdata['liste']['bevorstehende_termine_startseite']['beschriftung'] = '<i class="bi bi-'.SYMBOLE['termine']['bootstrap'].'"></i> '.HAUPTINSTANZEN['termine']['beschriftung'];
            $this->viewdata['liste']['bevorstehende_termine_startseite']['vorschau'] = array( 'start', 'ort' );
        }

        // if( array_key_exists( LISTEN['aufgaben']['controller'], CONTROLLERS ) ) {
        //     $this->viewdata['liste']['aufgaben_offen_startseite'] = HAUPTINSTANZEN['aufgaben'];
        //     unset( $this->viewdata['liste']['aufgaben_offen_startseite']['werkzeugkasten'] );
        //     unset( $this->viewdata['liste']['aufgaben_offen_startseite']['listenstatistik'] );
        //     $this->viewdata['liste']['aufgaben_offen_startseite']['filtern'] = array(
        //         'mitglied_id' => array( 'inklusiv' => array( ICH['id'] ), ),
        //         'erledigt_janein' => array( 'inklusiv' => array( FALSE ), ),
        //     );
        //     $this->viewdata['liste']['aufgaben_offen_startseite']['beschriftung'] = '<i class="bi bi-'.SYMBOLE['aufgaben']['bootstrap'].'"></i> '.HAUPTINSTANZEN['aufgaben']['beschriftung'];
        //     $this->viewdata['liste']['aufgaben_offen_startseite']['vorschau'] = array( 'zugeordnetes_element' );
        //     $this->viewdata['liste']['aufgaben_offen_startseite']['verknuepfungen'] = array(
        //         'verknuepfungen' => 'termine_rueckmeldungen',
        //         'liste' => 'mitglieder',
        //         'element_id' => ICH['id'],
        //         'gegen_liste' => 'termine',
        //         'auswahlmoeglichkeiten' => VERKNUEPFUNGEN['termine_rueckmeldungen']['auswahlmoeglichkeiten'],
        //         'view' => 'Termine/rueckmeldung_auswahlmoeglichkeiten',
        //     );
        // }

        if( array_key_exists( LISTEN['strafkatalog']['controller'], CONTROLLERS ) ) {
            $this->viewdata['liste']['kassenbuch_offene_eintraege_startseite'] = HAUPTINSTANZEN['kassenbuch'];
            unset( $this->viewdata['liste']['kassenbuch_offene_eintraege_startseite']['werkzeugkasten'] );
            unset( $this->viewdata['liste']['kassenbuch_offene_eintraege_startseite']['listenstatistik'] );
            unset( $this->viewdata['liste']['kassenbuch_offene_eintraege_startseite']['zusatzsymbol'] );
            $this->viewdata['liste']['kassenbuch_offene_eintraege_startseite']['filtern'] = array(
                'mitglied_id' => array( 'inklusiv' => array( ICH['id'] ), ),
                'erledigt_janein' => array( 'inklusiv' => array( FALSE ), ),
            );
            $this->viewdata['liste']['kassenbuch_offene_eintraege_startseite']['beschriftung'] = '<i class="bi bi-'.SYMBOLE['kassenbuch']['bootstrap'].'"></i> <span class="eigenschaft" data-eigenschaft="titel"></span>';
            $this->viewdata['liste']['kassenbuch_offene_eintraege_startseite']['vorschau'] = array( 'erstellung', 'wert' );
        }

        if( array_key_exists( LISTEN['termine_rueckmeldungen']['controller'], CONTROLLERS ) ) {
            $this->viewdata['liste']['termine_ausstehende_rueckmeldung'] = HAUPTINSTANZEN['termine'];
            unset( $this->viewdata['liste']['termine_ausstehende_rueckmeldung']['werkzeugkasten'] );
            unset( $this->viewdata['liste']['termine_ausstehende_rueckmeldung']['listenstatistik'] );
            $this->viewdata['liste']['termine_ausstehende_rueckmeldung']['filtern'] = array(
                'start' => array( VERKNUEPFUNGEN['aufgaben_rueckmeldungen']['verknuepfung_moeglich_frist']['eigenschaft'] => Time::now( 'Europe/Berlin' )->addSeconds( VERKNUEPFUNGEN['termine_rueckmeldungen']['verknuepfung_moeglich_frist']['frist'] )->toDateTimeString(), ),
                'ich_rueckgemeldet_janein' => array( 'inklusiv' => array( FALSE ), ),
                'ich_eingeladen_janein' => array( 'inklusiv' => array( TRUE ), ),
            );
            $this->viewdata['liste']['termine_ausstehende_rueckmeldung']['link'] = TRUE;
            $this->viewdata['liste']['termine_ausstehende_rueckmeldung']['beschriftung'] = '<i class="bi bi-'.SYMBOLE['termine']['bootstrap'].'"></i> '.HAUPTINSTANZEN['termine']['beschriftung'];
            $this->viewdata['liste']['termine_ausstehende_rueckmeldung']['vorschau'] = array( 'start', 'ort' );
            $this->viewdata['liste']['termine_ausstehende_rueckmeldung']['verknuepfungen'] = array(
                'verknuepfungen' => 'termine_rueckmeldungen',
                'liste' => 'mitglieder',
                'element_id' => ICH['id'],
                'gegen_liste' => 'termine',
                'auswahlmoeglichkeiten' => VERKNUEPFUNGEN['termine_rueckmeldungen']['auswahlmoeglichkeiten'],
                'view' => 'Termine/rueckmeldung_auswahlmoeglichkeiten',
            );
        }

        if( array_key_exists( 'liste', $this->viewdata ) ) foreach( $this->viewdata['liste'] as $id => $liste ) $this->viewdata['liste'][ $id ]['id'] = $id;
        echo view( 'Startseite/startseite', $this->viewdata );
    }

}
