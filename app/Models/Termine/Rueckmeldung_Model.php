<?php

namespace App\Models\Termine;

use App\Models\BaseModel;

class Rueckmeldung_Model extends BaseModel {
   
    protected $table          = 'termine_rueckmeldungen';
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

    public function rueckmeldungen_tabelle() {
        $tabelle = array();

        foreach( $this->findAll() as $eintrag )
            $tabelle[] = $this->eintrag_bereinigen( json_decode( json_encode( $eintrag ), TRUE ), 'termine_rueckmeldungen' );

        return $tabelle;
    }
}