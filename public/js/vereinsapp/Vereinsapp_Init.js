const DATETIME = luxon.DateTime;
const BLANKOS = new Object();

$(document).ready(function () {
    Schnittstelle_AjaxInit(); // initialisiert auch AJAXSCHLANGE und CSRF
    Schnittstelle_LocalstorageInit(); // initialisiert auch LOCALSTORAGE LEEREN ERZWINGEN
    Liste_Init();
    Schnittstelle_DomInit(); // initialisiert auch STATUS_SPINNER_CLASS, STATUS_SPINNER_HTML, TOASTS und MODALS

    if (ICH_ID !== null) {
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
    $(".formular[data-liste]").each(function () {
        Liste_Element$FormularInitialisieren($(this));
    });

    // DATENACHUTZ-RICHTLINIE AKZEPTIEREN
    if (typeof Schnittstelle_LocalstorageRausZurueck("datenschutz_richtlinie_" + DATENSCHUTZ_RICHTLINIE_DATUM, undefined) === "undefined")
        Schnittstelle_AjaxInDieSchlange("status/ajax_datenschutz_richtlinie", new Object(), new Object(), function (AJAX) {
            Schnittstelle_Dom$ModalOeffnen(AJAX.antwort.html);
            $(document).on("click", "#datenschutz_richtlinie_akzeptieren", function () {
                Schnittstelle_LocalstorageRein("datenschutz_richtlinie_" + DATENSCHUTZ_RICHTLINIE_DATUM, DATETIME.now().toISO());
                Schnittstelle_Dom$ModalSchliessen($("#datenschutz_richtlinie_anzeigen"));
            });
        });
});

/* TODO

FEATURES
Liste unformatiert in die Zwischenablage kopieren
Terminserie / Regeltermine
Mitglieder Lebenslauf
Abwesenheiten wieder einführen
Shield-Rollen als Mitglieder-Funktion nutzen (inkl. Registerführer einführen)
Link zu Github neben die Version

SOFTWARE
Einzelne Module als Light-Version, einschaltbar über .env oder settings
Zustandsautomat für den Zustand der Vereinsapp einführen
Hartes Löschen von Mitgliedern wieder zurücknehmen (is_unique vglb. mit Titel)
Wartungsarbeiten per Filter handlen
Ausloggen, bevor Einmal-Link benutzt wird
Select JANEIN als check umbauen
Besseres Symbol für _eigenschaft_zuruecksetzen und _eigenschaft_zuruecksetzen-Button nur einblenden, wenn es auch tatsächlich was zu löschen gibt
_basiseigenschaften_formular öffnen mit bestimmten eigenschaften vorausgefüllt
weiches Löschen für abhängige Tabellen einführen
verzeichnis überarbeiten
    Verzeichnis filtern und sortieren
    Meta-Infos für Unterverzeichnisse und Dateien anzeigen
    Funktion zur Erstellung eines Verzeichnisses, inkl. Kopieren von index.html aus dem übergeordneten Verzeichnis
.btn in .formular mit ENTER betätigbar machen
Zusatzsymbole in Liste durch Bootstrap-Icons ersetzen (ausschließlich spezielle Zusatzsymbole wie beispiele Termin-Kategorie als hex-Symbole)
Neue bootstrap icons Version einführen (unlock2 statt lock)
Termin für Mitglied nur berücksichtigen, wenn Mitglied auch eingeladen ist (bspw. bei Auswertungen in Mitglied-Details)
localstorage_reset_string und datenschutz_richtlinie_string entfernen (hinzugefügt im Juni 2025?)
Bugfix filtern_eigenschaft[filtern_klasse].toISODate is not a function (wenn Start im Termine-Filter gesetzt wird)
kacheln-View ergänzen (analog zu liste-View)
Aufgaben detaillieren
data-Prefix loswerden
Schnittstelle_VariableWertFormatiertZurueck verschieben nach Liste (auch umbenennen)
Bugfix meine_daten_aendern schreibt Mitglied ändern ins Formular-Werkzeug
.btn_ ersetzen durch .werkzeug[data-werkzeug=""]
FORMULARE OHNE MODAL (DIREKT IM DOM) INITIALISIEREN verschieben nach Schnittstelle_DomInit?
title großteils entfernen weil der über das Werkzeug gegeben ist?
datenschutzrichtlinie immer in layout laden (kein ajax)

ERLEDIGT

*/
