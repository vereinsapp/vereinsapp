const DATETIME = luxon.DateTime;

$(document).ready(function () {
    Schnittstelle_AjaxInit();
    Schnittstelle_LocalstorageInit();
    Schnittstelle_DomInit();
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
event einführen, dass Liste_Element$FormularInitialisieren ausgeführt wird, wenn ein modal geöffnet wurde (mittels Schnittstelle_Dom$ModalOeffnen)
Bugfix filtern_eigenschaft[filtern_klasse].toISODate is not a function (wenn Start im Termine-Filter gesetzt wird)
Aufgaben detaillieren
Zugewiesene Strafen anzeigen
Bugfix Klick auf Werkzeug direkt im Element löst Element-Event und Werkzeug-Event aus
kacheln-View ergänzen (analog zu liste-View)
data-Prefix loswerden
Schnittstelle_VariableWertFormatiertZurueck verschieben nach Liste (auch umbenennen)
Variante von Liste_ElementTextMitBeschriftungErsetztZurueck einführen mit dem man {liste_beschriftung} und {element_beschriftung} ersetzen kann (bspw. für WERKZEUGE.element_loeschen.aktualisieren_aktion)
element_zuordnen_aktion vereinheitlichen und zentralisieren
formular_oeffnen und bestaetigung_einfordern loswerden
weiterleiten loswerden mittels .hasClass("element_loeschen_weiterleiten")?

ERLEDIGT

*/
