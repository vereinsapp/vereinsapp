/**
 */

function Liste_VerzeichnisInit() {
    // INSTANZEN IN LISTEN BEREITSTELLEN
    $.each(BLANKOS.unterverzeichnis, function (position, $blanko) {
        const verzeichnis = Liste_WertBereinigtZurueck($blanko.attr("liste"), undefined);
        const instanz = Liste_WertBereinigtZurueck($blanko.attr("instanz"), undefined);
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
        const verzeichnis = Liste_WertBereinigtZurueck($blanko.attr("liste"), undefined);
        const instanz = Liste_WertBereinigtZurueck($blanko.attr("instanz"), undefined);
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
