/**
 * @param {JQuery} $gruppieren_localstorage
 */

function Liste_$GruppierenLocalStorageSpeichern($gruppieren_localstorage) {
    const liste = Util_WertBereinigtZurueck($gruppieren_localstorage.attr("liste"), undefined);
    const instanz = Util_WertBereinigtZurueck($gruppieren_localstorage.attr("instanz"), undefined);

    // Definition von gruppieren_manip
    const gruppieren_manip = Util_WertBereinigtZurueck($gruppieren_localstorage.val(), undefined);

    // Befüllung von gruppieren
    LISTEN[liste].instanz[instanz].gruppieren = undefined;
    const eigenschaft = gruppieren_manip;
    if (typeof gruppieren_manip !== "undefined" && gruppieren_manip.length > 0) {
        if (liste in EIGENSCHAFTEN && eigenschaft in EIGENSCHAFTEN[liste]) {
            if (liste in SORTIERBARE_EIGENSCHAFTEN && SORTIERBARE_EIGENSCHAFTEN[liste].includes(eigenschaft)) {
                LISTEN[liste].instanz[instanz].gruppieren = gruppieren_manip;
            } else
                Log_InDieKonsole(
                    "Liste_$GruppierenLocalStorageSpeichern: Eigenschaft " +
                        eigenschaft +
                        " existiert nicht in SORTIERBARE_EIGENSCHAFTEN." +
                        liste +
                        "!",
                );
        } else
            Log_InDieKonsole(
                "Liste_$GruppierenLocalStorageSpeichern: Eigenschaft " + eigenschaft + " existiert nicht in EIGENSCHAFTEN." + liste + "!",
            );
    }

    Liste_EventLocalstorageAktualisieren(liste);
    Liste_EventVariableListenAktualisieren(liste);
    Liste_ElementErgaenzen(liste);
    Liste_EventDomAktualisieren(liste);
}
