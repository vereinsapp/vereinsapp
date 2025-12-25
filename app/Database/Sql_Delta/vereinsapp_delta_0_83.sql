ALTER TABLE `vereinsapp_aufgaben` MODIFY `bemerkung` VARCHAR(100) NULL DEFAULT NULL;
UPDATE `vereinsapp_aufgaben` SET `bemerkung` = NULL WHERE `bemerkung` IS NOT NULL AND TRIM(`bemerkung`) = '';

ALTER TABLE `vereinsapp_notenbank` MODIFY `bemerkung` VARCHAR(100) NULL DEFAULT NULL;
UPDATE `vereinsapp_notenbank` SET `bemerkung` = NULL WHERE `bemerkung` IS NOT NULL AND TRIM(`bemerkung`) = '';

ALTER TABLE `vereinsapp_notenbank` MODIFY `komponist` VARCHAR(100) NULL DEFAULT NULL;
UPDATE `vereinsapp_notenbank` SET `komponist` = NULL WHERE `komponist` IS NOT NULL AND TRIM(`komponist`) = '';

ALTER TABLE `vereinsapp_strafkatalog` MODIFY `bemerkung` VARCHAR(100) NULL DEFAULT NULL;
UPDATE `vereinsapp_strafkatalog` SET `bemerkung` = NULL WHERE `bemerkung` IS NOT NULL AND TRIM(`bemerkung`) = '';

ALTER TABLE `vereinsapp_strafkatalog_kassenbuch` MODIFY `bemerkung` VARCHAR(100) NULL DEFAULT NULL;
UPDATE `vereinsapp_strafkatalog_kassenbuch` SET `bemerkung` = NULL WHERE `bemerkung` IS NOT NULL AND TRIM(`bemerkung`) = '';

ALTER TABLE `vereinsapp_termine` MODIFY `bemerkung` VARCHAR(100) NULL DEFAULT NULL;
UPDATE `vereinsapp_termine` SET `bemerkung` = NULL WHERE `bemerkung` IS NOT NULL AND TRIM(`bemerkung`) = '';

ALTER TABLE `vereinsapp_termine_anwesenheiten` MODIFY `bemerkung` VARCHAR(100) NULL DEFAULT NULL;
UPDATE `vereinsapp_termine_anwesenheiten` SET `bemerkung` = NULL WHERE `bemerkung` IS NOT NULL AND TRIM(`bemerkung`) = '';

ALTER TABLE `vereinsapp_termine_rueckmeldungen` MODIFY `bemerkung` VARCHAR(100) NULL DEFAULT NULL;
UPDATE `vereinsapp_termine_rueckmeldungen` SET `bemerkung` = NULL WHERE `bemerkung` IS NOT NULL AND TRIM(`bemerkung`) = '';

ALTER TABLE `vereinsapp_mitglieder`ADD `bemerkung` VARCHAR(100) NULL DEFAULT NULL;
ALTER TABLE `vereinsapp_notenbank` MODIFY COLUMN `komponist` varchar(100) DEFAULT NULL AFTER `kategorie`;
ALTER TABLE `vereinsapp_aufgaben` DROP COLUMN `zugeordnete_liste`;
ALTER TABLE `vereinsapp_aufgaben` DROP COLUMN `zugeordnete_element_id`;
ALTER TABLE `vereinsapp_aufgaben` ADD COLUMN `max_anzahl_mitglieder` int(11) UNSIGNED DEFAULT NULL AFTER `mitglied_id`;
ALTER TABLE `vereinsapp_aufgaben` DROP FOREIGN KEY `vereinsapp_aufgaben_mitglied_id_foreign`;
ALTER TABLE `vereinsapp_aufgaben` DROP COLUMN `mitglied_id`;
ALTER TABLE `vereinsapp_aufgaben` DROP COLUMN `erledigt`;

CREATE TABLE `vereinsapp_aufgaben_zuordnungen_termine` (
  `id` int(11) UNSIGNED NOT NULL,
  `aufgabe_id` int(11) UNSIGNED NOT NULL,
  `termin_id` int(11) UNSIGNED NOT NULL,
  `status` int(11) UNSIGNED NOT NULL,
  `bemerkung` varchar(100) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `vereinsapp_aufgaben_rueckmeldungen` (
  `id` int(11) UNSIGNED NOT NULL,
  `aufgabe_id` int(11) UNSIGNED NOT NULL,
  `mitglied_id` int(11) UNSIGNED NOT NULL,
  `status` int(11) UNSIGNED NOT NULL,
  `bemerkung` varchar(100) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `vereinsapp_notenbank_setliste` (
  `id` int(11) UNSIGNED NOT NULL,
  `titel_id` int(11) UNSIGNED NOT NULL,
  `termin_id` int(11) UNSIGNED NOT NULL,
  `status` int(11) UNSIGNED NOT NULL,
  `bemerkung` varchar(100) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

ALTER TABLE `vereinsapp_aufgaben_zuordnungen_termine` ADD PRIMARY KEY (`id`), ADD KEY `aufgabe_id` (`aufgabe_id`), ADD KEY `termin_id` (`termin_id`);
ALTER TABLE `vereinsapp_aufgaben_rueckmeldungen` ADD PRIMARY KEY (`id`), ADD KEY `aufgabe_id` (`aufgabe_id`), ADD KEY `mitglied_id` (`mitglied_id`);
ALTER TABLE `vereinsapp_notenbank_setliste` ADD PRIMARY KEY (`id`), ADD KEY `titel_id` (`titel_id`), ADD KEY `termin_id` (`termin_id`);

ALTER TABLE `vereinsapp_aufgaben_zuordnungen_termine` MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;
ALTER TABLE `vereinsapp_aufgaben_rueckmeldungen` MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;
ALTER TABLE `vereinsapp_notenbank_setliste` MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

ALTER TABLE `vereinsapp_aufgaben_zuordnungen_termine`
  ADD CONSTRAINT `vereinsapp_aufgaben_zuordnungen_termine_aufgabe_id_foreign` FOREIGN KEY (`aufgabe_id`) REFERENCES `vereinsapp_aufgaben` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `vereinsapp_aufgaben_zuordnungen_termine_termin_id_foreign` FOREIGN KEY (`termin_id`) REFERENCES `vereinsapp_termine` (`id`) ON DELETE CASCADE;
ALTER TABLE `vereinsapp_aufgaben_rueckmeldungen`
  ADD CONSTRAINT `vereinsapp_aufgaben_rueckmeldungen_aufgabe_id_foreign` FOREIGN KEY (`aufgabe_id`) REFERENCES `vereinsapp_aufgaben` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `vereinsapp_aufgaben_rueckmeldungen_mitglied_id_foreign` FOREIGN KEY (`mitglied_id`) REFERENCES `vereinsapp_mitglieder` (`id`) ON DELETE CASCADE;
ALTER TABLE `vereinsapp_notenbank_setliste`
  ADD CONSTRAINT `vereinsapp_notenbank_setliste_titel_id_foreign` FOREIGN KEY (`titel_id`) REFERENCES `vereinsapp_notenbank` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `vereinsapp_notenbank_setliste_termin_id_foreign` FOREIGN KEY (`termin_id`) REFERENCES `vereinsapp_termine` (`id`) ON DELETE CASCADE;
COMMIT;