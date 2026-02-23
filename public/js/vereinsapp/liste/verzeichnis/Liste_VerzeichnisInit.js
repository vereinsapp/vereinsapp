/**
 */

BLANKOS.unterverzeichnis = new Object();
BLANKOS.unterverzeichnis.bereitstellen_aktion = function ($blanko) {
    const $verzeichnis = $blanko.closest(".verzeichnis[id][data-liste]");
    const instanz = $verzeichnis.attr("id");
    const liste = $verzeichnis.attr("data-liste");
    if (liste in LISTEN && instanz in LISTEN[liste].instanz && !("$blanko_unterverzeichnis" in LISTEN[liste].instanz[instanz]))
        LISTEN[liste].instanz[instanz].$blanko_unterverzeichnis = $blanko;
};

BLANKOS.datei = new Object();
BLANKOS.datei.bereitstellen_aktion = function ($blanko) {
    const $verzeichnis = $blanko.closest(".verzeichnis[id][data-liste]");
    const instanz = $verzeichnis.attr("id");
    const liste = $verzeichnis.attr("data-liste");
    if (liste in LISTEN && instanz in LISTEN[liste].instanz && !("$blanko_datei" in LISTEN[liste].instanz[instanz]))
        LISTEN[liste].instanz[instanz].$blanko_datei = $blanko;
};

function Liste_VerzeichnisInit() {
    $.each(LISTEN, function (verzeichnis) {
        $('.verzeichnis[data-liste="' + verzeichnis + '"]').each(function () {
            const instanz = Schnittstelle_VariableWertBereinigtZurueck($(this).attr("id"), undefined);

            if (!(instanz in LISTEN[verzeichnis].instanz))
                LISTEN[verzeichnis].instanz[instanz] = {
                    filtern: new Object(),
                    sortieren: undefined,
                    gruppieren: undefined,
                };
        });
    });
}
