$(document).ready(function () {
    Util_Init();

    Ajax_Init();
    Localstorage_Init();
    Log_Init();

    Serverdata_Init();
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
Mit Github Copilot Datei-Upload implementieren
Besseres Symbol für _eigenschaft_zuruecksetzen und _eigenschaft_zuruecksetzen-Button nur einblenden, wenn es auch tatsächlich was zu löschen gibt
.werkzeug in .formular mit ENTER betätigbar machen
Neue bootstrap icons Version einführen (unlock2 statt lock)
event einführen, dass Liste_Element$FormularInitialisieren ausgeführt wird, wenn ein modal geöffnet wurde (mittels Dom_$ModalOeffnen)
Mit Github Copilot flex-nowrap, flex-grow, text-truncate und text-nowrap diskutieren
Mit Github Copilot Agent die Anordnung in Details optimieren
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
liste aus link_data loswerden
Lässt sich Liste_ElementErgaenzen in Liste_EventLocalstorageUpdVariable integrieren?
auswertung(en) umbenennen in verknuepfung(en)

VERKNUEPFUNGEN komplett loslösen aus LISTEN -> zuordnung dann nach php verschieben
    controller und verknuepfungen-Einträge aus LISTEN entfernen
    Liste_VerknuepfungenZuordnen entfernen
    Liste_ElementErgaenzen nur für Liste
    instanz[instanz].$blanko_auswertung umbauen zu $blanko_auswertung[instanz], dann instanz aus VERKNUEPFUNGEN/LISTEN[auswertungen/verknuepfungen] entfernen
    Ergebnis-Liste in Auswertungen fixen (zurück zu klassischen Listen vs. Bemerkung-Anzeigeproblematik)

ERLEDIGT

*/
