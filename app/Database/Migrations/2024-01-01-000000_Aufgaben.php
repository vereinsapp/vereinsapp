<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class Aufgaben extends Migration
{
    public function up() {
        $this->forge->addField([
            'id'                        => ['type' => 'int',        'constraint' => 11,     'unsigned' => true, 'null' => false,    'auto_increment' => true],
            'titel'                     => ['type' => 'varchar',    'constraint' => 100,                        'null' => false],
            'max_anzahl_mitglieder'     => ['type' => 'int',        'constraint' => 11,     'unsigned' => true, 'null' => true],
            'bemerkung'                 => ['type' => 'varchar',    'constraint' => 100,                        'null' => true],
            'created_at'                => ['type' => 'datetime',                                               'null' => true],
            'updated_at'                => ['type' => 'datetime',                                               'null' => true],
            'deleted_at'                => ['type' => 'datetime',                                               'null' => true],
        ]);
        $this->forge->addPrimaryKey('id');
        $this->forge->createTable('aufgaben');

        $this->forge->addField([
            'id'            => ['type' => 'int',            'constraint' => 11, 'unsigned' => true, 'null' => false,    'auto_increment' => true],
            'aufgabe_id'    => ['type' => 'int',            'constraint' => 11, 'unsigned' => true, 'null' => false],
            'mitglied_id'   => ['type' => 'int',            'constraint' => 11, 'unsigned' => true, 'null' => false],
            'status'        => ['type' => 'int',            'constraint' => 11, 'unsigned' => true, 'null' => false],
            'bemerkung'     => ['type' => 'varchar',        'constraint' => 100,                    'null' => true],
            'created_at'    => ['type' => 'datetime',                                               'null' => true],
            'updated_at'    => ['type' => 'datetime',                                               'null' => true],
            'deleted_at'    => ['type' => 'datetime',                                               'null' => true],
        ]);
        $this->forge->addPrimaryKey('id');
        $this->forge->addKey('aufgabe_id');
        $this->forge->addForeignKey('aufgabe_id', 'aufgaben', 'id', '', 'CASCADE');
        $this->forge->addKey('mitglied_id');
        $this->forge->addForeignKey('mitglied_id', 'mitglieder', 'id', '', 'CASCADE');
        $this->forge->createTable('aufgaben_rueckmeldungen');
        
        $this->forge->addField([
            'id'            => ['type' => 'int',        'constraint' => 11,     'unsigned' => true, 'null' => false,    'auto_increment' => true],
            'aufgabe_id'    => ['type' => 'int',        'constraint' => 11,     'unsigned' => true, 'null' => false],
            'termin_id'     => ['type' => 'int',        'constraint' => 11,     'unsigned' => true, 'null' => false],
            'status'        => ['type' => 'int',        'constraint' => 11,     'unsigned' => true, 'null' => false],
            'bemerkung'     => ['type' => 'varchar',    'constraint' => 100,                        'null' => true],
            'created_at'    => ['type' => 'datetime',                                               'null' => true],
            'updated_at'    => ['type' => 'datetime',                                               'null' => true],
            'deleted_at'    => ['type' => 'datetime',                                               'null' => true],
        ]);
        $this->forge->addPrimaryKey('id');
        $this->forge->addKey('aufgabe_id');
        $this->forge->addForeignKey('aufgabe_id', 'aufgaben', 'id', '', 'CASCADE');
        $this->forge->addKey('termin_id');
        $this->forge->addForeignKey('termin_id', 'termine', 'id', '', 'CASCADE');
        $this->forge->createTable('aufgaben_zuordnungen_termine');
    }

    public function down()
    {
        $this->db->disableForeignKeyChecks();
        $this->forge->dropTable('aufgaben', true);
        $this->forge->dropTable('aufgaben_rueckmeldungen', true);
        $this->forge->dropTable('aufgaben_zuordnungen_termine', true);
        $this->db->enableForeignKeyChecks();
    }
}