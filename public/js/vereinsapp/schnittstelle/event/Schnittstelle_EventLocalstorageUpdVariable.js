function Schnittstelle_EventLocalstorageUpdVariable(liste) {
    LISTEN[liste].tabelle = new Array();
    $.each(Schnittstelle_LocalstorageRausZurueck(liste + "_tabelle", new Array()), function () {
        const element = this;
        element.zugeordnete_elemente_nach_liste = new Object();
        LISTEN[liste].tabelle[element.id] = element;
    });

    $.each(LISTEN[liste].instanz, function (instanz) {
        LISTEN[liste].instanz[instanz].filtern = Schnittstelle_LocalstorageRausZurueck(liste + "_" + instanz + "_filtern", new Object());
        LISTEN[liste].instanz[instanz].sortieren = Schnittstelle_LocalstorageRausZurueck(liste + "_" + instanz + "_sortieren", undefined);
        LISTEN[liste].instanz[instanz].gruppieren = Schnittstelle_LocalstorageRausZurueck(liste + "_" + instanz + "_gruppieren", undefined);
    });
}
