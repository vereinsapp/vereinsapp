<?php

/*
 | --------------------------------------------------------------------
 | App Namespace
 | --------------------------------------------------------------------
 |
 | This defines the default Namespace that is used throughout
 | CodeIgniter to refer to the Application directory. Change
 | this constant to change the namespace that all application
 | classes should use.
 |
 | NOTE: changing this will require manually modifying the
 | existing namespaces of App\* namespaced-classes.
 */
defined('APP_NAMESPACE') || define('APP_NAMESPACE', 'App');

/*
 | --------------------------------------------------------------------------
 | Composer Path
 | --------------------------------------------------------------------------
 |
 | The path that Composer's autoload file is expected to live. By default,
 | the vendor folder is in the Root directory, but you can customize that here.
 */
defined('COMPOSER_PATH') || define('COMPOSER_PATH', ROOTPATH . 'vendor/autoload.php');

/*
 |--------------------------------------------------------------------------
 | Timing Constants
 |--------------------------------------------------------------------------
 |
 | Provide simple ways to work with the myriad of PHP functions that
 | require information to be in seconds.
 */
defined('SECOND') || define('SECOND', 1);
defined('MINUTE') || define('MINUTE', 60);
defined('HOUR')   || define('HOUR', 3600);
defined('DAY')    || define('DAY', 86400);
defined('WEEK')   || define('WEEK', 604800);
defined('MONTH')  || define('MONTH', 2_592_000);
defined('YEAR')   || define('YEAR', 31_536_000);
defined('DECADE') || define('DECADE', 315_360_000);

/*
 | --------------------------------------------------------------------------
 | Exit Status Codes
 | --------------------------------------------------------------------------
 |
 | Used to indicate the conditions under which the script is exit()ing.
 | While there is no universal standard for error codes, there are some
 | broad conventions.  Three such conventions are mentioned below, for
 | those who wish to make use of them.  The CodeIgniter defaults were
 | chosen for the least overlap with these conventions, while still
 | leaving room for others to be defined in future versions and user
 | applications.
 |
 | The three main conventions used for determining exit status codes
 | are as follows:
 |
 |    Standard C/C++ Library (stdlibc):
 |       http://www.gnu.org/software/libc/manual/html_node/Exit-Status.html
 |       (This link also contains other GNU-specific conventions)
 |    BSD sysexits.h:
 |       http://www.gsp.com/cgi-bin/man.cgi?section=3&topic=sysexits
 |    Bash scripting:
 |       http://tldp.org/LDP/abs/html/exitcodes.html
 |
 */
defined('EXIT_SUCCESS')        || define('EXIT_SUCCESS', 0);        // no errors
defined('EXIT_ERROR')          || define('EXIT_ERROR', 1);          // generic error
defined('EXIT_CONFIG')         || define('EXIT_CONFIG', 3);         // configuration error
defined('EXIT_UNKNOWN_FILE')   || define('EXIT_UNKNOWN_FILE', 4);   // file not found
defined('EXIT_UNKNOWN_CLASS')  || define('EXIT_UNKNOWN_CLASS', 5);  // unknown class
defined('EXIT_UNKNOWN_METHOD') || define('EXIT_UNKNOWN_METHOD', 6); // unknown class member
defined('EXIT_USER_INPUT')     || define('EXIT_USER_INPUT', 7);     // invalid user input
defined('EXIT_DATABASE')       || define('EXIT_DATABASE', 8);       // database error
defined('EXIT__AUTO_MIN')      || define('EXIT__AUTO_MIN', 9);      // lowest automatically-assigned error code
defined('EXIT__AUTO_MAX')      || define('EXIT__AUTO_MAX', 125);    // highest automatically-assigned error code

/**
 * @deprecated Use \CodeIgniter\Events\Events::PRIORITY_LOW instead.
 */
define('EVENT_PRIORITY_LOW', 200);

/**
 * @deprecated Use \CodeIgniter\Events\Events::PRIORITY_NORMAL instead.
 */
define('EVENT_PRIORITY_NORMAL', 100);

/**
 * @deprecated Use \CodeIgniter\Events\Events::PRIORITY_HIGH instead.
 */
define('EVENT_PRIORITY_HIGH', 10);

/*
|--------------------------------------------------------------------------
| VEREINSAPP Projekt-übergreifende Konstanten
|--------------------------------------------------------------------------*/

