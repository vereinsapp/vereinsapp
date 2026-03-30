<?php

namespace App\Models\Termine;

use App\Models\BaseModel;
use App\Models\Termine\Rueckmeldung_Model;
use App\Models\Termine\Anwesenheit_Model;
use App\Models\Aufgaben\Zuordnung_Termine_Model;
use App\Models\Notenbank\Setlisteneintrag_Model;

class Termin_Model extends BaseModel {
   
    protected $table          = 'termine';
    protected $primaryKey     = 'id';
    protected $allowedFields  = [
        'titel',
        'start',
        'ende',
        'ort',
        'kategorie',
        'filtern_mitglieder',
        'oeffentlich_janein',
        'bemerkung',
    ];
    protected $useTimestamps = TRUE;
    protected $createdField  = 'created_at';
    protected $updatedField  = 'updated_at';
    protected $deletedField  = 'deleted_at';

    protected $useSoftDeletes = TRUE;
    protected $afterDelete = [ 'softDeleteRueckmeldung', 'softDeleteAnwesenheit', 'softDeleteZuordnungTermine', 'softDeleteSetlisteneintrag' ];

    protected function softDeleteRueckmeldung(array $element) {
        $element_ids = $element['id'] ?? $element['ids'] ?? null;

        if ($element_ids) model(Rueckmeldung_Model::class)->whereIn('termin_id', (array)$element_ids)->delete();

        return $element;
    }

    protected function softDeleteAnwesenheit(array $element) {
        $element_ids = $element['id'] ?? $element['ids'] ?? null;

        if ($element_ids) model(Anwesenheit_Model::class)->whereIn('termin_id', (array)$element_ids)->delete();

        return $element;
    }

    protected function softDeleteZuordnungTermine(array $element) {
        $element_ids = $element['id'] ?? $element['ids'] ?? null;

        if ($element_ids) model(Zuordnung_Termine_Model::class)->whereIn('termin_id', (array)$element_ids)->delete();

        return $element;
    }

    protected function softDeleteSetlisteneintrag(array $element) {
        $element_ids = $element['id'] ?? $element['ids'] ?? null;

        if ($element_ids) model(Setlisteneintrag_Model::class)->whereIn('termin_id', (array)$element_ids)->delete();

        return $element;
    }

    public function termine_tabelle() {
        $tabelle = array();

        foreach( $this->findAll() as $eintrag )
            $tabelle[] = $this->eintrag_bereinigen( json_decode( json_encode( $eintrag, JSON_UNESCAPED_UNICODE ), TRUE ), 'termine' );

        return $tabelle;
    }
}