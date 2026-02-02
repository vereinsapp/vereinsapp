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
        $this->request = \Config\Services::request();
        $this->validation = \Config\Services::validation();
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

        $verfuegbare_rechte = array(); $verfuegbares_recht_id = 1;
        foreach( config('AuthGroups')->permissions as $permission => $titel ) if( strtok( $permission, '.' ) == "global" OR array_key_exists( strtok( $permission, '.' ), CONTROLLERS ) ) {
            $verfuegbares_recht['id'] = $verfuegbares_recht_id;
            $verfuegbares_recht['permission'] = $permission;
            $verfuegbares_recht['titel'] = $titel;
            $verfuegbare_rechte[$permission] = $verfuegbares_recht;
            $verfuegbares_recht_id++;
        }
        defined('VERFUEGBARE_RECHTE') OR define( 'VERFUEGBARE_RECHTE', $verfuegbare_rechte );

        defined('CSRF_NAME') OR define( 'CSRF_NAME', csrf_token() );

        if( auth()->loggedIn() ) defined('ICH_ID') OR define( 'ICH_ID', $this->session->user['id'] );
        else defined('ICH_ID') OR define( 'ICH_ID', NULL );

        $this->viewdata = array();
    }

    protected function viewdata_bereinigen() {
        if( array_key_exists( 'liste', $this->viewdata ) ) foreach( $this->viewdata['liste'] as $instanz => $liste ) $this->viewdata['liste'][ $instanz ]['instanz'] = $instanz;
        if( array_key_exists( 'auswertungen', $this->viewdata ) ) foreach( $this->viewdata['auswertungen'] as $instanz => $auswertungen ) $this->viewdata['auswertungen'][ $instanz ]['instanz'] = $instanz;
        if( array_key_exists( 'verzeichnis', $this->viewdata ) ) foreach( $this->viewdata['verzeichnis'] as $instanz => $verzeichnis ) $this->viewdata['verzeichnis'][ $instanz ]['instanz'] = $instanz;
    }

}