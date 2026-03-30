<?php

namespace App\Models\Notenbank;

use App\Models\BaseModel;
use App\Models\Notenbank\Setlisteneintrag_Model;

class Titel_Model extends BaseModel {
   
    protected $table          = 'notenbank';
    protected $primaryKey     = 'id';
    protected $allowedFields  = [
        'titel',
        'titel_nr',
        'kategorie',
        'komponist',
        'bemerkung',
    ];
    protected $useTimestamps = TRUE;
    protected $createdField  = 'created_at';
    protected $updatedField  = 'updated_at';
    protected $deletedField  = 'deleted_at';

    protected $useSoftDeletes = TRUE;
    protected $afterDelete = [ 'softDeleteSetlisteneintrag' ];

    protected function softDeleteSetlisteneintrag(array $element) {
        $element_ids = $element['id'] ?? $element['ids'] ?? null;

        if ($element_ids) model(Setlisteneintrag_Model::class)->whereIn('titel_id', (array)$element_ids)->delete();

        return $element;
    }

    public function notenbank_tabelle() {
        $tabelle = array();

        foreach( $this->findAll() as $eintrag ) {
            $verzeichnis_basis = null; foreach( directory_map( './storage/notenbank/', 1 ) as $verzeichnis_map )
            if( is_dir( './storage/notenbank/'.$verzeichnis_map ) AND
                substr( $verzeichnis_map, 0, NOTENBANK_ANZAHL_ZIFFERN ) == str_pad( $eintrag['titel_nr'], NOTENBANK_ANZAHL_ZIFFERN ,'0', STR_PAD_LEFT ) )
                $verzeichnis_basis = $verzeichnis_map;

            $eintrag['verzeichnis_basis'] = $verzeichnis_basis; 
            if( $verzeichnis_basis !== null ) $eintrag['verzeichnis'] = $this->verzeichnis_indizieren( directory_map( './storage/notenbank/'.$verzeichnis_basis ) ); 
            else $eintrag['verzeichnis'] = $this->verzeichnis_indizieren( array() );

            $tabelle[] = $this->eintrag_bereinigen( json_decode( json_encode( $eintrag, JSON_UNESCAPED_UNICODE ), TRUE ), 'notenbank' );
        }

        return $tabelle;
    }

    private function verzeichnis_indizieren( $verzeichnis ) {
        $verzeichnis_indiziert = array(
            'unterverzeichnisse' => array(),
            'dateien' => array(),
        );
        foreach( $verzeichnis as $beschriftung => $unterverzeichnis ) {
            if( substr( $beschriftung, -1 ) == '\\' ) $beschriftung = substr_replace($beschriftung, '/', -1);

            if( is_array($unterverzeichnis) ) $verzeichnis_indiziert['unterverzeichnisse'][$beschriftung] = $this->verzeichnis_indizieren( $unterverzeichnis );
            else if( in_array( pathinfo( $unterverzeichnis,  PATHINFO_EXTENSION ), array_merge( NOTENBANK_ERLAUBTE_DATEITYPEN_NOTEN, NOTENBANK_ERLAUBTE_DATEITYPEN_AUDIO ) ) )
                $verzeichnis_indiziert['dateien'][] = $unterverzeichnis;
            else { /* alle anderen Dateitypen werden nicht berücksichtigt */ }
        }
        sort($verzeichnis_indiziert['dateien']);
        return $verzeichnis_indiziert;
    }
}