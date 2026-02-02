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

    public function setliste_tabelle() {
        $tabelle = array();

        foreach( $this->findAll() as $eintrag )
            $tabelle[] = $this->eintrag_bereinigen( json_decode( json_encode( $eintrag ), TRUE ), 'notenbank_setliste' );
        return $tabelle;
    }
}