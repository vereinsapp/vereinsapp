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

        $this->viewdata = array();
    }

}