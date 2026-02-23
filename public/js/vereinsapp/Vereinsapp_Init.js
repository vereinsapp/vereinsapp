const DATETIME = luxon.DateTime;
const BLANKOS = new Object();

$(document).ready(function () {
    Schnittstelle_AjaxInit(); // leere Funktion
    Schnittstelle_LocalstorageInit(); // initilisiert events und führt LOCALSTORAGE LEEREN ERZWINGEN aus
    Liste_Init(); // initilisiert events, fügt instanz zu LISTEN[liste] und initialisiert instanz zu LISTEN[liste].instanz, zLISTEN[auswertungen].instanz und zLISTEN[verzeichnis].instanz
    Schnittstelle_DomInit(); // initilisiert events und stellt blankos bereit
    Schnittstelle_LogInDieKonsole(LISTEN.notenbank.instanz);

    if (ICH_ID !== null) {
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

    // JETZT AKTUALISIEREN
    $(".jetzt").each(function () {
        Schnittstelle_Dom$JetztAktualisieren($(this));
    });

    // DATENSCHUTZ-RICHTLINIE OEFFNEN
    if (typeof Schnittstelle_LocalstorageRausZurueck("datenschutz_richtlinie_" + DATENSCHUTZ_RICHTLINIE_DATUM, undefined) === "undefined")
        Schnittstelle_Dom$ModalOeffnen(Schnittstelle_Dom$NeuesModalInitialisiertZurueck(undefined, "datenschutz_richtlinie_modal"));

    // AUTOLOAD-MODALS OEFFNEN
    $.each(AUTOLOAD_MODALS, function (position, modal_id) {
        Schnittstelle_Dom$ModalOeffnen(Schnittstelle_Dom$NeuesModalInitialisiertZurueck(undefined, modal_id));
        // Liste_Element$FormularInitialisieren($modal.find(".formular"));
    });

    // FORMULARE INITIALISIEREN
    $(".formular").each(function () {
        Liste_Element$FormularInitialisieren($(this));
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
Bugfix filtern_eigenschaft[filtern_klasse].toISODate is not a function (wenn Start im Termine-Filter gesetzt wird)
kacheln-View ergänzen (analog zu liste-View)
Aufgaben detaillieren
data-Prefix loswerden
Schnittstelle_VariableWertFormatiertZurueck verschieben nach Liste (auch umbenennen)
Bugfix meine_daten_aendern schreibt Mitglied ändern ins Formular-Werkzeug
.btn_ ersetzen durch .werkzeug[data-werkzeug=""]
title großteils entfernen weil der über das Werkzeug gegeben ist?

ERLEDIGT

*/
