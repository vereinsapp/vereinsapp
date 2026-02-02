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

    protected function softDeleteRueckmeldung(array $element) {
        $element_ids = $element['id'] ?? $element['ids'] ?? null;

        if ($element_ids) model(Rueckmeldung_Model::class)->whereIn('aufgabe_id', (array)$element_ids)->delete();

        return $element;
    }

    protected function softDeleteZuordnungTermine(array $element) {
        $element_ids = $element['id'] ?? $element['ids'] ?? null;

        if ($element_ids) model(Zuordnung_Termine_Model::class)->whereIn('aufgabe_id', (array)$element_ids)->delete();

        return $element;
    }

    public function aufgaben_tabelle() {
        $tabelle = array();

        foreach( $this->findAll() as $eintrag )
            $tabelle[] = $this->eintrag_bereinigen( json_decode( json_encode( $eintrag ), TRUE ), 'aufgaben' );

        return $tabelle;
    }
}