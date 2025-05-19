function Liste_FilternLocalStorageSpeichern(filtern, instanz, liste) {
    if (typeof filtern === "undefined" || !isObject(filtern)) filtern = new Object();

    LISTEN[liste].instanz[instanz].filtern = new Object();
    $.each(Object.keys(filtern), function (position, eigenschaft) {
        if (liste in FILTERBARE_EIGENSCHAFTEN && FILTERBARE_EIGENSCHAFTEN[liste].includes(eigenschaft))
            LISTEN[liste].instanz[instanz].filtern[eigenschaft] = filtern[eigenschaft];
    });

    Schnittstelle_EventAusfuehren(
        [Schnittstelle_EventVariableUpdLocalstorage, Schnittstelle_EventLocalstorageUpdVariable, Schnittstelle_EventVariableUpdDom],
        { liste: liste }
    );
}
