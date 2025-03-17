<?php

namespace App\Controllers;
use App\Models\MitgliedModel;

use CodeIgniter\I18n\Time;

class Startseite extends BaseController {

    public function startseite() {

        $this->viewdata['liste']['anstehende_geburtstage'] = HAUPTINSTANZEN['mitglieder'];
        unset($this->viewdata['liste']['anstehende_geburtstage']['werkzeugkasten']);
        unset($this->viewdata['liste']['anstehende_geburtstage']['listenstatistik']);
        $this->viewdata['liste']['anstehende_geburtstage']['filtern'] = array( 'geburtstag' => array( 'start' => Time::today( 'Europe/Berlin' )->toDateTimeString(), 'ende' => Time::today( 'Europe/Berlin' )->addDays(14)->subSecond()->toDateTimeString(), ), );
        $this->viewdata['liste']['anstehende_geburtstage']['sortieren'] = array( 'eigenschaft' => 'geburtstag', 'richtung' => SORT_ASC, );
        $this->viewdata['liste']['anstehende_geburtstage']['link'] = TRUE;
        $this->viewdata['liste']['anstehende_geburtstage']['beschriftung'] = '<i class="bi bi-'.SYMBOLE['geburtstag']['bootstrap'].' me-2"></i> '.HAUPTINSTANZEN['mitglieder']['beschriftung'];
        $this->viewdata['liste']['anstehende_geburtstage']['vorschau'] = array( 'geburtstag', 'alter_geburtstag' );

        if( array_key_exists( LISTEN['termine']['controller'], CONTROLLERS ) ) {
            $this->viewdata['liste']['bevorstehende_termine_startseite'] = HAUPTINSTANZEN['termine'];
            unset($this->viewdata['liste']['bevorstehende_termine_startseite']['werkzeugkasten']);
            unset($this->viewdata['liste']['bevorstehende_termine_startseite']['listenstatistik']);
            $this->viewdata['liste']['bevorstehende_termine_startseite']['filtern'] = array(
                'start' => array( 'start' => Time::today( 'Europe/Berlin' )->toDateTimeString(), 'ende' => Time::today( 'Europe/Berlin' )->addDays(14)->subSecond()->toDateTimeString(), ),
                'ich_eingeladen' => array( 'inklusiv' => array( TRUE ), ),
            );
            $this->viewdata['liste']['bevorstehende_termine_startseite']['link'] = TRUE;
            $this->viewdata['liste']['bevorstehende_termine_startseite']['beschriftung'] = '<i class="bi bi-'.SYMBOLE['termine']['bootstrap'].'"></i> '.HAUPTINSTANZEN['termine']['beschriftung'];
            $this->viewdata['liste']['bevorstehende_termine_startseite']['vorschau'] = array( 'start', 'ort' );
        }

        if( array_key_exists( LISTEN['aufgaben']['controller'], CONTROLLERS ) ) {
            $this->viewdata['liste']['aufgaben_offen_startseite'] = HAUPTINSTANZEN['aufgaben'];
            unset($this->viewdata['liste']['aufgaben_offen_startseite']['werkzeugkasten']);
            unset($this->viewdata['liste']['aufgaben_offen_startseite']['listenstatistik']);
            $this->viewdata['liste']['aufgaben_offen_startseite']['filtern'] = array(
                'mitglied_id' => array( 'inklusiv' => array( ICH['id'] ), ),
                'erledigt_janein' => array( 'inklusiv' => array( FALSE ), ),
            );
            $this->viewdata['liste']['aufgaben_offen_startseite']['beschriftung'] = '<i class="bi bi-'.SYMBOLE['aufgaben']['bootstrap'].'"></i> '.HAUPTINSTANZEN['aufgaben']['beschriftung'];
            $this->viewdata['liste']['aufgaben_offen_startseite']['vorschau'] = array( 'zugeordnetes_element' );
            $this->viewdata['liste']['aufgaben_offen_startseite']['views'] = array( array( 'view' => 'Aufgaben/eingeplantes_mitglied' ), );
        }

        if( array_key_exists( LISTEN['rueckmeldungen']['controller'], CONTROLLERS ) ) {
            $this->viewdata['liste']['termine_ausstehende_rueckmeldung'] = HAUPTINSTANZEN['termine'];
            unset($this->viewdata['liste']['termine_ausstehende_rueckmeldung']['werkzeugkasten']);
            unset($this->viewdata['liste']['termine_ausstehende_rueckmeldung']['listenstatistik']);
            $this->viewdata['liste']['termine_ausstehende_rueckmeldung']['filtern'] = array(
                'start' => array( 'start' => Time::now( 'Europe/Berlin' )->addSeconds(TERMINE_RUECKMELDUNG_FRIST)->subSecond()->toDateTimeString(), ),
                'ich_rueckgemeldet' => array( 'inklusiv' => array( FALSE ), ),
                'ich_eingeladen' => array( 'inklusiv' => array( TRUE ), ),
            );
            $this->viewdata['liste']['termine_ausstehende_rueckmeldung']['link'] = TRUE;
            $this->viewdata['liste']['termine_ausstehende_rueckmeldung']['beschriftung'] = '<i class="bi bi-'.SYMBOLE['termine']['bootstrap'].'"></i> '.HAUPTINSTANZEN['termine']['beschriftung'];
            $this->viewdata['liste']['termine_ausstehende_rueckmeldung']['vorschau'] = array( 'start', 'ort' );
            $this->viewdata['liste']['termine_ausstehende_rueckmeldung']['views'] = array( array( 'view' => 'Termine/rueckmeldung_basiseigenschaften', 'data' => array( 'mitglied_id' => ICH['id'] ) ) );
        }

        if( array_key_exists( 'liste', $this->viewdata ) ) foreach( $this->viewdata['liste'] as $id => $liste ) $this->viewdata['liste'][ $id ]['id'] = $id;
        echo view( 'Startseite/startseite', $this->viewdata );
    }

}
