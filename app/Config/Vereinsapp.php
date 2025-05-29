<?php

namespace Config;

use CodeIgniter\Config\BaseConfig;
use CodeIgniter\I18n\Time;
defined('HEUTE') OR define( 'HEUTE', Time::today( 'Europe/Berlin' )->toDateTimeString() );
defined('JAHRESBEGINN') OR define( 'JAHRESBEGINN', Time::today( 'Europe/Berlin' )->setMonth(1)->setDay(1)->setHour(0)->setMinute(0)->setSecond(0)->toDateTimeString() );

class Vereinsapp extends BaseConfig
{
    /**
     * --------------------------------------------------------------------------
     * Lies Mich!
     * --------------------------------------------------------------------------
     *
     * Diese Datei kann nach Wünschen angepasst werden.
     * Alternativ kann eine neue Config-Datei 'Vereinsapp_env.php'
     * als Kopie erstellt werden, welche dann ausschließlich die
     * Eigenschaften enthält, die verändert werden sollen.
     */

    /**
     * --------------------------------------------------------------------------
     * Wartungsarbeiten
     * --------------------------------------------------------------------------
     *
     * Wenn ein Hinweis auf Wartungsarbeiten eingeblendet werden soll, dann
     * kann ich auf TRUE gesetzt werden
     */
    public $wartungsarbeiten = FALSE;

    /**
     * --------------------------------------------------------------------------
     * Angaben zum Verein, der die Vereinsapp nutzt
     * --------------------------------------------------------------------------
     *
     * Der offizielle Name des Vereins
     */
    public $verein_name = 'Eingetragener Verein e.V.';

    /**
     * Die Homepage des Vereins
     */
    public $verein_domain = 'https://eingetragener-verein.de';

    /**
     * Der Name der Vereinsapp innerhalb des Vereins
     * (sollte grammatikalisch weiblich sein)
     */
    public $vereinsapp_name = 'Eingetragener Verein e.V. Vereinsapp';

    /**
     * Das Logo der Vereinsapp 
     */
    public $vereinsapp_logo = 'images/title.png';

    /**
     * --------------------------------------------------------------------------
     * Module (Controller)
     * --------------------------------------------------------------------------
     *
     * Aktive Module (Controller) inkl. Beschriftung und Symbol
     */
    public $controllers = array(
        'einstellungen' => array ( 'beschriftung' => 'Einstellungen', 'symbol' => SYMBOLE['einstellungen']['bootstrap'] ),
        'mitglieder' => array ( 'beschriftung' => 'Mitglieder', 'symbol' => SYMBOLE['mitglieder']['bootstrap'] ),
        'aufgaben' => array ( 'beschriftung' => 'Aufgaben', 'symbol' => SYMBOLE['aufgaben']['bootstrap'] ),
        'termine' => array ( 'beschriftung' => 'Termine', 'symbol' => SYMBOLE['termine']['bootstrap'] ),
        'strafkatalog' => array ( 'beschriftung' => 'Strafkatalog', 'symbol' => SYMBOLE['strafkatalog']['bootstrap'] ),
        'notenbank' => array ( 'beschriftung' => 'Notenbank', 'symbol' => SYMBOLE['notenbank']['bootstrap'] ),
        'startseite' => array ( 'beschriftung' => 'Willkommen', 'symbol' => SYMBOLE['startseite']['bootstrap'] ),
        'status' => array ( 'beschriftung' => 'Status', 'symbol' => SYMBOLE['einstellungen']['bootstrap'] ),
        'loginController' => array ( 'beschriftung' => 'Login', 'symbol' => SYMBOLE['einstellungen']['bootstrap'] ),
        'actionController' => array ( 'beschriftung' => 'Login-Action', 'symbol' => SYMBOLE['einstellungen']['bootstrap'] ),        
        'magicLinkController' => array ( 'beschriftung' => 'Einmal-Link', 'symbol' => SYMBOLE['einstellungen']['bootstrap'] ),        
    );

    /**
     * Einträge im Menü
     */
    public $menue = array(
        array( 'typ' => 'controller', 'data' => 'termine' ),
        array( 'typ' => 'controller', 'data' => 'strafkatalog' ),
        array( 'typ' => 'controller', 'data' => 'notenbank' ),
        array( 'typ' => 'controller', 'data' => 'mitglieder' ),
        array( 'typ' => 'controller', 'data' => 'einstellungen' ),
        array( 'typ' => 'intern', 'data' => array( 'url' => 'logout', 'beschriftung' => 'Abmelden', 'symbol' => SYMBOLE['logout']['bootstrap'] ) ),
    );

