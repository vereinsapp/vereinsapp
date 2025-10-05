function Schnittstelle_EventLocalstorageUpdVariable(liste) {
    // tabelle_LocalStorage wird aus dem LocalStorage geholt
    let tabelle_LocalStorage = Schnittstelle_LocalstorageRausZurueck(liste + "_tabelle");
    if (typeof tabelle_LocalStorage === "undefined") tabelle_LocalStorage = new Array();

    // tabelle wird in der Variable gespeichert
    const tabelle = new Array();
    $.each(tabelle_LocalStorage, function () {
        tabelle[this["id"]] = this;
    });
    LISTEN[liste].tabelle = tabelle;

    $.each(LISTEN[liste].instanz, function (instanz) {
        // filtern wird aus dem LocalStorage geholt und in der Variable gespeichert
        let filtern_LocalStorage = Schnittstelle_LocalstorageRausZurueck(liste + "_" + instanz + "_filtern");
        if (typeof filtern_LocalStorage === "undefined") filtern_LocalStorage = new Object();
        LISTEN[liste].instanz[instanz].filtern = filtern_LocalStorage;
        // sortieren wird aus dem LocalStorage geholt und in der Variable gespeichert
        LISTEN[liste].instanz[instanz].sortieren = Schnittstelle_LocalstorageRausZurueck(liste + "_" + instanz + "_sortieren");
        // gruppieren wird aus dem LocalStorage geholt und in der Variable gespeichert
        LISTEN[liste].instanz[instanz].gruppieren = Schnittstelle_LocalstorageRausZurueck(liste + "_" + instanz + "_gruppieren");
    });
}
