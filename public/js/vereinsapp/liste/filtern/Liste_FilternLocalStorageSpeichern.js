function Liste_FilternLocalStorageSpeichern(filtern, instanz, liste) {
    LISTEN[liste].instanz[instanz].filtern = new Object();

    if (isObject(filtern))
        $.each(Object.keys(filtern), function (position, eigenschaft) {
            if (liste in FILTERBARE_EIGENSCHAFTEN && FILTERBARE_EIGENSCHAFTEN[liste].includes(eigenschaft))
                LISTEN[liste].instanz[instanz].filtern[eigenschaft] = filtern[eigenschaft];
        });

    Schnittstelle_EventVariableUpdLocalstorage(liste);
    Schnittstelle_EventLocalstorageUpdVariable(liste);
    Schnittstelle_VariableElementZuordnen(liste);
    Schnittstelle_VariableElementErgaenzen(liste);
    Schnittstelle_EventVariableUpdDom(liste);
}
