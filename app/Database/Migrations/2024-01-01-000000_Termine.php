<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class Termine extends Migration
{
    public function up() {
        $this->forge->addField([
            'id'                 => ['type' => 'int',       'constraint' => 11, 'unsigned' => true, 'null' => false,    'auto_increment' => true],
            'titel'              => ['type' => 'varchar',   'constraint' => 100,                    'null' => false],
            'start'              => ['type' => 'datetime',                                          'null' => false],
            'ende'               => ['type' => 'datetime',                                          'null' => false],
            'ort'                => ['type' => 'varchar',   'constraint' => 100,                    'null' => false],
            'kategorie'          => ['type' => 'varchar',   'constraint' => 50,                     'null' => false],
            'filtern_mitglieder' => ['type' => 'varchar',   'constraint' => 9999,                   'null' => false],    
            'oeffentlich_janein' => ['type' => 'tinyint',   'constraint' => 1,                      'null' => false,    'default' => 0],    
            'bemerkung'          => ['type' => 'varchar',   'constraint' => 100,                    'null' => true],
            'created_at'         => ['type' => 'datetime',                                          'null' => true],
            'updated_at'         => ['type' => 'datetime',                                          'null' => true],
            'deleted_at'         => ['type' => 'datetime',                                          'null' => true],
        ]);
        $this->forge->addPrimaryKey('id');
        $this->forge->createTable('termine');

        $this->forge->addField([
            'id'            => ['type' => 'int',            'constraint' => 11, 'unsigned' => true, 'null' => false,    'auto_increment' => true],
            'termin_id'     => ['type' => 'int',            'constraint' => 11, 'unsigned' => true, 'null' => false],
            'mitglied_id'   => ['type' => 'int',            'constraint' => 11, 'unsigned' => true, 'null' => false],
            'status'        => ['type' => 'int',            'constraint' => 11, 'unsigned' => true, 'null' => false],
            'bemerkung'     => ['type' => 'varchar',        'constraint' => 100,                    'null' => true],
            'created_at'    => ['type' => 'datetime',                                               'null' => true],
            'updated_at'    => ['type' => 'datetime',                                               'null' => true],
            'deleted_at'    => ['type' => 'datetime',                                               'null' => true],
        ]);
        $this->forge->addPrimaryKey('id');
        $this->forge->addKey('termin_id');
        $this->forge->addForeignKey('termin_id', 'termine', 'id', '', 'CASCADE');
        $this->forge->addKey('mitglied_id');
        $this->forge->addForeignKey('mitglied_id', 'mitglieder', 'id', '', 'CASCADE');
        $this->forge->createTable('termine_rueckmeldungen');
        
        $this->forge->addField([
            'id'            => ['type' => 'int',        'constraint' => 11,     'unsigned' => true, 'null' => false,    'auto_increment' => true],
            'termin_id'     => ['type' => 'int',        'constraint' => 11,     'unsigned' => true, 'null' => false],
            'mitglied_id'   => ['type' => 'int',        'constraint' => 11,     'unsigned' => true, 'null' => false],
            'status'        => ['type' => 'int',        'constraint' => 11,     'unsigned' => true, 'null' => false],
            'bemerkung'     => ['type' => 'varchar',    'constraint' => 100,                        'null' => true],
            'created_at'    => ['type' => 'datetime',                                               'null' => true],
            'updated_at'    => ['type' => 'datetime',                                               'null' => true],
            'deleted_at'    => ['type' => 'datetime',                                               'null' => true],
        ]);
        $this->forge->addPrimaryKey('id');
        $this->forge->addKey('termin_id');
        $this->forge->addForeignKey('termin_id', 'termine', 'id', '', 'CASCADE');
        $this->forge->addKey('mitglied_id');
        $this->forge->addForeignKey('mitglied_id', 'mitglieder', 'id', '', 'CASCADE');
        $this->forge->createTable('termine_anwesenheiten');
    }

    public function down()
    {
        $this->db->disableForeignKeyChecks();
        $this->forge->dropTable('termine', true);
        $this->forge->dropTable('termine_rueckmeldungen', true);
        $this->forge->dropTable('termine_anwesenheiten', true);
        $this->db->enableForeignKeyChecks();
    }
}