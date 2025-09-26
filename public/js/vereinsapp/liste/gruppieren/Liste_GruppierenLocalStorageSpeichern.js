function Liste_GruppierenLocalStorageSpeichern(gruppieren, instanz, liste) {
    LISTEN[liste].instanz[instanz].gruppieren = undefined;

    if (isString(gruppieren))
        if (true)
            if (liste in GRUPPIERBARE_EIGENSCHAFTEN && GRUPPIERBARE_EIGENSCHAFTEN[liste].includes(gruppieren))
                LISTEN[liste].instanz[instanz].gruppieren = gruppieren;

    Schnittstelle_EventVariableUpdLocalstorage(liste);
    Schnittstelle_EventLocalstorageUpdVariable(liste);
    Schnittstelle_VariableErgaenzen(liste);
    Schnittstelle_EventVariableUpdDom(liste);
}
