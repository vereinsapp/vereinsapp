SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `vereinsapp`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `vereinsapp_aufgaben`
--

CREATE TABLE `vereinsapp_aufgaben` (
  `id` int(11) UNSIGNED NOT NULL,
  `titel` varchar(100) NOT NULL,
  `max_anzahl_mitglieder` int(11) UNSIGNED DEFAULT NULL,
  `bemerkung` varchar(100) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `vereinsapp_aufgaben_rueckmeldungen`
--

CREATE TABLE `vereinsapp_aufgaben_rueckmeldungen` (
  `id` int(11) UNSIGNED NOT NULL,
  `aufgabe_id` int(11) UNSIGNED NOT NULL,
  `mitglied_id` int(11) UNSIGNED NOT NULL,
  `status` int(11) UNSIGNED NOT NULL,
  `bemerkung` varchar(100) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `vereinsapp_aufgaben_zuordnungen_termine`
--

CREATE TABLE `vereinsapp_aufgaben_zuordnungen_termine` (
  `id` int(11) UNSIGNED NOT NULL,
  `aufgabe_id` int(11) UNSIGNED NOT NULL,
  `termin_id` int(11) UNSIGNED NOT NULL,
  `status` int(11) UNSIGNED NOT NULL,
  `bemerkung` varchar(100) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `vereinsapp_migrations`
--

CREATE TABLE `vereinsapp_migrations` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `version` varchar(255) NOT NULL,
  `class` varchar(255) NOT NULL,
  `group` varchar(255) NOT NULL,
  `namespace` varchar(255) NOT NULL,
  `time` int(11) NOT NULL,
  `batch` int(11) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `vereinsapp_migrations`
--

INSERT INTO `vereinsapp_migrations` (`id`, `version`, `class`, `group`, `namespace`, `time`, `batch`) VALUES
(1, '2020-12-28-223112', 'CodeIgniter\\Shield\\Database\\Migrations\\CreateAuthTables', 'default', 'CodeIgniter\\Shield', 1726846089, 1),
(2, '2021-07-04-041948', 'CodeIgniter\\Settings\\Database\\Migrations\\CreateSettingsTable', 'default', 'CodeIgniter\\Settings', 1726846089, 1),
(3, '2021-11-14-143905', 'CodeIgniter\\Settings\\Database\\Migrations\\AddContextColumn', 'default', 'CodeIgniter\\Settings', 1726846089, 1),
(4, '2024-01-01-000000', 'App\\Database\\Migrations\\Extend_Mitglieder', 'default', 'App', 1726846089, 1),
(5, '2024-01-01-000000', 'App\\Database\\Migrations\\Notenbank', 'default', 'App', 1726846089, 1),
(6, '2024-01-01-000000', 'App\\Database\\Migrations\\Strafkatalog', 'default', 'App', 1726846089, 1),
(7, '2024-01-01-000000', 'App\\Database\\Migrations\\Termine', 'default', 'App', 1726846089, 1);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `vereinsapp_mitglieder`
--

CREATE TABLE `vereinsapp_mitglieder` (
  `id` int(11) UNSIGNED NOT NULL,
  `username` varchar(30) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `status_message` varchar(255) DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT 0,
  `last_active` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `vorname` varchar(50) NOT NULL,
  `nachname` varchar(50) NOT NULL,
  `geburt` datetime NOT NULL,
  `postleitzahl` int(5) UNSIGNED NOT NULL,
  `wohnort` varchar(50) NOT NULL,
  `geschlecht` varchar(5) NOT NULL,
  `register` varchar(50) NOT NULL DEFAULT 'ohne',
  `auto` varchar(50) NOT NULL DEFAULT 'ohne',
  `funktion` varchar(50) NOT NULL DEFAULT 'ohne',
  `vorstandschaft_janein` tinyint(1) NOT NULL DEFAULT 0,
  `aktiv_janein` tinyint(1) NOT NULL DEFAULT 1,
  `real_janein` tinyint(1) NOT NULL DEFAULT 1,
  `bemerkung` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `vereinsapp_mitglieder`
--

INSERT INTO `vereinsapp_mitglieder` (`id`, `username`, `status`, `status_message`, `active`, `last_active`, `created_at`, `updated_at`, `deleted_at`, `vorname`, `nachname`, `geburt`, `postleitzahl`, `wohnort`, `geschlecht`, `register`, `auto`, `funktion`, `vorstandschaft_janein`, `aktiv_janein`, `real_janein`, `bemerkung`) VALUES
(1, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, 'John', 'Doe', '2024-01-01 00:00:00', 12345, 'Musterstadt', 'd', 'ohne', 'ohne', 'ohne', 0, 1, 1, NULL);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `vereinsapp_mitglieder_login_eingeloggt_bleiben`
--

CREATE TABLE `vereinsapp_mitglieder_login_eingeloggt_bleiben` (
  `id` int(11) UNSIGNED NOT NULL,
  `selector` varchar(255) NOT NULL,
  `hashedValidator` varchar(255) NOT NULL,
  `user_id` int(11) UNSIGNED NOT NULL,
  `expires` datetime NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `vereinsapp_mitglieder_login_versuche`
--

CREATE TABLE `vereinsapp_mitglieder_login_versuche` (
  `id` int(11) UNSIGNED NOT NULL,
  `ip_address` varchar(255) NOT NULL,
  `user_agent` varchar(255) DEFAULT NULL,
  `id_type` varchar(255) NOT NULL,
  `identifier` varchar(255) NOT NULL,
  `user_id` int(11) UNSIGNED DEFAULT NULL,
  `date` datetime NOT NULL,
  `success` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `vereinsapp_mitglieder_login_versuche_token`
--

CREATE TABLE `vereinsapp_mitglieder_login_versuche_token` (
  `id` int(11) UNSIGNED NOT NULL,
  `ip_address` varchar(255) NOT NULL,
  `user_agent` varchar(255) DEFAULT NULL,
  `id_type` varchar(255) NOT NULL,
  `identifier` varchar(255) NOT NULL,
  `user_id` int(11) UNSIGNED DEFAULT NULL,
  `date` datetime NOT NULL,
  `success` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `vereinsapp_mitglieder_rollen`
--

CREATE TABLE `vereinsapp_mitglieder_rollen` (
  `id` int(11) UNSIGNED NOT NULL,
  `user_id` int(11) UNSIGNED NOT NULL,
  `group` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `vereinsapp_mitglieder_rollen`
--

INSERT INTO `vereinsapp_mitglieder_rollen` (`id`, `user_id`, `group`, `created_at`) VALUES
(1, 1, 'mitglied', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `vereinsapp_mitglieder_vergebene_rechte`
--

CREATE TABLE `vereinsapp_mitglieder_vergebene_rechte` (
  `id` int(11) UNSIGNED NOT NULL,
  `user_id` int(11) UNSIGNED NOT NULL,
  `permission` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `vereinsapp_mitglieder_vergebene_rechte`
--

INSERT INTO `vereinsapp_mitglieder_vergebene_rechte` (`id`, `user_id`, `permission`, `created_at`) VALUES
(1, 1, 'global.einstellungen', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `vereinsapp_mitglieder_zugaenge`
--

CREATE TABLE `vereinsapp_mitglieder_zugaenge` (
  `id` int(11) UNSIGNED NOT NULL,
  `user_id` int(11) UNSIGNED NOT NULL,
  `type` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `secret` varchar(255) NOT NULL,
  `secret2` varchar(255) DEFAULT NULL,
  `expires` datetime DEFAULT NULL,
  `extra` text DEFAULT NULL,
  `force_reset` tinyint(1) NOT NULL DEFAULT 0,
  `last_used_at` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `vereinsapp_mitglieder_zugaenge`
--

INSERT INTO `vereinsapp_mitglieder_zugaenge` (`id`, `user_id`, `type`, `name`, `secret`, `secret2`, `expires`, `extra`, `force_reset`, `last_used_at`, `created_at`, `updated_at`) VALUES
(1, 1, 'email_password', NULL, 'john.doe@email.de', '$2y$10$AZB9pt4pC8ZQQIoiF2blVuBJcPAf0M8MfX5gqqurLlWOaKdE3hg4q', NULL, NULL, 0, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `vereinsapp_notenbank`
--

CREATE TABLE `vereinsapp_notenbank` (
  `id` int(11) UNSIGNED NOT NULL,
  `titel` varchar(100) NOT NULL,
  `titel_nr` int(11) UNSIGNED NOT NULL,
  `kategorie` varchar(50) NOT NULL,
  `komponist` varchar(100) DEFAULT NULL,
  `bemerkung` varchar(100) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `vereinsapp_notenbank_setliste`
--

CREATE TABLE `vereinsapp_notenbank_setliste` (
  `id` int(11) UNSIGNED NOT NULL,
  `titel_id` int(11) UNSIGNED NOT NULL,
  `termin_id` int(11) UNSIGNED NOT NULL,
  `status` int(11) UNSIGNED NOT NULL,
  `bemerkung` varchar(100) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `vereinsapp_settings`
--

CREATE TABLE `vereinsapp_settings` (
  `id` int(9) NOT NULL,
  `class` varchar(255) NOT NULL,
  `key` varchar(255) NOT NULL,
  `value` text DEFAULT NULL,
  `type` varchar(31) NOT NULL DEFAULT 'string',
  `context` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `vereinsapp_strafkatalog`
--

CREATE TABLE `vereinsapp_strafkatalog` (
  `id` int(11) UNSIGNED NOT NULL,
  `titel` varchar(100) NOT NULL,
  `wert` decimal(10,2) UNSIGNED NOT NULL,
  `kategorie` varchar(50) NOT NULL,
  `bemerkung` varchar(100) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `vereinsapp_strafkatalog_zugewiesene_strafen`
--

CREATE TABLE `vereinsapp_strafkatalog_zugewiesene_strafen` (
  `id` int(11) UNSIGNED NOT NULL,
  `strafe_id` int(11) UNSIGNED NOT NULL,
  `mitglied_id` int(11) UNSIGNED NOT NULL,
  `status` int(11) UNSIGNED NOT NULL,
  `bemerkung` varchar(100) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `vereinsapp_termine`
--

CREATE TABLE `vereinsapp_termine` (
  `id` int(11) UNSIGNED NOT NULL,
  `titel` varchar(100) NOT NULL,
  `start` datetime NOT NULL,
  `ende` datetime NOT NULL,
  `ort` varchar(100) NOT NULL,
  `kategorie` varchar(50) NOT NULL,
  `filtern_mitglieder` longtext NOT NULL DEFAULT '{}',
  `oeffentlich_janein` tinyint(1) NOT NULL DEFAULT 0,
  `bemerkung` varchar(100) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `vereinsapp_termine_anwesenheiten`
--

CREATE TABLE `vereinsapp_termine_anwesenheiten` (
  `id` int(11) UNSIGNED NOT NULL,
  `termin_id` int(11) UNSIGNED NOT NULL,
  `mitglied_id` int(11) UNSIGNED NOT NULL,
  `status` int(11) UNSIGNED NOT NULL,
  `bemerkung` varchar(100) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `vereinsapp_termine_rueckmeldungen`
--

CREATE TABLE `vereinsapp_termine_rueckmeldungen` (
  `id` int(11) UNSIGNED NOT NULL,
  `termin_id` int(11) UNSIGNED NOT NULL,
  `mitglied_id` int(11) UNSIGNED NOT NULL,
  `status` int(11) UNSIGNED NOT NULL,
  `bemerkung` varchar(100) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `vereinsapp_aufgaben`
--
ALTER TABLE `vereinsapp_aufgaben`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `vereinsapp_aufgaben_rueckmeldungen`
--
ALTER TABLE `vereinsapp_aufgaben_rueckmeldungen`
  ADD PRIMARY KEY (`id`),
  ADD KEY `aufgabe_id` (`aufgabe_id`),
  ADD KEY `mitglied_id` (`mitglied_id`);

--
-- Indizes für die Tabelle `vereinsapp_aufgaben_zuordnungen_termine`
--
ALTER TABLE `vereinsapp_aufgaben_zuordnungen_termine`
  ADD PRIMARY KEY (`id`),
  ADD KEY `aufgabe_id` (`aufgabe_id`),
  ADD KEY `termin_id` (`termin_id`);

--
-- Indizes für die Tabelle `vereinsapp_migrations`
--
ALTER TABLE `vereinsapp_migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `vereinsapp_mitglieder`
--
ALTER TABLE `vereinsapp_mitglieder`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indizes für die Tabelle `vereinsapp_mitglieder_login_eingeloggt_bleiben`
--
ALTER TABLE `vereinsapp_mitglieder_login_eingeloggt_bleiben`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `selector` (`selector`),
  ADD KEY `vereinsapp_mitglieder_login_eingeloggt_bleiben_user_id_foreign` (`user_id`);

--
-- Indizes für die Tabelle `vereinsapp_mitglieder_login_versuche`
--
ALTER TABLE `vereinsapp_mitglieder_login_versuche`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_type_identifier` (`id_type`,`identifier`),
  ADD KEY `user_id` (`user_id`);

--
-- Indizes für die Tabelle `vereinsapp_mitglieder_login_versuche_token`
--
ALTER TABLE `vereinsapp_mitglieder_login_versuche_token`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_type_identifier` (`id_type`,`identifier`),
  ADD KEY `user_id` (`user_id`);

--
-- Indizes für die Tabelle `vereinsapp_mitglieder_rollen`
--
ALTER TABLE `vereinsapp_mitglieder_rollen`
  ADD PRIMARY KEY (`id`),
  ADD KEY `vereinsapp_mitglieder_rollen_user_id_foreign` (`user_id`);

--
-- Indizes für die Tabelle `vereinsapp_mitglieder_vergebene_rechte`
--
ALTER TABLE `vereinsapp_mitglieder_vergebene_rechte`
  ADD PRIMARY KEY (`id`),
  ADD KEY `vereinsapp_mitglieder_vergebene_rechte_user_id_foreign` (`user_id`);

--
-- Indizes für die Tabelle `vereinsapp_mitglieder_zugaenge`
--
ALTER TABLE `vereinsapp_mitglieder_zugaenge`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `type_secret` (`type`,`secret`),
  ADD KEY `user_id` (`user_id`);

--
-- Indizes für die Tabelle `vereinsapp_notenbank`
--
ALTER TABLE `vereinsapp_notenbank`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `vereinsapp_notenbank_setliste`
--
ALTER TABLE `vereinsapp_notenbank_setliste`
  ADD PRIMARY KEY (`id`),
  ADD KEY `titel_id` (`titel_id`),
  ADD KEY `termin_id` (`termin_id`);

--
-- Indizes für die Tabelle `vereinsapp_settings`
--
ALTER TABLE `vereinsapp_settings`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `vereinsapp_strafkatalog`
--
ALTER TABLE `vereinsapp_strafkatalog`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `vereinsapp_strafkatalog_zugewiesene_strafen`
--
ALTER TABLE `vereinsapp_strafkatalog_zugewiesene_strafen`
  ADD PRIMARY KEY (`id`),
  ADD KEY `mitglied_id` (`mitglied_id`);
  ADD KEY `strafe_id` (`strafe_id`),

--
-- Indizes für die Tabelle `vereinsapp_termine`
--
ALTER TABLE `vereinsapp_termine`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `vereinsapp_termine_anwesenheiten`
--
ALTER TABLE `vereinsapp_termine_anwesenheiten`
  ADD PRIMARY KEY (`id`),
  ADD KEY `termin_id` (`termin_id`),
  ADD KEY `mitglied_id` (`mitglied_id`);

--
-- Indizes für die Tabelle `vereinsapp_termine_rueckmeldungen`
--
ALTER TABLE `vereinsapp_termine_rueckmeldungen`
  ADD PRIMARY KEY (`id`),
  ADD KEY `termin_id` (`termin_id`),
  ADD KEY `mitglied_id` (`mitglied_id`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `vereinsapp_aufgaben`
--
ALTER TABLE `vereinsapp_aufgaben`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `vereinsapp_aufgaben_rueckmeldungen`
--
ALTER TABLE `vereinsapp_aufgaben_rueckmeldungen`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `vereinsapp_aufgaben_zuordnungen_termine`
--
ALTER TABLE `vereinsapp_aufgaben_zuordnungen_termine`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `vereinsapp_migrations`
--
ALTER TABLE `vereinsapp_migrations`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT für Tabelle `vereinsapp_mitglieder`
--
ALTER TABLE `vereinsapp_mitglieder`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT für Tabelle `vereinsapp_mitglieder_login_eingeloggt_bleiben`
--
ALTER TABLE `vereinsapp_mitglieder_login_eingeloggt_bleiben`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `vereinsapp_mitglieder_login_versuche`
--
ALTER TABLE `vereinsapp_mitglieder_login_versuche`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `vereinsapp_mitglieder_login_versuche_token`
--
ALTER TABLE `vereinsapp_mitglieder_login_versuche_token`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `vereinsapp_mitglieder_rollen`
--
ALTER TABLE `vereinsapp_mitglieder_rollen`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT für Tabelle `vereinsapp_mitglieder_vergebene_rechte`
--
ALTER TABLE `vereinsapp_mitglieder_vergebene_rechte`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT für Tabelle `vereinsapp_mitglieder_zugaenge`
--
ALTER TABLE `vereinsapp_mitglieder_zugaenge`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT für Tabelle `vereinsapp_notenbank`
--
ALTER TABLE `vereinsapp_notenbank`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `vereinsapp_notenbank_setliste`
--
ALTER TABLE `vereinsapp_notenbank_setliste`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `vereinsapp_settings`
--
ALTER TABLE `vereinsapp_settings`
  MODIFY `id` int(9) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `vereinsapp_strafkatalog`
--
ALTER TABLE `vereinsapp_strafkatalog`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `vereinsapp_strafkatalog_zugewiesene_strafen`
--
ALTER TABLE `vereinsapp_strafkatalog_zugewiesene_strafen`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `vereinsapp_termine`
--
ALTER TABLE `vereinsapp_termine`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `vereinsapp_termine_anwesenheiten`
--
ALTER TABLE `vereinsapp_termine_anwesenheiten`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `vereinsapp_termine_rueckmeldungen`
--
ALTER TABLE `vereinsapp_termine_rueckmeldungen`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `vereinsapp_aufgaben_rueckmeldungen`
--
ALTER TABLE `vereinsapp_aufgaben_rueckmeldungen`
  ADD CONSTRAINT `vereinsapp_aufgaben_rueckmeldungen_aufgabe_id_foreign` FOREIGN KEY (`aufgabe_id`) REFERENCES `vereinsapp_aufgaben` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `vereinsapp_aufgaben_rueckmeldungen_mitglied_id_foreign` FOREIGN KEY (`mitglied_id`) REFERENCES `vereinsapp_mitglieder` (`id`) ON DELETE CASCADE;

--
-- Constraints der Tabelle `vereinsapp_aufgaben_zuordnungen_termine`
--
ALTER TABLE `vereinsapp_aufgaben_zuordnungen_termine`
  ADD CONSTRAINT `vereinsapp_aufgaben_zuordnungen_termine_aufgabe_id_foreign` FOREIGN KEY (`aufgabe_id`) REFERENCES `vereinsapp_aufgaben` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `vereinsapp_aufgaben_zuordnungen_termine_termin_id_foreign` FOREIGN KEY (`termin_id`) REFERENCES `vereinsapp_termine` (`id`) ON DELETE CASCADE;

--
-- Constraints der Tabelle `vereinsapp_mitglieder_login_eingeloggt_bleiben`
--
ALTER TABLE `vereinsapp_mitglieder_login_eingeloggt_bleiben`
  ADD CONSTRAINT `vereinsapp_mitglieder_login_eingeloggt_bleiben_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `vereinsapp_mitglieder` (`id`) ON DELETE CASCADE;

--
-- Constraints der Tabelle `vereinsapp_mitglieder_rollen`
--
ALTER TABLE `vereinsapp_mitglieder_rollen`
  ADD CONSTRAINT `vereinsapp_mitglieder_rollen_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `vereinsapp_mitglieder` (`id`) ON DELETE CASCADE;

--
-- Constraints der Tabelle `vereinsapp_mitglieder_vergebene_rechte`
--
ALTER TABLE `vereinsapp_mitglieder_vergebene_rechte`
  ADD CONSTRAINT `vereinsapp_mitglieder_vergebene_rechte_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `vereinsapp_mitglieder` (`id`) ON DELETE CASCADE;

--
-- Constraints der Tabelle `vereinsapp_mitglieder_zugaenge`
--
ALTER TABLE `vereinsapp_mitglieder_zugaenge`
  ADD CONSTRAINT `vereinsapp_mitglieder_zugaenge_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `vereinsapp_mitglieder` (`id`) ON DELETE CASCADE;

--
-- Constraints der Tabelle `vereinsapp_notenbank_setliste`
--
ALTER TABLE `vereinsapp_notenbank_setliste`
  ADD CONSTRAINT `vereinsapp_notenbank_setliste_titel_id_foreign` FOREIGN KEY (`titel_id`) REFERENCES `vereinsapp_notenbank` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `vereinsapp_notenbank_setliste_termin_id_foreign` FOREIGN KEY (`termin_id`) REFERENCES `vereinsapp_termine` (`id`) ON DELETE CASCADE;

--
-- Constraints der Tabelle `vereinsapp_strafkatalog_zugewiesene_strafen`
--
ALTER TABLE `vereinsapp_strafkatalog_zugewiesene_strafen`
  ADD CONSTRAINT `vereinsapp_strafkatalog_zugewiesene_strafen_mitglied_id_foreign` FOREIGN KEY (`mitglied_id`) REFERENCES `vereinsapp_mitglieder` (`id`) ON DELETE CASCADE;
  ADD CONSTRAINT `vereinsapp_strafkatalog_zugewiesene_strafen_strafe_id_foreign` FOREIGN KEY (`strafe_id`) REFERENCES `vereinsapp_strafkatalog` (`id`) ON DELETE CASCADE,
--
-- Constraints der Tabelle `vereinsapp_termine_anwesenheiten`
--
ALTER TABLE `vereinsapp_termine_anwesenheiten`
  ADD CONSTRAINT `vereinsapp_termine_anwesenheiten_mitglied_id_foreign` FOREIGN KEY (`mitglied_id`) REFERENCES `vereinsapp_mitglieder` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `vereinsapp_termine_anwesenheiten_termin_id_foreign` FOREIGN KEY (`termin_id`) REFERENCES `vereinsapp_termine` (`id`) ON DELETE CASCADE;

--
-- Constraints der Tabelle `vereinsapp_termine_rueckmeldungen`
--
ALTER TABLE `vereinsapp_termine_rueckmeldungen`
  ADD CONSTRAINT `vereinsapp_termine_rueckmeldungen_mitglied_id_foreign` FOREIGN KEY (`mitglied_id`) REFERENCES `vereinsapp_mitglieder` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `vereinsapp_termine_rueckmeldungen_termin_id_foreign` FOREIGN KEY (`termin_id`) REFERENCES `vereinsapp_termine` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
