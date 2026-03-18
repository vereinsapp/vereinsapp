<?php

namespace App\Controllers;
use App\Models\MitgliedModel;

use CodeIgniter\I18n\Time;

class Startseite extends BaseController {

    public function startseite() {

        $this->viewdata['liste']['anstehende_geburtstage'] = VIEWDATA['mitglieder'];
        $this->viewdata['liste']['anstehende_geburtstage']['filtern'] = array( 'geburtstag' => array( 'start' => Time::today( 'Europe/Berlin' )->toDateTimeString(), 'ende' => Time::today( 'Europe/Berlin' )->addDays(14)->subSeconds(1)->toDateTimeString(), ), 'real_janein' => array( 'inklusiv' => [ TRUE ] ), );
        $this->viewdata['liste']['anstehende_geburtstage']['sortieren'] = array( 'eigenschaft' => 'geburtstag', 'richtung' => SORT_ASC, );
        $this->viewdata['liste']['anstehende_geburtstage']['werkzeuge'] = array();
        $this->viewdata['liste']['anstehende_geburtstage']['listenstatistik'] = array();
        $this->viewdata['liste']['anstehende_geburtstage']['ueberschrift'] = 'Geburtstage in den nächsten 14 Tagen';
        $this->viewdata['liste']['anstehende_geburtstage']['element']['beschriftung'] = '<i class="bi bi-'.SYMBOLE['geburtstag']['bootstrap'].'"></i> '.VIEWDATA['mitglieder']['element']['beschriftung'];
        $this->viewdata['liste']['anstehende_geburtstage']['element']['link'] = array( 'liste' => 'mitglieder', 'eigenschaften' => array( 'id', ), );
        $this->viewdata['liste']['anstehende_geburtstage']['element']['vorschau'] = array( 'geburtstag', 'alter_geburtstag' );

        if( array_key_exists( LISTEN['termine']['controller'], CONTROLLERS ) ) {
            $this->viewdata['liste']['bevorstehende_termine_startseite'] = VIEWDATA['termine'];
            $this->viewdata['liste']['bevorstehende_termine_startseite']['filtern'] = array(
                'start' => array( 'start' => Time::today( 'Europe/Berlin' )->toDateTimeString(), 'ende' => Time::today( 'Europe/Berlin' )->addDays(14)->subSeconds(1)->toDateTimeString(), ),
                'ich_eingeladen_janein' => array( 'inklusiv' => array( TRUE ), ),
            );
            $this->viewdata['liste']['bevorstehende_termine_startseite']['werkzeuge'] = array();
            $this->viewdata['liste']['bevorstehende_termine_startseite']['listenstatistik'] = array();
            $this->viewdata['liste']['bevorstehende_termine_startseite']['ueberschrift'] = 'Termine in den nächsten 14 Tagen';
            $this->viewdata['liste']['bevorstehende_termine_startseite']['element']['link'] = array( 'liste' => 'termine', 'eigenschaften' => array( 'id', ), );
            $this->viewdata['liste']['bevorstehende_termine_startseite']['element']['beschriftung'] = '<i class="bi bi-'.SYMBOLE['termine']['bootstrap'].'"></i> '.VIEWDATA['termine']['element']['beschriftung'];
            $this->viewdata['liste']['bevorstehende_termine_startseite']['element']['vorschau'] = array( 'start', 'ort' );
        }

        if( array_key_exists( LISTEN['termine_rueckmeldungen']['controller'], CONTROLLERS ) ) {
            $this->viewdata['liste']['termine_ausstehende_rueckmeldung'] = VIEWDATA['termine'];
            $this->viewdata['liste']['termine_ausstehende_rueckmeldung']['mitglied_id'] = ICH_ID;
            $this->viewdata['liste']['termine_ausstehende_rueckmeldung']['filtern']['start'] = array( VERKNUEPFUNGEN['termine_rueckmeldungen']['verknuepfung_moeglich_frist']['eigenschaft'] => Time::now( 'Europe/Berlin' )->addSeconds( VERKNUEPFUNGEN['termine_rueckmeldungen']['verknuepfung_moeglich_frist']['frist'] )->toDateTimeString(), );
            $this->viewdata['liste']['termine_ausstehende_rueckmeldung']['filtern']['ich_rueckgemeldet_janein'] = array( 'inklusiv' => array( FALSE ), );
            $this->viewdata['liste']['termine_ausstehende_rueckmeldung']['werkzeuge'] = array();
            $this->viewdata['liste']['termine_ausstehende_rueckmeldung']['listenstatistik'] = array();
            $this->viewdata['liste']['termine_ausstehende_rueckmeldung']['ueberschrift'] = 'Termine ohne Rückmeldung';
            $this->viewdata['liste']['termine_ausstehende_rueckmeldung']['element']['beschriftung'] = '<i class="bi bi-'.SYMBOLE['termine']['bootstrap'].'"></i> '.VIEWDATA['termine']['element']['beschriftung'];
            $this->viewdata['liste']['termine_ausstehende_rueckmeldung']['element']['link'] = array( 'liste' => 'termine', 'eigenschaften' => array( 'id', ), );
            $this->viewdata['liste']['termine_ausstehende_rueckmeldung']['element']['vorschau'] = array( 'start', 'ort' );
            $this->viewdata['liste']['termine_ausstehende_rueckmeldung']['element']['verknuepfungen'] = 'termine_rueckmeldungen';
        }

        $this->viewdata_bereinigen(); echo view( 'Startseite/startseite', $this->viewdata );
    }

}
