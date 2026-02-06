/**
 * @param {JQuery} $gruppieren_localstorage
 */

function Liste_$GruppierenLocalStorageSpeichern($gruppieren_localstorage) {
    const liste = Schnittstelle_VariableWertBereinigtZurueck($gruppieren_localstorage.attr("data-liste"), undefined);
    const instanz = Schnittstelle_VariableWertBereinigtZurueck($gruppieren_localstorage.attr("data-instanz"), undefined);

    // Definition von gruppieren_prio_hoch
    const gruppieren_prio_hoch = Schnittstelle_VariableWertBereinigtZurueck($gruppieren_localstorage.val(), undefined);

    // Befüllung von gruppieren
    LISTEN[liste].instanz[instanz].gruppieren = undefined;
    const eigenschaft = gruppieren_prio_hoch;
    if (liste in EIGENSCHAFTEN && eigenschaft in EIGENSCHAFTEN[liste]) {
        if (liste in SORTIERBARE_EIGENSCHAFTEN && SORTIERBARE_EIGENSCHAFTEN[liste].includes(eigenschaft)) {
            LISTEN[liste].instanz[instanz].gruppieren = gruppieren_prio_hoch;
        } else
            Schnittstelle_LogInDieKonsole(
                "Liste_$GruppierenLocalStorageSpeichern: Eigenschaft " + eigenschaft + " existiert nicht in SORTIERBARE_EIGENSCHAFTEN." + liste + "!",
            );
    } else
        Schnittstelle_LogInDieKonsole(
            "Liste_$GruppierenLocalStorageSpeichern: Eigenschaft " + eigenschaft + " existiert nicht in EIGENSCHAFTEN." + liste + "!",
        );

    Schnittstelle_EventVariableUpdLocalstorage(liste);
    Schnittstelle_EventLocalstorageUpdVariable(liste);
    Schnittstelle_VariableElementZuordnen(liste);
    Schnittstelle_VariableElementErgaenzen(liste);
    Schnittstelle_EventVariableUpdDom(liste);
}
