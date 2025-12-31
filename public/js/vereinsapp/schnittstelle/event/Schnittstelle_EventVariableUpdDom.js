function Schnittstelle_EventVariableUpdDom(liste) {
    if (liste in LISTEN) {
        // LISTE AKTUALISIEREN
        $('.liste[data-liste="' + liste + '"]').each(function () {
            Liste_Aktualisieren($(this), liste);
        });

        // ELEMENT AKTUALISIEREN
        $('.element[data-liste="' + liste + '"]').each(function () {
            Liste_ElementAktualisieren($(this), liste);
        });

        // AUSWERTUNGEN AKTUALISIEREN
        $('.auswertungen[data-auswertungen="' + liste + '"], .auswertungen[data-liste="' + liste + '"]').each(function () {
            // , .auswertungen[data-gegen_liste="' + liste + '"]
            Liste_AuswertungenAktualisieren($(this), $(this).attr("data-auswertungen"));
        });

        // AUSWERTUNG AKTUALISIEREN
        $('.auswertung[data-auswertungen="' + liste + '"], .auswertung[data-liste="' + liste + '"]').each(function () {
            // , .auswertung[data-gegen_liste="' + liste + '"]
            Liste_AuswertungAktualisieren($(this), $(this).attr("data-auswertungen"));
        });

        // VERZEICHNIS AKTUALISIEREN
        $('.verzeichnis[data-liste="' + liste + '"]').each(function () {
            Liste_VerzeichnisAktualisieren($(this), liste);
        });

        // DATEI AKTUALISIEREN
        $('.datei[data-liste="' + liste + '"]').each(function () {
            Liste_DateiAktualisieren($(this), liste);
        });
    }

    $(".jetzt").each(function () {
        Schnittstelle_JetztAktualisieren($(this));
    });
}
