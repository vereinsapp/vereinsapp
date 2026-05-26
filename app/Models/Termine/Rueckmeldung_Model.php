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

    public function rueckmeldungen_serverdata() {
        $tabelle = array();
        $verknuepfung_ids_nach_liste = array();

        foreach( $this->findAll() as $eintrag ) {
            $tabelle[] = $this->eintrag_bereinigen( json_decode( json_encode( $eintrag, JSON_UNESCAPED_UNICODE ), TRUE ), 'termine_rueckmeldungen' );
            // $verknuepfung_ids_nach_liste['termine'][ (int) $eintrag['termin_id'] ][] = $eintrag['id'];
            // $verknuepfung_ids_nach_liste['mitglieder'][ (int) $eintrag['mitglied_id'] ][] = $eintrag['id'];
        }

        return array( 'tabelle' => $tabelle, 'verknuepfung_ids_nach_liste' => $verknuepfung_ids_nach_liste );
    }
}