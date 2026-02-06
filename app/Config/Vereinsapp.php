<?php

namespace Config;

use CodeIgniter\Config\BaseConfig;
use CodeIgniter\I18n\Time;
defined('HEUTE') OR define( 'HEUTE', Time::today( 'Europe/Berlin' )->toDateTimeString() );
defined('JAHRESBEGINN') OR define( 'JAHRESBEGINN', Time::today( 'Europe/Berlin' )->setMonth(1)->setDay(1)->setHour(0)->setMinute(0)->setSecond(0)->toDateTimeString() );
defined('NAECHSTER_JAHRESBEGINN') OR define( 'NAECHSTER_JAHRESBEGINN', Time::today( 'Europe/Berlin' )->addYears(1)->setMonth(1)->setDay(1)->setHour(0)->setMinute(0)->setSecond(0)->toDateTimeString() );

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
            // 'link' => array( 'liste' => 'mitglieder', 'eigenschaften' => array( 'id', ), ),
            // 'klasse_id' => array('btn_', 'bestaetigung_einfordern'),
            // 'title' => 'Titel für bspw. ein Modal',
            'beschriftung' => '<span class="eigenschaft" data-eigenschaft="vorname"></span> <span class="eigenschaft" data-eigenschaft="nachname"></span>',
            // 'vorschau' => array( 'register', 'geburtstag', 'alter', 'wohnort', 'auto', 'funktion' ),
            // 'verknuepfungen' => array( 'typ' => 'auswahlmoeglichkeiten', 'verknuepfungen' => 'termine_rueckmeldungen', '[element]_id' => 42, ),
            'zusatzsymbol' => array('geburtstag'),
            // '[element]_id' => 42,
            // 'disabled_ids' => array(),
            // 'eigenschaften_bedingt_formatiert' => array( 'wert' => array( 'text-danger' => array( 'wert' => array( 'ende' =>  0, ), ), ), ),
            'werkzeugkasten' => array(
                'filtern' => array( 'klasse_id' => array('btn_filtern_modal_oeffnen', 'filtern_localstorage'), 'title' => 'Mitglieder filtern', ),
                'sortieren' => array( 'klasse_id' => array('btn_sortieren_modal_oeffnen', 'sortieren_localstorage'), 'title' => 'Mitglieder sortieren', ),
            ),
            'listenstatistik' => array(),
        ),

        'verfuegbare_rechte' => array(
            'liste' => 'verfuegbare_rechte',
            'filtern' => array(),
            'sortieren' => array(),
            'beschriftung' => '<span class="eigenschaft" data-eigenschaft="titel"></span>',
            // 'werkzeugkasten' => array(
            //     'filtern' => array( 'klasse_id' => array('btn_filtern_modal_oeffnen', 'filtern_localstorage'), 'title' => 'Verfügbare Rechte filtern', ),
            //     'sortieren' => array( 'klasse_id' => array('btn_sortieren_modal_oeffnen', 'sortieren_localstorage'), 'title' => 'Verfügbare Rechte sortieren', ),
            // ),
            // 'listenstatistik' => array(),
        ),

        'vergebene_rechte' => array(
            'liste' => 'vergebene_rechte',
            'filtern' => array(),
            'sortieren' => array(),
            // 'werkzeugkasten' => array(
            //     'filtern' => array( 'klasse_id' => array('btn_filtern_modal_oeffnen', 'filtern_localstorage'), 'title' => 'Vergebene Rechte filtern', ),
            //     'sortieren' => array( 'klasse_id' => array('btn_sortieren_modal_oeffnen', 'sortieren_localstorage'), 'title' => 'Vergebene Rechte sortieren', ),
            // ),
            // 'listenstatistik' => array(),
        ),

        'aufgaben' => array(
            'liste' => 'aufgaben',
            'filtern' => array(),
            'sortieren' => array( 'eigenschaft' => 'titel', 'richtung' => SORT_ASC, ),
            'beschriftung' => '<span class="eigenschaft" data-eigenschaft="titel"></span>',
            'werkzeugkasten' => array(
                'filtern' => array( 'klasse_id' => array('btn_filtern_modal_oeffnen', 'filtern_localstorage'), 'title' => 'Aufgaben filtern', ),
                'sortieren' => array( 'klasse_id' => array('btn_sortieren_modal_oeffnen', 'sortieren_localstorage'), 'title' => 'Aufgaben sortieren', ),
            ),
            'listenstatistik' => array(),
        ),

        'aufgaben_rueckmeldungen' => array(
            'liste' => 'aufgaben_rueckmeldungen',
            'filtern' => array(),
            'sortieren' => array(),
            // 'werkzeugkasten' => array(
            //     'filtern' => array( 'klasse_id' => array('btn_filtern_modal_oeffnen', 'filtern_localstorage'), 'title' => 'Rückmeldungen filtern', ),
            //     'sortieren' => array( 'klasse_id' => array('btn_sortieren_modal_oeffnen', 'sortieren_localstorage'), 'title' => 'Rückmeldungen sortieren', ),
            // ),
            // 'listenstatistik' => array(),
        ),

        'aufgaben_zuordnungen_termine' => array(
            'liste' => 'aufgaben_zuordnungen_termine',
            'filtern' => array(),
            'sortieren' => array( 'eigenschaft' => 'aufgabe_titel', 'richtung' => SORT_ASC, ),
            'werkzeugkasten' => array(
                'filtern' => array( 'klasse_id' => array('btn_filtern_modal_oeffnen', 'filtern_localstorage'), 'title' => 'Termin-Zuordnungen filtern', ),
                'sortieren' => array( 'klasse_id' => array('btn_sortieren_modal_oeffnen', 'sortieren_localstorage'), 'title' => 'Termin-Zuordnungen sortieren', ),
            ),
            'listenstatistik' => array(),
        ),

        'termine' => array(
            'liste' => 'termine',
            'filtern' => array( 'start' => array( 'start' => HEUTE ), 'ich_eingeladen_janein' => array( 'inklusiv' => array( TRUE ) ), ),
            'sortieren' => array( 'eigenschaft'=> 'start', 'richtung'=> SORT_ASC, ),
            'beschriftung' => '<span class="eigenschaft" data-eigenschaft="titel"></span>',
            'zusatzsymbol' => array('kategorie'),
            'werkzeugkasten' => array(
                'filtern' => array( 'klasse_id' => array('btn_filtern_modal_oeffnen', 'filtern_localstorage'), 'title' => 'Termine filtern', ),
                'sortieren' => array( 'klasse_id' => array('btn_sortieren_modal_oeffnen', 'sortieren_localstorage'), 'title' => 'Termine sortieren', ),
            ),
            'listenstatistik' => array(),
        ),

        'termine_rueckmeldungen' => array(
            'liste' => 'termine_rueckmeldungen',
            'filtern' => array(),
            'sortieren' => array(),
            // 'werkzeugkasten' => array(
            //     'filtern' => array( 'klasse_id' => array('btn_filtern_modal_oeffnen', 'filtern_localstorage'), 'title' => 'Rückmeldungen filtern', ),
            //     'sortieren' => array( 'klasse_id' => array('btn_sortieren_modal_oeffnen', 'sortieren_localstorage'), 'title' => 'Rückmeldungen sortieren', ),
            // ),
            // 'listenstatistik' => array(),
        ),

        'termine_anwesenheiten' => array(
            'liste' => 'termine_anwesenheiten',
            'filtern' => array(),
            'sortieren' => array(),
            // 'werkzeugkasten' => array(
            //     'filtern' => array( 'klasse_id' => array('btn_filtern_modal_oeffnen', 'filtern_localstorage'), 'title' => 'Anwesenheiten filtern', ),
            //     'sortieren' => array( 'klasse_id' => array('btn_sortieren_modal_oeffnen', 'sortieren_localstorage'), 'title' => 'Anwesenheiten sortieren', ),
            // ),
            // 'listenstatistik' => array(),
        ),

        'strafkatalog' => array(
            'liste' => 'strafkatalog',
            'filtern' => array(),
            'sortieren' => array( 'eigenschaft' => 'kategorie', 'richtung' => SORT_ASC, ),
            'beschriftung' => '<span class="eigenschaft" data-eigenschaft="titel"></span>',
            'werkzeugkasten' => array(
                'filtern' => array( 'klasse_id' => array('btn_filtern_modal_oeffnen', 'filtern_localstorage'), 'title' => 'Strafkatalog filtern', ),
                'sortieren' => array( 'klasse_id' => array('btn_sortieren_modal_oeffnen', 'sortieren_localstorage'), 'title' => 'Strafkatalog sortieren', ),
            ),
            'listenstatistik' => array(),
        ),

        'kassenbuch' => array(
            'liste' => 'kassenbuch',
            'filtern' => array(),
            'sortieren' => array( 'eigenschaft' => 'erstellung', 'richtung' => SORT_DESC, ),
            'beschriftung' => '<span class="eigenschaft" data-eigenschaft="titel"></span>',
            'zusatzsymbol' => array('offen_erledigt'),
            'eigenschaften_bedingt_formatiert' => array( 'wert' => array( 'text-danger' => array( 'wert' => array( 'ende' =>  0, ), ), ), ),
            'werkzeugkasten' => array(
                'filtern' => array( 'klasse_id' => array('btn_filtern_modal_oeffnen', 'filtern_localstorage'), 'title' => 'Kassenbuch filtern', ),
                'sortieren' => array( 'klasse_id' => array('btn_sortieren_modal_oeffnen', 'sortieren_localstorage'), 'title' => 'Kassenbuch sortieren', ),
            ),
            'listenstatistik' => array( 'summe' => 'wert', ),
        ),

        'notenbank' => array(
            'liste' => 'notenbank',
            'filtern' => array(),
            'sortieren' => array( 'eigenschaft' => 'titel_nr', 'richtung' => SORT_ASC, ),
            'beschriftung' => '<span class="eigenschaft" data-eigenschaft="titel_nr"></span> <span class="eigenschaft" data-eigenschaft="titel"></span>',
            'werkzeugkasten' => array(
                'filtern' => array( 'klasse_id' => array('btn_filtern_modal_oeffnen', 'filtern_localstorage'), 'title' => 'Notenbank filtern', ),
                'sortieren' => array( 'klasse_id' => array('btn_sortieren_modal_oeffnen', 'sortieren_localstorage'), 'title' => 'Notenbank sortieren', ),
            ),
            'listenstatistik' => array(),
        ),

        'notenbank_setliste' => array(
            'liste' => 'notenbank_setliste',
            'filtern' => array(),
            'sortieren' => array( 'eigenschaft' => 'status', 'richtung' => SORT_ASC, ),
            'werkzeugkasten' => array(
                'filtern' => array( 'klasse_id' => array('btn_filtern_modal_oeffnen', 'filtern_localstorage'), 'title' => 'Setliste filtern', ),
                'sortieren' => array( 'klasse_id' => array('btn_sortieren_modal_oeffnen', 'sortieren_localstorage'), 'title' => 'Setliste sortieren', ),
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
     * 
     * Verfügbare Typen:
     * text
     * zahl
     * zeitpunkt
     * janein
     * vorgegebene_werte
     * element_id
     * element_ids
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
            'postleitzahl' => array( 'beschriftung' => 'PLZ', 'typ' => 'zahl' ),
            'wohnort' => array( 'beschriftung' => 'Wohnort', 'typ' => 'text' ),
            'geschlecht' => array( 'beschriftung' => 'Geschlecht', 'typ' => 'vorgegebene_werte' ),
            'register' => array( 'beschriftung' => 'Instrument', 'typ' => 'vorgegebene_werte' ),
            'auto' => array( 'beschriftung' => 'Auto', 'typ' => 'vorgegebene_werte' ),
            'funktion' => array( 'beschriftung' => 'Funktion', 'typ' => 'vorgegebene_werte' ),
            'vorstandschaft_janein' => array( 'beschriftung' => 'Vorstandschaft', 'typ' => 'janein' ),
            'aktiv_janein' => array( 'beschriftung' => 'Aktiv', 'typ' => 'janein' ),
            'real_janein' => array( 'beschriftung' => 'Real', 'typ' => 'janein' ),
            'bemerkung' => array( 'beschriftung' => 'Bemerkung', 'typ' => 'text' ),
            'erstellung' => array( 'beschriftung' => 'Erstellung', 'typ' => 'zeitpunkt' ),                  // PHP
            'letzte_aktivitaet' => array( 'beschriftung' => 'Letzte Aktivität', 'typ' => 'zeitpunkt' ),     // PHP
            'passwort_alt' => array( 'beschriftung' => 'Altes Passwort', 'typ' => 'text' ),                 // PHP
            'passwort_neu' => array( 'beschriftung' => 'Neues Passwort', 'typ' => 'text' ),                 // PHP
            'passwort_neu2' => array( 'beschriftung' => 'Neues Passwort (Wiederholung)', 'typ' => 'text' ), // PHP
            'zugeordnete_vergebenes_recht_ids' => array( 'beschriftung' => 'Zugeordnete vergebene Rechte', 'typ' => 'element_ids' ),            // JAVA
            'zugeordnete_aufgaben_rueckmeldung_ids' => array( 'beschriftung' => 'Zugeordnete Aufgaben-Rückmeldungen', 'typ' => 'element_ids' ), // JAVA
            'zugeordnete_termine_rueckmeldung_ids' => array( 'beschriftung' => 'Zugeordnete Termine-Rückmeldungen', 'typ' => 'element_ids' ),   // JAVA
            'zugeordnete_termine_anwesenheit_ids' => array( 'beschriftung' => 'Zugeordnete Anwesenheiten', 'typ' => 'element_ids' ),            // JAVA
        ),

        'verfuegbare_rechte' => array(
            'id' => array( 'beschriftung' => 'ID', 'typ' => 'element_id' ),         // PHP
            'permission' => array( 'beschriftung' => 'Recht', 'typ' => 'text' ),    // PHP
            'titel' => array( 'beschriftung' => 'Titel', 'typ' => 'text' ),         // PHP
        ),

        'vergebene_rechte' => array(
            'id' => array( 'beschriftung' => 'ID', 'typ' => 'element_id' ),                                             // PHP
            'verfuegbares_recht_id' => array( 'beschriftung' => 'Verfuegbares-Recht-ID', 'typ' => 'element_id' ),       // PHP
            'mitglied_id' => array( 'beschriftung' => 'Mitglied-ID', 'typ' => 'element_id' ),                           // PHP
            'status' => array( 'beschriftung' => 'Status', 'typ' => 'zahl' ),                                           // PHP
            'bemerkung' => array( 'beschriftung' => 'Bemerkung', 'typ' => 'text' ),                                     // PHP
            'verfuegbares_recht_titel' => array( 'beschriftung' => 'Titel des verfügbaren Rechts', 'typ' => 'text' ),   // JAVA
            'mitglied_vorname' => array( 'beschriftung' => 'Vorname des Mitglieds', 'typ' => 'text' ),                  // JAVA
            'mitglied_nachname' => array( 'beschriftung' => 'Nachname des Mitglieds', 'typ' => 'text' ),                // JAVA
        ),

        'aufgaben' => array(
            'id' => array( 'beschriftung' => 'ID', 'typ' => 'element_id' ),
            'titel' => array( 'beschriftung' => 'Titel', 'typ' => 'text' ),
            'max_anzahl_mitglieder' => array( 'beschriftung' => 'Max. Anzahl an eingetragenen Mitgliedern', 'typ' => 'zahl' ),
            'bemerkung' => array( 'beschriftung' => 'Bemerkung', 'typ' => 'text' ),
            'zugeordnete_aufgaben_rueckmeldung_ids' => array( 'beschriftung' => 'Zugeordnete Rückmeldungen', 'typ' => 'element_ids' ),  // JAVA
            'zugeordnete_aufgaben_zuordnung_termine_ids' => array( 'beschriftung' => 'Zugeordnete Termine', 'typ' => 'element_ids' ),   // JAVA
        ),

        'aufgaben_rueckmeldungen' => array(
            'id' => array( 'beschriftung' => 'ID', 'typ' => 'element_id' ),
            'aufgabe_id' => array( 'beschriftung' => 'Aufgabe-ID', 'typ' => 'element_id' ),
            'mitglied_id' => array( 'beschriftung' => 'Mitglied-ID', 'typ' => 'element_id' ),
            'status' => array( 'beschriftung' => 'Status', 'typ' => 'zahl' ),
            'bemerkung' => array( 'beschriftung' => 'Bemerkung', 'typ' => 'text' ),
            'aufgabe_titel' => array( 'beschriftung' => 'Titel der Aufgabe', 'typ' => 'text' ),             // JAVA
            'mitglied_vorname' => array( 'beschriftung' => 'Vorname des Mitglieds', 'typ' => 'text' ),      // JAVA
            'mitglied_nachname' => array( 'beschriftung' => 'Nachname des Mitglieds', 'typ' => 'text' ),    // JAVA
        ),

        'aufgaben_zuordnungen_termine' => array(
            'id' => array( 'beschriftung' => 'ID', 'typ' => 'element_id' ),
            'aufgabe_id' => array( 'beschriftung' => 'Aufgabe-ID', 'typ' => 'element_id' ),
            'termin_id' => array( 'beschriftung' => 'Termin-ID', 'typ' => 'element_id' ),
            'status' => array( 'beschriftung' => 'Status', 'typ' => 'zahl' ),
            'bemerkung' => array( 'beschriftung' => 'Bemerkung', 'typ' => 'text' ),
            'aufgabe_titel' => array( 'beschriftung' => 'Titel der Aufgabe', 'typ' => 'text' ),                 // JAVA
            'aufgabe_max_anzahl_mitglieder' => array( 'beschriftung' => 'Max. Anzahl an eingetragenen Mitgliedern der Aufgabe', 'typ' => 'zahl' ), // JAVA
            'termin_titel' => array( 'beschriftung' => 'Titel des Termins', 'typ' => 'text' ),                  // JAVA
            'termin_start' => array( 'beschriftung' => 'Beginn des Termins', 'typ' => 'zeitpunkt' ),            // JAVA
            'termin_ort' => array( 'beschriftung' => 'Ort des Termins', 'typ' => 'text' ),                      // JAVA
            'termin_kategorie' => array( 'beschriftung' => 'Typ des Termins', 'typ' => 'vorgegebene_werte' ),   // JAVA
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
            'mitglied_ids_eingeladen' => array( 'beschriftung' => 'Eingeladene Mitglieder', 'typ' => 'element_ids' ),   // JAVA
            'ich_eingeladen_janein' => array( 'beschriftung' => 'Ich bin eingeladen', 'typ' => 'janein' ),              // JAVA
            'ich_rueckgemeldet_janein' => array( 'beschriftung' => 'Ich habe Rückmeldung gegeben', 'typ' => 'janein' ), // JAVA
            'zugeordnete_aufgaben_zuordnung_termine_ids' => array( 'beschriftung' => 'Zugeordnete Aufgaben', 'typ' => 'element_ids' ),  // JAVA
            'zugeordnete_termine_rueckmeldung_ids' => array( 'beschriftung' => 'Zugeordnete Rückmeldungen', 'typ' => 'element_ids' ),   // JAVA
            'zugeordnete_termine_anwesenheit_ids' => array( 'beschriftung' => 'Zugeordnete Anwesenheiten', 'typ' => 'element_ids' ),    // JAVA
            'zugeordnete_notenbank_setlisteneintrag_ids' => array( 'beschriftung' => 'Zugeordnete Setliste', 'typ' => 'element_ids' ),  // JAVA
        ),

        'termine_rueckmeldungen' => array(
            'id' => array( 'beschriftung' => 'ID', 'typ' => 'element_id' ),
            'termin_id' => array( 'beschriftung' => 'Termin-ID', 'typ' => 'element_id' ),
            'mitglied_id' => array( 'beschriftung' => 'Mitglied-ID', 'typ' => 'element_id' ),
            'status' => array( 'beschriftung' => 'Status', 'typ' => 'zahl' ),
            'bemerkung' => array( 'beschriftung' => 'Bemerkung', 'typ' => 'text' ),
            'termin_start' => array( 'beschriftung' => 'Beginn des Termins', 'typ' => 'zeitpunkt' ),        // JAVA
            'termin_titel' => array( 'beschriftung' => 'Titel des Termins', 'typ' => 'text' ),              // JAVA
            'mitglied_vorname' => array( 'beschriftung' => 'Vorname des Mitglieds', 'typ' => 'text' ),      // JAVA
            'mitglied_nachname' => array( 'beschriftung' => 'Nachname des Mitglieds', 'typ' => 'text' ),    // JAVA
        ),

        'termine_anwesenheiten' => array(
            'id' => array( 'beschriftung' => 'ID', 'typ' => 'element_id' ),
            'termin_id' => array( 'beschriftung' => 'Termin-ID', 'typ' => 'element_id' ),
            'mitglied_id' => array( 'beschriftung' => 'Mitglied-ID', 'typ' => 'element_id' ),
            'status' => array( 'beschriftung' => 'Status', 'typ' => 'zahl' ),
            'bemerkung' => array( 'beschriftung' => 'Bemerkung', 'typ' => 'text' ),
            'termin_start' => array( 'beschriftung' => 'Beginn des Termins', 'typ' => 'zeitpunkt' ),        // JAVA
            'termin_titel' => array( 'beschriftung' => 'Titel des Termins', 'typ' => 'text' ),              // JAVA
            'mitglied_vorname' => array( 'beschriftung' => 'Vorname des Mitglieds', 'typ' => 'text' ),      // JAVA
            'mitglied_nachname' => array( 'beschriftung' => 'Nachname des Mitglieds', 'typ' => 'text' ),    // JAVA
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
            'mitglied' => array( 'beschriftung' => 'Mitglied', 'typ' => 'text' ),           // JAVA
            'erledigt' => array( 'beschriftung' => 'Erledigung', 'typ' => 'zeitpunkt' ),
            'erledigt_janein' => array( 'beschriftung' => 'Erledigt', 'typ' => 'janein' ),  // JAVA
            'bemerkung' => array( 'beschriftung' => 'Bemerkung', 'typ' => 'text' ),
            'erstellung' => array( 'beschriftung' => 'Erstellung', 'typ' => 'zeitpunkt' ),  // PHP
        ),

        'notenbank' => array(
            'id' => array( 'beschriftung' => 'ID', 'typ' => 'element_id' ),
            'titel' => array( 'beschriftung' => 'Titel', 'typ' => 'text' ),
            'titel_nr' => array( 'beschriftung' => 'Titel-Nr.', 'typ' => 'zahl' ),
            'kategorie' => array( 'beschriftung' => 'Genre', 'typ' => 'vorgegebene_werte' ),
            'komponist' => array( 'beschriftung' => 'Komponist', 'typ' => 'text' ),
            'bemerkung' => array( 'beschriftung' => 'Bemerkung', 'typ' => 'text' ),
            'verzeichnis_basis' => array( 'beschriftung' => 'Basis-Verzeichnis', 'typ' => 'text' ),     //PHP
            'verzeichnis' => array( 'beschriftung' => 'Verzeichnis', 'typ' => 'text' ),                 //PHP
            'anzahl_noten' => array( 'beschriftung' => 'Anzahl Noten', 'typ' => 'zahl' ),               // JAVA
            'anzahl_audio' => array( 'beschriftung' => 'Anzahl Audio', 'typ' => 'zahl' ),               // JAVA
            'anzahl_verzeichnis' => array( 'beschriftung' => 'Anzahl Verzeichnisse', 'typ' => 'zahl' ), // JAVA
            'zugeordnete_notenbank_setlisteneintrag_ids' => array( 'beschriftung' => 'Zugeordnete Setliste', 'typ' => 'element_ids' ),  // JAVA
        ),

        'notenbank_setliste' => array(
            'id' => array( 'beschriftung' => 'ID', 'typ' => 'element_id' ),
            'titel_id' => array( 'beschriftung' => 'Titel-ID', 'typ' => 'element_id' ),
            'termin_id' => array( 'beschriftung' => 'Termin-ID', 'typ' => 'element_id' ),
            'status' => array( 'beschriftung' => 'Position', 'typ' => 'zahl' ),
            'bemerkung' => array( 'beschriftung' => 'Bemerkung', 'typ' => 'text' ),
            'titel_titel' => array( 'beschriftung' => 'Titel des Titels', 'typ' => 'text' ),                                // JAVA
            'titel_titel_nr' => array( 'beschriftung' => 'Titel-Nr. des Titels', 'typ' => 'zahl' ),                         // JAVA
            'titel_kategorie' => array( 'beschriftung' => 'Genre des Titels', 'typ' => 'vorgegebene_werte' ),               // JAVA
            'titel_komponist' => array( 'beschriftung' => 'Komponist des Titels', 'typ' => 'text' ),                        // JAVA
            'titel_anzahl_noten' => array( 'beschriftung' => 'Anzahl Noten des Titels', 'typ' => 'zahl' ),                  // JAVA
            'titel_anzahl_audio' => array( 'beschriftung' => 'Anzahl Audio des Titels', 'typ' => 'zahl' ),                  // JAVA
            'titel_anzahl_verzeichnis' => array( 'beschriftung' => 'Anzahl Verzeichnisse des Titels', 'typ' => 'zahl' ),    // JAVA
            'termin_start' => array( 'beschriftung' => 'Beginn des Termins', 'typ' => 'zeitpunkt' ),                        // JAVA
            'termin_titel' => array( 'beschriftung' => 'Titel des Termins', 'typ' => 'text' ),                              // JAVA
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
        ),

        'aufgaben_rueckmeldungen' => array(
        ),

        'aufgaben_zuordnungen_termine' => array(

            'termin_kategorie' => array (
                'allgemein' => array( 'beschriftung' => 'Allgemein', 'symbol' => '' ),
                'auftritt' => array( 'beschriftung' => 'Auftritt', 'symbol' => '&#127930' ),
                'probe' => array( 'beschriftung' => 'Musikprobe', 'symbol' => '&#128218' ),
                'vorstandschaftssitzung' => array( 'beschriftung' => 'Vorstandschaftssitzung', 'symbol' => '&#128186' ),
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

        'termine_rueckmeldungen' => array(
        ),

        'termine_anwesenheiten' => array(
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

        'notenbank_setliste' => array(

            'titel_kategorie' => array (
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
    public $filtern_vorgegeben = array(

        'mitglieder' => array(
            'zuruecksetzen' => array(
                'beschriftung' => 'Alle Filter zurücksetzen',
                'filtern' => array(),
            ),
            'alle_minderjaehrigen' => array(
                'beschriftung' => 'Alle Minderjährigen',
                'filtern' => array( 'alter' => array( 'ende' => 17.9999 ), 'real_janein' => array( 'inklusiv' => array( TRUE ) ), ),
            ),
            'alle_volljaehrigen' => array(
                'beschriftung' => 'Alle Volljährigen',
                'filtern' => array( 'alter' => array( 'start' => 18 ), 'real_janein' => array( 'inklusiv' => array( TRUE ) ), ),
            ),
            'funktionaere' => array(
                'beschriftung' => 'Alle Funktionäre',
                'filtern' => array( 'funktion' => array( 'exklusiv' => array( 'ohne' ) ), 'real_janein' => array( 'inklusiv' => array( TRUE ) ), ),
            ),
            'vorstandschaft' => array(
                'beschriftung' => 'Vorstandschaft',
                'filtern' => array( 'vorstandschaft_janein' => array( 'inklusiv' => array( TRUE ) ), 'real_janein' => array( 'inklusiv' => array( TRUE ) ), ),
            ),
            'aktive_mitglieder' => array(
                'beschriftung' => 'Aktive Mitglieder',
                'filtern' => array( 'aktiv_janein' => array( 'inklusiv' => array( TRUE ) ), 'real_janein' => array( 'inklusiv' => array( TRUE ) ), ),
            ),
            'alle_mitglieder' => array(
                'beschriftung' => 'Alle Mitglieder',
                'filtern' => array( 'aktiv_janein' => array(), 'real_janein' => array( 'inklusiv' => array( TRUE ) ), ),
            ),
        ),

        'aufgaben' => array(
            'zuruecksetzen' => array(
                'beschriftung' => 'Alle Filter zurücksetzen',
                'filtern' => array(),
            ),
        ),

        'termine' => array(
            'zuruecksetzen' => array(
                'beschriftung' => 'Alle Filter zurücksetzen',
                'filtern' => array(),
            ),
            'alle_seit_jahresbeginn' => array(
                'beschriftung' => 'Alle Termine seit Jahresbeginn',
                'filtern' => array( 'start' => array( 'start' => JAHRESBEGINN ), ),
            ),
            'alle_auftritte' => array(
                'beschriftung' => 'Alle anstehenden Auftritte',
                'filtern' => array( 'kategorie' => array( 'inklusiv' => array( 'auftritt' ) ), ),
            ),
            'ich_eingeladen' => array(
                'beschriftung' => 'Alle Termine, zu denen ich eingeladen bin',
                'filtern' => array( 'ich_eingeladen_janein' => array( 'inklusiv' => array( TRUE ) ), ),
            ),
            'ich_nicht_eingeladen' => array(
                'beschriftung' => 'Alle Termine, zu denen ich nicht eingeladen bin',
                'filtern' => array( 'ich_eingeladen_janein' => array( 'inklusiv' => array( FALSE ) ), ),
            ),
            'ich_rueckgemeldet' => array(
                'beschriftung' => 'Alle Termine, zu denen ich Rückmeldung gegeben habe',
                'filtern' => array( 'ich_rueckgemeldet_janein' => array( 'inklusiv' => array( TRUE ) ), 'ich_eingeladen_janein' => array( 'inklusiv' => array( TRUE ) ), ),
            ),
            'ich_nicht_rueckgemeldet' => array(
                'beschriftung' => 'Alle Termine, zu denen ich keine Rückmeldung gegeben habe',
                'filtern' => array( 'ich_rueckgemeldet_janein' => array( 'inklusiv' => array( FALSE ) ), 'ich_eingeladen_janein' => array( 'inklusiv' => array( TRUE ) ), ),
            ),
        ),

        'kassenbuch' => array(
            'zuruecksetzen' => array(
                'beschriftung' => 'Alle Filter zurücksetzen',
                'filtern' => array(),
            ),
            'offen' => array(
                'beschriftung' => 'Alle offenen Einträge',
                'filtern' => array( 'erledigt_janein' => array( 'inklusiv' => array( TRUE ) ), ),
            ),
            'alle_seit_jahresbeginn' => array(
                'beschriftung' => 'Alle Einträge seit Jahresbeginn',
                'filtern' => array( 'erstellung' => array( 'start' => JAHRESBEGINN ), ),
            ),
        ),

        'notenbank' => array(
            'zuruecksetzen' => array(
                'beschriftung' => 'Alle Filter zurücksetzen',
                'filtern' => array(),
            ),
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
            'max_anzahl_mitglieder',
        ),

        'aufgaben_rueckmeldungen' => array(
        ),

        'aufgaben_zuordnungen_termine' => array(
            'aufgabe_max_anzahl_mitglieder',
        ),

        'termine' => array(
            'start',
            'kategorie',
            'ich_eingeladen_janein',
            'ich_rueckgemeldet_janein',
        ),

        'termine_rueckmeldungen' => array(
        ),

        'termine_anwesenheiten' => array(
        ),

        'strafkatalog' => array(
            'wert',
            'kategorie',
        ),

        'kassenbuch' => array(
            'wert',
            // 'mitglied_id',
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

        'notenbank_setliste' => array(
            'status',
            'titel_titel_nr',
            'titel_kategorie',
            'titel_anzahl_noten',
            'titel_anzahl_audio',
            'titel_anzahl_verzeichnis',
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
            'titel',
            'max_anzahl_mitglieder',
        ),

        'aufgaben_rueckmeldungen' => array(
        ),

        'aufgaben_zuordnungen_termine' => array(
            'aufgabe_titel',
            'aufgabe_max_anzahl_mitglieder',
            'termin_titel',
            'termin_start',
            'termin_ort',
            'termin_kategorie',
        ),

        'termine' => array(
            'titel',
            'start',
            'ort',
            'kategorie',
        ),

        'termine_rueckmeldungen' => array(
        ),

        'termine_anwesenheiten' => array(
        ),

        'strafkatalog' => array(
            'titel',
            'wert',
            'kategorie',
        ),

        'kassenbuch' => array(
            'titel',
            'wert',
            'mitglied',
            'erledigt',
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

        'notenbank_setliste' => array(
            'status',
            'titel_titel',
            'titel_titel_nr',
            'titel_kategorie',
            'titel_komponist',
            'titel_anzahl_noten',
            'titel_anzahl_audio',
            'titel_anzahl_verzeichnis',
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
            'alter',
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
            'max_anzahl_mitglieder',
        ),

        'aufgaben_rueckmeldungen' => array(
        ),

        'aufgaben_zuordnungen_termine' => array(
        ),

        'termine' => array(
            'kategorie',
        ),

        'termine_rueckmeldungen' => array(
        ),

        'termine_anwesenheiten' => array(
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

        'notenbank_setliste' => array(
        ),

    );

    /**
     * --------------------------------------------------------------------------
     * Mitglieder-Eigenschaften Vorschau
     * --------------------------------------------------------------------------
     *
     * Angezeigte Mitglieder-Eigenschaften als Vorschau
     */
    public $mitglieder_eigenschaften_vorschau = array( 'register', 'geburtstag', 'alter', 'wohnort', 'auto', 'funktion', );

    /**
     * --------------------------------------------------------------------------
     * Mitglieder-Auswertungen
     * --------------------------------------------------------------------------
     *
     * Vordefinierte Filter (nach Liste)
     */
    public $mitglieder_auswertungen_filtern = array(
        'termine_rueckmeldungen' => array( 'start' => array( 'start' => JAHRESBEGINN ), ),
        'termine_anwesenheiten' => array( 'start' => array( 'start' => JAHRESBEGINN, 'ende' => NAECHSTER_JAHRESBEGINN ), 'kategorie' => array( 'inklusiv' => array( 'probe' ), ), ),
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
     * Verknüpfungen
     * --------------------------------------------------------------------------
     * Verknüpfte Listen, Auswahlmöglichkeiten zur Rückmeldung und
     * Frist in Sekunden, die man mindestens vor dem Start einhalten muss
     */
    public $verknuepfungen = array(
        'vergebene_rechte' => array(
            "verknuepfte_listen" => array( "verfuegbare_rechte", "mitglieder", ),
            'auswahlmoeglichkeiten' => array(
                0 => array( 'farbe' => 'danger', 'aktiv' => '<i class="bi bi-'.SYMBOLE['neg_zuordnung']['bootstrap'].'"></i>' ),
                1 => array( 'farbe' => 'success', 'aktiv' => '<i class="bi bi-'.SYMBOLE['pos_zuordnung']['bootstrap'].'"></i>' ),
             ),
        ),
        'aufgaben_rueckmeldungen' => array(
            "verknuepfte_listen" => array( "aufgaben", "mitglieder", ),
            'auswahlmoeglichkeiten' => array(
                0 => array( 'farbe' => 'secondary', 'aktiv' => '<i class="bi bi-'.SYMBOLE['ohne_rueckmeldung']['bootstrap'].'"></i>', 'passiv' => '<i class="bi bi-'.SYMBOLE['ohne_rueckmeldung']['bootstrap'].'"></i>' ),
                1 => array( 'farbe' => 'primary', 'aktiv' => '<i class="bi bi-'.SYMBOLE['angenommen_rueckmeldung']['bootstrap'].'"></i>', 'passiv' => '<i class="bi bi-'.SYMBOLE['angenommen_rueckmeldung']['bootstrap'].'-fill"></i>' ),
                2 => array( 'farbe' => 'success', 'aktiv' => '<i class="bi bi-'.SYMBOLE['erledigt']['bootstrap'].'"></i>', 'passiv' => '<i class="bi bi-'.SYMBOLE['erledigt']['bootstrap'].'"></i>' ),
            ),
        ),
        'aufgaben_zuordnungen_termine' => array(
            "verknuepfte_listen" => array( "aufgaben", "termine", ),
            'auswahlmoeglichkeiten' => array(
                0 => array( 'farbe' => 'danger', 'aktiv' => '<i class="bi bi-'.SYMBOLE['neg_zuordnung']['bootstrap'].'"></i>' ),
                1 => array( 'farbe' => 'success', 'aktiv' => '<i class="bi bi-'.SYMBOLE['pos_zuordnung']['bootstrap'].'"></i>' ),
             ),
        ),
        'termine_rueckmeldungen' => array(
            "verknuepfte_listen" => array( "termine", "mitglieder", ),
            'auswahlmoeglichkeiten' => array(
                0 => array( 'farbe' => 'secondary', 'aktiv' => '<i class="bi bi-'.SYMBOLE['ohne_rueckmeldung']['bootstrap'].'"></i>', 'passiv' => '<i class="bi bi-'.SYMBOLE['ohne_rueckmeldung']['bootstrap'].'"></i>' ),
                1 => array( 'farbe' => 'success', 'aktiv' => '<i class="bi bi-'.SYMBOLE['pos_rueckmeldung']['bootstrap'].'"></i>', 'passiv' => '<i class="bi bi-'.SYMBOLE['pos_rueckmeldung']['bootstrap'].'-fill"></i>' ),
                2 => array( 'farbe' => 'danger', 'aktiv' => '<i class="bi bi-'.SYMBOLE['neg_rueckmeldung']['bootstrap'].'"></i>', 'passiv' => '<i class="bi bi-'.SYMBOLE['neg_rueckmeldung']['bootstrap'].'-fill"></i>' ),
            ),
            'verknuepfung_moeglich_eingeladen' => array( 'eigenschaft' => 'mitglied_ids_eingeladen', 'liste' => 'termine' ),
            'verknuepfung_moeglich_frist' => array( 'eigenschaft' => 'start', 'liste' => 'termine', 'frist' => 0 ),
            'verknuepfung_nicht_moeglich' => array(
                'keine_verknuepfung_moeglich' => 'Keine Rückmeldung möglich!',
                'keine_verknuepfung_fuer_dich_moeglich' => 'Du bist nicht eingeladen und kannst deshalb keine Rückmeldung geben.',
                'keine_verknuepfung_fuer_mitglied_moeglich' => 'Das Mitglied ist nicht eingeladen und kann deshalb keine Rückmeldung geben.',
            ),
        ),
        'termine_anwesenheiten' => array(
            "verknuepfte_listen" => array( "termine", "mitglieder", ),
            'auswahlmoeglichkeiten' => array(
                0 => array( 'farbe' => 'danger', 'aktiv' => '<i class="bi bi-'.SYMBOLE['neg_zuordnung']['bootstrap'].'"></i>'),
                1 => array( 'farbe' => 'success', 'aktiv' => '<i class="bi bi-'.SYMBOLE['pos_zuordnung']['bootstrap'].'"></i>' ),
             ),
        ),
        'notenbank_setliste' => array(
            "verknuepfte_listen" => array( "notenbank", "termine", ),
            'auswahlmoeglichkeiten' => array(
                0 => array( 'farbe' => 'danger', 'aktiv' => '<i class="bi bi-'.SYMBOLE['neg_zuordnung']['bootstrap'].'"></i>'),
                1 => array( 'farbe' => 'success', 'aktiv' => '<i class="bi bi-'.SYMBOLE['pos_zuordnung']['bootstrap'].'"></i>' ),
             ),
        ),
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
