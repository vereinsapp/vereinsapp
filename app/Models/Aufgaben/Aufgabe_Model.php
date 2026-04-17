<?php

namespace App\Models\Aufgaben;

use App\Models\BaseModel;
use App\Models\Aufgaben\Rueckmeldung_Model;
use App\Models\Aufgaben\Zuordnung_Termine_Model;

class Aufgabe_Model extends BaseModel {
   
    protected $table          = 'aufgaben';
    protected $primaryKey     = 'id';
    protected $allowedFields  = [
        'titel',
        'max_anzahl_mitglieder',
        'bemerkung',
    ];
    protected $useTimestamps = TRUE;
    protected $createdField  = 'created_at';
    protected $updatedField  = 'updated_at';
    protected $deletedField  = 'deleted_at';

    protected $useSoftDeletes = TRUE;
    protected $afterDelete = [ 'softDeleteRueckmeldung', 'softDeleteZuordnungTermine' ];

    protected function softDeleteRueckmeldung(array $verknuepfung) {
        $element_ids = $verknuepfung['id'] ?? $verknuepfung['ids'] ?? null;

        if ($element_ids) model(Rueckmeldung_Model::class)->whereIn('aufgabe_id', (array)$element_ids)->delete();

        return $verknuepfung;
    }

    protected function softDeleteZuordnungTermine(array $verknuepfung) {
        $element_ids = $verknuepfung['id'] ?? $verknuepfung['ids'] ?? null;

        if ($element_ids) model(Zuordnung_Termine_Model::class)->whereIn('aufgabe_id', (array)$element_ids)->delete();

        return $verknuepfung;
    }

    public function aufgaben_serverdata() {
        $tabelle = array();

        foreach( $this->findAll() as $eintrag )
            $tabelle[] = $this->eintrag_bereinigen( json_decode( json_encode( $eintrag, JSON_UNESCAPED_UNICODE ), TRUE ), 'aufgaben' );

        return array( 'tabelle' => $tabelle );
    }
}