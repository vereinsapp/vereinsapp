<?php

namespace App\Models\Termine;

use CodeIgniter\Model;
use App\Models\Termine\Rueckmeldung_Model;
use App\Models\Termine\Anwesenheit_Model;
use App\Models\Aufgaben\Zuordnung_Termine_Model;
use App\Models\Notenbank\Setlisteneintrag_Model;

class Termin_Model extends Model {
   
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

    protected function softDeleteRueckmeldung(array $data) {
        $ids = $data['id'] ?? $data['ids'] ?? null;

        if ($ids) model(Rueckmeldung_Model::class)->whereIn('termin_id', (array)$ids)->delete();

        return $data;
    }

    protected function softDeleteAnwesenheit(array $data) {
        $ids = $data['id'] ?? $data['ids'] ?? null;

        if ($ids) model(Anwesenheit_Model::class)->whereIn('termin_id', (array)$ids)->delete();

        return $data;
    }

    protected function softDeleteZuordnungTermine(array $data) {
        $ids = $data['id'] ?? $data['ids'] ?? null;

        if ($ids) model(Zuordnung_Termine_Model::class)->whereIn('termin_id', (array)$ids)->delete();

        return $data;
    }

    protected function softDeleteSetlisteneintrag(array $data) {
        $ids = $data['id'] ?? $data['ids'] ?? null;

        if ($ids) model(Setlisteneintrag_Model::class)->whereIn('termin_id', (array)$ids)->delete();

        return $data;
    }

    public function termine_tabelle() {
        $tabelle = array();

        foreach( $this->findAll() as $eintrag )
            $tabelle[] = $this->eintrag_bereinigen( json_decode( json_encode( $eintrag ), TRUE ), 'termine' );

        return $tabelle;
    }

    private function eintrag_bereinigen( $eintrag, $liste ) {
        foreach( $eintrag as $eigenschaft => $wert ) if( is_numeric( $wert ) )
            if( array_key_exists( $liste, EIGENSCHAFTEN ) AND !array_key_exists( $eigenschaft, EIGENSCHAFTEN[$liste] ) ) unset( $eintrag[$eigenschaft] );
            elseif( is_numeric( $wert ) ) {
                if( (int) $wert == $wert ) $eintrag[ $eigenschaft ] = (int)$wert;
                elseif( (float) $wert == $wert ) $eintrag[ $eigenschaft ] = (float)$wert;
            }
        return $eintrag;
    }
}