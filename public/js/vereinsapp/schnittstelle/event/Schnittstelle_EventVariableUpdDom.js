function Schnittstelle_EventVariableUpdDom(liste) {
    if (liste in LISTEN) {
        // LISTE AKTUALISIEREN
        $('.liste[data-liste="' + liste + '"]').each(function () {
            Liste_$ListeAktualisieren($(this), liste);
        });

        // ELEMENT AKTUALISIEREN
        $('.element[data-liste="' + liste + '"]').each(function () {
            Liste_$ElementAktualisieren($(this), liste);
        });

        // AUSWERTUNGEN AKTUALISIEREN
        $.each(VERKNUEPFUNGEN, function (verknuepfungen, eigenschaften) {
            if (liste === verknuepfungen || eigenschaften.verknuepfte_listen.includes(liste)) {
                $('.auswertungen[data-auswertungen="' + verknuepfungen + '"]').each(function () {
                    Liste_$AuswertungenAktualisieren($(this), verknuepfungen);
                });

                // AUSWERTUNG AKTUALISIEREN
                $('.auswertung[data-auswertungen="' + verknuepfungen + '"]').each(function () {
                    Liste_$AuswertungAktualisieren($(this), verknuepfungen);
                });
            }
        });

        // VERZEICHNIS AKTUALISIEREN
        $('.verzeichnis[data-liste="' + liste + '"]').each(function () {
            Liste_$VerzeichnisAktualisieren($(this), liste);
        });

        // DATEI AKTUALISIEREN
        $('.datei[data-liste="' + liste + '"]').each(function () {
            Liste_$DateiAktualisieren($(this), liste);
        });
    }

    $(".jetzt").each(function () {
        Schnittstelle_JetztAktualisieren($(this));
    });
}
