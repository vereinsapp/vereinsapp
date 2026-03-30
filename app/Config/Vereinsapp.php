<?php

namespace Config;

use CodeIgniter\Config\BaseConfig;
use CodeIgniter\I18n\Time;
defined('HEUTE') OR define( 'HEUTE', Time::today( 'Europe/Berlin' )->toDateTimeString() );
defined('MORGEN') OR define( 'MORGEN', Time::today( 'Europe/Berlin' )->addDays(1)->toDateTimeString() );
defined('JAHRESBEGINN') OR define( 'JAHRESBEGINN', Time::today( 'Europe/Berlin' )->setMonth(1)->setDay(1)->setHour(0)->setMinute(0)->setSecond(0)->toDateTimeString() );
defined('NAECHSTER_JAHRESBEGINN') OR define( 'NAECHSTER_JAHRESBEGINN', Time::today( 'Europe/Berlin' )->addYears(1)->setMonth(1)->setDay(1)->setHour(0)->setMinute(0)->setSecond(0)->toDateTimeString() );
defined('VERSION') OR define( 'VERSION', preg_replace('/\s+/', '', file_get_contents( ROOTPATH.'/README.md', FALSE, NULL, 13 ) ) );

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
    public $vereinsapp_logo = 'images/logo.png';

    /**
     * --------------------------------------------------------------------------
     * Module (Controller)
     * --------------------------------------------------------------------------
     *
     * Aktive Module (Controller)
     * Pflicht: beschriftung, symbol
     */
    public $controllers = array(
        'einstellungen' => array ( 'beschriftung' => 'Einstellungen', 'symbol' => 'einstellungen' ),
        'mitglieder' => array ( 'beschriftung' => 'Mitglieder', 'symbol' => 'mitglieder' ),
        'aufgaben' => array ( 'beschriftung' => 'Aufgaben', 'symbol' => 'aufgaben' ),
        'termine' => array ( 'beschriftung' => 'Termine', 'symbol' => 'termine' ),
        'strafkatalog' => array ( 'beschriftung' => 'Strafkatalog', 'symbol' => 'strafkatalog' ),
        'notenbank' => array ( 'beschriftung' => 'Notenbank', 'symbol' => 'notenbank' ),
        'startseite' => array ( 'beschriftung' => 'Willkommen', 'symbol' => 'startseite' ),
        'status' => array ( 'beschriftung' => 'Status', 'symbol' => 'einstellungen' ),
        'loginController' => array ( 'beschriftung' => 'Login', 'symbol' => 'einstellungen' ),
        'actionController' => array ( 'beschriftung' => 'Login-Action', 'symbol' => 'einstellungen' ),        
        'magicLinkController' => array ( 'beschriftung' => 'Einmal-Link', 'symbol' => 'einstellungen' ),        
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
        array( 'typ' => 'intern', 'data' => array( 'url' => 'logout', 'beschriftung' => 'Abmelden', 'symbol' => 'logout' ) ),
    );

    /**
     * --------------------------------------------------------------------------
     * Werkzeuge
     * --------------------------------------------------------------------------
     * 
     * Pflicht: symbol, beschriftung (beschriftung, bestaetigung, erfolg, fehler) / Optional: farbe
     */
    public $werkzeuge = array(
        'datenschutz_richtlinie_akzeptieren' => array(
            'symbol' => 'pos_zuordnung',
            'beschriftung' => array(
                'beschriftung' => 'Datenschutz-Richtlinie akzeptieren',
            ),
            'farbe' => 'success',
        ),

        'localstorage_leeren' => array(
            'symbol' => 'loeschen',
            'beschriftung' => array(
                'beschriftung' => 'Gerätespeicher leeren',
                'bestaetigung' => 'Willst du wirklich deinen Gerätespeicher leeren?',
                'erfolg' => 'Dein Gerätespeicher wurde erfolgreich geleert.',
                'fehler' => 'Dein Gerätespeicher konnte nicht geleert werden!',
            ),
            'farbe' => 'danger',
        ),

        'inhalt_kopieren' => array(
            'symbol' => 'inhalt_kopieren',
            'beschriftung' => array(
                'beschriftung' => 'Inhalt kopieren',
            ),
        ),

        'filtern_manip' => array(
            'symbol' => 'filtern',
            'beschriftung' => array(
                'beschriftung' => '{liste1} filtern',
            ),
        ),
        'filtern_wert_inklusiv_exklusiv' => array(
            'symbol' => 'inklusiv_exklusiv',
            'beschriftung' => array(
                'beschriftung' => 'Wert inklusiv/exklusiv',
            ),
        ),
        'filtern_wert_loeschen' => array(
            'symbol' => 'loeschen',
            'beschriftung' => array(
                'beschriftung' => 'Wert löschen',
            ),
            'farbe' => 'danger',
        ),
        'filtern_eigenschaft_zuruecksetzen' => array(
            'symbol' => 'loeschen',
            'beschriftung' => array(
                'beschriftung' => 'Eigenschaft zurücksetzen',
            ),
            'farbe' => 'danger',
        ),
        'sortieren_manip' => array(
            'symbol' => 'sortieren',
            'beschriftung' => array(
                'beschriftung' => '{liste1} sortieren',
            ),
        ),
        'sortieren_eigenschaft_zuruecksetzen' => array(
            'symbol' => 'loeschen',
            'beschriftung' => array(
                'beschriftung' => 'Eigenschaft zurücksetzen',
            ),
            'farbe' => 'danger',
        ),
        'gruppieren_manip' => array(
            'symbol' => 'gruppieren',
            'beschriftung' => array(
                'beschriftung' => '{liste1} gruppieren',
            ),
        ),
        'gruppieren_eigenschaft_zuruecksetzen' => array(
            'symbol' => 'loeschen',
            'beschriftung' => array(
                'beschriftung' => 'Eigenschaft zurücksetzen',
            ),
            'farbe' => 'danger',
        ),

        'element_erstellen' => array(
            'symbol' => 'erstellen',
            'beschriftung' => array(
                'beschriftung' => '{element1} erstellen',
                'bestaetigung' => 'Willst du wirklich {element1} erstellen?',
                'erfolg' => '{element1} wurde erfolgreich erstellt.',
                'fehler' => '{element1} konnte nicht erstellt werden!'
            ),
        ),
        'element_aendern' => array(
            'symbol' => 'aendern',
            'beschriftung' => array(
                'beschriftung' => '{element1} ändern',
                'bestaetigung' => 'Willst du wirklich {element1} ändern?',
                'erfolg' => '{element1} wurde erfolgreich geändert.',
                'fehler' => '{element1} konnte nicht geändert werden!'
            ),
        ),
        'element_duplizieren' => array(
            'symbol' => 'duplizieren',
            'beschriftung' => array(
                'beschriftung' => '{element1} duplizieren',
                'bestaetigung' => 'Willst du wirklich {element1} duplizieren?',
                'erfolg' => '{element1} wurde erfolgreich dupliziert.',
                'fehler' => '{element1} konnte nicht dupliziert werden!'
            ),
        ),
        'element_loeschen' => array(
            'symbol' => 'loeschen',
            'beschriftung' => array(
                'beschriftung' => '{element1} löschen',
                'bestaetigung' => 'Willst du wirklich {element1} löschen?',
                'erfolg' => '{element1} wurde erfolgreich gelöscht.',
                'fehler' => '{element1} konnte nicht gelöscht werden!',
            ),
            'farbe' => 'danger',
        ),
        'element_loeschen_weiterleiten' => array(
            'symbol' => 'loeschen',
            'beschriftung' => array(
                'beschriftung' => '{element1} löschen',
            ),
            'farbe' => 'danger', 
        ),

        'bearbeiten_modus_ein_ausschalten' => array(
            'symbol' => 'werkzeuge',
            'beschriftung' => array(
                'beschriftung' => 'Bearbeiten-Modus ein-/ausschalten',
            ),
        ),

        'sortable' => array(
            'symbol' => 'sortable',
            'beschriftung' => array(
                'beschriftung' => '{liste1} sortieren',
            ),
        ),

        'bemerkung_aendern' => array(
            'symbol' => 'bemerkung',
            'beschriftung' => array(
                'beschriftung' => 'Bemerkung ändern',
                'bestaetigung' => 'Willst du wirklich die Bemerkung ändern?',
                'erfolg' => 'Bemerkung wurde erfolgreich geändert.',
                'fehler' => 'Bemerkung konnte nicht geändert werden!',
            ),
        ),

        'rechte_vergeben' => array(
            'symbol' => 'rechte_vergeben',
            'beschriftung' => array(
                'beschriftung' => 'Rechte vergeben',
            ),
        ),
        'vergebenes_recht_erstellen' => array(
            'symbol' => 'pos_zuordnung',
            'beschriftung' => array(
                'beschriftung' => 'Recht vergeben',
            ),
        ),
        'einmal_link_anzeigen' => array(
            'symbol' => 'einmal_link_anzeigen',
            'beschriftung' => array(
                'beschriftung' => 'Einmal-Link anzeigen',
                'bestaetigung' => 'Willst du wirklich für {element1} einen neuen Einmal-Link erstellen und anzeigen?',
                'erfolg' => 'Einmal-Link für {element1} wurde erfolgreich erstellt und angezeigt.',
                'fehler' => 'Einmal-Link für {element1} konnte nicht erstellt und angezeigt werden!',
            ),
        ),
        'einmal_link_email' => array(
            'symbol' => 'einmal_link_email',
            'beschriftung' => array(
                'beschriftung' => 'Einmal-Link per Email verschicken',
                'bestaetigung' => 'Willst du wirklich für {element1} einen neuen Einmal-Link erstellen und per Email verschicken?',
                'erfolg' => 'Einmal-Link für {element1} wurde erfolgreich erstellt und per Email verschickt.',
                'fehler' => 'Einmal-Link für {element1} konnte nicht erstellt und per Email verschickt werden!',
            ),
        ),
        'passwort_aendern' => array(
            'symbol' => 'passwort_aendern',
            'beschriftung' => array(
                'beschriftung' => 'Passwort ändern',
                'bestaetigung' => 'Willst du wirklich dein Passwort ändern?',
                'erfolg' => 'Dein Passwort wurde erfolgreich geändert.',
                'fehler' => 'Dein Passwort konnte nicht geändert werden!',
            ),
        ),
        'passwort_festlegen' => array(
            'symbol' => 'passwort_aendern',
            'beschriftung' => array(
                'beschriftung' => 'Passwort festlegen',
                'bestaetigung' => 'Willst du wirklich ein neues Passwort festlegen?',
                'erfolg' => 'Neues Passwort wurde erfolgreich festgelegt.',
                'fehler' => 'Neues Passwort konnte nicht festgelegt werden!',
            ),
        ),
        'passwort_anzeigen' => array(
            'symbol' => 'unsichtbar',
            'beschriftung' => array(
                'beschriftung' => 'Passwort anzeigen',
            ),
        ),
        'meine_daten_aendern' => array(
            'symbol' => 'aendern',
            'beschriftung' => array(
                'beschriftung' => 'Meine Daten ändern',
            ),
        ),

        'termine_aufgaben_zuordnen' => array(
            'symbol' => 'aufgaben',
            'beschriftung' => array(
                'beschriftung' => 'Aufgaben zuordnen',
            ),
        ),
        'aufgaben_zuordnung_termine_erstellen' => array(
            'symbol' => 'pos_zuordnung',
            'beschriftung' => array(
                'beschriftung' => 'Zuordnung machen',
            ),
        ),
        'aufgaben_rueckmeldungen_verwalten' => array(
            'symbol' => 'pos_rueckmeldung',
            'beschriftung' => array(
                'beschriftung' => 'Aufgabe-Rückmeldungen verwalten',
            ),
        ),
        'aufgaben_rueckmeldung_erstellen' => array(
            'symbol' => 'angenommen_rueckmeldung',
            'beschriftung' => array(
                'beschriftung' => 'Rückmeldung machen',
            ),
        ),

        'termine_rueckmeldungen_verwalten' => array(
            'symbol' => 'pos_rueckmeldung',
            'beschriftung' => array(
                'beschriftung' => 'Termin-Rückmeldungen verwalten',
            ),
        ),
        'termine_rueckmeldung_erstellen' => array(
            'symbol' => 'angenommen_rueckmeldung',
            'beschriftung' => array(
                'beschriftung' => 'Rückmeldung machen',
            ),
        ),
        'termine_anwesenheiten_dokumentieren' => array(
            'symbol' => 'anwesenheiten_dokumentieren',
            'beschriftung' => array(
                'beschriftung' => 'Termin-Anwesenheiten dokumentieren',
            ),
        ),
        'termine_anwesenheit_erstellen' => array(
            'symbol' => 'pos_zuordnung',
            'beschriftung' => array(
                'beschriftung' => 'Termin-Anwesenheit dokumentieren',
            ),
        ),

        'strafen_zuweisen' => array(
            'symbol' => 'strafen_zuweisen',
            'beschriftung' => array(
                'beschriftung' => 'Strafe einem Mitglied zuweisen',
            ),
        ),
        'strafkatalog_zugewiesene_strafe_erstellen' => array(
            'symbol' => 'strafen_zuweisen',
            'beschriftung' => array(
                'beschriftung' => 'Strafe einem Mitglied zuweisen',
                'bestaetigung' => 'Willst du wirklich {element2} die Strafe {element1} zuweisen?',
                'erfolg' => '{element2} wurde erfolgreich die Strafe {element1} zugewiesen.',
                'fehler' => '{element2} konnte nicht die Strafe {element1} zugewiesen werden!',
            ),
        ),
        'setliste_verwalten' => array(
            'symbol' => 'setliste',
            'beschriftung' => array(
                'beschriftung' => 'Setliste verwalten',
            ),
        ),
        'notenbank_setlisteneintrag_erstellen' => array(
            'symbol' => 'pos_zuordnung',
            'beschriftung' => array(
                'beschriftung' => 'Titel hinzufügen',
            ),
        ),
    );

    /**
     * --------------------------------------------------------------------------
     * Zusatzsymbole
     * --------------------------------------------------------------------------
     * 
     * Aktuell lediglich als Platzhalter
     */
    public $zusatzsymbole = array(
        'geburtstag' => array( 'aktualisieren_aktion' => NULL, ),
        'kategorie' => array( 'aktualisieren_aktion' => NULL, ),
        'bemerkung' => array( 'aktualisieren_aktion' => NULL, ),
        'vergebene_rechte' => array( 'aktualisieren_aktion' => NULL, ),
        'aufgaben_zuordnungen_termine' => array( 'aktualisieren_aktion' => NULL, ),
        'termine_rueckmeldungen' => array( 'aktualisieren_aktion' => NULL, ),
        'termine_anwesenheiten' => array( 'aktualisieren_aktion' => NULL, ),
        'strafkatalog_zugewiesene_strafen' => array( 'aktualisieren_aktion' => NULL, ),
        'notenbank_setliste' => array( 'aktualisieren_aktion' => NULL, ),
    );

    /**
     * --------------------------------------------------------------------------
     * Listen
     * --------------------------------------------------------------------------
     */
    public $listen = array(
        'mitglieder' => array(
            'beschriftung' => 'Mitglieder',
            'controller' => 'mitglieder',
            'element' => 'mitglied',
            'element_beschriftung' => 'Mitglied',
            'element_beschriftung_erweitert' => array(
                array( 'eigenschaft' => 'vorname' ),
                array( 'eigenschaft' => 'nachname', 'prefix' => ' ' )
            ),
        ),
        'verfuegbare_rechte' => array(
            'beschriftung' => 'Verfügbare Rechte',
            'controller' => 'mitglieder',
            'element' => 'verfuegbares_recht',
            'element_beschriftung' => 'Verfügbares Recht',
        ),
        'vergebene_rechte' => array(
            'beschriftung' => 'Vergebene Rechte',
            'controller' => 'mitglieder',
            'element' => 'vergebenes_recht',
            'element_beschriftung' => 'Vergebenes Recht',
        ),

        'aufgaben' => array(
            'beschriftung' => 'Aufgaben',
            'controller' => 'aufgaben',
            'element' => 'aufgabe',
            'element_beschriftung' => 'Aufgabe',
            'element_beschriftung_erweitert' => array( array( 'eigenschaft' => 'titel' ) ),
        ),
        'aufgaben_rueckmeldungen' => array(
            'beschriftung' => 'Rückmeldungen',
            'controller' => 'aufgaben',
            'element' => 'aufgaben_rueckmeldung',
            'element_beschriftung' => 'Rückmeldung',
        ),
        'aufgaben_zuordnungen_termine' => array(
            'beschriftung' => 'Termin-Zuordnungen',
            'controller' => 'aufgaben',
            'element' => 'aufgaben_zuordnung_termine',
            'element_beschriftung' => 'Termin-Zuordnung',
        ),

        'termine' => array(
            'beschriftung' => 'Termine',
            'controller' => 'termine',
            'element' => 'termin',
            'element_beschriftung' => 'Termin',
            'element_beschriftung_erweitert' => array(
                array( 'eigenschaft' => 'titel' ),
                array( 'eigenschaft' => 'start', 'prefix' => ' (', 'suffix' => ')' )
            ),
        ),
        'termine_rueckmeldungen' => array(
            'beschriftung' => 'Rückmeldungen',
            'controller' => 'termine',
            'element' => 'termine_rueckmeldung',
            'element_beschriftung' => 'Rückmeldung',
        ),
        'termine_anwesenheiten' => array(
            'beschriftung' => 'Anwesenheiten',
            'controller' => 'termine',
            'element' => 'termine_anwesenheit',
            'element_beschriftung' => 'Anwesenheit',
        ),

        'strafkatalog' => array(
            'beschriftung' => 'Strafkatalog',
            'controller' => 'strafkatalog',
            'element' => 'strafe',
            'element_beschriftung' => 'Strafe',
            'element_beschriftung_erweitert' => array(
                array( 'eigenschaft' => 'titel' ),
                array( 'eigenschaft' => 'wert', 'prefix' => ' (', 'suffix' => ')' )
            ),
        ),
        'strafkatalog_zugewiesene_strafen' => array(
            'beschriftung' => 'Zugewiesene Strafen',
            'controller' => 'strafkatalog',
            'element' => 'strafkatalog_zugewiesene_strafe',
            'element_beschriftung' => 'Zugewiesene Strafe',
        ),

        'notenbank' => array(
            'beschriftung' => 'Notenbank',
            'controller' => 'notenbank',
            'element' => 'titel',
            'element_beschriftung' => 'Titel',
            'element_beschriftung_erweitert' => array(
                array( 'eigenschaft' => 'titel_nr' ),
                array( 'eigenschaft' => 'titel', 'prefix' => ' ' )
            ),
        ),
        'notenbank_setliste' => array(
            'beschriftung' => 'Setliste',
            'controller' => 'notenbank',
            'element' => 'notenbank_setlisteneintrag',
            'element_beschriftung' => 'Setlisteneintrag',
        ),
    );

    /**
     * Viewdata
     */
    public $viewdata = array(

        'mitglieder' => array(
            'liste' => 'mitglieder',
            'filtern' => array( 'aktiv_janein' => array( 'inklusiv' => array( TRUE ), ), 'real_janein' => array( 'inklusiv' => array( TRUE ), ) ),
            'sortieren' => array( 'eigenschaft' => 'nachname', 'richtung' => SORT_ASC, ),
            // '[element]_id' => 42,
            // 'disabled_ids' => array(),
            'werkzeuge' => array( 'sortieren_manip', 'filtern_manip', ),
            'listenstatistik' => array( 'anzahl' => array() ),
            // 'ueberschrift' => 'Alle Mitglider',
            'element' => array(
                'werkzeuge' => array(),
                'zusatzsymbole' => array('geburtstag'),
                'beschriftung' => '<span class="eigenschaft" eigenschaft="vorname"></span> <span class="eigenschaft" eigenschaft="nachname"></span>',
                // 'link' => array( 'liste' => 'mitglieder', 'eigenschaften' => array( 'id', ), ),
                // 'vorschau' => array( 'register', 'geburtstag', 'alter', 'wohnort', 'auto', 'funktion' ),
                // 'verknuepfungen' => 'termine_rueckmeldungen',
            ),
        ),

        'verfuegbare_rechte' => array(
            'liste' => 'verfuegbare_rechte',
            'filtern' => array(),
            'sortieren' => array(),
            'werkzeuge' => array(),
            'listenstatistik' => array(),
            'element' => array(
                'werkzeuge' => array(),
                'beschriftung' => '<span class="eigenschaft" eigenschaft="titel"></span>',
            ),
        ),

        'vergebene_rechte' => array(
            'liste' => 'vergebene_rechte',
            'filtern' => array(),
            'sortieren' => array(),
            'werkzeuge' => array(),
            'listenstatistik' => array(),
            'element' => array(
                'werkzeuge' => array(),
            ),
        ),

        'aufgaben' => array(
            'liste' => 'aufgaben',
            'filtern' => array(),
            'sortieren' => array( 'eigenschaft' => 'titel', 'richtung' => SORT_ASC, ),
            'werkzeuge' => array( 'sortieren_manip', 'filtern_manip', ),
            'listenstatistik' => array( 'anzahl' => array() ),
            'element' => array(
                'werkzeuge' => array(),
                'beschriftung' => '<span class="eigenschaft" eigenschaft="titel"></span>',
            ),
        ),

        'aufgaben_rueckmeldungen' => array(
            'liste' => 'aufgaben_rueckmeldungen',
            'filtern' => array(),
            'sortieren' => array(),
            'werkzeuge' => array(),
            'listenstatistik' => array(),
            'element' => array(
                'werkzeuge' => array(),
            ),
        ),

        'aufgaben_zuordnungen_termine' => array(
            'liste' => 'aufgaben_zuordnungen_termine',
            'filtern' => array(),
            'sortieren' => array( 'eigenschaft' => 'aufgabe_titel', 'richtung' => SORT_ASC, ),
            'werkzeuge' => array( 'sortieren_manip', 'filtern_manip', ),
            'listenstatistik' => array( 'anzahl' => array() ),
            'element' => array(
                'werkzeuge' => array(),
            ),
        ),

        'termine' => array(
            'liste' => 'termine',
            'filtern' => array( 'start' => array( 'start' => HEUTE ), 'ich_eingeladen_janein' => array( 'inklusiv' => array( TRUE ) ), ),
            'sortieren' => array( 'eigenschaft'=> 'start', 'richtung'=> SORT_ASC, ),
            'werkzeuge' => array( 'sortieren_manip', 'filtern_manip', ),
            'listenstatistik' => array( 'anzahl' => array() ),
            'element' => array(
                'werkzeuge' => array(),
                'zusatzsymbole' => array('kategorie'),
                'beschriftung' => '<span class="eigenschaft" eigenschaft="titel"></span>',
            ),
        ),

        'termine_rueckmeldungen' => array(
            'liste' => 'termine_rueckmeldungen',
            'filtern' => array(),
            'sortieren' => array(),
            'werkzeuge' => array(),
            'listenstatistik' => array(),
            'element' => array(
                'werkzeuge' => array(),
            ),
        ),

        'termine_anwesenheiten' => array(
            'liste' => 'termine_anwesenheiten',
            'filtern' => array(),
            'sortieren' => array(),
            'werkzeuge' => array(),
            'listenstatistik' => array(),
            'element' => array(
                'werkzeuge' => array(),
            ),
        ),

        'strafkatalog' => array(
            'liste' => 'strafkatalog',
            'filtern' => array(),
            'sortieren' => array( 'eigenschaft' => 'kategorie', 'richtung' => SORT_ASC, ),
            'werkzeuge' => array( 'sortieren_manip', 'filtern_manip', ),
            'listenstatistik' => array( 'anzahl' => array() ),
            'element' => array(
                'werkzeuge' => array(),
                'beschriftung' => '<span class="eigenschaft" eigenschaft="titel"></span>',
            ),
        ),

        'strafkatalog_zugewiesene_strafen' => array(
            'liste' => 'strafkatalog_zugewiesene_strafen',
            'filtern' => array(),
            'sortieren' => array(),
            'werkzeuge' => array( 'sortieren_manip', 'filtern_manip', ),
            'listenstatistik' => array( 'anzahl' => array(), 'summe' => array( 'eigenschaft' => 'strafe_wert' ) ),
            'element' => array(
                'werkzeuge' => array(),
            ),
        ),

        'notenbank' => array(
            'liste' => 'notenbank',
            'filtern' => array(),
            'sortieren' => array( 'eigenschaft' => 'titel_nr', 'richtung' => SORT_ASC, ),
            'werkzeuge' => array( 'sortieren_manip', 'filtern_manip', ),
            'listenstatistik' => array( 'anzahl' => array() ),
            'element' => array(
                'werkzeuge' => array(),
                'beschriftung' => '<span class="eigenschaft" eigenschaft="titel_nr"></span> <span class="eigenschaft" eigenschaft="titel"></span>',
            ),
        ),

        'notenbank_setliste' => array(
            'liste' => 'notenbank_setliste',
            'filtern' => array(),
            'sortieren' => array( 'eigenschaft' => 'status', 'richtung' => SORT_ASC, ),
            'werkzeuge' => array( 'sortieren_manip', 'filtern_manip', ),
            'listenstatistik' => array( 'anzahl' => array() ),
            'element' => array(
                'werkzeuge' => array(),
            ),
        ),

    );

    /**
     * Eigenschaften
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

        'strafkatalog_zugewiesene_strafen' => array(
            'id' => array( 'beschriftung' => 'ID', 'typ' => 'element_id' ),
            'strafe_id' => array( 'beschriftung' => 'Strafe-ID', 'typ' => 'element_id' ),
            'mitglied_id' => array( 'beschriftung' => 'Mitglied-ID', 'typ' => 'element_id' ),
            'status' => array( 'beschriftung' => 'Status', 'typ' => 'zahl' ),
            'bemerkung' => array( 'beschriftung' => 'Bemerkung', 'typ' => 'text' ),
            'strafe_titel' => array( 'beschriftung' => 'Titel der Strafe', 'typ' => 'text' ),               // JAVA
            'strafe_wert' => array( 'beschriftung' => 'Wert der Strafe', 'typ' => 'zahl' ),                 // JAVA
            'mitglied_vorname' => array( 'beschriftung' => 'Vorname des Mitglieds', 'typ' => 'text' ),      // JAVA
            'mitglied_nachname' => array( 'beschriftung' => 'Nachname des Mitglieds', 'typ' => 'text' ),    // JAVA
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
     * Vorgegebene Werte zu Eigenschaften
     *
     * Werte, die zu den Eigenschaften vorgegeben sind
     * und bspw. ausgewählt werden können
     */
    public $vorgegebene_werte = array(

        'mitglieder' => array(

            'geschlecht' => array (
                'm' => 'Männl.',
                'w' => 'Weibl.',
                'd' => 'Keine Angabe',
            ),

            'register' => array (
                'ohne' => 'ohne Instrument',
                'dirigent' => 'Dirigent',
                'ebass' => 'E-Bass',
                'querfloete' => 'Querflöte',
                'fluegelhorn' => 'Flügelhorn',
                'klarinette' => 'Klarinette',
                'posaune' => 'Posaune',
                'saxophon' => 'Saxophon',
                'schlagzeug' => 'Schlagzeug',
                'tenorhorn' => 'Tenorhorn',
                'trompete' => 'Trompete',
                'tuba' => 'Tuba',
                'waldhorn' => 'Waldhorn',
            ),

            'auto' => array (
                'ohne' => 'ohne Auto',
                'bus' => 'Bus',
                'auto_1' => 'Auto 1',
                'auto_2' => 'Auto 2',
                'auto_3' => 'Auto 3',
                'auto_4' => 'Auto 4',
            ),

            'funktion' => array (
                'ohne' => 'keine Funktion',
                'vorsitz' => 'Vorstand',
                'schriftfuehrer' => 'Schriftführung',
                'kasse' => 'Kasse',
                'jugend' => 'Jugendleitung',
                'presse' => 'Presse',
                'beisitz' => 'Beisitz',
                'instrumente' => 'Instrumentenwart',
                'noten' => 'Notenwart',
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
                'allgemein' => 'Allgemein',
                'auftritt' => 'Auftritt',
                'probe' => 'Musikprobe',
                'vorstandschaftssitzung' => 'Vorstandschaftssitzung',
            ),

        ),

        'termine' => array(

            'kategorie' => array (
                'allgemein' => 'Allgemein',
                'auftritt' => 'Auftritt',
                'probe' => 'Musikprobe',
                'vorstandschaftssitzung' => 'Vorstandschaftssitzung',
            ),

        ),

        'termine_rueckmeldungen' => array(
        ),

        'termine_anwesenheiten' => array(
        ),

        'strafkatalog' => array(

            'kategorie' => array (
                'ohne' => 'Sonstiges',
                'proben' => 'Proben',
                'veranstaltungen' => 'Veranstaltungen',
                'haessordnung' => 'Häßordnung',
            ),

        ),

        'strafkatalog_zugewiesene_strafen' => array(
        ),

        'notenbank' => array(

            'kategorie' => array (
                'ohne' => 'Ohne Zuordnung',
                'modern' => 'Modern',
                'klassik' => 'Klassik',
                'kirche' => 'Kirche',
                'volkstuemlich' => 'Volkstümlich',
            ),

        ),

        'notenbank_setliste' => array(

            'titel_kategorie' => array (
                'ohne' => 'Ohne Zuordnung',
                'modern' => 'Modern',
                'klassik' => 'Klassik',
                'kirche' => 'Kirche',
                'volkstuemlich' => 'Volkstümlich',
            ),

        ),

    );

    
    /**
     * Vorgegebene Filter
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
     * Filterbare Eigenschaften
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

        'strafkatalog_zugewiesene_strafen' => array(
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
     * Sortierbare Eigenschaften
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

        'strafkatalog_zugewiesene_strafen' => array(
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
     * Gruppierbare Eigenschaften
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

        'strafkatalog_zugewiesene_strafen' => array(
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
     * Mitglieder-Eigenschaften Vorschau
     *
     * Angezeigte Mitglieder-Eigenschaften als Vorschau
     */
    public $mitglieder_eigenschaften_vorschau = array( 'register', 'geburtstag', 'alter', 'wohnort', 'auto', 'funktion', );

    /**
     * Mitglieder-Auswertungen
     *
     * Vordefinierte Filter (nach Liste)
     */
    public $mitglieder_auswertungen_filtern = array(
        'termine_rueckmeldungen' => array( 'start' => array( 'start' => JAHRESBEGINN ), ),
        'termine_anwesenheiten' => array( 'start' => array( 'start' => JAHRESBEGINN, 'ende' => NAECHSTER_JAHRESBEGINN ), 'kategorie' => array( 'inklusiv' => array( 'probe' ), ), ),
    );

    /**
     * Termin-Kategorie filtern_mitglieder
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
     * Termin-Kategorie Statussymbole
     * --------------------------------------------------------------------------
     */
    public $termine_kategorie_statussymbole = array(
        'allgemein' => '',
        'auftritt' => '&#127930',
        'probe' => '&#128218',
        'vorstandschaftssitzung' => '&#128186',
    );

    /**
     * JSON-Export der öffentlichen Termine
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
     * ICS-Export der Termine
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
     * Notenbank Verzeichnis Anzahl Ziffern
     *
     * Anzahl der Ziffern zu Beginn des Verzeichnis-Namens im storage
     * (Ziffern entsprechen der Titel-Nr. und damit orientiert sich die Anzahl
     * der Ziffern an der Größe der Notenbank)
     * Bsp.: storage/notenbank/verzeichnis.pdf
     */
    public $notenbank_verzeichnis = '';

    /**
     * Notenbank Verzeichnis Anzahl Ziffern
     *
     * Anzahl der Ziffern zu Beginn des Verzeichnis-Namens im storage
     * (Ziffern entsprechen der Titel-Nr. und damit orientiert sich die Anzahl
     * der Ziffern an der Größe der Notenbank)
     */
    public $notenbank_anzahl_ziffern = 3;

    /**
     * Notenbank Verzeichnis erlaubte Dateitypen
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
     * Verknüpfungen
     */
    public $verknuepfungen = array(
        'vergebene_rechte' => array(
            'verknuepfte_listen' => array( 'verfuegbare_rechte', 'mitglieder', ),
            'typ' => 'janein_auswahl',
            'bestaetigung_einfordern' => FALSE,
            'nur_eins_erlaubt_janein' => TRUE,
            'status_erlaubt' => array(
                0 => array( 'farbe' => 'danger', 'aktiv' => '<i class="bi bi-'.SYMBOLE['neg_zuordnung'].'"></i>' ),
                1 => array( 'farbe' => 'success', 'aktiv' => '<i class="bi bi-'.SYMBOLE['pos_zuordnung'].'"></i>' ),
             ),
        ),
        'aufgaben_rueckmeldungen' => array(
            'verknuepfte_listen' => array( 'aufgaben', 'mitglieder', ),
            'typ' => 'status_auswahl',
            'bestaetigung_einfordern' => FALSE,
            'nur_eins_erlaubt_janein' => TRUE,
            'status_erlaubt' => array(
                0 => array( 'farbe' => 'secondary', 'aktiv' => '<i class="bi bi-'.SYMBOLE['ohne_rueckmeldung'].'"></i>', 'passiv' => '<i class="bi bi-'.SYMBOLE['ohne_rueckmeldung'].'"></i>' ),
                1 => array( 'farbe' => 'primary', 'aktiv' => '<i class="bi bi-'.SYMBOLE['angenommen_rueckmeldung'].'"></i>', 'passiv' => '<i class="bi bi-'.SYMBOLE['angenommen_rueckmeldung'].'-fill"></i>' ),
                2 => array( 'farbe' => 'success', 'aktiv' => '<i class="bi bi-'.SYMBOLE['erledigt'].'"></i>', 'passiv' => '<i class="bi bi-'.SYMBOLE['erledigt'].'"></i>' ),
            ),
        ),
        'aufgaben_zuordnungen_termine' => array(
            'verknuepfte_listen' => array( 'aufgaben', 'termine', ),
            'typ' => 'janein_auswahl',
            'bestaetigung_einfordern' => FALSE,
            'nur_eins_erlaubt_janein' => TRUE,
            'status_erlaubt' => array(
                0 => array( 'farbe' => 'danger', 'aktiv' => '<i class="bi bi-'.SYMBOLE['neg_zuordnung'].'"></i>' ),
                1 => array( 'farbe' => 'success', 'aktiv' => '<i class="bi bi-'.SYMBOLE['pos_zuordnung'].'"></i>' ),
             ),
        ),
        'termine_rueckmeldungen' => array(
            'verknuepfte_listen' => array( 'termine', 'mitglieder', ),
            'typ' => 'status_auswahl',
            'bestaetigung_einfordern' => FALSE,
            'nur_eins_erlaubt_janein' => TRUE,
            'status_erlaubt' => array(
                0 => array( 'farbe' => 'secondary', 'aktiv' => '<i class="bi bi-'.SYMBOLE['ohne_rueckmeldung'].'"></i>', 'passiv' => '<i class="bi bi-'.SYMBOLE['ohne_rueckmeldung'].'"></i>' ),
                1 => array( 'farbe' => 'success', 'aktiv' => '<i class="bi bi-'.SYMBOLE['pos_rueckmeldung'].'"></i>', 'passiv' => '<i class="bi bi-'.SYMBOLE['pos_rueckmeldung'].'-fill"></i>' ),
                2 => array( 'farbe' => 'danger', 'aktiv' => '<i class="bi bi-'.SYMBOLE['neg_rueckmeldung'].'"></i>', 'passiv' => '<i class="bi bi-'.SYMBOLE['neg_rueckmeldung'].'-fill"></i>' ),
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
            'verknuepfte_listen' => array( 'termine', 'mitglieder', ),
            'typ' => 'janein_auswahl',
            'bestaetigung_einfordern' => FALSE,
            'nur_eins_erlaubt_janein' => TRUE,
            'status_erlaubt' => array(
                0 => array( 'farbe' => 'danger', 'aktiv' => '<i class="bi bi-'.SYMBOLE['neg_zuordnung'].'"></i>'),
                1 => array( 'farbe' => 'success', 'aktiv' => '<i class="bi bi-'.SYMBOLE['pos_zuordnung'].'"></i>' ),
             ),
        ),
        'strafkatalog_zugewiesene_strafen' => array(
            'verknuepfte_listen' => array( 'strafkatalog', 'mitglieder', ),
            'typ' => 'element_auswahl',
            'bestaetigung_einfordern' => TRUE,
            'nur_eins_erlaubt_janein' => FALSE,
            'status_erlaubt' => array(
                0 => array( 'farbe' => 'secondary', 'aktiv' => '<i class="bi bi-'.SYMBOLE['ohne_rueckmeldung'].'"></i>' ),
                1 => array( 'farbe' => 'warning', 'aktiv' => '<i class="bi bi-'.SYMBOLE['offen'].'"></i>' ),
                2 => array( 'farbe' => 'danger', 'aktiv' => '<i class="bi bi-'.SYMBOLE['pos_zuordnung'].'"></i>' ),
             ),
        ),
        'notenbank_setliste' => array(
            'verknuepfte_listen' => array( 'notenbank', 'termine', ),
            'typ' => 'element_auswahl',
            'bestaetigung_einfordern' => FALSE,
            'nur_eins_erlaubt_janein' => FALSE,
            'status_erlaubt' => array(
                0 => array( 'farbe' => 'danger', 'aktiv' => '<i class="bi bi-'.SYMBOLE['neg_zuordnung'].'"></i>'),
                1 => array( 'farbe' => 'success', 'aktiv' => '<i class="bi bi-'.SYMBOLE['pos_zuordnung'].'"></i>' ),
             ),
        ),
    );

    /**
     * JSON-Export Verzeichnis
     *
     * Verzeichnis, das beim Export einer Liste
     * in ein json-Format verwendet bzw. erstellt wird
     */
    public $json_export_verzeichnis = 'json_export/';

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
     * LocalStorage Reset erzwingen
     * --------------------------------------------------------------------------
     *
     * Wenn der LocalStorage auf allen verwendeten Geräten einmal geleert werden
     * soll, dann muss der jetzige Zeitpunkt definiert werden
     * Winterzeit: +01:00 / Sommerzeit: +02:00
     */
    public $force_localstorage_reset_zeitpunkt = '2025-05-21T16:00:00.000+02:00';

}
