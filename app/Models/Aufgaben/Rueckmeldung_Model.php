<?php

namespace App\Models\Aufgaben;

use App\Models\BaseModel;

class Rueckmeldung_Model extends BaseModel {
   
    protected $table          = 'aufgaben_rueckmeldungen';
    protected $primaryKey     = 'id';
    protected $allowedFields  = [
        'aufgabe_id',
        'mitglied_id',
        'status',
        'bemerkung',
    ];
    protected $useTimestamps = TRUE;
    protected $createdField  = 'created_at';
    protected $updatedField  = 'updated_at';
    protected $deletedField  = 'deleted_at';

    protected $useSoftDeletes = TRUE;

    public function rueckmeldungen_serverdata() {
        $tabelle = array();

        foreach( $this->findAll() as $eintrag )
            $tabelle[] = $this->eintrag_bereinigen( json_decode( json_encode( $eintrag, JSON_UNESCAPED_UNICODE ), TRUE ), 'aufgaben_rueckmeldungen' );

        return $tabelle;
    }
}