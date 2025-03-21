<?php

namespace App\Controllers;

use CodeIgniter\Controller;
use CodeIgniter\HTTP\CLIRequest;
use CodeIgniter\HTTP\IncomingRequest;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use Psr\Log\LoggerInterface;

/**
 * Class BaseController
 *
 * BaseController provides a convenient place for loading components
 * and performing functions that are needed by all your controllers.
 * Extend this class in any new controllers:
 *     class Home extends BaseController
 *
 * For security be sure to declare any new methods as protected or private.
 */
abstract class BaseController extends Controller
{
    /**
     * Instance of the main Request object.
     *
     * @var CLIRequest|IncomingRequest
     */
    protected $router, $request, $validation, $session;

    /**
     * An array of helpers to be loaded automatically upon
     * class instantiation. These helpers will be available
     * to all other controllers that extend BaseController.
     *
     * @var list<string>
     */
    protected $helpers = [
        'filesystem',
      ];

    /**
     * Be sure to declare properties for any property fetch you initialized.
     * The creation of dynamic property is deprecated in PHP 8.2.
     */
    // protected $session;

    /**
     * @return void
     */
    public function initController(RequestInterface $request, ResponseInterface $response, LoggerInterface $logger)
    {
        // Do Not Edit This Line
        parent::initController($request, $response, $logger);

        // Preload any models, libraries, etc, here.

        // E.g.: $this->session = \Config\Services::session();

        $this->router = \Config\Services::router();
        $this->request  = \Config\Services::request();
        $this->validation  = \Config\Services::validation();
        $this->session = \Config\Services::session();

        foreach( get_object_vars( config('Vereinsapp') ) as $eigenschaft => $wert ) {
            if( config('Vereinsapp_env') !== NULL AND property_exists( config('Vereinsapp_env'), $eigenschaft ) )
                defined( strtoupper($eigenschaft) ) OR define( strtoupper($eigenschaft), config('Vereinsapp_env')->$eigenschaft );
            else defined( strtoupper($eigenschaft) ) OR define( strtoupper($eigenschaft), config('Vereinsapp')->$eigenschaft );
        }

        defined('AKTIVER_CONTROLLER') OR define( 'AKTIVER_CONTROLLER', lcfirst(
            explode( '\\', $this->router->controllerName() )[ array_key_last(
              explode( '\\', $this->router->controllerName() )
              ) ]
            ) );
          defined('METHOD') OR define( 'METHOD', $this->router->methodName() );
        if( !array_key_exists( AKTIVER_CONTROLLER, CONTROLLERS ) ) throw \CodeIgniter\Exceptions\PageNotFoundException::forPageNotFound();

        if( str_contains( strtolower( (string) $this->request->getUserAgent() ), "whatsapp" ) ) throw \CodeIgniter\Exceptions\PageNotFoundException::forPageNotFound();

        $verfuegbare_rechte = array(); $id = 1;
        foreach( config('AuthGroups')->permissions as $permission => $titel ) if( strtok( $permission, '.' ) == "global" OR array_key_exists( strtok( $permission, '.' ), CONTROLLERS ) ) {
            $verfuegbares_recht['id'] = $id;
            $verfuegbares_recht['permission'] = $permission;
            $verfuegbares_recht['titel'] = $titel;
            $verfuegbare_rechte[$permission] = $verfuegbares_recht;
            $id++;
        }
        defined('VERFUEGBARE_RECHTE') OR define( 'VERFUEGBARE_RECHTE', $verfuegbare_rechte );

        defined('CSRF_NAME') OR define( 'CSRF_NAME', csrf_token() );

        defined('ICH') OR define( 'ICH', $this->session->user );

        defined('VERSION') OR define( 'VERSION', preg_replace('/\s+/', '', file_get_contents( ROOTPATH.'/README.md', FALSE, NULL, 13 ) ) );

        defined('HEAD_STYLESHEET') OR define( 'HEAD_STYLESHEET', array( 
          array( 'href' => 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css', 'integrity' => 'sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH', 'crossorigin' => 'anonymous', ),
          array( 'href' => 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css'),
        //   array( 'href' => 'http://localhost/lib_extern/css/bootstrap.min.css', 'integrity' => 'sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH', 'crossorigin' => 'anonymous', ),
        //   array( 'href' => 'http://localhost/lib_extern/css/bootstrap-icons.css'),
          array( 'href' => base_url('css/vereinsapp.css?v='.VERSION), ),
        ) );
        $head_script = array();
        $head_script[] = array( 'src' => 'https://code.jquery.com/jquery-3.7.1.js', 'integrity' => 'sha256-eKhayi8LEQwp4NKxN+CfCh+3qOVUtJn3QNZ0TciWLP4=', 'crossorigin' => 'anonymous', );
        // $head_script[] = array( 'src' => 'https://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.js', 'integrity' => 'sha256-1PYCpx/EXA36KN1NKrK7auaTylVyk01D98R7Ccf04Bc=', 'crossorigin' => 'anonymous', );
        $head_script[] = array( 'src' => 'https://code.jquery.com/ui/1.13.2/jquery-ui.js', 'integrity' => 'sha256-xLD7nhI62fcsEZK2/v8LsBcb4lG7dgULkuXoXB/j91c=', 'crossorigin' => 'anonymous', );
        $head_script[] = array( 'src' => 'https://cdn.jsdelivr.net/npm/jquery-ui-touch-punch@0.2.3/jquery.ui.touch-punch.min.js', );
        $head_script[] = array( 'src' => 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js', 'integrity' => 'sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz', 'crossorigin' => 'anonymous', );
        $head_script[] = array( 'src' => 'https://cdn.jsdelivr.net/npm/luxon@3.4.4/build/global/luxon.min.js', );
        $head_script[] = array( 'src' => 'https://cdn.jsdelivr.net/npm/clipboard@2.0.11/dist/clipboard.min.js', );
        // $head_script[] = array( 'src' => 'http://localhost/lib_extern/js/jquery-3.7.1.js', 'integrity' => 'sha256-eKhayi8LEQwp4NKxN+CfCh+3qOVUtJn3QNZ0TciWLP4=', 'crossorigin' => 'anonymous', );
        // $head_script[] = array( 'src' => 'http://localhost/lib_extern/js/jquery-ui.js', 'integrity' => 'sha256-xLD7nhI62fcsEZK2/v8LsBcb4lG7dgULkuXoXB/j91c=', 'crossorigin' => 'anonymous', );
        // $head_script[] = array( 'src' => 'http://localhost/lib_extern/js/jquery.ui.touch-punch.min.js', );
        // $head_script[] = array( 'src' => 'http://localhost/lib_extern/js/bootstrap.bundle.min.js', 'integrity' => 'sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz', 'crossorigin' => 'anonymous', );
        // $head_script[] = array( 'src' => 'http://localhost/lib_extern/js/luxon.min.js', );
        // $head_script[] = array( 'src' => 'http://localhost/lib_extern/js/clipboard.min.js', );
        $head_script[] = array( 'src' => base_url('js/lib/sha256.min.js?v='.VERSION), ); // https://www.npmjs.com/package/js-sha256
        $head_script[] = array( 'src' => base_url('js/lib/ajaxqueue.js?v='.VERSION), );
        $head_script[] = array( 'src' => base_url('js/lib/isJson.js?v='.VERSION), );
        $head_script[] = array( 'src' => base_url('js/lib/isArray.js?v='.VERSION), );
        $head_script[] = array( 'src' => base_url('js/lib/isObject.js?v='.VERSION), );
        $head_script[] = array( 'src' => base_url('js/lib/isNumber.js?v='.VERSION), );
        $head_script[] = array( 'src' => base_url('js/lib/isString.js?v='.VERSION), );
        $head_script[] = array( 'src' => base_url('js/lib/isJquery.js?v='.VERSION), );
        $head_script[] = array( 'src' => base_url('js/lib/isLuxonDateTime.js?v='.VERSION), );
        $head_script[] = array( 'src' => base_url('js/lib/objektKopiertZurueck.js?v='.VERSION), );
        $head_script[] = array( 'src' => base_url('js/lib/arrayKopiertZurueck.js?v='.VERSION), );
        $head_script[] = array( 'src' => base_url('js/lib/JsonStringifiedZurueck.js?v='.VERSION), );
        $head_script[] = array( 'src' => base_url('js/lib/zufaelligeZeichenketteZurueck.js?v='.VERSION), );
        $head_script[] = array( 'src' => base_url('js/lib/exists.js?v='.VERSION), );

        $head_script[] = array( 'src' => base_url('js/vereinsapp/Vereinsapp_Init.js?v='.VERSION), );

        $head_script[] = array( 'src' => base_url('js/vereinsapp/liste/Liste_Init.js?v='.VERSION), );
        $head_script[] = array( 'src' => base_url('js/vereinsapp/liste/Liste_Aktualisieren.js?v='.VERSION), );
        $head_script[] = array( 'src' => base_url('js/vereinsapp/liste/Liste_CsvExport.js?v='.VERSION), );
        $head_script[] = array( 'src' => base_url('js/vereinsapp/liste/element/Liste_ElementFormularInitialisieren.js?v='.VERSION), );
        $head_script[] = array( 'src' => base_url('js/vereinsapp/liste/element/Liste_ElementFormularEigenschaftenWerteZurueck.js?v='.VERSION), );
        $head_script[] = array( 'src' => base_url('js/vereinsapp/liste/element/Liste_ElementFormularValidationAktualisieren.js?v='.VERSION), );
        $head_script[] = array( 'src' => base_url('js/vereinsapp/liste/element/Liste_ElementLoeschen.js?v='.VERSION), );
        $head_script[] = array( 'src' => base_url('js/vereinsapp/liste/element/Liste_ElementAktualisieren.js?v='.VERSION), );
        $head_script[] = array( 'src' => base_url('js/vereinsapp/liste/element/Liste_WertFormatiertZurueck.js?v='.VERSION), );
        $head_script[] = array( 'src' => base_url('js/vereinsapp/liste/element/Liste_ElementZusatzsymbolAktualisieren.js?v='.VERSION), );
        $head_script[] = array( 'src' => base_url('js/vereinsapp/liste/element/Liste_ElementZusatzinfoAktualisieren.js?v='.VERSION), );
        $head_script[] = array( 'src' => base_url('js/vereinsapp/liste/element/Liste_ElementNavigationAktualisieren.js?v='.VERSION), );
        $head_script[] = array( 'src' => base_url('js/vereinsapp/liste/element/Liste_ElementBeschriftungZurueck.js?v='.VERSION), );
        $head_script[] = array( 'src' => base_url('js/vereinsapp/liste/element/Liste_ElementAuswahlEinfordern.js?v='.VERSION), );

        $head_script[] = array( 'src' => base_url('js/vereinsapp/liste/filtern/Liste_FilternInit.js?v='.VERSION), );
        $head_script[] = array( 'src' => base_url('js/vereinsapp/liste/filtern/Liste_FilternAendern.js?v='.VERSION), );
        $head_script[] = array( 'src' => base_url('js/vereinsapp/liste/filtern/Liste_FilternWertInExklusivVerschieben.js?v='.VERSION), );
        $head_script[] = array( 'src' => base_url('js/vereinsapp/liste/filtern/Liste_FilternWertLoeschen.js?v='.VERSION), );
        $head_script[] = array( 'src' => base_url('js/vereinsapp/liste/filtern/Liste_FilternLoeschen.js?v='.VERSION), );
        $head_script[] = array( 'src' => base_url('js/vereinsapp/liste/filtern/Liste_FilternFormularInitialisieren.js?v='.VERSION), );
        $head_script[] = array( 'src' => base_url('js/vereinsapp/liste/filtern/Liste_FilternFormularEigenschaftAktualisieren.js?v='.VERSION), );
        $head_script[] = array( 'src' => base_url('js/vereinsapp/liste/filtern/Liste_FilternMitPrioKombiniertZurueck.js?v='.VERSION), );
        $head_script[] = array( 'src' => base_url('js/vereinsapp/liste/filtern/Liste_TabelleGefiltertZurueck.js?v='.VERSION), );

        $head_script[] = array( 'src' => base_url('js/vereinsapp/liste/sortieren/Liste_SortierenInit.js?v='.VERSION), );
        $head_script[] = array( 'src' => base_url('js/vereinsapp/liste/sortieren/Liste_SortierenAendern.js?v='.VERSION), );
        $head_script[] = array( 'src' => base_url('js/vereinsapp/liste/sortieren/Liste_SortierenLoeschen.js?v='.VERSION), );
        $head_script[] = array( 'src' => base_url('js/vereinsapp/liste/sortieren/Liste_SortierenFormularInitialisieren.js?v='.VERSION), );
        $head_script[] = array( 'src' => base_url('js/vereinsapp/liste/sortieren/Liste_ArraySortiertZurueck.js?v='.VERSION), );

        $head_script[] = array( 'src' => base_url('js/vereinsapp/liste/gruppieren/Liste_GruppierenInit.js?v='.VERSION), );
        $head_script[] = array( 'src' => base_url('js/vereinsapp/liste/gruppieren/Liste_GruppierenAendern.js?v='.VERSION), );
        $head_script[] = array( 'src' => base_url('js/vereinsapp/liste/gruppieren/Liste_GruppierenLoeschen.js?v='.VERSION), );
        $head_script[] = array( 'src' => base_url('js/vereinsapp/liste/gruppieren/Liste_GruppierenFormularInitialisieren.js?v='.VERSION), );
        $head_script[] = array( 'src' => base_url('js/vereinsapp/liste/gruppieren/Liste_ArrayGruppiertZurueck.js?v='.VERSION), );

        $head_script[] = array( 'src' => base_url('js/vereinsapp/liste/auswertungen/Liste_AuswertungenInit.js?v='.VERSION), );
        $head_script[] = array( 'src' => base_url('js/vereinsapp/liste/auswertungen/Liste_AuswertungenAktualisieren.js?v='.VERSION), );
        $head_script[] = array( 'src' => base_url('js/vereinsapp/liste/auswertungen/Liste_AuswertungAktualisieren.js?v='.VERSION), );
        $head_script[] = array( 'src' => base_url('js/vereinsapp/liste/auswertungen/Liste_AuswertungenErgebnisZurueck.js?v='.VERSION), );
        
        $head_script[] = array( 'src' => base_url('js/vereinsapp/liste/checkliste/Liste_ChecklisteInit.js?v='.VERSION), );
        $head_script[] = array( 'src' => base_url('js/vereinsapp/liste/checkliste/Liste_CheckAendern.js?v='.VERSION), );
        $head_script[] = array( 'src' => base_url('js/vereinsapp/liste/checkliste/Liste_CheckAktualisieren.js?v='.VERSION), );
        $head_script[] = array( 'src' => base_url('js/vereinsapp/liste/checkliste/Liste_ElementIdZurueck.js?v='.VERSION), );

        $head_script[] = array( 'src' => base_url('js/vereinsapp/liste/verzeichnis/Liste_VerzeichnisInit.js?v='.VERSION), );
        $head_script[] = array( 'src' => base_url('js/vereinsapp/liste/verzeichnis/Liste_VerzeichnisAktualisieren.js?v='.VERSION), );
        $head_script[] = array( 'src' => base_url('js/vereinsapp/liste/verzeichnis/Liste_DateiAktualisieren.js?v='.VERSION), );
        $head_script[] = array( 'src' => base_url('js/vereinsapp/liste/verzeichnis/Liste_VerzeichnisAnzahlZurueck.js?v='.VERSION), );

        $head_script[] = array( 'src' => base_url('js/vereinsapp/schnittstelle/ajax/Schnittstelle_AjaxInit.js?v='.VERSION), );
        $head_script[] = array( 'src' => base_url('js/vereinsapp/schnittstelle/ajax/Schnittstelle_AjaxInDieSchlange.js?v='.VERSION), );

        $head_script[] = array( 'src' => base_url('js/vereinsapp/schnittstelle/localstorage/Schnittstelle_LocalstorageInit.js?v='.VERSION), );
        $head_script[] = array( 'src' => base_url('js/vereinsapp/schnittstelle/localstorage/Schnittstelle_LocalstorageRein.js?v='.VERSION), );
        $head_script[] = array( 'src' => base_url('js/vereinsapp/schnittstelle/localstorage/Schnittstelle_LocalstorageRausZurueck.js?v='.VERSION), );
        $head_script[] = array( 'src' => base_url('js/vereinsapp/schnittstelle/localstorage/Schnittstelle_LocalstorageLoeschen.js?v='.VERSION), );

        $head_script[] = array( 'src' => base_url('js/vereinsapp/schnittstelle/variable/Schnittstelle_VariableRein.js?v='.VERSION), );
        $head_script[] = array( 'src' => base_url('js/vereinsapp/schnittstelle/variable/Schnittstelle_VariableRausZurueck.js?v='.VERSION), );
        $head_script[] = array( 'src' => base_url('js/vereinsapp/schnittstelle/variable/Schnittstelle_VariableWertBereinigtZurueck.js?v='.VERSION), );
        $head_script[] = array( 'src' => base_url('js/vereinsapp/schnittstelle/variable/Schnittstelle_VariableLoeschen.js?v='.VERSION), );

        $head_script[] = array( 'src' => base_url('js/vereinsapp/schnittstelle/dom/Schnittstelle_DomInit.js?v='.VERSION), );
        $head_script[] = array( 'src' => base_url('js/vereinsapp/schnittstelle/dom/Schnittstelle_DomToastFeuern.js?v='.VERSION), );
        $head_script[] = array( 'src' => base_url('js/vereinsapp/schnittstelle/dom/Schnittstelle_DomModalOeffnen.js?v='.VERSION), );
        $head_script[] = array( 'src' => base_url('js/vereinsapp/schnittstelle/dom/Schnittstelle_DomNeuesModalInitialisiertZurueck.js?v='.VERSION), );
        $head_script[] = array( 'src' => base_url('js/vereinsapp/schnittstelle/dom/Schnittstelle_DomLetztesModalZurueck.js?v='.VERSION), );
        $head_script[] = array( 'src' => base_url('js/vereinsapp/schnittstelle/dom/Schnittstelle_DomLetztesWartendesModalZurueck.js?v='.VERSION), );
        $head_script[] = array( 'src' => base_url('js/vereinsapp/schnittstelle/dom/Schnittstelle_DomModalSchliessen.js?v='.VERSION), );
        $head_script[] = array( 'src' => base_url('js/vereinsapp/schnittstelle/dom/Schnittstelle_DomBestaetigungEinfordern.js?v='.VERSION), );
        
        $head_script[] = array( 'src' => base_url('js/vereinsapp/schnittstelle/event/Schnittstelle_EventInit.js?v='.VERSION), );
        $head_script[] = array( 'src' => base_url('js/vereinsapp/schnittstelle/event/Schnittstelle_EventAusfuehren.js?v='.VERSION), );
        $head_script[] = array( 'src' => base_url('js/vereinsapp/schnittstelle/event/Schnittstelle_EventSqlUpdLocalstorage.js?v='.VERSION), );
        $head_script[] = array( 'src' => base_url('js/vereinsapp/schnittstelle/event/Schnittstelle_EventLocalstorageUpdVariable.js?v='.VERSION), );
        $head_script[] = array( 'src' => base_url('js/vereinsapp/schnittstelle/event/Schnittstelle_EventVariableUpdLocalstorage.js?v='.VERSION), );
        $head_script[] = array( 'src' => base_url('js/vereinsapp/schnittstelle/event/Schnittstelle_EventVariableUpdDom.js?v='.VERSION), );
        
        $head_script[] = array( 'src' => base_url('js/vereinsapp/schnittstelle/log/Schnittstelle_LogInit.js?v='.VERSION), );
        $head_script[] = array( 'src' => base_url('js/vereinsapp/schnittstelle/log/Schnittstelle_LogInDieKonsole.js?v='.VERSION), );

        if( auth()->loggedIn() ) {
            $head_script[] = array( 'src' => base_url('js/vereinsapp/mitglieder/Mitglieder_Init.js?v='.VERSION), );
            $head_script[] = array( 'src' => base_url('js/vereinsapp/mitglieder/Mitglieder_MitgliedErstellen.js?v='.VERSION), );
            $head_script[] = array( 'src' => base_url('js/vereinsapp/mitglieder/Mitglieder_MitgliedAendern.js?v='.VERSION), );
            $head_script[] = array( 'src' => base_url('js/vereinsapp/mitglieder/Mitglieder_PasswortAendern.js?v='.VERSION), );
            $head_script[] = array( 'src' => base_url('js/vereinsapp/mitglieder/Mitglieder_PasswortFestlegen.js?v='.VERSION), );
            $head_script[] = array( 'src' => base_url('js/vereinsapp/mitglieder/Mitglieder_EinmalLinkErstellen.js?v='.VERSION), );
            $head_script[] = array( 'src' => base_url('js/vereinsapp/mitglieder/Mitglieder_MitgliedBesitztRechtZurueck.js?v='.VERSION), );
            $head_script[] = array( 'src' => base_url('js/vereinsapp/mitglieder/Mitglieder_MitgliederAufgabenErledigtAnzeigen.js?v='.VERSION), );

            $head_script[] = array( 'src' => base_url('js/vereinsapp/aufgaben/Aufgaben_Init.js?v='.VERSION), );
            $head_script[] = array( 'src' => base_url('js/vereinsapp/aufgaben/Aufgaben_AufgabeAktualisieren.js?v='.VERSION), );
            $head_script[] = array( 'src' => base_url('js/vereinsapp/aufgaben/Aufgaben_AufgabeErstellen.js?v='.VERSION), );
            $head_script[] = array( 'src' => base_url('js/vereinsapp/aufgaben/Aufgaben_AufgabeAendern.js?v='.VERSION), );
            $head_script[] = array( 'src' => base_url('js/vereinsapp/aufgaben/Aufgaben_AufgabeElementZuordnen.js?v='.VERSION), );
            $head_script[] = array( 'src' => base_url('js/vereinsapp/aufgaben/Aufgaben_AufgabeZugeordnetesElementLoeschen.js?v='.VERSION), );
            $head_script[] = array( 'src' => base_url('js/vereinsapp/aufgaben/Aufgaben_AufgabeMitgliedEinplanen.js?v='.VERSION), );
            $head_script[] = array( 'src' => base_url('js/vereinsapp/aufgaben/Aufgaben_AufgabeMitgliedAusplanen.js?v='.VERSION), );
            $head_script[] = array( 'src' => base_url('js/vereinsapp/aufgaben/Aufgaben_AufgabeOffenErledigtMarkieren.js?v='.VERSION), );
            $head_script[] = array( 'src' => base_url('js/vereinsapp/aufgaben/Aufgaben_ZugeordneteAufgabenAnzeigen.js?v='.VERSION), );

            $head_script[] = array( 'src' => base_url('js/vereinsapp/termine/Termine_Init.js?v='.VERSION), );
            $head_script[] = array( 'src' => base_url('js/vereinsapp/termine/Termine_TerminErstellen.js?v='.VERSION), );
            $head_script[] = array( 'src' => base_url('js/vereinsapp/termine/Termine_TerminAendern.js?v='.VERSION), );
            $head_script[] = array( 'src' => base_url('js/vereinsapp/termine/Termine_RueckmeldungErstellen.js?v='.VERSION), );
            $head_script[] = array( 'src' => base_url('js/vereinsapp/termine/Termine_RueckmeldungAendern.js?v='.VERSION), );
            $head_script[] = array( 'src' => base_url('js/vereinsapp/termine/Termine_RueckmeldungDetaillieren.js?v='.VERSION), );
            $head_script[] = array( 'src' => base_url('js/vereinsapp/termine/Termine_RueckmeldungAktualisieren.js?v='.VERSION), );
            $head_script[] = array( 'src' => base_url('js/vereinsapp/termine/Termine_RueckmeldungEinAusblenden.js?v='.VERSION), );

            $head_script[] = array( 'src' => base_url('js/vereinsapp/strafkatalog/Strafkatalog_Init.js?v='.VERSION), );
            $head_script[] = array( 'src' => base_url('js/vereinsapp/strafkatalog/Strafkatalog_StrafeErstellen.js?v='.VERSION), );
            $head_script[] = array( 'src' => base_url('js/vereinsapp/strafkatalog/Strafkatalog_StrafeAendern.js?v='.VERSION), );
            $head_script[] = array( 'src' => base_url('js/vereinsapp/strafkatalog/Strafkatalog_StrafeZuweisen.js?v='.VERSION), );
            $head_script[] = array( 'src' => base_url('js/vereinsapp/strafkatalog/Strafkatalog_KassenbucheintragErstellen.js?v='.VERSION), );
            $head_script[] = array( 'src' => base_url('js/vereinsapp/strafkatalog/Strafkatalog_KassenbucheintragAendern.js?v='.VERSION), );
            $head_script[] = array( 'src' => base_url('js/vereinsapp/strafkatalog/Strafkatalog_KassenbucheintragOffenErledigtMarkieren.js?v='.VERSION), );

            $head_script[] = array( 'src' => base_url('js/vereinsapp/notenbank/Notenbank_Init.js?v='.VERSION), );
            $head_script[] = array( 'src' => base_url('js/vereinsapp/notenbank/Notenbank_TitelErstellen.js?v='.VERSION), );
            $head_script[] = array( 'src' => base_url('js/vereinsapp/notenbank/Notenbank_TitelAendern.js?v='.VERSION), );
        }
        defined('HEAD_SCRIPT') OR define( 'HEAD_SCRIPT', $head_script );

        $this->viewdata = array();
    }

}