    /**
     * --------------------------------------------------------------------------
     * Hauptinstanzen
     * --------------------------------------------------------------------------
     */
    public $hauptinstanzen = array(

        'mitglieder' => array(
            'liste' => 'mitglieder',
            'filtern' => array( 'aktiv_janein' => array( 'inklusiv' => array( TRUE ), ), 'real_janein' => array( 'inklusiv' => array( TRUE ), ) ),
            'sortieren' => array( 'eigenschaft' => 'nachname', 'richtung' => SORT_ASC, ),
            // 'group-flush' => TRUE,
            // 'sortable' => TRUE,
            // 'link' => TRUE,
            // 'klasse_id' => array('btn_', 'bestaetigung_einfordern'),
            // 'title' => 'Titel für bspw. ein Modal',
            'beschriftung' => '<span class="eigenschaft" data-eigenschaft="vorname"></span> <span class="eigenschaft" data-eigenschaft="nachname"></span>',
            // 'vorschau' => array( 'register', 'geburtstag', 'alter', 'wohnort', 'auto', 'funktion' ),
            // 'views' => view( 'Termine/rueckmeldung_basiseigenschaften', array( 'mitglied_id' => ICH['id'] ) ),
            'zusatzsymbol' => array('geburtstag'),
            // 'checkliste' => 'vergebene_rechte',
            // 'gegen_liste' => 'termine',
            // 'gegen_element_id' => 42,
            // 'disabled' => array( 'liste' => 'liste','filtern' => array( 'id' => array( 'inklusiv' => $disabled_ids, ), ), ),
            // 'bedingte_formatierung' => array( 'liste' => 'liste', 'klasse' => array(
            //     'text-success' => array( 'status' => array( 'inklusiv' => array( 1 ), ), ),
            //     'text-danger' => array( 'status' => array( 'inklusiv' => array( 2 ), ), ),
            // ), ),
            // 'zugeordnet_zu_instanz' => 'bevorstehende_termine',
            'werkzeugkasten' => array(
                'filtern' => array( 'klasse_id' => array('btn_filtern_modal_oeffnen', 'filtern_localstorage_speichern'), 'title' => 'Mitglieder filtern', ),
                'sortieren' => array( 'klasse_id' => array('btn_sortieren_modal_oeffnen', 'sortieren_localstorage_speichern'), 'title' => 'Mitglieder sortieren', ),
            ),
            'listenstatistik' => array(),
        ),

        'verfuegbare_rechte' => array(
            'liste' => 'verfuegbare_rechte',
            'filtern' => array(),
            'sortieren' => array(),
            'beschriftung' => '<span class="eigenschaft" data-eigenschaft="titel"></span>',
            // 'werkzeugkasten' => array(
            //     'filtern' => array( 'klasse_id' => array('btn_filtern_modal_oeffnen', 'filtern_localstorage_speichern'), 'title' => 'Verfügbare Rechte filtern', ),
            //     'sortieren' => array( 'klasse_id' => array('btn_sortieren_modal_oeffnen', 'sortieren_localstorage_speichern'), 'title' => 'Verfügbare Rechte sortieren', ),
            // ),
            // 'listenstatistik' => array(),
        ),

        'vergebene_rechte' => array(
            'liste' => 'vergebene_rechte',
            'filtern' => array(),
            'sortieren' => array(),
        ),

        'aufgaben' => array(
            'liste' => 'aufgaben',
            'filtern' => array(),
            'sortieren' => array( 'eigenschaft' => 'titel', 'richtung' => SORT_ASC, ),
            'beschriftung' => '<span class="eigenschaft" data-eigenschaft="titel"></span>',
            'werkzeugkasten' => array(
                'filtern' => array( 'klasse_id' => array('btn_filtern_modal_oeffnen', 'filtern_localstorage_speichern'), 'title' => 'Aufgaben filtern', ),
                'sortieren' => array( 'klasse_id' => array('btn_sortieren_modal_oeffnen', 'sortieren_localstorage_speichern'), 'title' => 'Aufgaben sortieren', ),
            ),
            'listenstatistik' => array(),
        ),

        'termine' => array(
            'liste' => 'termine',
            'filtern' => array( 'start' => array( 'start' => HEUTE ), 'ich_eingeladen_janein' => array( 'inklusiv' => [ TRUE ] ), ),
            'sortieren' => array( 'eigenschaft'=> 'start', 'richtung'=> SORT_ASC, ),
            'beschriftung' => '<span class="eigenschaft" data-eigenschaft="titel"></span>',
            'zusatzsymbol' => array('kategorie'),
            'werkzeugkasten' => array(
                'filtern' => array( 'klasse_id' => array('btn_filtern_modal_oeffnen', 'filtern_localstorage_speichern'), 'title' => 'Termine filtern', ),
                'sortieren' => array( 'klasse_id' => array('btn_sortieren_modal_oeffnen', 'sortieren_localstorage_speichern'), 'title' => 'Termine sortieren', ),
            ),
            'listenstatistik' => array(),
        ),

        'rueckmeldungen' => array(
            'liste' => 'rueckmeldungen',
            'filtern' => array(),
            'sortieren' => array(),
        ),

        'anwesenheiten' => array(
            'liste' => 'anwesenheiten',
            'filtern' => array(),
            'sortieren' => array(),
        ),

        'strafkatalog' => array(
            'liste' => 'strafkatalog',
            'filtern' => array(),
            'sortieren' => array( 'eigenschaft' => 'kategorie', 'richtung' => SORT_ASC, ),
            'beschriftung' => '<span class="eigenschaft" data-eigenschaft="titel"></span>',
            'werkzeugkasten' => array(
                'filtern' => array( 'klasse_id' => array('btn_filtern_modal_oeffnen', 'filtern_localstorage_speichern'), 'title' => 'Strafkatalog filtern', ),
                'sortieren' => array( 'klasse_id' => array('btn_sortieren_modal_oeffnen', 'sortieren_localstorage_speichern'), 'title' => 'Strafkatalog sortieren', ),
            ),
            'listenstatistik' => array(),
        ),

        'kassenbuch' => array(
            'liste' => 'kassenbuch',
            'filtern' => array(),
            'sortieren' => array( 'eigenschaft' => 'erstellung', 'richtung' => SORT_DESC, ),
            'beschriftung' => '<span class="eigenschaft" data-eigenschaft="titel"></span>',
            'zusatzsymbol' => array('offen_erledigt'),
            'bedingte_formatierung' => array( 'eigenschaft' => 'wert', 'klasse' => array( 'text-danger' => array( 'wert' => array( 'ende' =>  0, ), ), ), ),
            'werkzeugkasten' => array(
                'filtern' => array( 'klasse_id' => array('btn_filtern_modal_oeffnen', 'filtern_localstorage_speichern'), 'title' => 'Kassenbuch filtern', ),
                'sortieren' => array( 'klasse_id' => array('btn_sortieren_modal_oeffnen', 'sortieren_localstorage_speichern'), 'title' => 'Kassenbuch sortieren', ),
            ),
            'listenstatistik' => array( 'summe' => 'wert', ),
        ),

        'notenbank' => array(
            'liste' => 'notenbank',
            'filtern' => array(),
            'sortieren' => array( 'eigenschaft' => 'titel_nr', 'richtung' => SORT_ASC, ),
            'beschriftung' => '<span class="eigenschaft" data-eigenschaft="titel_nr"></span> <span class="eigenschaft" data-eigenschaft="titel"></span>',
            'werkzeugkasten' => array(
                'filtern' => array( 'klasse_id' => array('btn_filtern_modal_oeffnen', 'filtern_localstorage_speichern'), 'title' => 'Notenbank filtern', ),
                'sortieren' => array( 'klasse_id' => array('btn_sortieren_modal_oeffnen', 'sortieren_localstorage_speichern'), 'title' => 'Notenbank sortieren', ),
            ),
            'listenstatistik' => array(),
        ),

    );

