/**
 * @param {JQuery} $sortieren_localstorage
 */

function Liste_$SortierenLocalStorageSpeichern($sortieren_localstorage) {
    const liste = Schnittstelle_VariableWertBereinigtZurueck($sortieren_localstorage.attr("data-liste"), undefined);
    const instanz = Schnittstelle_VariableWertBereinigtZurueck($sortieren_localstorage.attr("data-instanz"), undefined);

    // Definition von sortieren_prio_hoch
    const sortieren_prio_hoch = { eigenschaft: undefined, richtung: undefined };
    $.each(
        Schnittstelle_VariableWertBereinigtZurueck($sortieren_localstorage.val(), {
            eigenschaft: undefined,
            richtung: undefined,
        }),
        function (eigenschaft_richtung, wert) {
            if (eigenschaft_richtung in sortieren_prio_hoch) sortieren_prio_hoch[eigenschaft_richtung] = wert;
        },
    );

    // Befüllung von sortieren
    LISTEN[liste].instanz[instanz].sortieren = undefined;
    const eigenschaft = sortieren_prio_hoch.eigenschaft;
    if (liste in EIGENSCHAFTEN && eigenschaft in EIGENSCHAFTEN[liste]) {
        if (liste in SORTIERBARE_EIGENSCHAFTEN && SORTIERBARE_EIGENSCHAFTEN[liste].includes(eigenschaft)) {
            LISTEN[liste].instanz[instanz].sortieren = sortieren_prio_hoch;
        } else
            Schnittstelle_LogInDieKonsole(
                "Liste_$SortierenLocalStorageSpeichern: Eigenschaft " + eigenschaft + " existiert nicht in SORTIERBARE_EIGENSCHAFTEN." + liste + "!",
            );
    } else
        Schnittstelle_LogInDieKonsole(
            "Liste_$SortierenLocalStorageSpeichern: Eigenschaft " + eigenschaft + " existiert nicht in EIGENSCHAFTEN." + liste + "!",
        );

    Schnittstelle_EventVariableUpdLocalstorage(liste);
    Schnittstelle_EventLocalstorageUpdVariable(liste);
    Schnittstelle_VariableElementZuordnen(liste);
    Schnittstelle_VariableElementErgaenzen(liste);
    Schnittstelle_EventVariableUpdDom(liste);
}
