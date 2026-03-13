$(document).ready(function () {
    Util_Init();

    Ajax_Init();
    Localstorage_Init();
    Log_Init();
    Dom_Init();

    Liste_Init();
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
weiches Löschen für abhängige Tabellen einführen
Termin für Mitglied nur berücksichtigen, wenn Mitglied auch eingeladen ist (bspw. bei Auswertungen in Mitglied-Details)
verzeichnis überarbeiten
    Verzeichnis filtern und sortieren
    Meta-Infos für Unterverzeichnisse und Dateien anzeigen
    Funktion zur Erstellung eines Verzeichnisses, inkl. Kopieren von index.html aus dem übergeordneten Verzeichnis
Besseres Symbol für _eigenschaft_zuruecksetzen und _eigenschaft_zuruecksetzen-Button nur einblenden, wenn es auch tatsächlich was zu löschen gibt
.werkzeug in .formular mit ENTER betätigbar machen
Zusatzsymbole in Liste durch Bootstrap-Icons ersetzen (ausschließlich spezielle Zusatzsymbole wie beispiele Termin-Kategorie als hex-Symbole)
Neue bootstrap icons Version einführen (unlock2 statt lock)
event einführen, dass Liste_Element$FormularInitialisieren ausgeführt wird, wenn ein modal geöffnet wurde (mittels Dom_$ModalOeffnen)
Verinsapp_env aufspalten in mehrere _env
Bugfix filtern_eigenschaft[filtern_klasse].toISODate is not a function (wenn Start im Termine-Filter gesetzt wird)
Werkzeug zum Unterdrücken der Werkzeuge? Inkl. Speichern im LocalStorage?
Aufgaben detaillieren
Zugewiesene Strafen anzeigen
Bugfix Klick auf Werkzeug direkt im Element löst Element-Event und Werkzeug-Event aus
LISTEN[liste].beschriftung umbenennen in LISTEN[liste].liste_beschriftung und mit beschriftung in VIEWDATA verheiraten
modal_title generieren analog zu element_loeschen / Liste_ElementLoeschen
sortable als Werkzeug einführen?
Werkzeuge für erstellen, duplizieren und aendern auch vereinheitlichen (analaog zu element_loeschen)?
setliste_verwalten in Notenbank nicht ermöglichen
Anderes Symbol für termine_anwesenheiten_dokumentieren
VIEWDATA in LISTEN integrieren
Mit Github Copilot Agent die Anordnung in einstellungen optimieren
Leere Listen komplett ausblenden (UeberschriftAktualisieren auch überprüfen)
Werkzeug für Rückmeldungen und Anwesenheiten auch in Auswertung einführen + WerkzeugAktualisieren vereinheitlichen mit Übernahme jeglicher [element]_id-Atribute
werkzeuge_element, werkzeuge_liste und werkzeuge_auswertungen vereinheitlichen
Bugfix Bemerkung ändern
Bugfix Auswertungen-Details anzeigen
liste als card + list-group-flush darstellen, ggf. mit Überschrift im card-header
ul und li ändern in div im auswertungen-View

ERLEDIGT

*/