    /**
     * --------------------------------------------------------------------------
     * Eigenschaften
     * --------------------------------------------------------------------------
     *
     * Die Indices dürfen nicht verändert werden!
     * Es sollte lediglich die Beschriftung verändert werden.
     */
    public $eigenschaften = array(

        'mitglieder' => array(
            'id' => array( 'beschriftung' => 'ID', 'typ' => 'element_id' ),
            'email' => array( 'beschriftung' => 'Email', 'typ' => 'text' ), // PHP
            'vorname' => array( 'beschriftung' => 'Vorname', 'typ' => 'text' ),
            'nachname' => array( 'beschriftung' => 'Nachname', 'typ' => 'text' ),
            'geburt' => array( 'beschriftung' => 'Geboren am', 'typ' => 'zeitpunkt' ),
            'geburtstag' => array( 'beschriftung' => 'Geburtstag', 'typ' => 'zeitpunkt' ),      // JAVA
            'alter' => array( 'beschriftung' => 'Alter', 'typ' => 'zahl' ),                     // JAVA
            'alter_geburtstag' => array( 'beschriftung' => 'Nächstes Alter', 'typ' => 'zahl' ), // JAVA
            'postleitzahl' => array( 'beschriftung' => 'PLZ', 'typ' => 'text' ),
            'wohnort' => array( 'beschriftung' => 'Wohnort', 'typ' => 'text' ),
            'geschlecht' => array( 'beschriftung' => 'Geschlecht', 'typ' => 'vorgegebene_werte' ),
            'register' => array( 'beschriftung' => 'Instrument', 'typ' => 'vorgegebene_werte' ),
            'auto' => array( 'beschriftung' => 'Auto', 'typ' => 'vorgegebene_werte' ),
            'funktion' => array( 'beschriftung' => 'Funktion', 'typ' => 'vorgegebene_werte' ),
            'vorstandschaft_janein' => array( 'beschriftung' => 'Vorstandschaft', 'typ' => 'janein' ),
            'aktiv_janein' => array( 'beschriftung' => 'Aktiv', 'typ' => 'janein' ),
            'real_janein' => array( 'beschriftung' => 'Real', 'typ' => 'janein' ),
            'erstellung' => array( 'beschriftung' => 'Erstellung', 'typ' => 'zeitpunkt' ),                  // PHP
            'letzte_aktivitaet' => array( 'beschriftung' => 'Letzte Aktivität', 'typ' => 'zeitpunkt' ),     // PHP
            'passwort_alt' => array( 'beschriftung' => 'Altes Passwort', 'typ' => 'text' ),                 // PHP
            'passwort_neu' => array( 'beschriftung' => 'Neues Passwort', 'typ' => 'text' ),                 // PHP
            'passwort_neu2' => array( 'beschriftung' => 'Neues Passwort (Wiederholung)', 'typ' => 'text' ), // PHP
        ),

        'verfuegbare_rechte' => array(
            'id' => array( 'beschriftung' => 'ID', 'typ' => 'element_id' ),         // PHP
            'permission' => array( 'beschriftung' => 'Recht', 'typ' => 'text' ),    // PHP
            'titel' => array( 'beschriftung' => 'Titel', 'typ' => 'text' ),         // PHP
        ),

        'vergebene_rechte' => array(
            'id' => array( 'beschriftung' => 'ID', 'typ' => 'element_id' ),                                         // PHP
            'mitglied_id' => array( 'beschriftung' => 'Mitglied-ID', 'typ' => 'element_id' ),                       // PHP
            'verfuegbares_recht_id' => array( 'beschriftung' => 'Verfuegbares-Recht-ID', 'typ' => 'element_id' ),   // PHP
        ),

        'aufgaben' => array(
            'id' => array( 'beschriftung' => 'ID', 'typ' => 'element_id' ),
            'zugeordnete_liste' => array( 'beschriftung' => 'Zugeordnete Liste', 'typ' => 'vorgegebene_werte' ),
            'zugeordnete_element_id' => array( 'beschriftung' => 'Zugeordnete Element-ID', 'typ' => 'element_id' ),
            'zugeordnetes_element' => array( 'beschriftung' => 'Zugeordnetes Element', 'typ' => 'text' ),   // JAVA
            'titel' => array( 'beschriftung' => 'Titel', 'typ' => 'text' ),
            'mitglied_id' => array( 'beschriftung' => 'Mitglied-ID', 'typ' => 'element_id' ),
            'erledigt' => array( 'beschriftung' => 'Erledigung', 'typ' => 'zeitpunkt' ),
            'erledigt_janein' => array( 'beschriftung' => 'Erledigt', 'typ' => 'janein' ),                  // JAVA
            'bemerkung' => array( 'beschriftung' => 'Bemerkung', 'typ' => 'text' ),
            'erstellung' => array( 'beschriftung' => 'Erstellung', 'typ' => 'zeitpunkt' ),                  // PHP
        ),

        'termine' => array(
            'id' => array( 'beschriftung' => 'ID', 'typ' => 'element_id' ),
            'titel' => array( 'beschriftung' => 'Titel', 'typ' => 'text' ),
            'start' => array( 'beschriftung' => 'Beginn', 'typ' => 'zeitpunkt' ),
            'ende' => array( 'beschriftung' => 'Ende', 'typ' => 'zeitpunkt' ),
            'ort' => array( 'beschriftung' => 'Ort', 'typ' => 'text' ),
            'kategorie' => array( 'beschriftung' => 'Typ', 'typ' => 'vorgegebene_werte' ),
            'filtern_mitglieder' => array( 'beschriftung' => 'Personenkreis beschränken', 'typ' => 'text' ),
            'oeffentlich_janein' => array( 'beschriftung' => 'Öffentlich', 'typ' => 'janein' ),
            'bemerkung' => array( 'beschriftung' => 'Bemerkung', 'typ' => 'text' ),
            'ich_rueckgemeldet_janein' => array( 'beschriftung' => 'Ich habe Rückmeldung gegeben', 'typ' => 'janein' ), // JAVA
            'ich_rueckmeldung_id' => array( 'beschriftung' => 'Meine RÜckmeldung-ID', 'typ' => 'element_id' ),          // JAVA
            'ich_eingeladen_janein' => array( 'beschriftung' => 'Ich bin eingeladen', 'typ' => 'janein' ),              // JAVA
        ),

        'rueckmeldungen' => array(
            'id' => array( 'beschriftung' => 'ID', 'typ' => 'element_id' ),
            'termin_id' => array( 'beschriftung' => 'Termin-ID', 'typ' => 'element_id' ),
            'mitglied_id' => array( 'beschriftung' => 'Mitglied-ID', 'typ' => 'element_id' ),
            'status' => array( 'beschriftung' => 'Status', 'typ' => 'zahl' ),
            'bemerkung' => array( 'beschriftung' => 'Bemerkung', 'typ' => 'text' ),
        ),

        'anwesenheiten' => array(
            'id' => array( 'beschriftung' => 'ID', 'typ' => 'element_id' ),
            'termin_id' => array( 'beschriftung' => 'Termin-ID', 'typ' => 'element_id' ),
            'mitglied_id' => array( 'beschriftung' => 'Mitglied-ID', 'typ' => 'element_id' ),
            'status' => array( 'beschriftung' => 'Status', 'typ' => 'zahl' ),
            'bemerkung' => array( 'beschriftung' => 'Bemerkung', 'typ' => 'text' ),
        ),

        'strafkatalog' => array(
            'id' => array( 'beschriftung' => 'ID', 'typ' => 'element_id' ),
            'titel' => array( 'beschriftung' => 'Titel', 'typ' => 'text' ),
            'wert' => array( 'beschriftung' => 'Wert (in Euro)', 'typ' => 'zahl' ),
            'kategorie' => array( 'beschriftung' => 'Kapitel', 'typ' => 'vorgegebene_werte' ),
            'bemerkung' => array( 'beschriftung' => 'Bemerkung', 'typ' => 'text' ),
        ),

        'kassenbuch' => array(
            'id' => array( 'beschriftung' => 'ID', 'typ' => 'element_id' ),
            'titel' => array( 'beschriftung' => 'Titel', 'typ' => 'text' ),
            'wert' => array( 'beschriftung' => 'Wert (in Euro)', 'typ' => 'zahl' ),
            'mitglied_id' => array( 'beschriftung' => 'Mitglied-ID', 'typ' => 'element_id' ),
            'erledigt' => array( 'beschriftung' => 'Erledigung', 'typ' => 'zeitpunkt' ),
            'erledigt_janein' => array( 'beschriftung' => 'Erledigt', 'typ' => 'janein' ),  // JAVA
            'bemerkung' => array( 'beschriftung' => 'Bemerkung', 'typ' => 'text' ),
            'erstellung' => array( 'beschriftung' => 'Erstellung', 'typ' => 'zeitpunkt' ),  // PHP
        ),

        'notenbank' => array(
            'id' => array( 'beschriftung' => 'ID', 'typ' => 'element_id' ),
            'titel' => array( 'beschriftung' => 'Titel', 'typ' => 'text' ),
            'titel_nr' => array( 'beschriftung' => 'Titel-Nr.', 'typ' => 'zahl' ),
            'komponist' => array( 'beschriftung' => 'Komponist', 'typ' => 'text' ),
            'kategorie' => array( 'beschriftung' => 'Genre', 'typ' => 'vorgegebene_werte' ),
            'verzeichnis_basis' => array( 'beschriftung' => 'Basis-Verzeichnis', 'typ' => 'text' ),     //PHP
            'verzeichnis' => array( 'beschriftung' => 'Verzeichnis', 'typ' => 'text' ),                 //PHP
            'bemerkung' => array( 'beschriftung' => 'Bemerkung', 'typ' => 'text' ),
            'anzahl_noten' => array( 'beschriftung' => 'Anzahl Noten', 'typ' => 'zahl' ),               // JAVA
            'anzahl_audio' => array( 'beschriftung' => 'Anzahl Audio', 'typ' => 'zahl' ),               // JAVA
            'anzahl_verzeichnis' => array( 'beschriftung' => 'Anzahl Verzeichnisse', 'typ' => 'zahl' ), // JAVA
        ),

    );

