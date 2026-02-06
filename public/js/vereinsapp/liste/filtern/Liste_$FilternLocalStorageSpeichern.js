/**
 * @param {JQuery} $filtern_localstorage
 */

function Liste_$FilternLocalStorageSpeichern($filtern_localstorage) {
    const liste = Schnittstelle_VariableWertBereinigtZurueck($filtern_localstorage.attr("data-liste"), undefined);
    const instanz = Schnittstelle_VariableWertBereinigtZurueck($filtern_localstorage.attr("data-instanz"), undefined);

    // Definition von filtern_manip
    const filtern_manip = Schnittstelle_VariableWertBereinigtZurueck($filtern_localstorage.val(), new Object());

    // Befüllung von filtern
    LISTEN[liste].instanz[instanz].filtern = new Object();
    $.each(Object.keys(filtern_manip), function (position, eigenschaft) {
        if (liste in EIGENSCHAFTEN && eigenschaft in EIGENSCHAFTEN[liste]) {
            if (liste in FILTERBARE_EIGENSCHAFTEN && FILTERBARE_EIGENSCHAFTEN[liste].includes(eigenschaft)) {
                LISTEN[liste].instanz[instanz].filtern[eigenschaft] = filtern_manip[eigenschaft];
            } else
                Schnittstelle_LogInDieKonsole(
                    "Liste_$FilternLocalStorageSpeichern: Eigenschaft " + eigenschaft + " existiert nicht in FILTERBARE_EIGENSCHAFTEN." + liste + "!",
                );
        } else
            Schnittstelle_LogInDieKonsole(
                "Liste_$FilternLocalStorageSpeichern: Eigenschaft " + eigenschaft + " existiert nicht in EIGENSCHAFTEN." + liste + "!",
            );
    });

    Schnittstelle_EventVariableUpdLocalstorage(liste);
    Schnittstelle_EventLocalstorageUpdVariable(liste);
    Schnittstelle_VariableElementZuordnen(liste);
    Schnittstelle_VariableElementErgaenzen(liste);
    Schnittstelle_EventVariableUpdDom(liste);
}
