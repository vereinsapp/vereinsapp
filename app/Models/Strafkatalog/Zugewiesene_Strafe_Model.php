<?php

namespace App\Models\Strafkatalog;

use App\Models\BaseModel;

class Zugewiesene_Strafe_Model extends BaseModel {
   
    protected $table          = 'strafkatalog_zugewiesene_strafen';
    protected $primaryKey     = 'id';
    protected $allowedFields  = [
        'strafe_id',
        'mitglied_id',
        'status',
        'bemerkung',
    ];
    protected $useTimestamps = TRUE;
    protected $createdField  = 'created_at';
    protected $updatedField  = 'updated_at';
    protected $deletedField  = 'deleted_at';

    protected $useSoftDeletes = TRUE;

    public function zugewiesene_strafen_tabelle() {
        $tabelle = array();

        foreach( $this->findAll() as $eintrag )
            $tabelle[] = $this->eintrag_bereinigen( json_decode( json_encode( $eintrag, JSON_UNESCAPED_UNICODE ), TRUE ), 'strafkatalog_zugewiesene_strafen' );

        return $tabelle;
    }
}