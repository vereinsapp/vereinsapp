/**
 */

function Liste_VerzeichnisInit() {
    // INSTANZEN IN LISTEN BEREITSTELLEN
    $.each(BLANKOS.unterverzeichnis, function (position, $blanko) {
        const verzeichnis = Schnittstelle_VariableWertBereinigtZurueck($blanko.attr("liste"), undefined);
        const instanz = Schnittstelle_VariableWertBereinigtZurueck($blanko.attr("instanz"), undefined);
        $blanko.removeAttr("liste").removeAttr("instanz");

        if (!("instanz" in LISTEN[verzeichnis])) LISTEN[verzeichnis].instanz = new Object();
        if (!(instanz in LISTEN[verzeichnis].instanz))
            LISTEN[verzeichnis].instanz[instanz] = {
                filtern: new Object(),
                sortieren: undefined,
                gruppieren: undefined,
            };
        LISTEN[verzeichnis].instanz[instanz].$blanko_unterverzeichnis = $blanko;
    });

    $.each(BLANKOS.datei, function (position, $blanko) {
        const verzeichnis = Schnittstelle_VariableWertBereinigtZurueck($blanko.attr("liste"), undefined);
        const instanz = Schnittstelle_VariableWertBereinigtZurueck($blanko.attr("instanz"), undefined);
        $blanko.removeAttr("liste").removeAttr("instanz");

        if (!("instanz" in LISTEN[verzeichnis])) LISTEN[verzeichnis].instanz = new Object();
        if (!(instanz in LISTEN[verzeichnis].instanz))
            LISTEN[verzeichnis].instanz[instanz] = {
                filtern: new Object(),
                sortieren: undefined,
                gruppieren: undefined,
            };
        LISTEN[verzeichnis].instanz[instanz].$blanko_datei = $blanko;
    });
}
