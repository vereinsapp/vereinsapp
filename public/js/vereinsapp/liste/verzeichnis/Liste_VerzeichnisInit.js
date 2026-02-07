/**
 */

BLANKOS.unterverzeichnis = new Object();
BLANKOS.unterverzeichnis.bereitstellen_aktion = function ($blanko) {
    const $verzeichnis = $blanko.closest(".verzeichnis[id][data-liste]");
    const instanz = $verzeichnis.attr("id");
    const liste = $verzeichnis.attr("data-liste");
    if (liste in LISTEN && instanz in LISTEN[liste].verzeichnis && !("$blanko_unterverzeichnis" in LISTEN[liste].verzeichnis[instanz]))
        LISTEN[liste].verzeichnis[instanz].$blanko_unterverzeichnis = $blanko;
};

BLANKOS.datei = new Object();
BLANKOS.datei.bereitstellen_aktion = function ($blanko) {
    const $verzeichnis = $blanko.closest(".verzeichnis[id][data-liste]");
    const instanz = $verzeichnis.attr("id");
    const liste = $verzeichnis.attr("data-liste");
    if (liste in LISTEN && instanz in LISTEN[liste].verzeichnis && !("$blanko_datei" in LISTEN[liste].verzeichnis[instanz]))
        LISTEN[liste].verzeichnis[instanz].$blanko_datei = $blanko;
};

function Liste_VerzeichnisInit() {
    $.each(LISTEN, function (liste) {
        LISTEN[liste].verzeichnis = new Object();
        $('.verzeichnis[data-liste="' + liste + '"]').each(function () {
            LISTEN[liste].verzeichnis[Schnittstelle_VariableWertBereinigtZurueck($(this).attr("id"), undefined)] = new Object();
        });
    });
}
