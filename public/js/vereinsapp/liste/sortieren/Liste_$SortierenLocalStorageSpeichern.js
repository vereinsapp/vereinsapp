/**
 * @param {JQuery} $sortieren_localstorage
 */

function Liste_$SortierenLocalStorageSpeichern($sortieren_localstorage) {
    const liste = Util_WertBereinigtZurueck($sortieren_localstorage.attr("liste"), undefined);
    const instanz = Util_WertBereinigtZurueck($sortieren_localstorage.attr("instanz"), undefined);

    // Definition von sortieren_manip
    const sortieren_manip = { eigenschaft: undefined, richtung: undefined };
    $.each(
        Util_WertBereinigtZurueck($sortieren_localstorage.val(), {
            eigenschaft: undefined,
            richtung: undefined,
        }),
        function (eigenschaft_richtung, wert) {
            if (eigenschaft_richtung in sortieren_manip) sortieren_manip[eigenschaft_richtung] = wert;
        },
    );

    // Befüllung von sortieren
    LISTEN[liste].instanz[instanz].sortieren = undefined;
    const eigenschaft = sortieren_manip.eigenschaft;
    if (liste in EIGENSCHAFTEN && eigenschaft in EIGENSCHAFTEN[liste]) {
        if (liste in SORTIERBARE_EIGENSCHAFTEN && SORTIERBARE_EIGENSCHAFTEN[liste].includes(eigenschaft)) {
            LISTEN[liste].instanz[instanz].sortieren = sortieren_manip;
        } else
            Log_InDieKonsole(
                "Liste_$SortierenLocalStorageSpeichern: Eigenschaft " + eigenschaft + " existiert nicht in SORTIERBARE_EIGENSCHAFTEN." + liste + "!",
            );
    } else Log_InDieKonsole("Liste_$SortierenLocalStorageSpeichern: Eigenschaft " + eigenschaft + " existiert nicht in EIGENSCHAFTEN." + liste + "!");

    Liste_EventLocalstorageAktualisieren(liste);
    Liste_EventVariableListenAktualisieren(liste);
    Liste_ElementErgaenzen(liste);
    Liste_EventDomAktualisieren(liste);
}
