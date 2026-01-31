<?php
// https://github.com/codeigniter4/shield/discussions/333

namespace App\Models\Mitglieder;

use CodeIgniter\Shield\Models\UserModel;

class Mitglied_Model extends UserModel {
   
    protected $allowedFields  = [
        // 'username',
        // 'status',
        // 'status_message',
        // 'active',
        // 'last_active',
        // 'created_at',
        // 'updated_at',
        // 'deleted_at',
        'vorname',
        'nachname',
        'geburt',
        'postleitzahl',
        'wohnort',
        'geschlecht',
        'register',
        'auto',
        'funktion',
        'vorstandschaft_janein',
        'aktiv_janein',
        'real_janein',
        'bemerkung',
    ];

    public function mitglieder_tabelle() {
        $tabelle = array();

        foreach( $this->findAll() as $eintrag_class ) {
            $eintrag = array(
                'id' => $eintrag_class->id,
                'vorname' => $eintrag_class->vorname,
                'nachname' => $eintrag_class->nachname,
                'geburt' => $eintrag_class->geburt,
                'postleitzahl' => $eintrag_class->postleitzahl,
                'wohnort' => $eintrag_class->wohnort,
                'geschlecht' => $eintrag_class->geschlecht,
                'bemerkung' => $eintrag_class->bemerkung,
            );
            if( array_key_exists( 'register', EIGENSCHAFTEN['mitglieder'] ) ) $eintrag['register'] = $eintrag_class->register;
            if( array_key_exists( 'auto', EIGENSCHAFTEN['mitglieder'] ) ) $eintrag['auto'] = $eintrag_class->auto;
            if( array_key_exists( 'funktion', EIGENSCHAFTEN['mitglieder'] ) ) $eintrag['funktion'] = $eintrag_class->funktion;
            if( array_key_exists( 'vorstandschaft_janein', EIGENSCHAFTEN['mitglieder'] ) ) $eintrag['vorstandschaft_janein'] = $eintrag_class->vorstandschaft_janein;
            if( array_key_exists( 'aktiv_janein', EIGENSCHAFTEN['mitglieder'] ) ) $eintrag['aktiv_janein'] = $eintrag_class->aktiv_janein;
            if( array_key_exists( 'real_janein', EIGENSCHAFTEN['mitglieder'] ) ) $eintrag['real_janein'] = $eintrag_class->real_janein;

            if( auth()->user()->can( 'mitglieder.verwaltung' ) ) {
                $eintrag['email'] = $eintrag_class->email;
                $eintrag['erstellung'] = $eintrag_class->created_at;
                if( $eintrag['erstellung'] != NULL ) $eintrag['erstellung'] = $eintrag['erstellung']->setTimezone('Europe/Berlin')->toDateTimeString();
                $eintrag['letzte_aktivitaet'] = $eintrag_class->last_active;
                if( $eintrag['letzte_aktivitaet'] != NULL ) $eintrag['letzte_aktivitaet'] = $eintrag['letzte_aktivitaet']->setTimezone('Europe/Berlin')->toDateTimeString();
            } elseif( ICH['id'] == $eintrag['id'] )
                $eintrag['email'] = $eintrag_class->email;

            $tabelle[] = $this->eintrag_bereinigen( $eintrag, 'mitglieder' );
        }

        return $tabelle;
    }

    public function verfuegbare_rechte_tabelle() {
        $tabelle = array();

        foreach( VERFUEGBARE_RECHTE as $eintrag )
            $tabelle[] = $this->eintrag_bereinigen( json_decode( json_encode( $eintrag ), TRUE ), 'verfuegbare_rechte' );

        return $tabelle;
    }

    public function vergebene_rechte_tabelle() {
        $tabelle = array();

        $vergebenes_recht_id = 1;
        foreach( $this->findAll() as $mitglied ) if( auth()->user()->can( 'global.einstellungen' ) OR auth()->user()->can( 'mitglieder.rechte' ) OR $mitglied->id == ICH['id'] )
            foreach( $mitglied->getPermissions() as $permission ) if( array_key_exists( $permission, VERFUEGBARE_RECHTE ) ) {
                $eintrag = array(
                    'id' => $vergebenes_recht_id++,
                    'mitglied_id' => $mitglied->id,
                    'verfuegbares_recht_id' => VERFUEGBARE_RECHTE[ $permission ]['id'],
                    'status' => 1,
                    'bemerkung' => NULL,
                );

                $tabelle[] = $this->eintrag_bereinigen( json_decode( json_encode( $eintrag ), TRUE ), 'vergebene_rechte' );
            }

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