    /**
     * --------------------------------------------------------------------------
     * Vorgegebene Werte zu Eigenschaften
     * --------------------------------------------------------------------------
     *
     * Werte, die zu den Eigenschaften vorgegeben sind
     * und bspw. ausgewählt werden können
     */
    public $vorgegebene_werte = array(

        'mitglieder' => array(

            'geschlecht' => array (
                'm' => array( 'beschriftung' => 'Männl.', ),
                'w' => array( 'beschriftung' => 'Weibl.', ),
                'd' => array( 'beschriftung' => 'Keine Angabe', ),
            ),

            'register' => array (
                'ohne' => array( 'beschriftung' => 'ohne Instrument', ),
                'dirigent' => array( 'beschriftung' => 'Dirigent', ),
                'ebass' => array( 'beschriftung' => 'E-Bass', ),
                'querfloete' => array( 'beschriftung' => 'Querflöte', ),
                'fluegelhorn' => array( 'beschriftung' => 'Flügelhorn', ),
                'klarinette' => array( 'beschriftung' => 'Klarinette', ),
                'posaune' => array( 'beschriftung' => 'Posaune', ),
                'saxophon' => array( 'beschriftung' => 'Saxophon', ),
                'schlagzeug' => array( 'beschriftung' => 'Schlagzeug', ),
                'tenorhorn' => array( 'beschriftung' => 'Tenorhorn', ),
                'trompete' => array( 'beschriftung' => 'Trompete', ),
                'tuba' => array( 'beschriftung' => 'Tuba', ),
                'waldhorn' => array( 'beschriftung' => 'Waldhorn', ),
            ),

            'auto' => array (
                'ohne' => array( 'beschriftung' => 'ohne Auto', ),
                'bus' => array( 'beschriftung' => 'Bus', ),
                'auto_1' => array( 'beschriftung' => 'Auto 1', ),
                'auto_2' => array( 'beschriftung' => 'Auto 2', ),
                'auto_3' => array( 'beschriftung' => 'Auto 3', ),
                'auto_4' => array( 'beschriftung' => 'Auto 4', ),
            ),

            'funktion' => array (
                'ohne' => array( 'beschriftung' => 'keine Funktion', ),
                'vorsitz' => array( 'beschriftung' => 'Vorstand', ),
                'schriftfuehrer' => array( 'beschriftung' => 'Schriftführung', ),
                'kasse' => array( 'beschriftung' => 'Kasse', ),
                'jugend' => array( 'beschriftung' => 'Jugendleitung', ),
                'presse' => array( 'beschriftung' => 'Presse', ),
                'beisitz' => array( 'beschriftung' => 'Beisitz', ),
                'instrumente' => array( 'beschriftung' => 'Instrumentenwart', ),
                'noten' => array( 'beschriftung' => 'Notenwart', ),
            ),

        ),

        'vergebene_rechte' => array(
        ),

        'aufgaben' => array(

            'zugeordnete_liste' => array(
                'mitglieder' => array( 'beschriftung' => LISTEN['mitglieder']['beschriftung'] ),
                'termine' => array( 'beschriftung' => LISTEN['termine']['beschriftung'] ),
                'notenbank' => array( 'beschriftung' => LISTEN['notenbank']['beschriftung'] ),
            ),

        ),

        'termine' => array(

            'kategorie' => array (
                'allgemein' => array( 'beschriftung' => 'Allgemein', 'symbol' => '' ),
                'auftritt' => array( 'beschriftung' => 'Auftritt', 'symbol' => '&#127930' ),
                'probe' => array( 'beschriftung' => 'Musikprobe', 'symbol' => '&#128218' ),
                'vorstandschaftssitzung' => array( 'beschriftung' => 'Vorstandschaftssitzung', 'symbol' => '&#128186' ),
            ),

        ),

        'rueckmeldungen' => array(
        ),

        'anwesenheiten' => array(
        ),

        'strafkatalog' => array(

            'kategorie' => array (
                'ohne' => array( 'beschriftung' => 'Sonstiges', ),
                'proben' => array( 'beschriftung' => 'Proben', ),
                'veranstaltungen' => array( 'beschriftung' => 'Veranstaltungen', ),
                'haessordnung' => array( 'beschriftung' => 'Häßordnung', ),
            ),

        ),

        'kassenbuch' => array(
        ),

        'notenbank' => array(

            'kategorie' => array (
                'ohne' => array( 'beschriftung' => 'Ohne Zuordnung', ),
                'modern' => array( 'beschriftung' => 'Modern', ),
                'klassik' => array( 'beschriftung' => 'Klassik', ),
                'kirche' => array( 'beschriftung' => 'Kirche', ),
                'volkstuemlich' => array( 'beschriftung' => 'Volkstümlich', ),
            ),

        ),

    );

    
    /**
     * --------------------------------------------------------------------------
     * Vorgegebene Filter
     * --------------------------------------------------------------------------
     *
     * Vorgegebene Filter, die im Filtern-Modal ausgewählt werden können
     */
    public $vorgegebene_filter = array(

        'mitglieder' => array(
            'alle_minderjaehrigen' => array(
                'beschriftung' => 'Alle Minderjährigen',
                'filtern' => array( 'alter' => array( 'ende' => 17.9999 ), 'real_janein' => array( 'inklusiv' => [ TRUE ] ), ),
            ),
            'alle_volljaehrigen' => array(
                'beschriftung' => 'Alle Volljährigen',
                'filtern' => array( 'alter' => array( 'start' => 18 ), 'real_janein' => array( 'inklusiv' => [ TRUE ] ), ),
            ),
            'funktionaere' => array(
                'beschriftung' => 'Alle Funktionäre',
                'filtern' => array( 'funktion' => array( 'exklusiv' => [ 'ohne' ] ), 'real_janein' => array( 'inklusiv' => [ TRUE ] ), ),
            ),
            'vorstandschaft' => array(
                'beschriftung' => 'Vorstandschaft',
                'filtern' => array( 'vorstandschaft_janein' => array( 'inklusiv' => [ TRUE ] ), 'real_janein' => array( 'inklusiv' => [ TRUE ] ), ),
            ),
            'aktive_mitglieder' => array(
                'beschriftung' => 'Aktive Mitglieder',
                'filtern' => array( 'aktiv_janein' => array( 'inklusiv' => [ TRUE ] ), 'real_janein' => array( 'inklusiv' => [ TRUE ] ), ),
            ),
            'alle_mitglieder' => array(
                'beschriftung' => 'Alle Mitglieder',
                'filtern' => array( 'aktiv_janein' => array(), 'real_janein' => array( 'inklusiv' => [ TRUE ] ), ),
            ),
        ),

        'aufgaben' => array(
            'offen' => array(
                'beschriftung' => 'Alle offenen Aufgaben',
                'filtern' => array( 'erledigt_janein' => array( 'inklusiv' => [ FALSE ] ), ),
            ),
            'alle_seit_jahresbeginn' => array(
                'beschriftung' => 'Alle Aufgaben seit Jahresbeginn',
                'filtern' => array( 'erstellung' => array( 'start' => JAHRESBEGINN ), ),
            ),
        ),

        'termine' => array(
            'alle_seit_jahresbeginn' => array(
                'beschriftung' => 'Alle Termine seit Jahresbeginn',
                'filtern' => array( 'start' => array( 'start' => JAHRESBEGINN ), ),
            ),
            'alle_auftritte' => array(
                'beschriftung' => 'Alle anstehenden Auftritte',
                'filtern' => array( 'kategorie' => array( 'inklusiv' => [ 'auftritt' ] ), ),
            ),
            'ich_rueckgemeldet' => array(
                'beschriftung' => 'Alle Termine, zu denen ich Rückmeldung gegeben habe',
                'filtern' => array( 'ich_rueckgemeldet_janein' => array( 'inklusiv' => [ TRUE ] ), 'ich_eingeladen_janein' => array( 'inklusiv' => [ TRUE ] ), ),
            ),
            'ich_nicht_rueckgemeldet' => array(
                'beschriftung' => 'Alle Termine, zu denen ich keine Rückmeldung gegeben habe',
                'filtern' => array( 'ich_rueckgemeldet_janein' => array( 'inklusiv' => [ FALSE ] ), 'ich_eingeladen_janein' => array( 'inklusiv' => [ TRUE ] ), ),
            ),
            'ich_eingeladen' => array(
                'beschriftung' => 'Alle Termine, zu denen ich eingeladen bin',
                'filtern' => array( 'ich_eingeladen_janein' => array( 'inklusiv' => [ TRUE ] ), ),
            ),
            'ich_nicht_eingeladen' => array(
                'beschriftung' => 'Alle Termine, zu denen ich nicht eingeladen bin',
                'filtern' => array( 'ich_eingeladen_janein' => array( 'inklusiv' => [ FALSE ] ), ),
            ),
        ),

        'kassenbuch' => array(
            'offen' => array(
                'beschriftung' => 'Alle offenen Einträge',
                'filtern' => array( 'erledigt_janein' => array( 'inklusiv' => [ FALSE ] ), ),
            ),
            'alle_seit_jahresbeginn' => array(
                'beschriftung' => 'Alle Einträge seit Jahresbeginn',
                'filtern' => array( 'erstellung' => array( 'start' => JAHRESBEGINN ), ),
            ),
        ),

        'notenbank' => array(
            'standard_verzeichnis' => array(
                'beschriftung' => 'Standard-Verzeichnis',
                'filtern' => array( 'titel_nr' => array( 'ende' => 99 ), ),
            ),
            'erweitertes_verzeichnis' => array(
                'beschriftung' => 'Erweitertes Verzeichnis',
                'filtern' => array( 'titel_nr' => array( 'start' => 100 ), ),
            ),
            'titel_mit_dateien' => array(
                'beschriftung' => 'Alle Titel mit Noten',
                'filtern' => array( 'anzahl_noten' => array( 'start' => 1 ), ),
            ),
        ),
        
    );

