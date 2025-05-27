<?php

namespace Config;

// use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
// Create a new instance of our RouteCollection class.
$routes = Services::routes();

/*
 * --------------------------------------------------------------------
 * Router Setup
 * --------------------------------------------------------------------
 */
$routes->setDefaultNamespace('App\Controllers');
$routes->setDefaultController('Startseite');
$routes->setDefaultMethod('index');
$routes->setTranslateURIDashes(false);
$routes->set404Override();
// The Auto Routing (Legacy) is very dangerous. It is easy to create vulnerable apps
// where controller filters or CSRF protection are bypassed.
// If you don't want to define all routes, please use the Auto Routing (Improved).
// Set `$autoRoutesImproved` to true in `app/Config/Feature.php` and set the following to true.
// $routes->setAutoRoute(false);

/*
 * --------------------------------------------------------------------
 * Route Definitions
 * --------------------------------------------------------------------
 */

// $routes->get('(:any)', 'Status::wartungsarbeiten');

// We get a performance increase by specifying the default
// route since we don't have to scan directories.
$routes->get('/', 'Startseite::startseite');
$routes->get('startseite', 'Startseite::startseite');

$routes->group('einstellungen', static function ($routes) {
    $routes->get('',                                        'Einstellungen::einstellungen');
    $routes->get('einstellungen',                           'Einstellungen::einstellungen');
    $routes->post('ajax_tabellen',                          'Einstellungen::ajax_tabellen');
});

$routes->group('mitglieder', static function ($routes) {
    $routes->get('',                                        'Mitglieder::mitglieder');
    $routes->get('mitglieder',                              'Mitglieder::mitglieder');
    $routes->get('(:num)',                                  'Mitglieder::details/$1');
    $routes->get('details/(:num)',                          'Mitglieder::details/$1');

    $routes->post('ajax_mitglied_speichern',                'Mitglieder::ajax_mitglied_speichern');
    $routes->post('ajax_mitglied_passwort_aendern',         'Mitglieder::ajax_mitglied_passwort_aendern');
    $routes->post('ajax_mitglied_passwort_festlegen',       'Mitglieder::ajax_mitglied_passwort_festlegen');
    $routes->post('ajax_mitglied_einmal_link_erstellen',    'Mitglieder::ajax_mitglied_einmal_link_erstellen');
    $routes->post('ajax_mitglied_loeschen',                 'Mitglieder::ajax_mitglied_loeschen');

    $routes->post('ajax_vergebenes_recht_speichern',          'Mitglieder::ajax_vergebenes_recht_speichern');

    $routes->post('mitglied_einmal_link_email',             'Mitglieder::mitglied_einmal_link_email');
});

$routes->group('aufgaben', static function ($routes) {
    // $routes->get('',                                        'Aufgaben::aufgaben');
    // $routes->get('aufgaben',                                'Aufgaben::aufgaben');

    $routes->post('ajax_aufgabe_speichern',                 'Aufgaben::ajax_aufgabe_speichern');
    $routes->post('ajax_aufgabe_loeschen',                  'Aufgaben::ajax_aufgabe_loeschen');
});

$routes->group('termine', static function ($routes) {
    $routes->get('',                                        'Termine::termine');
    $routes->get('termine',                                 'Termine::termine');
    $routes->get('(:num)',                                  'Termine::details/$1');
    $routes->get('details/(:num)',                          'Termine::details/$1');
    $routes->get('json',                                    'Termine::termine_json');
    $routes->get('ics',                                     'Termine::termine_ics');

    $routes->post('ajax_termin_speichern',                  'Termine::ajax_termin_speichern');
    $routes->post('ajax_termin_loeschen',                   'Termine::ajax_termin_loeschen');

    $routes->post('ajax_rueckmeldung_speichern',            'Termine::ajax_rueckmeldung_speichern');

    $routes->post('ajax_anwesenheit_speichern',             'Termine::ajax_anwesenheit_speichern');
});

$routes->group('strafkatalog', static function ($routes) {
    $routes->get('',                                        'Strafkatalog::strafkatalog');
    $routes->get('strafkatalog',                            'Strafkatalog::strafkatalog');
    $routes->get('kassenbuch',                              'Strafkatalog::kassenbuch');

    $routes->post('ajax_strafe_speichern',                  'Strafkatalog::ajax_strafe_speichern');
    $routes->post('ajax_strafe_loeschen',                   'Strafkatalog::ajax_strafe_loeschen');
    
    $routes->post('ajax_kassenbucheintrag_speichern',       'Strafkatalog::ajax_kassenbucheintrag_speichern');
    $routes->post('ajax_kassenbucheintrag_loeschen',        'Strafkatalog::ajax_kassenbucheintrag_loeschen');
});

$routes->group('notenbank', static function ($routes) {
    $routes->get('',                                        'Notenbank::notenbank');
    $routes->get('notenbank',                               'Notenbank::notenbank');
    $routes->get('(:num)',                                  'Notenbank::details/$1');
    $routes->get('details/(:num)',                          'Notenbank::details/$1');

    $routes->post('ajax_titel_speichern',                   'Notenbank::ajax_titel_speichern');
    $routes->post('ajax_titel_loeschen',                    'Notenbank::ajax_titel_loeschen');
});

$routes->group('status', static function ($routes) {
    $routes->get('wartungsarbeiten', 'Status::wartungsarbeiten');
    $routes->post('ajax_datenschutz_richtlinie', 'Status::ajax_datenschutz_richtlinie');
});

service('auth')->routes($routes);