defined('LISTEN') OR define( 'LISTEN', array(
    'mitglieder' => array(
        'beschriftung' => 'Mitglieder',
        'controller' => 'mitglieder',
        'element' => 'mitglied',
        'abhaengig_von' => array(),
    ),
    'verfuegbare_rechte' => array(
        'beschriftung' => 'Verfügbare Rechte',
        'controller' => 'mitglieder',
        'element' => 'verfuegbares_recht',
        'abhaengig_von' => array(),
    ),
    'vergebene_rechte' => array(
        'beschriftung' => 'Vergebene Rechte',
        'controller' => 'mitglieder',
        'element' => 'vergebenes_recht',
        'abhaengig_von' => array( 'mitglieder', 'verfuegbare_rechte' ),
    ),

    'aufgaben' => array(
        'beschriftung' => 'Aufgaben',
        'controller' => 'aufgaben',
        'element' => 'aufgabe',
        'abhaengig_von' => array( 'mitglieder', 'termine', 'strafkatalog', 'kassenbuch', 'notenbank'),
    ),

    'termine' => array(
        'beschriftung' => 'Termine',
        'controller' => 'termine',
        'element' => 'termin',
        'abhaengig_von' => array( 'rueckmeldungen' ),
    ),
    'rueckmeldungen' => array(
        'beschriftung' => 'Rückmeldungen',
        'controller' => 'termine',
        'element' => 'rueckmeldung',
        'abhaengig_von' => array( /*'termine',*/ 'mitglieder' ),
    ),
    'anwesenheiten' => array(
        'beschriftung' => 'Anwesenheiten',
        'controller' => 'termine',
        'element' => 'anwesenheit',
        'abhaengig_von' => array( 'termine', 'mitglieder' ),
    ),

    'strafkatalog' => array(
        'beschriftung' => 'Strafkatalog',
        'controller' => 'strafkatalog',
        'element' => 'strafe',
        'abhaengig_von' => array(),
    ),
    'kassenbuch' => array(
        'beschriftung' => 'Kassenbuch',
        'controller' => 'strafkatalog',
        'element' => 'kassenbucheintrag',
        'abhaengig_von' => array( 'mitglieder' ),
    ),

    'notenbank' => array(
        'beschriftung' => 'Notenbank',
        'controller' => 'notenbank',
        'element' => 'titel',
        'abhaengig_von' => array(),
    ),
) );

defined('ELEMENTE') OR define( 'ELEMENTE', array(
    'mitglied' => array(
        'beschriftung' => 'Mitglied',
        'liste' => 'mitglieder',
        'element_beschriftung' => array(
            array( 'eigenschaft' => 'vorname' ),
            array( 'eigenschaft' => 'nachname', 'prefix' => ' ' )
        ),
    ),
    'verfuegbares_recht' => array(
        'beschriftung' => 'Verfügbares Recht',
        'liste' => 'verfuegbare_rechte',
        'element_beschriftung' => array(),
    ),
    'vergebenes_recht' => array(
        'beschriftung' => 'Vergebenes Recht',
        'liste' => 'vergebene_rechte',
        'element_beschriftung' => array(),
    ),

    'aufgabe' => array(
        'beschriftung' => 'Aufgabe',
        'liste' => 'aufgaben',
        'element_beschriftung' => array( array( 'eigenschaft' => 'titel' ) ),
    ),

    'termin' => array(
        'beschriftung' => 'Termin',
        'liste' => 'termine',
        'element_beschriftung' => array(
            array( 'eigenschaft' => 'titel' ),
            array( 'eigenschaft' => 'start', 'prefix' => ' (', 'suffix' => ')' )
        ),
    ),
    'rueckmeldung' => array(
        'beschriftung' => 'Rückmeldung',
        'liste' => 'rueckmeldungen',
        'element_beschriftung' => array(),
    ),
    'anwesenheit' => array(
        'beschriftung' => 'Anwesenheit',
        'liste' => 'anwesenheiten',
        'element_beschriftung' => array(),
    ),

    'strafe' => array(
        'beschriftung' => 'Strafe',
        'liste' => 'strafkatalog',
        'element_beschriftung' => array(
            array( 'eigenschaft' => 'titel' ),
            array( 'eigenschaft' => 'wert', 'prefix' => ' (', 'suffix' => ')' )
        ),
    ),
    'kassenbucheintrag' => array(
        'beschriftung' => 'Kassenbucheintrag',
        'liste' => 'kassenbuch',
        'element_beschriftung' => array(
            array( 'eigenschaft' => 'titel' ),
            array( 'eigenschaft' => 'wert', 'prefix' => ' (', 'suffix' => ')' )
        ),
    ),

    'titel' => array(
        'beschriftung' => 'Titel',
        'liste' => 'notenbank',
        'element_beschriftung' => array(
            array( 'eigenschaft' => 'titel_nr', 'prefix' => '[', 'suffix' => '] ' ),
            array( 'eigenschaft' => 'titel' )
        ),
    ),
) );

defined('JANEIN') OR define( 'JANEIN', array(
	0 => array( 'beschriftung' => 'Nein' ),
	1 => array( 'beschriftung' => 'Ja' ),
) );

defined('WOCHENTAGE_KURZ') OR define( 'WOCHENTAGE_KURZ', array(
	1 => array( 'beschriftung' => 'Mo.' ),
	2 => array( 'beschriftung' => 'Di.' ),
	3 => array( 'beschriftung' => 'Mi.' ),
	4 => array( 'beschriftung' => 'Do.' ),
	5 => array( 'beschriftung' => 'Fr.' ),
	6 => array( 'beschriftung' => 'Sa.' ),
	7 => array( 'beschriftung' => 'So.' ),
) );