    /**
     * --------------------------------------------------------------------------
     * Filterbare Eigenschaften
     * --------------------------------------------------------------------------
     *
     * Eigenschaften, die filterbar sein sollen
     */
    public $filterbare_eigenschaften = array(

        'mitglieder' => array(
            // 'geburt',
            'geburtstag',
            'alter',
            'geschlecht',
            'register',
            'auto',
            'funktion',
            'vorstandschaft_janein',
            'aktiv_janein',
        ),

        'vergebene_rechte' => array(
        ),

        'aufgaben' => array(
            // 'zugeordnete_liste', muss auskommentiert sein solange die Aufgaben ausschließlich den anderen Controllern zugeordnet sind
            // 'element_id',
            // 'mitglied_id',
            // 'erledigt',
            'erledigt_janein',
            'erstellung',
        ),

        'termine' => array(
            'start',
            'kategorie',
            'ich_rueckgemeldet_janein',
            'ich_eingeladen_janein',
        ),

        'rueckmeldungen' => array(
        ),

        'anwesenheiten' => array(
        ),

        'strafkatalog' => array(
            'wert',
            'kategorie',
        ),

        'kassenbuch' => array(
            'wert',
            // 'mitglied_id',
            'erledigt',
            'erledigt_janein',
            'erstellung',
        ),

        'notenbank' => array(
            'titel_nr',
            'kategorie',
            'anzahl_noten',
            'anzahl_audio',
            'anzahl_verzeichnis',
        ),

    );

