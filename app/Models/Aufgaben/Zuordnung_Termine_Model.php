<?php

namespace App\Models\Aufgaben;

use App\Models\BaseModel;

class Zuordnung_Termine_Model extends BaseModel {
   
    protected $table          = 'aufgaben_zuordnungen_termine';
    protected $primaryKey     = 'id';
    protected $allowedFields  = [
        'aufgabe_id',
        'termin_id',
        'status',
        'bemerkung',
    ];
    protected $useTimestamps = TRUE;
    protected $createdField  = 'created_at';
    protected $updatedField  = 'updated_at';
    protected $deletedField  = 'deleted_at';

    protected $useSoftDeletes = TRUE;

    public function zuordnungen_termine_tabelle() {
        $tabelle = array();

        foreach( $this->findAll() as $eintrag )
            $tabelle[] = $this->eintrag_bereinigen( json_decode( json_encode( $eintrag ), TRUE ), 'aufgaben_zuordnungen_termine' );

        return $tabelle;
    }
}