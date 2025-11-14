function Liste_AuswertungenInit() {
    $.each(LISTEN, function (auswertungen) {
        $('.auswertungen[data-auswertungen="' + auswertungen + '"]').each(function () {
            const $auswertungen = $(this);
            const instanz = $auswertungen.attr("id");

            if (!(instanz in LISTEN[auswertungen].instanz)) LISTEN[auswertungen].instanz[instanz] = new Object();

            const liste = Schnittstelle_VariableWertBereinigtZurueck($auswertungen.attr("data-liste"), undefined);
            if (!(instanz in LISTEN[liste].instanz)) LISTEN[liste].instanz[instanz] = new Object();
            LISTEN[liste].instanz[instanz].gruppieren = Schnittstelle_VariableWertBereinigtZurueck($auswertungen.attr("data-gruppieren"), undefined);
        });
    });
}
