/**
 * @param {string} liste
 */

function Schnittstelle_EventVariableUpdDom(liste) {
    if (liste in LISTEN) {
        // LISTE AKTUALISIEREN
        $('.liste[liste="' + liste + '"]').each(function () {
            Liste_$ListeAktualisieren($(this));
        });

        // ELEMENT AKTUALISIEREN
        $('.element[liste="' + liste + '"]').each(function () {
            Liste_$ElementAktualisieren($(this));
        });

        // AUSWERTUNGEN AKTUALISIEREN
        $.each(VERKNUEPFUNGEN, function (verknuepfungen, eigenschaften) {
            if (liste === verknuepfungen || eigenschaften.verknuepfte_listen.includes(liste)) {
                $('.auswertungen[auswertungen="' + verknuepfungen + '"]').each(function () {
                    Liste_$AuswertungenAktualisieren($(this));
                });

                // AUSWERTUNG AKTUALISIEREN
                $('.auswertung[auswertungen="' + verknuepfungen + '"]').each(function () {
                    Liste_$AuswertungAktualisieren($(this));
                });
            }
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

    $(".jetzt").each(function () {
        Schnittstelle_Dom$JetztAktualisieren($(this));
    });
}