    /**
     * --------------------------------------------------------------------------
     * Sortierbare Eigenschaften
     * --------------------------------------------------------------------------
     *
     * Eigenschaften, die sortierbar sein sollen
     */
    public $sortierbare_eigenschaften = array(

        'mitglieder' => array(
            'vorname',
            'nachname',
            'geburtstag',
            'alter',
            'postleitzahl',
            'wohnort',
            'geschlecht',
            'register',
            'auto',
            'funktion',
            'vorstandschaft_janein',
            'aktiv_janein',
        ),

        'vergebene_rechte' => array(
        ),

        'aufgaben' => array(
            // 'zugeordnete_liste', muss auskommentiert sein solange die Aufgaben ausschließlich den anderen Controllern zugeordnet sind
            'titel',
            'mitglied_id',
            'erledigt',
            'erledigt_janein',
            'erstellung',
        ),

        'termine' => array(
            'titel',
            'start',
            'ort',
            'kategorie',
        ),

        'rueckmeldungen' => array(
        ),

        'anwesenheiten' => array(
        ),

        'strafkatalog' => array(
            'titel',
            'wert',
            'kategorie',
        ),

        'kassenbuch' => array(
            'titel',
            'wert',
            'mitglied_id',
            'erledigt',
            'erledigt_janein',
            'erstellung',
        ),

        'notenbank' => array(
            'titel',
            'titel_nr',
            'kategorie',
            'komponist',
            'anzahl_noten',
            'anzahl_audio',
            'anzahl_verzeichnis',
        ),

    );
    
