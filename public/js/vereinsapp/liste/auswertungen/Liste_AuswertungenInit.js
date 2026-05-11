/**
 */

function Liste_AuswertungenInit() {
    // INSTANZEN IN LISTEN BEREITSTELLEN
    $.each(BLANKOS.auswertung, function (position, $blanko) {
        const auswertungen = Util_WertBereinigtZurueck($blanko.attr("auswertungen"), undefined);
        const instanz = Util_WertBereinigtZurueck($blanko.attr("instanz"), undefined);
        const liste = Util_WertBereinigtZurueck($blanko.attr("liste"), undefined);
        $blanko.removeAttr("auswertungen").removeAttr("instanz").removeAttr("liste");

        if (!("instanz" in VERKNUEPFUNGEN[auswertungen])) VERKNUEPFUNGEN[auswertungen].instanz = new Object();
        if (!(instanz in VERKNUEPFUNGEN[auswertungen].instanz))
            VERKNUEPFUNGEN[auswertungen].instanz[instanz] = {
                filtern: new Object(),
                sortieren: undefined,
                gruppieren: undefined,
                bearbeiten_modus: false,
            };
        VERKNUEPFUNGEN[auswertungen].instanz[instanz].$blanko_auswertung = $blanko;

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
