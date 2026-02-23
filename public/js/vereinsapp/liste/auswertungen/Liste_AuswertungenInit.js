/**
 */

BLANKOS.auswertung = new Object();
BLANKOS.auswertung.bereitstellen_aktion = function ($blanko) {
    const $auswertungen = $blanko.closest(".auswertungen[id][data-auswertungen]");
    const instanz = $auswertungen.attr("id");
    const auswertungen = $auswertungen.attr("data-auswertungen");
    if (auswertungen in LISTEN && instanz in LISTEN[auswertungen].instanz && !("$blanko_auswertung" in LISTEN[auswertungen].instanz[instanz]))
        LISTEN[auswertungen].instanz[instanz].$blanko_auswertung = $blanko;
};

function Liste_AuswertungenInit() {
    $.each(LISTEN, function (auswertungen) {
        $('.auswertungen[data-auswertungen="' + auswertungen + '"]').each(function () {
            const instanz = Schnittstelle_VariableWertBereinigtZurueck($(this).attr("id"), undefined);

            if (!(instanz in LISTEN[auswertungen].instanz))
                LISTEN[auswertungen].instanz[instanz] = {
                    filtern: new Object(),
                    sortieren: undefined,
                    gruppieren: undefined,
                };

            const liste = Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-liste"), undefined);
            if (!(instanz in LISTEN[liste].instanz))
                LISTEN[liste].instanz[instanz] = {
                    filtern: new Object(),
                    sortieren: undefined,
                    gruppieren: undefined,
                };
        });
    });
}
