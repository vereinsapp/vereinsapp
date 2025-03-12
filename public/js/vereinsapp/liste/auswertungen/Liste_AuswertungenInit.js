function Liste_AuswertungenInit() {
    $.each(LISTEN, function (auswertungen) {
        $('.auswertungen[data-auswertungen="' + auswertungen + '"]').each(function () {
            const $auswertungen = $(this);
            const instanz = $auswertungen.attr("id");

            LISTEN[auswertungen].instanz[instanz] = new Object();

            // liste_data aus data
            let liste_data = $auswertungen.attr("data-liste");
            if (typeof liste_data !== "undefined") liste_data = Schnittstelle_VariableWertBereinigtZurueck(liste_data);
            else liste_data = new Object();
            // liste aus liste_data
            let liste = undefined;
            if ("liste" in liste_data) liste = liste_data.liste;
            // gruppieren aus liste_data
            let gruppieren_data = undefined;
            if ("gruppieren" in liste_data) gruppieren_data = liste_data.gruppieren;

            LISTEN[liste].instanz[instanz] = new Object();
            LISTEN[liste].instanz[instanz].gruppieren_data = gruppieren_data;
        });
    });
}
