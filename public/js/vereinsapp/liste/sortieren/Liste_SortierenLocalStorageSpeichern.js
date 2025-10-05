function Liste_SortierenLocalStorageSpeichern(sortieren, instanz, liste) {
    LISTEN[liste].instanz[instanz].sortieren = undefined;

    if (isObject(sortieren))
        if ("eigenschaft" in sortieren)
            if (liste in SORTIERBARE_EIGENSCHAFTEN && SORTIERBARE_EIGENSCHAFTEN[liste].includes(sortieren.eigenschaft))
                LISTEN[liste].instanz[instanz].sortieren = sortieren;

    Schnittstelle_EventVariableUpdLocalstorage(liste);
    Schnittstelle_EventLocalstorageUpdVariable(liste);
    Schnittstelle_VariableErgaenzen(liste);
    Schnittstelle_EventVariableUpdDom(liste);
}
