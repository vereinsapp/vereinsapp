<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run()
    {
        
        $mitglieder = [
            [ 'vorname'  => 'John', 'nachname' => 'Doe',
                'geburt' => '2024-01-01', 'postleitzahl' => 12345, 'wohnort' => 'Musterstadt',
                'geschlecht' => 'd', 'register' => 'ohne', 'auto' => 'ohne', 'funktion' => 'ohne', 'vorstandschaft_janein' => FALSE, 'aktiv_janein' => TRUE, ],
        ];
        $this->db->table('mitglieder')->insertBatch($mitglieder);
        
        $mitglieder_zugaenge = [
            [ 'user_id'  => 1, 'type' => 'email_password', 'secret' => 'john.doe@email.de', 'secret2' => '$2y$10$AZB9pt4pC8ZQQIoiF2blVuBJcPAf0M8MfX5gqqurLlWOaKdE3hg4q', ],
        ];
        $this->db->table('mitglieder_zugaenge')->insertBatch($mitglieder_zugaenge);
        
        $mitglieder_rollen = [
            [ 'user_id' => 1, 'group' => 'mitglied', ],
        ];
        $this->db->table('mitglieder_rollen')->insertBatch($mitglieder_rollen);
        
        $mitglieder_vergebene_rechte = [
            [ 'user_id' => 1, 'permission' => 'global.einstellungen', ],
        ];
        $this->db->table('mitglieder_vergebene_rechte')->insertBatch($mitglieder_vergebene_rechte);
    }
}
