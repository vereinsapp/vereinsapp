<?php

namespace App\Models\Notenbank;

use CodeIgniter\Model;
use App\Models\Notenbank\Setlisteneintrag_Model;

class Titel_Model extends Model {
   
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

    protected function softDeleteSetlisteneintrag(array $data) {
        $ids = $data['id'] ?? $data['ids'] ?? null;

        if ($ids) model(Setlisteneintrag_Model::class)->whereIn('titel_id', (array)$ids)->delete();

        return $data;
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

            $tabelle[] = $this->eintrag_bereinigen( json_decode( json_encode( $eintrag ), TRUE ), 'notenbank' );
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
        return $verzeichnis_indiziert;
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