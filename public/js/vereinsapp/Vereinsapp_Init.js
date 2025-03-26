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
    auswahl anpassen an filtern bzgl. ziel_id
    Filtern, sortieren und gruppieren bei auswertungen steckt in einem JSON
    BUGFIX zahlen, zeitaeume, vorgegebene_werte, janein, element_id aus data-filtern_prio_niedrig im filtern-Modal bearbeitbar machen (bspw. entfernbar machen, sodass alle_mitglieder nicht nur aktive anzeigt)
    Eine Vorschau der Auswahl anzeigen und Einträge deselektierbar machen (im Hintergrund wird dann die inverse gespeichert, also die deselektierten, dann id != ...)
    Vordefinierte Filter: Beginn Kalenderjahr, Beginn Aktionszeitraum
    Badge über filtern- und sortieren-Button legen (https://getbootstrap.com/docs/5.3/components/badge/)
    Verzeichnis filtern und sortieren
Auswertungen überarbeiten
    Auswertung unabhängig machen von Auswertungen (dann muss das Ergebnis aber für jede Auswertung bestimmt werden)
    Braucht status_auswahl wirklich eine Beschriftung? Reicht nicht ein array mit den Werten?
    Warum wird Liste_AuswertungenAktualisieren in den Termin-Details so oft aufgerufen?
Mehrere element_ids und mehrere mitglied_ids pro Aufgabe
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
Hartes Löschen von Mitgliedern wieder zurücknehmen (is_unique vglb. mit Titel) und weiches Löschen für abhängige Tabellen einführen
Ausloggen, bevor Einmal-Link benutzt wird
Einzelne Module als Light-Version, einschaltbar über .env oder settings
IM DOM ERGÄNZEN und IM DOM SORTIEREN zusammenziehen (für Liste, Verzeichnis, Auswertungen, etc.)
title ändern in beschriftung?
anwesenheiten_dokumentieren für checkliste verallgemeinern (analog zu Schnittstelle_DomNeuesModalInitialisiertZurueck)
Schnittstelle_VariableWertBereinigtZurueck erweitern mit einem zweiten Parameter für einen Wert, der zurückgegeben wird im Fall von undefined (um den anschließenden else-Pfad zu vermeiden)
Zustandsautomat für den Zustand der Vereinsapp einführen
Select JANEIN als check umbauen
Wartungsarbeiten per Filter handlen
.btn in .formular mit ENTER betätigbar machen
Details loswerden und stattdessen den Singular der Liste verwenden

AKUT
Bei iPhone verschwindet der Termin auf der Startseite nicht sofort, wenn man Rückmeldung gibt.
zusatzsymbole mit aktion nicht anzeigen, wenn klasse_id definiert ist (weil stretched-link-unwirksam nicht funktioniert)
Rekursion-Problem Rückmeldungen vs. Termine auflösen
eintrag_bereinigen an einen neutralen Ort verschieben (Basismodel? Helper?)
Offene Kassenbucheinträge auf die Startseite

*/
