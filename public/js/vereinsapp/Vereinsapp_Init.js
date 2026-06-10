$(document).ready(function () {
    Util_Init();

    Log_Init();
    Ajax_Init();
    Serverdata_Init();
    Localstorage_Init();
    Dom_Init();

    Liste_Init();

    if (ICH_ID !== null) {
        Serverdata_ServerdataHolen();
        setInterval(Serverdata_ServerdataHolen, SERVERDATA_HOLEN_ZYKLUSZEIT * 1000);
    }
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
Sass mixin für Integration der bootstrap-Farben in eigene Klassen?
_basiseigenschaften_formular öffnen mit bestimmten eigenschaften vorausgefüllt
Termin für Mitglied nur berücksichtigen, wenn Mitglied auch eingeladen ist (bspw. bei Auswertungen in Mitglied-Details) -> termin.mitglied_ids_eingeladen verwenden?
Mit Github Copilot Datei-Upload implementieren
Besseres Symbol für _eigenschaft_zuruecksetzen und _eigenschaft_zuruecksetzen-Button nur einblenden, wenn es auch tatsächlich was zu löschen gibt
.werkzeug in .formular mit ENTER betätigbar machen
Neue bootstrap icons Version einführen (unlock2 statt lock)
event einführen, dass Liste_Element$FormularInitialisieren ausgeführt wird, wenn ein modal geöffnet wurde (mittels Dom_$ModalOeffnen)
Mit Github Copilot flex-nowrap, flex-grow, text-truncate und text-nowrap diskutieren
Mit Github Copilot Agent die Anordnung in Details optimieren
if (ICH_ID !== null) loswerden
Liste_$AuswertungInitialisiertZurueck und Liste_$ElementInitialisiertZurueck einführen
Aufgaben detaillieren
Vereinsapp_env aufspalten in mehrere _env
Bugfix filtern_eigenschaft[filtern_klasse].toISODate is not a function (wenn Start im Termine-Filter gesetzt wird)
Zugewiesene Strafen anzeigen
VIEWDATA in LISTEN integrieren
Termin-Ende passt sich automatisch an Termin-Start an
Wie weiter mit Liste_$ListenstatistikAktualisieren?
status_erlaubt enthält nur noch Symbole, kein html mehr
texte zu inhalt_kopieren aus js in Vereinsapp-config verschieben
auswertung-Views vereinheitlichen?
dbdata vereinheitlichen zu serverdata und bei jedem ajax die aktualisierten Daten an den Client zurückschicken (statt im Client zu erahnen was der Server tut)
liste aus link_data loswerden
Lässt sich Liste_ElementWertErgaenzen in Liste_EventListenBereitstellen integrieren?
    Dann muss Liste_EventListenBereitstellen("termine") immer nach Liste_EventListenBereitstellen("mitglieder") aufgerufen werden (siehe LISTEN.termine.element_ergaenzen_aktion)
Alles außerhalb der _Init-Funktionen nach innen verschieben (außer Initialisierungen), dann die Reihenfolge der _Init-Funktionen optimieren
Listen[liste].tabelle zum Object umbauen (statt Array)? Muss man dann in JavaScript nochmal jede Verknuepfung durchgehen?
Braucht es im Toast wirklich erweiterte Beschriftung?
Relevante Funktionen aus lib nach util/ajax verschieben (util in helferlein umbenennen? lib in extlib umbenennen?)
instanz[instanz].$blanko_... umbauen zu $blanko_...[instanz], dann instanz aus VERKNUEPFUNGEN[auswertungen/verknuepfungen] entfernen (instanz aus LISTEN[liste] entfernen und filtern etc. nach FILTERN etc. verschieben?)
Bugfix bearbeiten_modus immernoch aktiv trotz fehlendem Recht
Lesendes .attr( immer in Kombination mit Util_WertBereinigtZurueck( ... , undefined) verwenden
Bugfix Text-Ausrichtung Ergebnis Auswertung (wenn eine Liste leer ist, dann wird sie ausgeblendet) + Gesamt hat ein Toggle-Symbol

verknuepfung_ids_nach_liste verschieben in element und Liste_EventVerknuepfungenBereitstellen dann nach Liste_EventListenBereitstellen aufrufen?
VERKNUEPFUNGEN[ ... ]['typ'] element_auswahl, janein_auswahl und status_auswahl notwendig? 
Bemerkung-Anzeigeproblematik, Status-Anzeigeproblematik und sortable-Event bei Elementen mit Verknuepfungen (Auswertungen-Views, Setliste)
    Mehrere gleiche Titel in der Setliste anzeigen
    Braucht es dann noch ZUSATZSYMBOLE_VERKNUEPFUNGEN_AKTUALISIEREN_AKTION?
    $verknuepfung_status/.verknuepfung_status einführen

ERLEDIGT

*/