    /**
     * --------------------------------------------------------------------------
     * Gruppierbare Eigenschaften
     * --------------------------------------------------------------------------
     *
     * Eigenschaften, die gruppierbar sein sollen
     */
    public $gruppierbare_eigenschaften = array(

        'mitglieder' => array(
            'wohnort',
            'geschlecht',
            'register',
            'auto',
            'funktion',
            'vorstandschaft_janein',
            'aktiv_janein',
        ),

        'vergebene_rechte' => array(
        ),

        'aufgaben' => array(
            // 'zugeordnete_liste', muss auskommentiert sein solange die Aufgaben ausschließlich den anderen Controllern zugeordnet sind
            'mitglied_id',
            'erledigt_janein',
        ),

        'termine' => array(
            'kategorie',
        ),

        'rueckmeldungen' => array(
        ),

        'anwesenheiten' => array(
        ),

        'strafkatalog' => array(
            'kategorie',
        ),

        'kassenbuch' => array(
            'erledigt_janein',
        ),

        'notenbank' => array(
            'kategorie',
            'anzahl_noten',
            'anzahl_audio',
            'anzahl_verzeichnis',
        ),

    );

    /**
     * --------------------------------------------------------------------------
     * Mitglieder-Eigenschaften Vorschau
     * --------------------------------------------------------------------------
     *
     * Angezeigte Mitglieder-Eigenschaften als Vorschau
     */
    public $mitglieder_eigenschaften_vorschau = array(
        'register',
        'geburtstag',
        'alter',
        'wohnort',
        'auto',
        'funktion',
    );

