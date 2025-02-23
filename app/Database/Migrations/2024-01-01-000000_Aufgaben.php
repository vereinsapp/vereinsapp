<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class Aufgaben extends Migration
{
    public function up() {
        $this->forge->addField([
            'id'                        => ['type' => 'int',        'constraint' => 11,     'unsigned' => true, 'null' => false,    'auto_increment' => true],
            'zugeordnete_liste'         => ['type' => 'varchar',    'constraint' => 50,                         'null' => true],
            'zugeordnete_element_id'    => ['type' => 'int',        'constraint' => 11,     'unsigned' => true, 'null' => true],
            'titel'                     => ['type' => 'varchar',    'constraint' => 100,                        'null' => false],
            'mitglied_id'               => ['type' => 'int',        'constraint' => 11,     'unsigned' => true, 'null' => true],
            'erledigt'                  => ['type' => 'datetime',                                               'null' => true],
            'bemerkung'                 => ['type' => 'varchar',    'constraint' => 100,                        'null' => false],
            'created_at'                => ['type' => 'datetime',                                               'null' => true],
            'updated_at'                => ['type' => 'datetime',                                               'null' => true],
            'deleted_at'                => ['type' => 'datetime',                                               'null' => true],
        ]);
        $this->forge->addPrimaryKey('id');
        $this->forge->addKey('mitglied_id');
        $this->forge->addForeignKey('mitglied_id', 'mitglieder', 'id', '', 'CASCADE');
        $this->forge->createTable('aufgaben');
    }

    public function down()
    {
        $this->db->disableForeignKeyChecks();
        $this->forge->dropTable('aufgaben', true);
        $this->db->enableForeignKeyChecks();
    }
}