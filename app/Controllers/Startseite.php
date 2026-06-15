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
        $this->viewdata['liste']['anstehende_geburtstage']['element']['link'] = array( 'liste' => 'mitglieder', 'eigenschaften' => array( 'id', ), );
        $this->viewdata['liste']['anstehende_geburtstage']['element']['vorschau'] = array( 'geburtstag', 'alter_geburtstag' );

        if( array_key_exists( 'termine', CONTROLLERS ) ) {
            $this->viewdata['liste']['bevorstehende_termine_startseite'] = VIEWDATA['termine'];
            $this->viewdata['liste']['bevorstehende_termine_startseite']['filtern'] = array(
                'start' => array( 'start' => Time::today( 'Europe/Berlin' )->toDateTimeString(), 'ende' => Time::today( 'Europe/Berlin' )->addDays(14)->subSeconds(1)->toDateTimeString(), ),
                'ich_eingeladen_janein' => array( 'inklusiv' => array( TRUE ), ),
            );
            $this->viewdata['liste']['bevorstehende_termine_startseite']['werkzeuge'] = array();
            $this->viewdata['liste']['bevorstehende_termine_startseite']['listenstatistik'] = array();
            $this->viewdata['liste']['bevorstehende_termine_startseite']['ueberschrift'] = 'Termine in den nächsten 14 Tagen';
            $this->viewdata['liste']['bevorstehende_termine_startseite']['element']['link'] = array( 'liste' => 'termine', 'eigenschaften' => array( 'id', ), );
            $this->viewdata['liste']['bevorstehende_termine_startseite']['element']['vorschau'] = TERMINE_EIGENSCHAFTEN_VORSCHAU;
        }

        if( array_key_exists( VERKNUEPFUNGEN['termine_rueckmeldungen']['controller'], CONTROLLERS ) ) {
            $this->viewdata['liste']['termine_ausstehende_rueckmeldung'] = VIEWDATA['termine'];
            $this->viewdata['liste']['termine_ausstehende_rueckmeldung']['mitglied_id'] = ICH_ID;
            $this->viewdata['liste']['termine_ausstehende_rueckmeldung']['filtern']['start'] = array( 'start' => Time::now( 'Europe/Berlin' )->addSeconds( TERMINE_RUECKMELDUNGEN_FRIST )->toDateTimeString(), );
            $this->viewdata['liste']['termine_ausstehende_rueckmeldung']['filtern']['ich_rueckgemeldet_janein'] = array( 'inklusiv' => array( FALSE ), );
            $this->viewdata['liste']['termine_ausstehende_rueckmeldung']['werkzeuge'] = array();
            $this->viewdata['liste']['termine_ausstehende_rueckmeldung']['listenstatistik'] = array();
            $this->viewdata['liste']['termine_ausstehende_rueckmeldung']['ueberschrift'] = 'Termine ohne Rückmeldung';
            $this->viewdata['liste']['termine_ausstehende_rueckmeldung']['element']['link'] = array( 'liste' => 'termine', 'eigenschaften' => array( 'id', ), );
            $this->viewdata['liste']['termine_ausstehende_rueckmeldung']['element']['vorschau'] = TERMINE_EIGENSCHAFTEN_VORSCHAU;
            $this->viewdata['liste']['termine_ausstehende_rueckmeldung']['element']['verknuepfungen'] = array( 'verknuepfungen' => 'termine_rueckmeldungen', 'verknuepfung_erstellen' => TRUE, );
        }

        $this->viewdata_bereinigen(); echo view( 'Startseite/startseite', $this->viewdata );
    }

}
