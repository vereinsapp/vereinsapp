<?php

namespace App\Models\Termine;

use App\Models\BaseModel;

class Anwesenheit_Model extends BaseModel {
   
    protected $table          = 'termine_anwesenheiten';
    protected $primaryKey     = 'id';
    protected $allowedFields  = [
        'termin_id',
        'mitglied_id',
        'status',
        'bemerkung',
    ];
    protected $useTimestamps = TRUE;
    protected $createdField  = 'created_at';
    protected $updatedField  = 'updated_at';
    protected $deletedField  = 'deleted_at';

    protected $useSoftDeletes = TRUE;

    public function anwesenheiten_tabelle() {
        $tabelle = array();

        foreach( $this->findAll() as $eintrag )
            $tabelle[] = $this->eintrag_bereinigen( json_decode( json_encode( $eintrag, JSON_UNESCAPED_UNICODE ), TRUE ), 'termine_anwesenheiten' );

        return $tabelle;
    }
}