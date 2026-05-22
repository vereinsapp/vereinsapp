/**
 */

function Liste_AuswertungenInit() {
    // INSTANZEN IN LISTEN BEREITSTELLEN
    $.each(BLANKOS.auswertung, function (position, $blanko) {
        const verknuepfungen = Util_WertBereinigtZurueck($blanko.attr("verknuepfungen"), undefined);
        const instanz = Util_WertBereinigtZurueck($blanko.attr("instanz"), undefined);
        const liste = Util_WertBereinigtZurueck($blanko.attr("liste"), undefined);
        $blanko.removeAttr("verknuepfungen").removeAttr("instanz").removeAttr("liste");

        if (!("instanz" in VERKNUEPFUNGEN[verknuepfungen])) VERKNUEPFUNGEN[verknuepfungen].instanz = new Object();
        if (!(instanz in VERKNUEPFUNGEN[verknuepfungen].instanz)) VERKNUEPFUNGEN[verknuepfungen].instanz[instanz] = new Object();
        VERKNUEPFUNGEN[verknuepfungen].instanz[instanz].$blanko_auswertung = $blanko;

        if (!("instanz" in LISTEN[liste])) LISTEN[liste].instanz = new Object();
        if (!(instanz in LISTEN[liste].instanz))
            LISTEN[liste].instanz[instanz] = {
                filtern: new Object(),
                sortieren: undefined,
                gruppieren: undefined,
                bearbeiten_modus: false,
            };
    });
}
