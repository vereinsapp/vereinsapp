<?php

namespace App\Models\Notenbank;

use App\Models\BaseModel;

class Setlisteneintrag_Model extends BaseModel {
   
    protected $table          = 'notenbank_setliste';
    protected $primaryKey     = 'id';
    protected $allowedFields  = [
        'titel_id',
        'termin_id',
        'status',
        'bemerkung',
    ];
    protected $useTimestamps = TRUE;
    protected $createdField  = 'created_at';
    protected $updatedField  = 'updated_at';
    protected $deletedField  = 'deleted_at';

    protected $useSoftDeletes = TRUE;

    public function setliste_serverdata() {
        $tabelle = array();
        $verknuepfung_ids_nach_liste = array();

        foreach( $this->findAll() as $eintrag ) {
            $tabelle[] = $this->eintrag_bereinigen( json_decode( json_encode( $eintrag, JSON_UNESCAPED_UNICODE ), TRUE ), 'notenbank_setliste' );
            // $verknuepfung_ids_nach_liste['notenbank'][ (int) $eintrag['titel_id'] ][] = $eintrag['id'];
            // $verknuepfung_ids_nach_liste['termine'][ (int) $eintrag['termin_id'] ][] = $eintrag['id'];
        }

        return array( 'tabelle' => $tabelle, 'verknuepfung_ids_nach_liste' => $verknuepfung_ids_nach_liste );
    }
}