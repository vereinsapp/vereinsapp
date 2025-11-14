const DATETIME = luxon.DateTime;

$(document).ready(function () {
    Schnittstelle_AjaxInit(); // initialisiert auch AJAXSCHLANGE und CSRF
    Schnittstelle_EventInit(); // initialisiert auch EVENT_VARIABLE_UPD_DOM_VOR_LISTE und EVENT_VARIABLE_UPD_DOM_VOR_ENDE
    Schnittstelle_LocalstorageInit(); // initialisiert auch LOCALSTORAGE LEEREN ERZWINGEN
    Liste_Init();
    Schnittstelle_DomInit(); // initialisiert auch STATUS_SPINNER_CLASS, STATUS_SPINNER_HTML, TOASTS und MODALS
    Schnittstelle_LogInit();

    if (LOGGEDIN) {
        Mitglieder_Init();
        Aufgaben_Init();
        Termine_Init();
        Strafkatalog_Init();
        Notenbank_Init();

        $.each(LISTEN, function (liste) {
            Schnittstelle_EventLocalstorageUpdVariable(liste);
        });

        $.each(LISTEN, function (liste) {
            Schnittstelle_VariableElementZuordnen(liste);
        });

        $.each(LISTEN, function (liste) {
            Schnittstelle_VariableElementErgaenzen(liste);
        });

        $.each(LISTEN, function (liste) {
            Schnittstelle_EventVariableUpdDom(liste);
        });

        Schnittstelle_EventSqlUpdLocalstorage();
        setInterval(Schnittstelle_EventSqlUpdLocalstorage, AJAX_ZYKLUSZEIT * 1000);
    }

    // FORMULARE OHNE MODAL (DIREKT IM DOM) INITIALISIEREN, BSPW. MIT WERTEN BEFÜLLEN
    $(".formular").each(function () {
        const $formular = $(this);
        const liste = $formular.attr("data-liste");
        const aktion = $formular.attr("data-aktion");
        let element_id = $formular.attr("data-element_id");
        if (typeof element_id !== "undefined") element_id = Number(element_id);
        if (typeof liste !== "undefined") Liste_ElementFormularInitialisieren($formular, aktion, element_id, liste);
    });

    // DATENACHUTZ-RICHTLINIE AKZEPTIEREN
    if (typeof Schnittstelle_LocalstorageRausZurueck("datenschutz_richtlinie_" + DATENSCHUTZ_RICHTLINIE_DATUM, undefined) === "undefined")
        Schnittstelle_AjaxInDieSchlange("status/ajax_datenschutz_richtlinie", new Object(), new Object(), function (AJAX) {
            Schnittstelle_DomModalOeffnen(AJAX.antwort.html);
            $(document).on("click", "#datenschutz_richtlinie_akzeptieren", function () {
                Schnittstelle_LocalstorageRein("datenschutz_richtlinie_" + DATENSCHUTZ_RICHTLINIE_DATUM, DATETIME.now().toISO());
                Schnittstelle_DomModalSchliessen($("#datenschutz_richtlinie_anzeigen"));
            });
        });
});

/* TODO

FEATURES
Setlist mit Links zu den Titeln einführen
Verzeichnis filtern und sortieren
Meta-Infos für Unterverzeichnisse und Dateien anzeigen
Liste unformatiert in die Zwischenablage kopieren
Terminserie / Regeltermine
Mitglieder Lebenslauf
Abwesenheiten wieder einführen
Shield-Rollen als Mitglieder-Funktion nutzen (inkl. Registerführer einführen)
Link zu Github neben die Version

SOFTWARE
localstorage_reset_string und datenschutz_richtlinie_string entfernen (hinzugefügt im Juni 2025?)
Funktion zur Erstellung eines Verzeichnisses, inkl. Kopieren von index.html aus dem übergeordneten Verzeichnis
Zusatzsymbole in Liste durch Bootstrap-Icons ersetzen
Hartes Löschen von Mitgliedern wieder zurücknehmen (is_unique vglb. mit Titel) und weiches Löschen für abhängige Tabellen einführen
Ausloggen, bevor Einmal-Link benutzt wird
Einzelne Module als Light-Version, einschaltbar über .env oder settings
title ändern in beschriftung?
anwesenheiten_dokumentieren für checkliste verallgemeinern (analog zu Schnittstelle_DomNeuesModalInitialisiertZurueck)
Zustandsautomat für den Zustand der Vereinsapp einführen
Select JANEIN als check umbauen
Wartungsarbeiten per Filter handlen
ics_export: muss sichergestellt sein, dass der Termin mindestens 24 Stunden in der Zukunft liegt?
Besseres Symbol für _eigenschaft_loeschen und _eigenschaft_loeschen-Button nur einblenden, wenn es auch tatsächlich was zu löschen gibt
_basiseigenschaften_formular öffnen mit bestimmten eigenschaften vorausgefüllt (bspw. für neue Aufgabe)
eintrag_bereinigen an einen neutralen Ort verschieben (Basismodel? Helper?)
.btn in .formular mit ENTER betätigbar machen

AKUT
Aufgaben überarbeiten
    mitglied_id bei aufgaben etc. nachziehen (analog zu bemerkung)
    mitgliedausplanen und mitgliedeinplanen in einer Funktion zusammenfassen?
    Mehrere element_ids und mehrere mitglied_ids pro Aufgabe
    Mitglied einplanen bereits bei der Erstellung einer Aufgabe

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

ALTER TABLE `vereinsapp_mitglieder` ADD `bemerkung` VARCHAR(100) NULL DEFAULT NULL;
*/
