function Schnittstelle_EventLocalstorageUpdVariable(liste) {
    const tabelle_LocalStorage = Schnittstelle_LocalstorageRausZurueck(liste + "_tabelle", new Array());
    const tabelle = new Array();
    $.each(tabelle_LocalStorage, function () {
        const element = this;
        element.zugeordnete_elemente_nach_liste = new Object();
        tabelle[Number(element.id)] = element;
    });
    LISTEN[liste].tabelle = tabelle;

    $.each(LISTEN[liste].instanz, function (instanz) {
        LISTEN[liste].instanz[instanz].filtern = Schnittstelle_LocalstorageRausZurueck(liste + "_" + instanz + "_filtern", new Object());
        LISTEN[liste].instanz[instanz].sortieren = Schnittstelle_LocalstorageRausZurueck(liste + "_" + instanz + "_sortieren", undefined);
        LISTEN[liste].instanz[instanz].gruppieren = Schnittstelle_LocalstorageRausZurueck(liste + "_" + instanz + "_gruppieren", undefined);
    });
}
