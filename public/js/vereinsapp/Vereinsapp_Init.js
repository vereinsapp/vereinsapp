const DATETIME = luxon.DateTime;

$(document).ready(function () {
    Schnittstelle_AjaxInit(); // initialisiert auch AJAXSCHLANGE und CSRF
    Schnittstelle_LocalstorageInit(); // initialisiert auch LOCALSTORAGE LEEREN ERZWINGEN
    Liste_Init();
    Schnittstelle_DomInit(); // initialisiert auch STATUS_SPINNER_CLASS, STATUS_SPINNER_HTML, TOASTS und MODALS

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
Zustandsautomat für den Zustand der Vereinsapp einführen
Select JANEIN als check umbauen
Wartungsarbeiten per Filter handlen
ics_export: muss sichergestellt sein, dass der Termin mindestens 24 Stunden in der Zukunft liegt?
Besseres Symbol für _eigenschaft_loeschen und _eigenschaft_loeschen-Button nur einblenden, wenn es auch tatsächlich was zu löschen gibt
_basiseigenschaften_formular öffnen mit bestimmten eigenschaften vorausgefüllt
eintrag_bereinigen an einen neutralen Ort verschieben (Basismodel? Helper?)
Lässt sich filtern/sortieren/gruppieren_localstorage_speichern entfernen mittels $ziel?
Braucht es formular_beschriftung und beschriftung-span für Formulare (bspw in mitglied_einmal_link_anzeigen_formular.php)?
.btn in .formular mit ENTER betätigbar machen
data-element_id loswerden (vorausgesetzt, dass überall auch data-liste gesetzt ist)
Auswahl überarbeiten?
Zusatzsymbol rechts und links einführen
Neue bootstrap icons Version einführen (unlock2 statt lock)
ziel_id nur setzen, wenn noch keine id vorhanden ist (sonst die existierende id nehmen) -> eigene Funktion einführen?
Termin für Mitglied nur berücksichtigen, wenn Mitglied auch eingeladen ist (bspw. bei Auswertungen in Mitglied-Details)
Bugfix filtern_eigenschaft[filtern_klasse].toISODate is not a function (wenn Start im Termine-Filter gesetzt wird)
...ids_via... entfernen?
Link für Setliste einführen (link umdefinieren als array aus liste => ..., element_id => [eigenschaft, bspw. id oder titel_id])

*/
