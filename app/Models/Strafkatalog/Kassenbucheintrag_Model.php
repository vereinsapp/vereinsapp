<?php

namespace App\Models\Strafkatalog;

use App\Models\BaseModel;

use CodeIgniter\I18n\Time;

class Kassenbucheintrag_Model extends BaseModel {
   
    protected $table          = 'strafkatalog_kassenbuch';
    protected $primaryKey     = 'id';
    protected $allowedFields  = [
        'titel',
        'wert',
        'mitglied_id',
        'erledigt',
        'bemerkung',
    ];
    protected $useTimestamps = TRUE;
    protected $createdField  = 'created_at';
    protected $updatedField  = 'updated_at';
    protected $deletedField  = 'deleted_at';

    protected $useSoftDeletes = TRUE;

    public function kassenbuch_tabelle() {
        $tabelle = array();

        foreach( $this->findAll() as $eintrag ) {
            $eintrag['erstellung'] = $eintrag['created_at'];
            if( $eintrag['erstellung'] != NULL ) $eintrag['erstellung'] = ( new Time( $eintrag['erstellung'] ) )->setTimezone('Europe/Berlin')->toDateTimeString();

            $tabelle[] = $this->eintrag_bereinigen( json_decode( json_encode( $eintrag ), TRUE ), 'kassenbuch' );
        }

        return $tabelle;
    }
}