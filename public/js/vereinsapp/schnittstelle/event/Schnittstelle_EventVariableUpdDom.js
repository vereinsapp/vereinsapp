function Schnittstelle_EventVariableUpdDom(liste, naechste_aktionen) {
    Schnittstelle_EventDurchfuehren(liste, naechste_aktionen, function (liste) {
        // LISTE AKTUALISIEREN
        $('.liste[data-liste="' + liste + '"]').each(function () {
            Liste_Aktualisieren($(this));
        });

        // ELEMENT AKTUALISIEREN
        $('.element[data-liste="' + liste + '"]').each(function () {
            Liste_ElementAktualisieren($(this), liste);
        });

        // LISTENSTATISTIK AKTUALISIEREN
        $('.listenstatistik[data-listenstatistik="gefunden"]').each(function () {
            const $listenstatistik = $(this);
            const instanz = $listenstatistik.attr("data-instanz");
            if (typeof instanz !== "undefined") {
                $(this).text($('.liste[id="' + instanz + '"]').children().length);
            }
        });
        $('.listenstatistik[data-listenstatistik="markiert"]').each(function () {
            const $listenstatistik = $(this);
            const instanz = $listenstatistik.attr("data-instanz");
            if (typeof instanz !== "undefined") {
                $(this).text($('.liste[id="' + instanz + '"]').find(".check:checked").length);
            }
        });

        // AUSWERTUNGEN AKTUALISIEREN
        $('.auswertungen[data-auswertungen="' + liste + '"]').each(function () {
            Liste_AuswertungenAktualisieren($(this), liste);
            let liste_data = $(this).attr("data-liste");
            if (typeof liste_data !== "undefined") liste_data = JSON.parse(liste_data);
            else liste_data = new Object();
            if ("liste" in liste_data) Schnittstelle_EventVariableUpdDom(liste_data.liste);
        });

        // VERZEICHNIS AKTUALISIEREN
        $('.verzeichnis[data-liste="' + liste + '"]').each(function () {
            Liste_VerzeichnisAktualisieren($(this), liste);
        });

        // FORMULAR MEINE RÜCKMELDUNG EIN-/AUSBLENDEN
        $('.formular[data-formular="rueckmeldung"]').each(function () {
            Termine_FormularMeineRueckmeldungEinAusblenden($(this));
        });

        // RÜCKMELDUNG AKTUALISIEREN
        $(".zusagen, .absagen").each(function () {
            Termine_RueckmeldungAktualisieren($(this));
        });

        $(".jetzt").each(function () {
            Schnittstelle_JetztAktualisieren($(this));
        });
    });
}
