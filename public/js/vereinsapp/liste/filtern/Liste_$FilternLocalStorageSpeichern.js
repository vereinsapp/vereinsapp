/**
 * @param {JQuery} $werkzeug
 */

function Liste_$FilternLocalStorageSpeichern($werkzeug) {
    const liste = Util_WertBereinigtZurueck($werkzeug.attr("liste"), undefined);
    const instanz = Util_WertBereinigtZurueck($werkzeug.attr("instanz"), undefined);

    // Definition von filtern_manip
    const filtern_manip = Util_WertBereinigtZurueck($werkzeug.val(), new Object());

    // Befüllung von filtern
    LISTEN[liste].instanz[instanz].filtern = new Object();
    $.each(Object.keys(filtern_manip), function (position, eigenschaft) {
        if (liste in EIGENSCHAFTEN && eigenschaft in EIGENSCHAFTEN[liste]) {
            if (liste in FILTERBARE_EIGENSCHAFTEN && FILTERBARE_EIGENSCHAFTEN[liste].includes(eigenschaft)) {
                LISTEN[liste].instanz[instanz].filtern[eigenschaft] = filtern_manip[eigenschaft];
            } else
                Log_InDieKonsole(
                    "Liste_$FilternLocalStorageSpeichern: Eigenschaft " + eigenschaft + " existiert nicht in FILTERBARE_EIGENSCHAFTEN." + liste + "!",
                );
        } else
            Log_InDieKonsole("Liste_$FilternLocalStorageSpeichern: Eigenschaft " + eigenschaft + " existiert nicht in EIGENSCHAFTEN." + liste + "!");
    });

    Liste_EventListenLocalstorageSpeichern(liste);
    Liste_EventListenBereitstellen(liste);
    Liste_ElementWertErgaenzen(liste);
    Liste_EventDomAktualisieren(liste);
}