    /**
     * --------------------------------------------------------------------------
     * Termin-Kategorie filtern_mitglieder
     * --------------------------------------------------------------------------
     *
     * Voreinstellungen für Termin-Kategorien
     * entsprechend dem Standard-Schema für Filtern
     */
    public $termine_kategorie_filtern_mitglieder = array(
        'allgemein' => array( 'real_janein' => array( 'inklusiv' => array( TRUE ), ), ),
        'probe' => array( 'aktiv_janein' => array( 'inklusiv' => array( TRUE ), ), 'real_janein' => array( 'inklusiv' => array( TRUE ), ), ),
        'auftritt' => array( 'aktiv_janein' => array( 'inklusiv' => array( TRUE ), ), 'real_janein' => array( 'inklusiv' => array( TRUE ), ), ),
        'vorstandschaftssitzung' => array( 'vorstandschaft_janein' => array( 'inklusiv' => array( TRUE ), ), 'real_janein' => array( 'inklusiv' => array( TRUE ), ), ),
    );

    /**
     * --------------------------------------------------------------------------
     * Rückmelde-Frist für Termine
     * --------------------------------------------------------------------------
     *
     * Frist in Sekunden, die man mindestens
     * vor dem Start des Termins einhalten muss
     */
    public $termine_rueckmeldung_frist = 0;

    /**
     * --------------------------------------------------------------------------
     * JSON-Export der öffentlichen Termine
     * --------------------------------------------------------------------------
     *
     * Name der Datei, die beim Export der öffentlichen Termine
     * in ein json-Format verwendet bzw. erstellt wird
     */
    public $termine_json_export_dateiname = 'termine.json';

    /**
     * Eigenschaften, die beim Export der öffentlichen Termine
     * berücksichtigt werden
     */
    public $termine_json_export_eigenschaften = array(
        'titel',
        'start',
        'ende',
        'ort',
    );

    /**
     * --------------------------------------------------------------------------
     * ICS-Export der Termine
     * --------------------------------------------------------------------------
     *
     * Verzeichnis, das beim Export der Termine
     * in ein ics-Format verwendet bzw. erstellt wird
     */
    public $termine_ics_export_verzeichnis = 'ics_export/';

    /**
     * Name der Datei, die beim Export der Termine
     * in ein ics-Format verwendet bzw. erstellt wird
     */
    public $termine_ics_export_dateiname = 'termine.ics';

    /**
     * --------------------------------------------------------------------------
     * Notenbank Verzeichnis Anzahl Ziffern
     * --------------------------------------------------------------------------
     *
     * Anzahl der Ziffern zu Beginn des Verzeichnis-Namens im storage
     * (Ziffern entsprechen der Titel-Nr. und damit orientiert sich die Anzahl
     * der Ziffern an der Größe der Notenbank)
     * Bsp.: storage/notenbank/verzeichnis.pdf
     */
    public $notenbank_verzeichnis = '';

    /**
     * --------------------------------------------------------------------------
     * Notenbank Verzeichnis Anzahl Ziffern
     * --------------------------------------------------------------------------
     *
     * Anzahl der Ziffern zu Beginn des Verzeichnis-Namens im storage
     * (Ziffern entsprechen der Titel-Nr. und damit orientiert sich die Anzahl
     * der Ziffern an der Größe der Notenbank)
     */
    public $notenbank_anzahl_ziffern = 3;

    /**
     * --------------------------------------------------------------------------
     * Notenbank Verzeichnis erlaubte Dateitypen
     * --------------------------------------------------------------------------
     *
     * Erlaubte Dateitypen für Noten
     */
    public $notenbank_erlaubte_dateitypen_noten = array(
        'pdf',
    );

    /**
     * Erlaubte Dateitypen für Audios
     */
    public $notenbank_erlaubte_dateitypen_audio = array(
        'mp3',
        'm4a',
    );

    /**
     * --------------------------------------------------------------------------
     * Datenschutz-Richtlinie
     * --------------------------------------------------------------------------
     *
     * Zeitstempel, zu dem die Datenschutz-Richtlinie veröfentlicht wurde
     */
    public $datenschutz_richtlinie_datum = 20210629;
    
    /**
     * --------------------------------------------------------------------------
     * AJAX-Zykluszeit
     * --------------------------------------------------------------------------
     *
     * Zeit in Sekunden bis zum nächsten Schleifendurchgang
     */
    public $ajax_zykluszeit = 15;
    
    /**
     * --------------------------------------------------------------------------
     * Kasten "Weiter zur Website von ..."
     * --------------------------------------------------------------------------
     *
     * Kasten "Weiter zur Website von ..." auf der Login-Seite aktivieren
     */
    public $kasten_weiter_zur_website_von_login = FALSE;
    
    /**
     * Kasten "Weiter zur Website von ..." auf der Startseite aktivieren
     */
    public $kasten_weiter_zur_website_von_startseite = FALSE;

    /**
     * --------------------------------------------------------------------------
     * JSON-Export Verzeichnis
     * --------------------------------------------------------------------------
     *
     * Verzeichnis, das beim Export einer Liste
     * in ein json-Format verwendet bzw. erstellt wird
     */
    public $json_export_verzeichnis = 'json_export/';

    /**
     * --------------------------------------------------------------------------
     * LocalStorage Reset erzwingen
     * --------------------------------------------------------------------------
     *
     * Wenn der LocalStorage auf allen verwendeten Geräten einmal geleert werden
     * soll, dann muss der jetzige Zeitpunkt definiert werden
     * Winterzeit: +01:00 / Sommerzeit: +02:00
     */
    public $force_localstorage_reset_zeitpunkt = '2025-05-21T16:00:00.000+02:00';

}
