const DateTime = luxon.DateTime;

$(document).ready(function () {
    Schnittstelle_AjaxInit();
    Schnittstelle_EventInit();
    Schnittstelle_LocalstorageInit();
    Liste_Init();
    Schnittstelle_DomInit();

    if (LOGGEDIN) {
        Mitglieder_Init();
        Aufgaben_Init();
        Termine_Init();
        Strafkatalog_Init();
        Notenbank_Init();

        $.each(LISTEN, function (liste, LISTE) {
            Schnittstelle_EventAusfuehren([Schnittstelle_EventLocalstorageUpdVariable, Schnittstelle_EventVariableUpdDom], {
                liste: liste,
            });
        });

        Schnittstelle_EventAusfuehren(
            [Schnittstelle_EventSqlUpdLocalstorage, Schnittstelle_EventLocalstorageUpdVariable, Schnittstelle_EventVariableUpdDom],
            undefined,
            true
        );
    }

    $(".formular").each(function () {
        const $formular = $(this);
        const liste = $formular.attr("data-liste");
        const aktion = $formular.attr("data-aktion");
        let element_id = $formular.attr("data-element_id");
        if (typeof element_id !== "undefined") element_id = Number(element_id);
        if (typeof liste !== "undefined") Liste_ElementFormularInitialisieren($formular, aktion, element_id, liste);
    });

    // DATENACHUTZ-RICHTLINIE AKZEPTIEREN
    if (typeof Schnittstelle_LocalstorageRausZurueck("datenschutz_richtlinie_" + DATENSCHUTZ_RICHTLINIE_DATUM) === "undefined")
        Schnittstelle_AjaxInDieSchlange("status/ajax_datenschutz_richtlinie", new Object(), new Object(), function (AJAX) {
            Schnittstelle_DomModalOeffnen(AJAX.antwort.html);
            $(document).on("click", "#datenschutz_richtlinie_akzeptieren", function () {
                Schnittstelle_LocalstorageRein("datenschutz_richtlinie_" + DATENSCHUTZ_RICHTLINIE_DATUM, DateTime.now());
                Schnittstelle_DomModalSchliessen($("#datenschutz_richtlinie_anzeigen"));
            });
        });
});

/* TODO

FEATURES
Filtern auf eine Ebene beschränken und die Oberflächen optimieren
    Info: LISTEN[liste].instanz[instanz] wird initialisiert in Aufgabe_Init, Liste_ElementAuswahlEinfordern, Liste_Init
    Bei Auswertungen data-liste.filtern dynamisch erzeugen (bspw. Kombination aus allgemeinem und spezifischem Mitglieder-Filter und bestehendem dynamischem Mitglieder-Filter)
    Vordefinierte Filter: Beginn Kalenderjahr, Beginn Aktionszeitraum
    Batch über filtern- und sortieren-Button legen
    Verzeichnis filtern und sortieren
Setlist mit Links zu den Titeln einführen
Liste unformatiert in die Zwischenablage kopieren
Termin mit Ende erweitern
Mitglied einplanen bereits bei der Erstellung einer Aufgabe
Mitglieder Lebenslauf
Terminserie / Regeltermine
Termin als ics exportieren
Meta-Infos für Unterverzeichnisse und Dateien anzeigen
Abwesenheiten wieder einführen
Shield-Rollen als Mitglieder-Funktion nutzen (inkl. Registerführer einführen)
Link zu Github neben die Version

SOFTWARE
Funktion zur Erstellung eines Verzeichnisses, inkl. Kopieren von index.html aus dem übergeordneten Verzeichnis
Zusatzsymbole in Liste durch Bootstrap-Icons ersetzen
Schnittstelle_EventElementReduzieren einführen
Hartes Löschen von Mitgliedern wieder zurücknehmen (is_unique vglb. mit Titel) und weiches Löschen für abhängige Tabellen einführen
Ausloggen, bevor Einmal-Link benutzt wird
Einzelne Module als Light-Version, einschaltbar über .env oder settings
IM DOM ERGÄNZEN und IM DOM SORTIEREN zusammenziehen (für Liste, Verzeichnis, Auswertungen, etc.)
Formatierung eines Werts flexibel machen in Liste_WertFormatiertZurueck() (inkl. möglichem Symbol)
Data-Attribute als Object in einem Attribut zusammenfassen
title ändern in beschriftung?
anwesenheiten_dokumentieren für checkliste verallgemeinern (analog zu Schnittstelle_DomNeuesModalInitialisiertZurueck)
Braucht es noch data-farbe an den Werkzeugen (generell an allen Buttons)?
Sortierung nicht mehr case sensitive machen
Schnittstellen-Funktionen einen Standardwert für undefined mitgeben um den anschließenden else-Pfad zu vermeiden
Zustandsautomat für den Zustand der Vereinsapp einführen
Auswertung unabhängig machen von Auswertungen (dann muss das Ergebnis aber für jede Auswertung bestimmt werden)
ziel/umgebung beim DOM-Update ergänzen (damit nicht immer der komplette DOM aktualisiert wird)
Select JANEIN als check umbauen
Wartungsarbeiten per Filter handlen
.btn in .formular mit ENTER betätigbar machen

AKUT
Bei iPhone verschwindet der Termin auf der Startseite nicht sofort, wenn man Rückmeldung gibt.
zusatzsymbole mit aktion nicht anzeigen, wenn klasse_id definiert ist (weil stretched-link-unwirksam nicht funktioniert)
Rekursion-Problem Rückmeldungen vs. Termine auflösen
eintrag_bereinigen an einen neutralen Ort verschieben (Basismodel? Helper?)
Liste für element_navigation überarbeiten (Pfeile zum "scrollen" immer einblenden)

Time::now vs. Time::today klären
Warum wird Liste_AuswertungenAktualisieren in den Termin-Details so oft aufgerufen?
Braucht status_auswahl wirklich eine Beschriftung? Reicht nicht ein array mit den Werten?
Schnittstelle_VariableWertBereinigtZurueck erweitern mit einem zweiten Parameter für einen Wert, der zurückgegeben wird im Fall von undefined
JANEIN in TRUE/FALSE konvertieren (vorstandschaft, aktiv, erledigt_janein, ich_rueckgemeldet, ich_eingeladen, erledigt_janein)
    ich_rueckgemeldet umbenennen in ich_rueckmeldung_janein

*/
