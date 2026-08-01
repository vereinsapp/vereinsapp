/**
 * @param {string} liste
 */

function Liste_EventDomAktualisieren(liste) {
    if (liste in LISTEN) {
        // LISTE AKTUALISIEREN
        $('.liste[liste="' + liste + '"]').each(function () {
            Liste_$ListeAktualisieren($(this));
        });

        // VERKNUEPFUNGEN AKTUALISIEREN
        $('.verknuepfungen[liste="' + liste + '"]').each(function () {
            Liste_$VerknuepfungenAktualisieren($(this));
        });

        // ELEMENT AKTUALISIEREN
        $('.element[liste="' + liste + '"]').each(function () {
            Liste_$ElementAktualisieren($(this));
        });

        // AUSWERTUNGEN AKTUALISIEREN
        $('.auswertungen[liste="' + liste + '"]').each(function () {
            Liste_$AuswertungenAktualisieren($(this));
        });

        // AUSWERTUNG AKTUALISIEREN
        $('.auswertung[liste="' + liste + '"]').each(function () {
            Liste_$AuswertungAktualisieren($(this));
        });

        // VERZEICHNIS AKTUALISIEREN
        $('.verzeichnis[liste="' + liste + '"]').each(function () {
            Liste_$VerzeichnisAktualisieren($(this));
        });

        // DATEI AKTUALISIEREN
        $('.datei[liste="' + liste + '"]').each(function () {
            Liste_$DateiAktualisieren($(this));
        });
    }
}
