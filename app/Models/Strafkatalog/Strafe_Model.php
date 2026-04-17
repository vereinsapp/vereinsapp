<?php

namespace App\Models\Strafkatalog;

use App\Models\BaseModel;
use App\Models\Strafkatalog\Zugewiesene_Strafe_Model;

class Strafe_Model extends BaseModel {
   
    protected $table          = 'strafkatalog';
    protected $primaryKey     = 'id';
    protected $allowedFields  = [
        'titel',
        'wert',
        'kategorie',
        'bemerkung',
    ];
    protected $useTimestamps = TRUE;
    protected $createdField  = 'created_at';
    protected $updatedField  = 'updated_at';
    protected $deletedField  = 'deleted_at';

    protected $useSoftDeletes = TRUE;
    protected $afterDelete = [ 'softDeleteZugewieseneStrafe' ];

    protected function softDeleteZugewieseneStrafe(array $verknuepfung) {
        $element_ids = $verknuepfung['id'] ?? $verknuepfung['ids'] ?? null;

        if ($element_ids) model(Zugewiesene_Strafe_Model::class)->whereIn('strafe_id', (array)$element_ids)->delete();

        return $verknuepfung;
    }

    public function strafkatalog_serverdata() {
        $tabelle = array();

        foreach( $this->findAll() as $eintrag )
            $tabelle[] = $this->eintrag_bereinigen( json_decode( json_encode( $eintrag, JSON_UNESCAPED_UNICODE ), TRUE ), 'strafkatalog' );

        return array( 'tabelle' => $tabelle );
    }
}