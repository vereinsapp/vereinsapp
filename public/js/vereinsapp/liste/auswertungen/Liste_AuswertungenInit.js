/**
 */

function Liste_AuswertungenInit() {
    // INSTANZEN IN LISTEN BEREITSTELLEN
    $.each(BLANKOS.auswertung, function (position, $blanko) {
        const auswertungen = Schnittstelle_VariableWertBereinigtZurueck($blanko.attr("auswertungen"), undefined);
        const instanz = Schnittstelle_VariableWertBereinigtZurueck($blanko.attr("instanz"), undefined);
        const liste = Schnittstelle_VariableWertBereinigtZurueck($blanko.attr("liste"), undefined);
        $blanko.removeAttr("auswertungen").removeAttr("instanz").removeAttr("liste");

        if (!("instanz" in LISTEN[auswertungen])) LISTEN[auswertungen].instanz = new Object();
        if (!(instanz in LISTEN[auswertungen].instanz))
            LISTEN[auswertungen].instanz[instanz] = {
                filtern: new Object(),
                sortieren: undefined,
                gruppieren: undefined,
            };
        LISTEN[auswertungen].instanz[instanz].$blanko_auswertung = $blanko;

        if (!("instanz" in LISTEN[liste])) LISTEN[liste].instanz = new Object();
        if (!(instanz in LISTEN[liste].instanz))
            LISTEN[liste].instanz[instanz] = {
                filtern: new Object(),
                sortieren: undefined,
                gruppieren: undefined,
            };
    });
}