defined('WOCHENTAGE_LANG') OR define( 'WOCHENTAGE_LANG', array(
	1 => array( 'beschriftung' => 'Montag' ),
	2 => array( 'beschriftung' => 'Dienstag' ),
	3 => array( 'beschriftung' => 'Mittwoch' ),
	4 => array( 'beschriftung' => 'Donnnerstag' ),
	5 => array( 'beschriftung' => 'Freitag' ),
	6 => array( 'beschriftung' => 'Samstag' ),
	7 => array( 'beschriftung' => 'Sonntag' ),
) );

defined('SYMBOLE') OR define( 'SYMBOLE', array(
    'einstellungen' => array( 'bootstrap' => 'gear' ),
    'mitglieder' => array ( 'bootstrap' => 'people' ),
    'aufgaben' => array ( 'bootstrap' => 'award' ),
    'termine' => array ( 'bootstrap' => 'calendar-event' ),
    'strafkatalog' => array ( 'bootstrap' => 'bank' ),
    'kassenbuch' => array( 'bootstrap' => 'journal-bookmark' ),
    'notenbank' => array ( 'bootstrap' => 'file-earmark-music' ),
    'startseite' => array ( 'bootstrap' => '' ),
    'status' => array( 'bootstrap' => 'circle-fill' ),
    'logout' => array( 'bootstrap' => 'door-open' ),

    'werkzeuge' => array( 'bootstrap' => 'tools' ),
    'erstellen' => array( 'bootstrap' => 'plus-lg' ),
    'aendern' => array( 'bootstrap' => 'pencil' ),
    'duplizieren' => array( 'bootstrap' => 'files' ),
    'loeschen' => array( 'bootstrap' => 'trash' ),
    'auswaehlen' => array( 'bootstrap' => 'box-arrow-in-down-left' ),
    'offen_erledigt_markieren' => array ( 'bootstrap' => 'check2-circle' ),
    'strafe_zuweisen' => array ( 'bootstrap' => 'journal-plus' ),
    'csv_export' => array ( 'bootstrap' => 'filetype-csv' ),

    'sortable' => array( 'bootstrap' => 'arrow-down-up' ),
    'collapse_oeffnen' => array( 'bootstrap' => 'caret-right' ),
    'collapse_schliessen' => array( 'bootstrap' => 'caret-down' ),
    'collapse' => array( 'bootstrap' => 'caret-down' ),
    'filtern' => array( 'bootstrap' => 'funnel' ),
    'sortieren' => array( 'bootstrap' => 'sort-down' ),
    'gruppieren' => array( 'bootstrap' => 'hdd-stack' ),
    'asc' => array( 'bootstrap' => 'sort-alpha-down' ),
    'desc' => array( 'bootstrap' => 'sort-alpha-up' ),
    'alle_checks_anwaehlen' => array( 'bootstrap' => 'toggle-on' ),
    'alle_checks_abwaehlen' => array( 'bootstrap' => 'toggle-off' ),
    'pfeil_links' => array( 'bootstrap' => 'arrow-left' ),
    'pfeil_rechts' => array( 'bootstrap' => 'arrow-right' ),
    'spacer' => array ( 'bootstrap' => 'dot' ),
    // 'info' => array( 'bootstrap' => 'info-circle' ),

    'anwesenheiten_dokumentieren' => array( 'bootstrap' => 'person-check' ),
    'statistiken' => array( 'bootstrap' => 'graph-up-arrow' ),
    'filtern_mitglieder' => array( 'bootstrap' => 'person-gear' ),
    'einmal_link_anzeigen' => array( 'bootstrap' => 'link' ),
    'einmal_link_email' => array( 'bootstrap' => 'envelope' ),

    'geburtstag' => array( 'bootstrap' => 'cake2' ),
    'bemerkung' => array( 'bootstrap' => 'chat-dots' ),

    'zahlenraum' => array( 'bootstrap' => '123' ),
    'zeitraum' => array( 'bootstrap' => 'calendar-range' ),
    'ort' => array( 'bootstrap' => 'geo-alt-fill' ),

    'sichtbar' => array( 'bootstrap' => 'eye' ),
    'unsichtbar' => array( 'bootstrap' => 'eye-slash' ),

    'offen' => array( 'bootstrap' => 'circle' ),
    'erledigt' => array( 'bootstrap' => 'check-circle' ),

    'verzeichnis' => array( 'bootstrap' => 'folder' ),
    'verzeichnis_geoeffnet' => array( 'bootstrap' => 'folder2-open' ),
    'pdf' => array( 'bootstrap' => 'file-earmark-pdf' ),
    'mp3' => array( 'bootstrap' => 'file-play' ),
    'm4a' => array( 'bootstrap' => 'file-play' ),
    'noten' => array( 'bootstrap' => 'file-earmark-music' ),
    'audio' => array( 'bootstrap' => 'play-btn' ),
) );

// enum ZUSTAND
// {
//     case FERTIG;
// }
