<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class Notenbank extends Migration
{
    public function up() {
        $this->forge->addField([
            'id'            => ['type' => 'int',        'constraint' => 11,     'unsigned' => true, 'null' => false,    'auto_increment' => true],
            'titel'         => ['type' => 'varchar',    'constraint' => 100,                        'null' => false],
            'titel_nr'      => ['type' => 'int',        'constraint' => 11,     'unsigned' => true, 'null' => false],
            'kategorie'     => ['type' => 'varchar',    'constraint' => 50,                         'null' => false],
            'komponist'     => ['type' => 'varchar',    'constraint' => 100,                        'null' => true],
            'bemerkung'     => ['type' => 'varchar',    'constraint' => 100,                        'null' => true],
            'created_at'    => ['type' => 'datetime',                                               'null' => true],
            'updated_at'    => ['type' => 'datetime',                                               'null' => true],
            'deleted_at'    => ['type' => 'datetime',                                               'null' => true],
        ]);
        $this->forge->addPrimaryKey('id');
        $this->forge->createTable('notenbank');

        $this->forge->addField([
            'id'            => ['type' => 'int',        'constraint' => 11,     'unsigned' => true, 'null' => false,    'auto_increment' => true],
            'titel_id'      => ['type' => 'int',        'constraint' => 11,     'unsigned' => true, 'null' => false],
            'termin_id'     => ['type' => 'int',        'constraint' => 11,     'unsigned' => true, 'null' => false],
            'status'        => ['type' => 'int',        'constraint' => 11,     'unsigned' => true, 'null' => false],
            'bemerkung'     => ['type' => 'varchar',    'constraint' => 100,                        'null' => true],
            'created_at'    => ['type' => 'datetime',                                               'null' => true],
            'updated_at'    => ['type' => 'datetime',                                               'null' => true],
            'deleted_at'    => ['type' => 'datetime',                                               'null' => true],
        ]);
        $this->forge->addPrimaryKey('id');
        $this->forge->addKey('titel_id');
        $this->forge->addForeignKey('titel_id', 'notenbank', 'id', '', 'CASCADE');
        $this->forge->addKey('termin_id');
        $this->forge->addForeignKey('termin_id', 'termine', 'id', '', 'CASCADE');
        $this->forge->createTable('notenbank_setliste');
    }

    public function down()
    {
        $this->db->disableForeignKeyChecks();
        $this->forge->dropTable('notenbank', true);
        $this->forge->dropTable('notenbank_setliste', true);
        $this->db->enableForeignKeyChecks();
    }
}