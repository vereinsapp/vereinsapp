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

    public function zuordnungen_termine_serverdata() {
        $tabelle = array();
        $verknuepfung_ids_nach_liste = array();

        foreach( $this->findAll() as $eintrag ) {
            $tabelle[] = $this->eintrag_bereinigen( json_decode( json_encode( $eintrag, JSON_UNESCAPED_UNICODE ), TRUE ), 'aufgaben_zuordnungen_termine' );
            // $verknuepfung_ids_nach_liste['aufgaben'][ (int) $eintrag['aufgabe_id'] ][] = $eintrag['id'];
            // $verknuepfung_ids_nach_liste['termine'][ (int) $eintrag['termin_id'] ][] = $eintrag['id'];
        }

        return array( 'tabelle' => $tabelle, 'verknuepfung_ids_nach_liste' => $verknuepfung_ids_nach_liste );
    }
}